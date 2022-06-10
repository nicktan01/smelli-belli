from django.urls import path

from .views import(
    api_cart,
)

urlpatterns = [
    path(
        "cart/",
        api_cart,
        name="api_cart",
    )
]