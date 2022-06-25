import djwto.authentication as auth
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .encoders import (
    ProductVOEncoder,
    OrderEncoder,
)
from .models import LineItem, ProductVO, Order

@auth.jwt_login_required
@require_http_methods(["GET", "POST"])
def api_orders(request):
    if request.method == "GET":
        orders = Order.objects.all()
        return JsonResponse(
            {"orders": orders},
            encoder=OrderEncoder,
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        # try:
        if True:
            productVOs = []
            products = content.get("products")
            for p in products:
                product_id = p.get("sku")
                product = ProductVO.objects.get(sku=product_id)
                quantity = p.get("quantity")
                li = {
                    "product": product,
                    "quantity": quantity
                }
                lineItem = LineItem.objects.create(**li)
                productVOs.append(lineItem)
            payload_dict = json.dumps(request.payload)
            user_information = json.loads(payload_dict)
            user_id = user_information["user"]["id"]
            content = json.loads(request.body)
            content["user"] = user_id
            del content["products"] 
            order = Order.objects.create(**content)
            for pvo in productVOs:
                order.products.add(pvo)
            order.save()
            return JsonResponse(order, encoder=OrderEncoder, safe=False)
        # except:
            response = JsonResponse({"message": "Could not create the order"})
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_order(request, pk):
    if request.method == "GET":
        try:
            products = Order.objects.get(id=pk)
            return JsonResponse(
                {"products": products},
                encoder=OrderEncoder,
            )
        except Order.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response

    elif request.method == "DELETE":
        try:
            order = Order.objects.get(id=pk)
            order.delete()
            return JsonResponse(
                order,
                encoder=OrderEncoder,
                safe=False,
            )
        except Order.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    elif request.method == "PUT":
        try:
            content = json.loads(request.body)
            order = Order.objects.get(id=pk)

            props = ["orders"]
            for prop in props:
                if prop in content:
                    setattr(order, prop, content[prop])
            order.save()
            return JsonResponse(
                order,
                encoder=OrderEncoder,
                safe=False,
            )
        except Order.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET"])
def api_productvos(request):
    if request.method == "GET":
        productvos = ProductVO.objects.all()
        return JsonResponse(
            {"productvos": productvos},
            encoder=ProductVOEncoder,
        )
