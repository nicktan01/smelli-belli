from django.test import TestCase, Client
from django.urls import reverse
from ..models import User


class TestViews(TestCase):
    def setUp(self):
        User.objects.create(
            username="Test User",
            email="test@test.com",
            first_name="Tess",
            last_name="Ting",
            password="PASSWORD",
        )

    def test_list_accounts_GET(self):
        client = Client()
        response = client.get(reverse("api_list_accounts"))
        self.assertEquals(response.status_code, 200)
