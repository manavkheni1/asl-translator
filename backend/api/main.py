import sys
import os

# Add the backend/model directory to path so we can import ASLClassifier
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'model'))

import torch
import numpy as np
import base64
import cv2
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
from model import ASLClassifier

# ── App setup ──────────────────────────────────────────────────────────────────
app = FastAPI(title="ASL Translator API", version="1.0.0")

# Allow requests from the React frontend (any origin during development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Load model and labels on startup ──────────────────────────────────────────
MODEL_PATH = "data/processed/asl_model.pth"
LABELS_PATH = "data/processed/label_classes.npy"
MEDIAPIPE_MODEL = "hand_landmarker.task"
NUM_CLASSES = 29
device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")

# Load the trained LSTM model
model = ASLClassifier(input_size=63, hidden_size=128,
                      num_layers=2, num_classes=NUM_CLASSES, dropout=0.3)
model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
model.to(device)
model.eval()

# Load label classes (A-Z, del, nothing, space)
label_classes = np.load(LABELS_PATH, allow_pickle=True)

# Configure MediaPipe hand landmark detector
base_options = python.BaseOptions(model_asset_path=MEDIAPIPE_MODEL)
options = vision.HandLandmarkerOptions(
    base_options=base_options,
    num_hands=1,
    min_hand_detection_confidence=0.5
)
detector = vision.HandLandmarker.create_from_options(options)

print(f"Model loaded on {device} | Classes: {label_classes}")


# ── Request schema ─────────────────────────────────────────────────────────────
class FrameRequest(BaseModel):
    # Base64-encoded image frame sent from the React webcam
    image: str


# ── Helper: extract landmarks from image ──────────────────────────────────────
def extract_landmarks_from_frame(image_bytes):
    """
    Converts raw image bytes to a MediaPipe image,
    runs hand detection, and returns:
    - coords: 63 normalized values for model input
    - raw: list of [x, y, z] for each of 21 landmarks (for overlay)
    Returns (None, None) if no hand is detected.
    """
    np_arr = np.frombuffer(image_bytes, np.uint8)
    frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    mp_image = mp.Image(
        image_format=mp.ImageFormat.SRGB,
        data=rgb_frame
    )
    results = detector.detect(mp_image)

    if not results.hand_landmarks:
        return None, None

    landmarks = results.hand_landmarks[0]
    wrist_x = landmarks[0].x
    wrist_y = landmarks[0].y
    wrist_z = landmarks[0].z

    # Normalized coords for model input
    coords = []
    for lm in landmarks:
        coords.extend([
            lm.x - wrist_x,
            lm.y - wrist_y,
            lm.z - wrist_z
        ])

    # Raw coords for frontend overlay drawing
    raw = [[lm.x, lm.y, lm.z] for lm in landmarks]

    return coords, raw


# ── Routes ─────────────────────────────────────────────────────────────────────
@app.get("/")
def root():
    return {"message": "ASL Translator API is running"}


@app.get("/health")
def health():
    return {"status": "ok", "model": "loaded", "classes": len(label_classes)}


@app.post("/predict")
def predict(request: FrameRequest):
    """
    Accepts a base64-encoded webcam frame,
    extracts hand landmarks, runs the LSTM model,
    and returns the predicted ASL letter, confidence score,
    and raw landmarks for the frontend overlay.
    """
    try:
        # Decode base64 image from frontend
        image_bytes = base64.b64decode(request.image)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid base64 image")

    # Extract landmarks using MediaPipe
    coords, raw_landmarks = extract_landmarks_from_frame(image_bytes)

    if coords is None:
        return {
            "prediction": None,
            "confidence": 0.0,
            "message": "No hand detected",
            "landmarks": []
        }

    # Run inference through the LSTM model
    input_tensor = torch.tensor(coords, dtype=torch.float32)
    input_tensor = input_tensor.unsqueeze(0).unsqueeze(0).to(device)  # (1, 1, 63)

    with torch.no_grad():
        output = model(input_tensor)
        probabilities = torch.softmax(output, dim=1)
        confidence, predicted_idx = torch.max(probabilities, dim=1)

    predicted_label = label_classes[predicted_idx.item()]
    confidence_score = round(confidence.item() * 100, 2)

    return {
        "prediction": predicted_label,
        "confidence": confidence_score,
        "message": "success",
        "landmarks": raw_landmarks
    }