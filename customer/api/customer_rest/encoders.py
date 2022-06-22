from common.json import ModelEncoder
from .models import (
    HomeQuiz,
    ProductVO, 
    BodyQuiz, 
    Cart,
    ProductVO,
    BodyQuiz,
    HomeQuiz 
)

class ProductVOEncoder(ModelEncoder):
    model = ProductVO
    properties = [
        "id",
        "import_href",
        "name",
        "sku",
        "price",
        "image"
    ]

class BodyQuizEncoder(ModelEncoder):
    model = BodyQuiz
    properties = [
        "id",
        "answer_1", 
        "answer_2", 
        "answer_3", 
        "answer_4", 
        "answer_5",
        "created",
        "user" 
    ]

class HomeQuizEncoder(ModelEncoder):
    model = HomeQuiz
    properties = [
        "id",
        "answer_1", 
        "answer_2", 
        "answer_3", 
        "answer_4", 
        "answer_5",
        "created",
        "user" 
    ]

class CartEncoder(ModelEncoder):
    model = Cart
    properties = [
        "product",
        "user",
        "quantity",
        "totals"
    ] 
    encoders = {
        "product": ProductVOEncoder(),
        }