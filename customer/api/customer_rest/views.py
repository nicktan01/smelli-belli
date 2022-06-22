import djwto.authentication as auth
from django.http import JsonResponse
import json
from django.views.decorators.http import require_http_methods
from .models import BodyQuiz, HomeQuiz, Cart, ProductVO, WishList
from .encoders import (
    CartEncoder,
    CartEncoder,
    BodyQuizEncoder,
    HomeQuizEncoder,
)


@auth.jwt_login_required
@require_http_methods(["GET", "POST"])
def api_list_body_quizzes(request):
    if request.method == "GET":
        # This grabs all of the user information out of the authorization token
        payload_dict = json.dumps(request.payload)
        user_information = json.loads(payload_dict)
        # Stores the id of the user grabbed from the token, and saves to a variable
        user_id = user_information["user"]["id"]
        # Grabs only the Body Quiz objects that match the saved User ID in the
        # table to the User ID in the active authorization token
        body_quizzes = BodyQuiz.objects.filter(user=user_id)
        return JsonResponse(
            {"body_scent_profiles": body_quizzes}, encoder=BodyQuizEncoder
        )
    elif request.method == "POST":
        # This grabs all of the user information out of the authorization token
        payload_dict = json.dumps(request.payload)
        user_information = json.loads(payload_dict)
        # Stores the id of the user grabbed from the token, and saves to a variable
        user_id = user_information["user"]["id"]
        content = json.loads(request.body)
        # Updates the content dictionary with the user id stored in user_id
        content["user"] = user_id

        # Then, grab the Body Quiz object
        try:
            body_quiz = BodyQuiz.objects.create(**content)
            return JsonResponse(body_quiz, encoder=BodyQuizEncoder, safe=False)
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
            return JsonResponse(body_quiz, encoder=BodyQuizEncoder, safe=False)
        except BodyQuiz.DoesNotExist:
            response = JsonResponse(
                {"message": "That body scent profile does not exist!"}
            )
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            count, _ = BodyQuiz.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
        except BodyQuiz.DoesNotExist:
            return JsonResponse(
                {"message": "That body scent profile does not exist!"}
            )


@auth.jwt_login_required
@require_http_methods(["GET", "POST"])
def api_list_home_quizzes(request):
    if request.method == "GET":
        # This grabs all of the user information out of the authorization token
        payload_dict = json.dumps(request.payload)
        user_information = json.loads(payload_dict)
        # Stores the id of the user grabbed from the token, and saves to a variable
        user_id = user_information["user"]["id"]
        # Grabs only the Body Quiz objects that match the saved User ID in the
        # table to the User ID in the active authorization token
        home_quizzes = HomeQuiz.objects.filter(user=user_id)
        return JsonResponse(
            {"home_scent_profiles": home_quizzes}, encoder=HomeQuizEncoder
        )
    elif request.method == "POST":
        # This grabs all of the user information out of the authorization token
        payload_dict = json.dumps(request.payload)
        user_information = json.loads(payload_dict)
        # Stores the id of the user grabbed from the token, and saves to a variable
        user_id = user_information["user"]["id"]
        content = json.loads(request.body)
        # Updates the content dictionary with the user id stored in user_id
        content["user"] = user_id

        # Then, grab the Home Quiz object
        try:
            home_quiz = HomeQuiz.objects.create(**content)
            return JsonResponse(home_quiz, encoder=HomeQuizEncoder, safe=False)
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
            return JsonResponse(home_quiz, encoder=HomeQuizEncoder, safe=False)
        except HomeQuiz.DoesNotExist:
            response = JsonResponse(
                {"message": "That home scent profile does not exist!"}
            )
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            count, _ = HomeQuiz.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
        except HomeQuiz.DoesNotExist:
            return JsonResponse(
                {"message": "That home scent profile does not exist!"}
            )


# Wishlist functionality
@auth.jwt_login_required
@require_http_methods(["GET", "POST", "PUT", "DELETE"])
def api_wishlist(request):
    payload_dict = json.dumps(request.payload)
    user_information = json.loads(payload_dict)
    user_id = user_information["user"]["id"]

    if request.method == "POST":
        # same method for retrieving user info as used above
        content = json.loads(request.body)
        product = ProductVO.objects.get(sku=content["sku"])

        try:
            if not WishList.objects.filter(product=product, user=user_id):
                wishlist = WishList.objects.create(
                    product=product, user=user_id
                )
            return JsonResponse({"message": "Done"})
        except Exception as e:
            response = JsonResponse({"message": "Could not create wishlist"})
            print("exception:", e)
            response.status_code = 400
            return response
    elif request.method == "GET":
        try:
            wishlist = list(
                map(
                    (lambda item: item.product.sku),
                    WishList.objects.filter(user=user_id),
                )
            )
            return JsonResponse(wishlist, safe=False)
        except WishList.DoesNotExist:
            response = JsonResponse({"message": "No wishlist items"})
            response.status_code = 404
            return response
    # def add_wishlist(request):
    #     pass
    # get current user id
    # receive sku from request
    # add an entry to table
    elif request.method == "DELETE":
        content = json.loads(request.body)
        product = ProductVO.objects.get(sku=content["sku"])
        WishList.objects.filter(user=user_id, product=product).delete()
        return JsonResponse({"message": "Done"})


# def delete_wishlist(request):
#     pass
# get current user id
# receive sku from request
# remove entry from table


# @auth.jwt_login_required
@require_http_methods(["GET", "POST"])
def api_cart(request):
    if request.method == "GET":
        cart = Cart.objects.all()
        return JsonResponse(cart, encoder=CartEncoder, safe=False)
    elif request.method == "POST":
        # payload_dict = json.dumps(request.payload)
        # user_information = json.loads(payload_dict)
        user_id = 1
        content = json.loads(request.body)
        # Updates the content dictionary with the user id stored in user_id
        content["user"] = user_id
        try:
            content = json.loads(request.body)
            print("This is the content: ", content)
            content["product"] = ProductVO.objects.get(
                sku=content["product"]["sku"]
            )
            # add a fake user temp bypass until account is setup
            # try:
            #     content["user"] = UserVO.objects.get(id=1)
            # except UserVO.DoesNotExist:
            #     content["user"] = UserVO.objects.create(import_href = "a", user="Nick")
            cart = Cart.objects.create(**content)
            return JsonResponse(
                cart,
                encoder=CartEncoder,
                safe=False,
            )
        except Exception as e:
            print(e)
            response = JsonResponse({"message": "Could not add cart"})
            response.status_code = 400
            return response
