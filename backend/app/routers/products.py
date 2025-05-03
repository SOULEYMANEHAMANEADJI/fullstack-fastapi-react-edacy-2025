from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import Optional
from datetime import datetime

from .. import database, models, schemas
from ..oauth2 import get_current_user

router = APIRouter(
    prefix="/products",
    tags=["Products"],
    dependencies=[Depends(get_current_user)],
)

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.Product)
def create_product(
    product: schemas.ProductCreate, 
    db: Session = Depends(database.get_db), 
    current_user: schemas.User = Depends(get_current_user)
):
    """Créer un produit (seulement pour l'utilisateur connecté)"""
    db_product = models.Product(**product.dict(), owner_id=current_user.id)
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@router.get("/{product_id}", response_model=schemas.Product)
def get_product(
    product_id: int, 
    db: Session = Depends(database.get_db),
    current_user: schemas.User = Depends(get_current_user)
):
    """Récupérer un produit spécifique (seulement si l'utilisateur est propriétaire)"""
    product = db.query(models.Product).filter(
        models.Product.id == product_id,
        models.Product.owner_id == current_user.id
    ).first()
    
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Produit non trouvé ou accès refusé"
        )
    return product

@router.put("/{product_id}", response_model=schemas.Product)
def update_product(
    product_id: int, 
    product: schemas.ProductUpdate, 
    db: Session = Depends(database.get_db), 
    current_user: schemas.User = Depends(get_current_user)
):
    """Mettre à jour un produit (seulement pour le propriétaire)"""
    db_product = db.query(models.Product).filter(
        models.Product.id == product_id,
        models.Product.owner_id == current_user.id
    ).first()

    if not db_product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Produit non trouvé ou accès refusé"
        )
    
    # Mise à jour dynamique des champs
    update_data = product.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_product, key, value)
    
    db_product.updated_at = datetime.utcnow()

    try:
        db.commit()
        db.refresh(db_product)
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erreur lors de la mise à jour du produit"
        )

    return db_product

@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(
    product_id: int, 
    db: Session = Depends(database.get_db), 
    current_user: schemas.User = Depends(get_current_user)
):
    """Supprimer un produit (seulement pour le propriétaire)"""
    db_product = db.query(models.Product).filter(
        models.Product.id == product_id,
        models.Product.owner_id == current_user.id
    ).first()
    
    if not db_product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Produit non trouvé ou accès refusé"
        )
    
    db.delete(db_product)
    db.commit()
    return None

@router.get("/", response_model=schemas.ProductPagination)
def get_products(
    db: Session = Depends(database.get_db),
    current_user: schemas.User = Depends(get_current_user),
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=10, le=100),
    search: Optional[str] = Query(None),
):
    """Lister tous les produits de l'utilisateur connecté"""
    query = db.query(models.Product).filter(
        models.Product.owner_id == current_user.id
    )
    
    if search:
        query = query.filter(models.Product.name.ilike(f"%{search}%"))
    
    total = query.count()
    products = query.offset(skip).limit(limit).all()
    
    return {"total": total, "items": products}