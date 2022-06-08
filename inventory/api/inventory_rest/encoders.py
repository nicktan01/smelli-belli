from common.json import ModelEncoder
from .models import Product, Size


class SizeEncoder(ModelEncoder):
    model = Size
    properties = [
        "id",
        "sizes"
    ]

class ProductListEncoder(ModelEncoder):
    model = Product
    properties = [
        "name",
        "product_type",
        "product_category",
        "sku",
        "price",
        "size",
        "image",
        "quantity"
    ]
    encoders = {
        "size": SizeEncoder()
    }

    def get_extra_data(self, o):
        return {
            "price": float(o.price),
            "size": o.size.sizes
        }

class ProductDetailEncoder(ModelEncoder):
    model = Product
    properties = [
        "name",
        "product_type",
        "product_category",
        "sku",
        "price",
        "size",
        "scent1",
        "scent2",
        "quantity",
        "image",
        "description"
    ]
    encoders = {
        "size": SizeEncoder()
    }

    def get_extra_data(self, o):
        return {
            "price": float(o.price),
            "size": o.size.sizes
        }
