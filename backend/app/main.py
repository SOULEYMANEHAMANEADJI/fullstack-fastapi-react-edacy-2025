from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import models
from .database import engine
from .routers import auth, products

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Gestion des Produits API",
    description="API pour la gestion des produits avec CRUD, authentification, pagination et recherche.",
    version="1.0.0",
    terms_of_service="https://www.linkedin.com/in/souleymane-h-69b518197/",
    contact={
        "name": "Support API",
        "url": "https://www.linkedin.com/in/souleymane-h-69b518197/",
        "email": "shamaneadji@gmail.com",
    },
    license_info={
        "name": "Apache 2.0",
        "url": "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
)

origins = [
    "http://localhost:3000",  # Frontend React
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Point d'entrée de test pour vérifier si l'API fonctionne
@app.get("/test", tags=["Test"])
def test():
    return {"message": "API is working properly!"}

app.include_router(auth.router)
app.include_router(products.router)