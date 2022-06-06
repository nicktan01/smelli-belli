from common.json import ModelEncoder
from .models import ProductVO, Order, UserVO

class ProductVOEncoder(ModelEncoder):
    model = ProductVO
    properties = [
        "id",
        "name",
        "sku",
        "price",
        "size",
        "quantity",
        "limited_item",
        "image",
        "created",
        "updated",
        "import_href"
    ]

class UserVOEncoder(ModelEncoder):
    model = UserVO
    properties = [
        "user"
    ]
class OrderEncoder(ModelEncoder):
    model = Order
    properties = [
        "id",
        "products",
        "quantity",
        "totals",
        "order_number",
        "customer",
        "created"
    ]
    encoders = {
        "products": ProductVOEncoder(),
        "customer": UserVOEncoder(),
    }
