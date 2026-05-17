import pandas as pd
from sklearn.linear_model import LinearRegression
import pickle

# Load dataset
df = pd.read_csv("crowd_data.csv")

# Features
X = df[['hour', 'day']]

# Target
y = df['crowd']

# Create model
model = LinearRegression()

# Train model
model.fit(X, y)

# Save model
pickle.dump(model, open("model.pkl", "wb"))

print("AI Model Trained Successfully!")