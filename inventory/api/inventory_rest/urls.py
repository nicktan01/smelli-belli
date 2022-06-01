from django.urls import path

from .views import (
    api_products,
    api_product,
    api_scents,
    api_scent,
    api_sizes,
    api_size
)

urlpatterns = [
    path(
        "products/",
        api_products,
        name="api_products",
    ),
    path(
        "products/<str:sku>/",
        api_product,
        name="api_product",
    ),
    path(
        "scents/",
        api_scents,
        name="api_scents",
    ),
    path(
        "scents/<int:pk>",
        api_scent,
        name="api_scent",
    ),
    path(
        "sizes/",
        api_sizes,
        name="api_sizes",
    ),
    path(
        "size/<int:pk>",
        api_size,
        name="api_size",
    ),
]