from common.json import ModelEncoder
from .models import ProductVO, Order


class ProductVOEncoder(ModelEncoder):
    model = ProductVO
    properties = [
        "id",
        "name",
        "size",
        "sku",
        "price",
        "quantity",
        "import_href",
    ]


class OrderEncoder(ModelEncoder):
    model = Order
    properties = [
        "id",
        "products",
        "quantity",
        "totals",
        "order_number",
        "created",
    ]
    encoders = {
        "products": ProductVOEncoder(),
    }
