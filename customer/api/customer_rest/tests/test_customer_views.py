from django.test import TestCase, Client
from django.urls import reverse


class TestViews(TestCase):
    def test_list_bodyquizzes_403_without_token(self):
        client = Client()
        response = client.get(reverse("api_list_body_quizzes"))
        self.assertEquals(response.status_code, 403)

    def test_list_homequizzes_403_without_token(self):
        client = Client()
        response = client.get(reverse("api_list_home_quizzes"))
        self.assertEquals(response.status_code, 403)

    def test_list_cart_403_without_token(self):
        client = Client()
        response = client.get(reverse("api_cart"))
        self.assertEquals(response.status_code, 403)
