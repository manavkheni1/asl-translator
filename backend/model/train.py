import torch
import torch.nn as nn
import pandas as pd
import numpy as np
from torch.utils.data import Dataset, DataLoader
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import matplotlib.pyplot as plt
import os
from model import ASLClassifier

# ── Configuration ──────────────────────────────────────────────────────────────
DATA_PATH = "data/processed/landmarks.csv"
MODEL_SAVE_PATH = "data/processed/asl_model.pth"
BATCH_SIZE = 64
EPOCHS = 30
LEARNING_RATE = 0.001
SEQUENCE_LENGTH = 1   # each row is one frame (single image, not video)

# Use Apple Silicon GPU (MPS) if available, otherwise CPU
device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")
print(f"Training on: {device}")


# ── Dataset ────────────────────────────────────────────────────────────────────
class ASLDataset(Dataset):
    """
    PyTorch Dataset wrapper for the preprocessed landmark CSV.
    Converts each row into a tensor of shape (sequence_length, 63)
    so it works with the LSTM input format.
    """
    def __init__(self, X, y):
        # Reshape to (samples, sequence_length, features) for LSTM
        self.X = torch.tensor(X, dtype=torch.float32).unsqueeze(1)
        self.y = torch.tensor(y, dtype=torch.long)

    def __len__(self):
        return len(self.X)

    def __getitem__(self, idx):
        return self.X[idx], self.y[idx]


# ── Load and prepare data ──────────────────────────────────────────────────────
def load_data():
    """
    Loads landmark CSV, encodes string labels to integers,
    and splits into train/test sets (80/20 split).
    """
    print("Loading dataset...")
    df = pd.read_csv(DATA_PATH)

    # Encode string labels (A, B, C...) to integers (0, 1, 2...)
    le = LabelEncoder()
    df["label"] = le.fit_transform(df["label"])

    X = df.drop("label", axis=1).values.astype(np.float32)
    y = df["label"].values

    # Save label classes so we can decode predictions later
    np.save("data/processed/label_classes.npy", le.classes_)
    print(f"Classes: {le.classes_}")

    X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
    )

    print(f"Train size: {len(X_train)} | Test size: {len(X_test)}")
    return X_train, X_test, y_train, y_test, le


# ── Training loop ──────────────────────────────────────────────────────────────
def train():
    X_train, X_test, y_train, y_test, le = load_data()

    train_loader = DataLoader(
        ASLDataset(X_train, y_train), 
        batch_size=BATCH_SIZE, 
        shuffle=True
    )
    test_loader = DataLoader(
        ASLDataset(X_test, y_test), 
        batch_size=BATCH_SIZE
    )

    # Initialize model, loss function, and optimizer
    model = ASLClassifier(
        input_size=63,
        hidden_size=128,
        num_layers=2,
        num_classes=len(le.classes_),
        dropout=0.3
    ).to(device)

    criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=LEARNING_RATE)

    # Reduce learning rate if validation loss stops improving
    scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(
        optimizer, patience=3, factor=0.5
    )

    train_losses, test_accuracies = [], []

    print(f"\nStarting training for {EPOCHS} epochs...\n")

    for epoch in range(EPOCHS):
        model.train()
        total_loss = 0

        for X_batch, y_batch in train_loader:
            X_batch, y_batch = X_batch.to(device), y_batch.to(device)

            optimizer.zero_grad()
            outputs = model(X_batch)
            loss = criterion(outputs, y_batch)
            loss.backward()
            optimizer.step()
            total_loss += loss.item()

        # ── Evaluate on test set after each epoch ──────────────────────────
        model.eval()
        correct, total = 0, 0
        with torch.no_grad():
            for X_batch, y_batch in test_loader:
                X_batch, y_batch = X_batch.to(device), y_batch.to(device)
                outputs = model(X_batch)
                _, predicted = torch.max(outputs, 1)
                correct += (predicted == y_batch).sum().item()
                total += y_batch.size(0)

        avg_loss = total_loss / len(train_loader)
        accuracy = 100 * correct / total
        train_losses.append(avg_loss)
        test_accuracies.append(accuracy)
        scheduler.step(avg_loss)

        print(f"Epoch {epoch+1:02d}/{EPOCHS} | "
              f"Loss: {avg_loss:.4f} | "
              f"Test Accuracy: {accuracy:.2f}%")

    # ── Save the trained model ─────────────────────────────────────────────
    torch.save(model.state_dict(), MODEL_SAVE_PATH)
    print(f"\nModel saved to {MODEL_SAVE_PATH}")

    # ── Plot training curves and save to docs/ ─────────────────────────────
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))

    ax1.plot(train_losses)
    ax1.set_title("Training Loss")
    ax1.set_xlabel("Epoch")
    ax1.set_ylabel("Loss")

    ax2.plot(test_accuracies, color="green")
    ax2.set_title("Test Accuracy")
    ax2.set_xlabel("Epoch")
    ax2.set_ylabel("Accuracy (%)")

    plt.tight_layout()
    plt.savefig("docs/training_curves.png")
    print("Training curves saved to docs/training_curves.png")


if __name__ == "__main__":
    train()