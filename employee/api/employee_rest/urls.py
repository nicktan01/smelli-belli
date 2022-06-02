from django.urls import path

from .views import (
    api_productVOs,
    api_productVO,
    api_orders,
    api_order,
)

urlpatterns = [
    path(
        "productVOs/",
        api_productVOs,
        name="api_productVOs",
    ),
    path(
        "productVOs/<str:sku>/",
        api_productVO,
        name="api_productVO",
    ),
    path(
        "orders/",
        api_orders,
        name="api_orders",
    ),
    path(
        "orders/<int:pk>",
        api_order,
        name="api_order",
    ),
]