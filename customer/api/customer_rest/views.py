import djwto.authentication as auth
from django.http import JsonResponse
import json
from django.views.decorators.http import require_http_methods
from .models import BodyQuiz, HomeQuiz
from .encoders import (
    BodyQuizEncoder,
    HomeQuizEncoder,
    )

@auth.jwt_login_required
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
        # This grabs all of the user information out of the authorization token
        user_information = json.loads(request.payload)
        # Stores the id of the user grabbed from the token, and saves to a variable
        user_id = user_information["user"]["id"]
        content = json.loads(request.body)
        # Updates the content dictionary with the user id stored in user_id
        content["user"] = user_id

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


@auth.jwt_login_required
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
        # This grabs all of the user information out of the authorization token
        user_information = json.loads(request.payload)
        # Stores the id of the user grabbed from the token, and saves to a variable
        user_id = user_information["user"]["id"]
        content = json.loads(request.body)
        # Updates the content dictionary with the user id stored in user_id
        content["user"] = user_id

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

# Wishlist functionality - Jordan
def get_wishlist(request):
    pass
    # query wishlist table for all products matching current user id
    # return all products in an array

def add_wishlist(request):
    pass
    # get current user id
    # receive sku from request
    # add an entry to table

def delete_wishlist(request):
    pass
    # get current user id
    # receive sku from request
    # remove entry from table

    # urls to map to wishlist views
    # get to user/wishlist
    # put to user/wishlist
    # delete to user/wishlist