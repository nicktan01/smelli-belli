from django.shortcuts import render

from urllib import response
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .encoders import (
    ProductVOEncoder,
    OrderEncoder,
)
from .models import ProductVO, Order


@require_http_methods(["GET", "POST"])
def api_productVOs(request):
    if request.method == "GET":
        products = ProductVO.objects.all()
        return JsonResponse(
            {"products": products},
            encoder=ProductVOEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            product = ProductVO.objects.create(**content)
            return JsonResponse(
                product,
                encoder=ProductVOEncoder,
                safe=False
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the product"}
            )
            response.status_code = 400
            return response

@require_http_methods(["DELETE", "GET", "PUT"])
def api_productVO(request, sku):
    if request.method == "GET":
        try:
            product = ProductVO.objects.get(sku=sku)
            return JsonResponse(
                product,
                encoder=ProductVOEncoder,
                safe=False
            )
        except ProductVO.DoesNotExist:
            response = JsonResponse({"message": "Product does not exist, could not display details."})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            product = ProductVO.objects.get(sku=sku)
            product.delete()
            return JsonResponse(
                product,
                encoder=ProductVOEncoder,
                safe=False
            )
        except ProductVO.DoesNotExist:
            return JsonResponse({"message": "Product does not exist, could not delete."})
    # PUT request
    else:
        try:
            content = json.loads(request.body)
            product = ProductVO.objects.get(sku=sku)

            props = [
                "sku",
                "name",
                "price",
                "size",
                "quantity",
                "ingredients",
                "limited_item",
                "image",
                "description",
                "usage",
                "storage"
            ]
            for prop in props:
                if prop in content:
                    setattr(product, prop, content[prop])
            product.save()
            return JsonResponse(
                product,
                encoder=ProductVOEncoder,
                safe=False
            )
        except ProductVO.DoesNotExist:
            response = JsonResponse({"message": "Product does not exist, could not update."})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_orders(request):
    if request.method == "GET":
        orders = Order.objects.all()
        return JsonResponse(
            {"orders": orders},
            encoder=OrderEncoder,
        )
    # POST
    else:
        try:
            content = json.loads(request.body)
            order = Order.objects.create(**content)
            return JsonResponse(
                order,
                encoder=OrderEncoder,
                safe=False
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the order"}
            )
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
    else: # PUT
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

