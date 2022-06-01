from urllib import response
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .encoders import (
    ProductEncoder,
    ScentEncoder,
)
from .models import Product, Scent

# Get and Post for Products
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

# Delete, Get, Put for Products

# Get and Post for Scents

# Delete, Get, Put for Scents
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