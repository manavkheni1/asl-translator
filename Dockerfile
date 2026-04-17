FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code and model files
COPY backend/ ./backend/
COPY data/processed/asl_model.pth ./data/processed/asl_model.pth
COPY data/processed/label_classes.npy ./data/processed/label_classes.npy
COPY hand_landmarker.task ./hand_landmarker.task

# Expose port
EXPOSE 8000

# Run FastAPI
CMD ["uvicorn", "backend.api.main:app", "--host", "0.0.0.0", "--port", "8000"]