# ASL Translator 🤟

Real-time American Sign Language (ASL) hand gesture translator using a custom-trained CNN + LSTM model, MediaPipe, FastAPI, and React. Built from scratch — no external AI APIs.

---

## 🚧 Project Status

| Phase | Status | Description |
|---|---|---|
| Phase 1 — Foundation | ✅ Done | Project setup, environment, folder structure, documentation |
| Phase 2 — ML + Backend | 🔄 In Progress | Dataset, model training, FastAPI server |
| Phase 3 — Frontend | ⏳ Pending | React webcam UI, real-time overlay |
| Phase 4 — Deployment | ⏳ Pending | Docker, CI/CD, AWS cloud deployment |

---

## 🧠 Tech Stack

| Layer | Technology |
|---|---|
| ML Model | PyTorch |
| Hand Tracking | MediaPipe |
| Backend | FastAPI + Uvicorn |
| Frontend | React + Tailwind CSS |
| Containerization | Docker |
| CI/CD | GitHub Actions |
| Cloud | AWS |

---

## 📁 Project Structure
asl-translator/
├── backend/
│   ├── model/
│   │   ├── train.py          # training script
│   │   ├── model.py          # LSTM model architecture
│   │   └── preprocess.py     # landmark extraction
│   └── api/
│       └── main.py           # FastAPI server
├── frontend/                 # React app (Phase 3)
├── data/
│   ├── raw/                  # downloaded dataset images
│   └── processed/            # extracted landmark CSVs
├── docs/
│   ├── project-foundation.md
│   ├── model.md
│   ├── api.md
│   ├── frontend.md
│   └── deployment.md
└── README.md

---

## 📄 Documentation

- [Project Foundation](docs/project-foundation.md)
- Model Doc — coming in Phase 2
- API Doc — coming in Phase 2
- Frontend Doc — coming in Phase 3
- Deployment Doc — coming in Phase 4

---

## 🛠️ Local Setup
```bash
# Clone the repo
git clone https://github.com/manavkheni1/asl-translator.git
cd asl-translator

# Create and activate conda environment
conda create -n asl-translator python=3.10
conda activate asl-translator

# Install dependencies
pip install torch torchvision torchaudio mediapipe opencv-python fastapi uvicorn numpy pandas scikit-learn matplotlib
```

---

*Built by Manav Kheni — April 2026*