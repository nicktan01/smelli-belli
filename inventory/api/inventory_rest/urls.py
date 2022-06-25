from django.urls import path

from .views import (
    api_list_products,
    api_show_product,
)

urlpatterns = [
    path(
        "products/",
        api_list_products,
        name="api_list_products",
    ),
    path(
        "products/<str:sku>/",
        api_show_product,
        name="api_show_product",
    ),
]
