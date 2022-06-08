from common.json import ModelEncoder
from .models import (
    ProductVO, 
    UserVO, 
    BodyQuiz, 
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

class BodyQuizEncoder(ModelEncoder):
    model = BodyQuiz
    properties = ["answer_1", "answer_2", "answer_3", "answer_4", "answer_5", ]