import json
from logging import exception
from django.http import JsonResponse
from django.shortcuts import render
from .models import Quiz, Answer, Question, Result, Cart
from django.views.generic import ListView
from django.views.decorators.http import require_http_methods
from .encoders import (
    CartEncoder,
    QuizEncoder,
    QuestionEncoder,
    AnswerEncoder,
    ResultEncoder,
    CartEncoder
    )

# Create your views here.
# GET quiz question answer result
# POST answers

@require_http_methods(["GET"])
def api_quiz(request):
    if request.method == "GET":
        quizzes = Quiz.objects.all()
        return JsonResponse(
            {"quizzes": quizzes},
            encoder=QuizEncoder
        )


@require_http_methods(["GET"])
def api_question(request):
    if request.method == "GET":
        questions = Question.objects.all()
        return JsonResponse(
            {"questions": questions},
            encoder=QuestionEncoder
        )


@require_http_methods(["GET", "POST"])
def api_answers(request):
    if request.method == "GET":
        answers = Answer.objects.all()
        return JsonResponse(
            {"answers": answers},
            encoder = AnswerEncoder
        )
    else: # POST
        try:
            content = json.loads(request.body)
            answer = Answer.objects.create(**content)
            return JsonResponse(
                answer,
                encoder=AnswerEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not add answer"}
            )
            response.status_code = 400
            return response
    
@require_http_methods(["GET"])
def api_result(request):
    if request.method == "GET":
        results = Result.objects.all()
        return JsonResponse(
            {"results": results},
            encoder=ResultEncoder
        )

@require_http_methods(["GET", "POST"])
def api_cart(request):
    if request.method == "GET":
        cart = Cart.objects.all()
        return JsonResponse(
            {"cart": cart},
            encoder=CartEncoder
        )
    else: #POST
        try:
            content = json.loads(request.body)
            cart = Cart.objects.create(**content)
            return JsonResponse(
                cart,
                encoder=CartEncoder,
                safe=False,
            )
        except Exception as e:
            print(e)
            response = JsonResponse(
                {"message": "Could not add cart"}
            )
            response.status_code = 400
            return response