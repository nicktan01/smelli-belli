from django.urls import path

from .views import (
    api_orders,
    api_order,
)

urlpatterns = [
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
