from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool

    class Config:
       from_attributes = True

class ProductBase(BaseModel):
    name: str = Field(..., min_length=3, max_length=100)
    price: float = Field(..., gt=10)
    quantity: int = Field(..., ge=1)
    description: Optional[str] = Field(None, max_length=500)
    status: str = Field(default="draft", pattern="^(draft|published|archived)$")

class ProductCreate(ProductBase):
    pass

class ProductUpdate(ProductBase):
    pass

class Product(ProductBase):
    id: int
    owner_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
       from_attributes = True

class ProductPagination(BaseModel):
    total: int
    items: list[Product]