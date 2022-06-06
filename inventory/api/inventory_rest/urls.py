from django.urls import path

from .views import (
    api_list_products,
    api_show_product,
    api_list_sizes,
    api_show_size
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
    path(
        "sizes/",
        api_list_sizes,
        name="api_list_sizes",
    ),
    path(
        "sizes/<int:pk>/",
        api_show_size,
        name="api_show_size",
    ),
]