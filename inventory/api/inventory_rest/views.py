from urllib import response
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .encoders import (
    ProductEncoder,
    ScentEncoder,
    SizeEncoder
)
from .models import Product, Scent, Size

@require_http_methods(["GET", "POST"])
def api_products(request):
    if request.method == "GET":
        products = Product.objects.all()
        return JsonResponse(
            {"products": products},
            encoder=ProductEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            product = Product.objects.create(**content)
            return JsonResponse(
                product,
                encoder=ProductEncoder,
                safe=False
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the product"}
            )
            response.status_code = 400
            return response

@require_http_methods(["DELETE", "GET", "PUT"])
def api_product(request, sku):
    if request.method == "GET":
        try:
            product = Product.objects.get(sku=sku)
            return JsonResponse(
                product,
                encoder=ProductEncoder,
                safe=False
            )
        except Product.DoesNotExist:
            response = JsonResponse({"message": "Product does not exist, could not display details."})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            product = Product.objects.get(sku=sku)
            product.delete()
            return JsonResponse(
                product,
                encoder=ProductEncoder,
                safe=False
            )
        except Product.DoesNotExist:
            return JsonResponse({"message": "Product does not exist, could not delete."})
    # PUT request
    else:
        try:
            content = json.loads(request.body)
            product = Product.objects.get(sku=sku)

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
                encoder=ProductEncoder,
                safe=False
            )
        except Product.DoesNotExist:
            response = JsonResponse({"message": "Product does not exist, could not update."})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_scents(request):
    if request.method == "GET":
        scents = Scent.objects.all()
        return JsonResponse(
            {"scents": scents},
            encoder=ScentEncoder,
        )
    # POST
    else:
        try:
            content = json.loads(request.body)
            scent = Scent.objects.create(**content)
            return JsonResponse(
                scent,
                encoder=ScentEncoder,
                safe=False
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the scent"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_scent(request, pk):
    if request.method == "GET":
        try:
            products = Product.objects.get(id=pk)
            return JsonResponse(
                {"products": products},
                encoder=ProductEncoder,
            )
        except Product.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
            
    elif request.method == "DELETE":
        try:
            scent = Scent.objects.get(id=pk)
            scent.delete()
            return JsonResponse(
                scent,
                encoder=ScentEncoder,
                safe=False,
            )
        except Scent.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            scent = Scent.objects.get(id=pk)

            props = ["scents"]
            for prop in props:
                if prop in content:
                    setattr(scent, prop, content[prop])
            scent.save()
            return JsonResponse(
                scent,
                encoder=ScentEncoder,
                safe=False,
            )
        except Scent.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response

# GET and POST for Size


#GET, DELETE, and PUT for Size

