from common.json import ModelEncoder
from .models import Product


class ProductListEncoder(ModelEncoder):
    model = Product
    properties = [
        "id",
        "name",
        "product_type",
        "product_category",
        "sku",
        "price",
        "size",
        "image",
        "quantity",
        "scent1",
        "scent2",
    ]

    def get_extra_data(self, o):
        return {"price": float(o.price)}


class ProductDetailEncoder(ModelEncoder):
    model = Product
    properties = [
        "id",
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
        "description",
    ]

    def get_extra_data(self, o):
        return {"price": float(o.price)}
