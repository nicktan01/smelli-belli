from django.http import JsonResponse
from .models import BodyQuiz, HomeQuiz
from django.views.decorators.http import require_http_methods
from .encoders import (
    BodyQuizEncoder,
    HomeQuizEncoder,
    )

# Create your views here.
# GET quiz question answer result
# POST answers

@require_http_methods(["GET"])
def api_body_quiz(request):
    if request.method == "GET":
        body_quizzes = BodyQuiz.objects.all()
        return JsonResponse(
            {"body quizzes": body_quizzes},
            encoder=BodyQuizEncoder
        )