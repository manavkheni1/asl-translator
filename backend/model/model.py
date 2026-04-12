import torch
import torch.nn as nn

class ASLClassifier(nn.Module):
    """
    LSTM-based classifier for ASL hand gesture recognition.
    
    Input: sequence of 63 landmark features (21 hand points × x, y, z)
    Output: probability distribution over 29 classes (A-Z + del, nothing, space)
    
    Architecture:
        - LSTM layers to capture temporal patterns across frames
        - Dropout for regularization to prevent overfitting
        - Fully connected layer to map LSTM output to class scores
    """

    def __init__(self, input_size=63, hidden_size=128, num_layers=2, 
                 num_classes=29, dropout=0.3):
        super(ASLClassifier, self).__init__()

        self.hidden_size = hidden_size
        self.num_layers = num_layers

        # LSTM layers — learn patterns across the sequence of landmarks
        self.lstm = nn.LSTM(
            input_size=input_size,
            hidden_size=hidden_size,
            num_layers=num_layers,
            batch_first=True,        # input shape: (batch, sequence, features)
            dropout=dropout
        )

        # Dropout layer to reduce overfitting during training
        self.dropout = nn.Dropout(dropout)

        # Final classification layer — maps LSTM output to class scores
        self.fc = nn.Linear(hidden_size, num_classes)

    def forward(self, x):
        """
        Forward pass through the network.
        x shape: (batch_size, sequence_length, input_size)
        """
        # Initialize hidden and cell states with zeros
        h0 = torch.zeros(self.num_layers, x.size(0), 
                         self.hidden_size).to(x.device)
        c0 = torch.zeros(self.num_layers, x.size(0), 
                         self.hidden_size).to(x.device)

        # Pass through LSTM — out shape: (batch, sequence, hidden_size)
        out, _ = self.lstm(x, (h0, c0))

        # Take only the last timestep's output for classification
        out = self.dropout(out[:, -1, :])

        # Map to class scores
        out = self.fc(out)
        return out