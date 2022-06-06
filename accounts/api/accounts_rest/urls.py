from django.urls import path
from .views import api_current_user, api_list_accounts, api_account_detail, api_user_token

urlpatterns = [
    path("accounts/", api_list_accounts, name="api_list_accounts"),
    path("accounts/me/", api_current_user, name="api_current_user"),
    path(
        "accounts/<str:email>/",
        api_account_detail,
        name="api_account_detail"
    ),
    path("accounts/me/token/", api_user_token, name="api_user_token"),
]
