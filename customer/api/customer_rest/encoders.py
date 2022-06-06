from common.json import ModelEncoder
from .models import (
    ProductVO, 
    ScentVO, 
    UserVO, 
    Quiz, 
    Question, 
    Answer,
    Result
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

class UserVOEncoder(ModelEncoder):
    model = UserVO
    properties = ["id", "user"]

class ScentVOEncoder(ModelEncoder):
    model = ScentVO
    properties = ["import_href", "name"]

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