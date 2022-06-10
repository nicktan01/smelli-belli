from common.json import ModelEncoder
from .models import (
    ProductVO, 
    UserVO, 
    Quiz, 
    Question, 
    Answer,
    Result,
    Cart
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

class CartEncoder(ModelEncoder):
    model = Cart
    properties = [
        "products",
        "user",
        "quantity",
        "totals"
    ] 
    encoders = {
        "products": ProductVOEncoder(),
        "user": UserVOEncoder()
        }

class UserVOEncoder(ModelEncoder):
    model = UserVO
    properties = ["id", "user"]

# class ScentVOEncoder(ModelEncoder):
#     model = ScentVO
#     properties = ["import_href", "name"]

class QuizEncoder(ModelEncoder):
    model = Quiz
    properties = ["topic"]

class QuestionEncoder(ModelEncoder):
    model = Question
    properties = ["id", "text", "quiz"]

class AnswerEncoder(ModelEncoder):
    model = Answer
    properties = ["id", "text", "question"]

class ResultEncoder(ModelEncoder):
    model = Result
    properties = ["id", "quiz", "user", "recommendation", "created"]