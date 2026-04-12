# ASL Translator — Project Foundation Document

## 1. Problem Statement

American Sign Language (ASL) is the primary language for millions of deaf and hard-of-hearing people in North America. However, most people do not understand ASL, creating a significant communication barrier in everyday life.

Existing solutions are either:
- Static image classifiers (not real-time)
- Expensive proprietary hardware
- Generic demos with poor accuracy on live video

This project builds a real-time ASL hand gesture translator that runs entirely from a webcam, with no external AI APIs. The model is trained from scratch, served via a custom backend, and presented through a clean web interface.

---

## 2. Goal

Build a full-stack ML application that:
- Detects and tracks hand landmarks in real time using MediaPipe
- Classifies ASL letters (A-Z) using a custom-trained CNN + LSTM model built in PyTorch
- Overlays the predicted letter on the live webcam feed
- Is deployed to the cloud and accessible via a web browser

---

## 3. Tech Stack

| Layer | Technology | Why |
|---|---|---|
| ML Model | PyTorch | Industry standard, great Apple Silicon support |
| Hand Tracking | MediaPipe | Extracts 21 hand landmarks per frame, fast and accurate |
| Backend | FastAPI + Uvicorn | Python-native, fast, auto-generates API docs |
| Frontend | React + Tailwind CSS | Modern, component-based, great webcam libraries |
| Database | None (Phase 1) | Not needed yet — stateless inference |
| Containerization | Docker | Reproducible builds, required for cloud deploy |
| CI/CD | GitHub Actions | Auto-deploy on every push to main |
| Cloud | AWS (SageMaker + EC2) | Industry standard, most requested on job descriptions |
| Version Control | Git + GitHub | All code, docs, and history tracked here |

---

## 4. Architecture Overview
Webcam (browser)
↓
React Frontend (Next.js)
↓  [sends frame as base64 image via HTTP]
FastAPI Backend
↓  [extracts landmarks via MediaPipe]
MediaPipe Hand Tracker
↓  [21 keypoints per hand]
PyTorch LSTM Classifier
↓  [returns predicted letter + confidence]
FastAPI Backend
↓  [sends JSON response]
React Frontend
↓  [overlays prediction on video feed]
User sees result in real time

---

## 5. Model Architecture Plan

**Input:** 21 hand landmarks (x, y, z coordinates) = 63 features per frame

**Pipeline:**
1. Raw webcam frame → MediaPipe → 21 landmarks (x, y, z)
2. Normalize landmarks relative to wrist position
3. Feed sequence of frames → LSTM
4. LSTM output → Fully connected layer → Softmax → 26 classes (A-Z)

**Model type:** LSTM (Long Short-Term Memory)
- Good at sequential data (gesture over time, not just one frame)
- Lightweight enough to run in real time on M4 MacBook

---

## 6. Dataset

**Primary dataset:** ASL Alphabet Dataset (Kaggle)
- 87,000 images across 26 letters
- Link: https://www.kaggle.com/datasets/grassknoted/asl-alphabet

**Preprocessing plan:**
1. Download raw images into `data/raw/`
2. Run MediaPipe on each image to extract 21 hand landmarks
3. Save extracted landmarks as CSV into `data/processed/`
4. Use processed CSV for model training (not raw images)

---

## 7. Project Folder Structure
asl-translator/
├── backend/
│   ├── model/
│   │   ├── train.py          # training script
│   │   ├── model.py          # LSTM model architecture
│   │   └── preprocess.py     # landmark extraction from dataset
│   └── api/
│       └── main.py           # FastAPI server
├── frontend/                 # React app (Phase 3)
├── data/
│   ├── raw/                  # downloaded dataset images
│   └── processed/            # extracted landmark CSVs
├── docs/
│   ├── project-foundation.md # this document
│   ├── model.md              # ML model documentation (Phase 2)
│   ├── api.md                # API documentation (Phase 2)
│   ├── frontend.md           # Frontend documentation (Phase 3)
│   └── deployment.md         # Deployment documentation (Phase 4)
└── README.md

---

## 8. Development Phases

| Phase | Focus | Deliverables |
|---|---|---|
| Phase 1 | Foundation | Project setup, folder structure, this document |
| Phase 2 | ML + Backend | Dataset preprocessing, model training, FastAPI server |
| Phase 3 | Frontend | React webcam UI, real-time overlay, dashboard |
| Phase 4 | Deployment | Docker, GitHub Actions CI/CD, AWS deployment |

---

## 9. Success Criteria

- Model achieves >90% accuracy on the test set
- Real-time inference runs at >15 FPS in the browser
- App is publicly accessible via a cloud URL
- All code is documented and pushed to GitHub

---

*Document version: 1.0*  
*Created: April 2026*  
*Author: Manav Kheni*