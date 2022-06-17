import json
from logging import exception
from django.http import JsonResponse
from django.shortcuts import render
from .models import Cart, ProductVO
from django.views.generic import ListView
from urllib import response
from django.http import JsonResponse
import json
from django.views.decorators.http import require_http_methods
from .models import BodyQuiz, HomeQuiz
from .encoders import (
    CartEncoder,
    CartEncoder,
    BodyQuizEncoder,
    HomeQuizEncoder,
    UserVO
    )


@require_http_methods(["GET", "POST"])
def api_list_body_quizzes(request):
    if request.method == "GET":
        body_quizzes = BodyQuiz.objects.all()
        return JsonResponse(
            {"body scent profiles": body_quizzes},
            encoder=BodyQuizEncoder
        )
    # POST
    else:
        content = json.loads(request.body)

        # Get the user object and put it in the content dictionary
        # try:
        #     user = UserVO.objects.get(id=content["user"])
        #     content["user"] = user
        # except UserVO.DoesNotExist:
        #     return JsonResponse(
        #         {"message": "User does not exist"},
        #         status=400,
        #     )

        # Then, grab the Body Quiz object
        try:
            body_quiz = BodyQuiz.objects.create(**content)
            return JsonResponse(
                body_quiz,
                encoder=BodyQuizEncoder,
                safe=False
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the body scent profile"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_body_quiz(request, pk):
    if request.method == "GET":
        try:
            body_quiz = BodyQuiz.objects.get(id=pk)
            return JsonResponse(
                body_quiz,
                encoder=BodyQuizEncoder,
                safe=False
            )
        except BodyQuiz.DoesNotExist:
            response = JsonResponse(
                {"message": "That body scent profile does not exist!"}
            )
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            count, _ = BodyQuiz.objects.filter(id=pk).delete()
            return JsonResponse(
                {"deleted": count > 0}
            )
        except BodyQuiz.DoesNotExist:
            return JsonResponse(
                {"message": "That body scent profile does not exist!"}
            )
    # PUT
    else:
        try:
            content = json.loads(request.body)
            body_quiz = BodyQuiz.objects.get(id=pk)

            props = [
                "answer_1",
                "answer_2",
                "answer_3",
                "answer_4",
                "answer_5",
                # "user"
            ]
            for prop in props:
                if prop in content:
                    setattr(body_quiz, prop, content[prop])
            body_quiz.save()
            return JsonResponse(
                body_quiz,
                encoder=BodyQuizEncoder,
                safe=False
            )
        except BodyQuiz.DoesNotExist:
            response = JsonResponse(
                {"message": "That body scent profile does not exist!"}
            )
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_list_home_quizzes(request):
    if request.method == "GET":
        home_quizzes = HomeQuiz.objects.all()
        return JsonResponse(
            {"home scent profiles": home_quizzes},
            encoder=HomeQuizEncoder
        )
    # POST
    else:
        content = json.loads(request.body)

        # Get the user object and put it in the content dictionary
        # try:
        #     user = UserVO.objects.get(id=content["user"])
        #     content["user"] = user
        # except UserVO.DoesNotExist:
        #     return JsonResponse(
        #         {"message": "User does not exist"},
        #         status=400,
        #     )

        # Then, grab the Home Quiz object
        try:
            home_quiz = HomeQuiz.objects.create(**content)
            return JsonResponse(
                home_quiz,
                encoder=HomeQuizEncoder,
                safe=False
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the home scent profile"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_home_quiz(request, pk):
    if request.method == "GET":
        try:
            home_quiz = HomeQuiz.objects.get(id=pk)
            return JsonResponse(
                home_quiz,
                encoder=HomeQuizEncoder,
                safe=False
            )
        except HomeQuiz.DoesNotExist:
            response = JsonResponse(
                {"message": "That home scent profile does not exist!"}
            )
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            count, _ = HomeQuiz.objects.filter(id=pk).delete()
            return JsonResponse(
                {"deleted": count > 0}
            )
        except HomeQuiz.DoesNotExist:
            return JsonResponse(
                {"message": "That home scent profile does not exist!"}
            )
    # PUT
    else:
        try:
            content = json.loads(request.body)
            home_quiz = HomeQuiz.objects.get(id=pk)

            props = [
                "answer_1",
                "answer_2",
                "answer_3",
                "answer_4",
                "answer_5",
                # "user"
            ]
            for prop in props:
                if prop in content:
                    setattr(home_quiz, prop, content[prop])
            home_quiz.save()
            return JsonResponse(
                home_quiz,
                encoder=HomeQuizEncoder,
                safe=False
            )
        except HomeQuiz.DoesNotExist:
            response = JsonResponse(
                {"message": "That home scent profile does not exist!"}
            )
            response.status_code = 404
            return response

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
            print("This is the content: ",content)
            content["product"] = ProductVO.objects.get(sku=content["product"]["sku"])
            # add a fake user temp bypass until account is setup
            try:
                content["user"] = UserVO.objects.get(id=1)
            except UserVO.DoesNotExist:
                content["user"] = UserVO.objects.create(import_href = "a", user="Nick")
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
            return(response)