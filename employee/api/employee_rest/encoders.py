from common.json import ModelEncoder
from .models import LineItem, ProductVO, Order


class ProductVOEncoder(ModelEncoder):
    model = ProductVO
    properties = [
        # "id",
        # "name",
        # "size",
        "sku",
        # "price",
        "quantity",
        # "import_href",
    ]


# class ProductsEncoder(ModelEncoder):
class LineItemEncoder(ModelEncoder):
    model = LineItem
    properties = [
        "product",
        "quantity",
    ]
    encoders = {
        "product": ProductVOEncoder(),
    }


class OrderEncoder(ModelEncoder):
    model = Order
    properties = [
        "user",
        "products",
    ]
    encoders = {
        "products": LineItemEncoder(),
    }

    # def get_extra_data(self, o):
    # return {
    # "products": {
    # "sku": o.order.line_item.sku,
    # "quantity": o.order.line_item.quantity,
    # }
    # }
