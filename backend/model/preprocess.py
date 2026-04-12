import os
import cv2
import mediapipe as mp
import pandas as pd
from tqdm import tqdm
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
import urllib.request

# Download the MediaPipe hand landmark model if not already present
MODEL_PATH = "hand_landmarker.task"
if not os.path.exists(MODEL_PATH):
    print("Downloading MediaPipe hand landmark model...")
    urllib.request.urlretrieve(
        "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
        MODEL_PATH
    )
    print("Model downloaded!")

# Path to the raw training images and output CSV file
DATA_DIR = "data/raw/asl_alphabet_train/asl_alphabet_train"
OUTPUT_FILE = "data/processed/landmarks.csv"

# Configure the hand landmark detector
base_options = python.BaseOptions(model_asset_path=MODEL_PATH)
options = vision.HandLandmarkerOptions(
    base_options=base_options,
    num_hands=1,
    min_hand_detection_confidence=0.5
)
detector = vision.HandLandmarker.create_from_options(options)

def extract_landmarks(image_path):
    """
    Given an image path, runs MediaPipe hand detection and returns
    63 normalized landmark coordinates (21 points × x, y, z).
    Coordinates are normalized relative to the wrist (landmark 0)
    so the model learns hand shape, not hand position on screen.
    Returns None if no hand is detected.
    """
    image = mp.Image.create_from_file(image_path)
    results = detector.detect(image)

    if results.hand_landmarks:
        landmarks = results.hand_landmarks[0]
        coords = []

        # Use wrist as the reference point for normalization
        wrist_x = landmarks[0].x
        wrist_y = landmarks[0].y
        wrist_z = landmarks[0].z

        for lm in landmarks:
            coords.extend([
                lm.x - wrist_x,
                lm.y - wrist_y,
                lm.z - wrist_z
            ])
        return coords
    return None

def process_dataset():
    """
    Iterates through all letter folders in the dataset,
    extracts hand landmarks from each image using MediaPipe,
    and saves the results as a CSV file for model training.
    Images where no hand is detected are skipped.
    """
    # Get all letter folders (A-Z) sorted alphabetically
    labels = sorted(os.listdir(DATA_DIR))
    labels = [l for l in labels if os.path.isdir(os.path.join(DATA_DIR, l))]

    rows = []
    for label in labels:
        label_dir = os.path.join(DATA_DIR, label)
        image_files = os.listdir(label_dir)
        print(f"Processing {label} — {len(image_files)} images")

        for img_file in tqdm(image_files):
            img_path = os.path.join(label_dir, img_file)
            try:
                landmarks = extract_landmarks(img_path)
                # Only add rows where MediaPipe successfully detected a hand
                if landmarks:
                    rows.append([label] + landmarks)
            except Exception:
                pass  # skip unreadable images

    # Build DataFrame: first column is the label, rest are landmark coordinates
    columns = ["label"] + [f"x{i}" for i in range(63)]
    df = pd.DataFrame(rows, columns=columns)

    os.makedirs("data/processed", exist_ok=True)
    df.to_csv(OUTPUT_FILE, index=False)
    print(f"\nDone! Saved {len(df)} rows to {OUTPUT_FILE}")

if __name__ == "__main__":
    process_dataset()