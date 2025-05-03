import os

SECRET_KEY = os.environ.get("SECRET_KEY", "YOUR_SECRET_KEY")  # Utiliser une variable d'environnement en production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30