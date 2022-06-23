from django.http import JsonResponse
from django.test import TestCase, Client
from django.urls import reverse
import json

from ..encoders import BodyQuizEncoder

from ..models import BodyQuiz


class TestViews(TestCase):
    def test_list_bodyquizzes_GET(self):
        client = Client()
        response = client.get(reverse("api_list_body_quizzes"))
        self.assertEquals(response.status_code, 403)
        # We actually want a 403 here because an Authorization
        # Bearer token is required to make a GET request

    def test_list_homequizzes_GET(self):
        client = Client()
        response = client.get(reverse("api_list_home_quizzes"))
        self.assertEquals(response.status_code, 403)
        # We actually want a 403 here because an Authorization
        # Bearer token is required to make a GET request
