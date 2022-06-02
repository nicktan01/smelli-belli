from django.urls import path

from .views import (
    api_list_products,
    api_show_product,
    api_list_scents,
    api_show_scent,
    api_list_sizes,
    api_show_size
)

urlpatterns = [
    path(
        "products/",
        api_list_products,
        name="api_products",
    ),
    path(
        "products/<str:sku>/",
        api_show_product,
        name="api_product",
    ),
    path(
        "scents/",
        api_list_scents,
        name="api_scents",
    ),
    path(
        "scents/<int:pk>",
        api_show_scent,
        name="api_scent",
    ),
    path(
        "sizes/",
        api_list_sizes,
        name="api_sizes",
    ),
    path(
        "size/<int:pk>",
        api_show_size,
        name="api_size",
    ),
]