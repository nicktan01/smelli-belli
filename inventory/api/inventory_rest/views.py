from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .encoders import (
    ProductDetailEncoder,
    ScentEncoder,
    SizeEncoder
)
from .models import Product, Scent, Size


@require_http_methods(["GET", "POST"])
def api_list_products(request):
    if request.method == "GET":
        products = Product.objects.all()
        return JsonResponse(
            {"products": products},
            encoder=ProductDetailEncoder,
        )
    # POST
    else:
        content = json.loads(request.body)

        # Get the size object and put it in the content dictionary
        try:
            size = Size.objects.get(id=content["size"])
            content["size"] = size
        except Size.DoesNotExist:
            return JsonResponse(
                {"message": "Size does not exist"},
                status=400,
            )

        # Then, grab the Product object
        try:
            product = Product.objects.create(**content)
            return JsonResponse(
                product,
                encoder=ProductDetailEncoder,
                safe=False
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the product"}
            )
            response.status_code = 400
            return response

@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_product(request, sku):
    if request.method == "GET":
        try:
            # Note: we are grabbing Product objects by their SKU
            product = Product.objects.get(sku=sku)
            return JsonResponse(
                product,
                encoder=ProductDetailEncoder,
                safe=False
            )
        except Product.DoesNotExist:
            response = JsonResponse(
                {"message": "Product does not exist"}
            )
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            # Again, making sure to grab Product objects by their SKU
            # Count is being used here to display "deleted": true
                # in the JSON response
            count, _ = Product.objects.filter(sku=sku).delete()
            return JsonResponse(
                {"deleted": count > 0}
            )
        except Product.DoesNotExist:
            return JsonResponse(
                {"message": "Product does not exist"}
            )
    # PUT
    else:
        try:
            content = json.loads(request.body)
            # Grabbing Product objects by their SKU
            product = Product.objects.get(sku=sku)

            props = [
                "name",
                "sku",
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
                encoder=ProductDetailEncoder,
                safe=False
            )
        except Product.DoesNotExist:
            response = JsonResponse(
                {"message": "Product does not exist"}
            )
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_list_scents(request):
    if request.method == "GET":
        scents = Scent.objects.all()
        return JsonResponse(
            {"scents": scents},
            encoder=ScentEncoder,
        )
    # POST
    else:
        content = json.loads(request.body)

        # Get the product object and put it in the content dictionary
        try:
            # Scent and Product objects are bound by the Product ID, not SKU
            product = Product.objects.get(id=content["product"])
            content["product"] = product
        except Product.DoesNotExist:
            return JsonResponse(
                {"message": "Product does not exist"},
                status=400
            )

        # Then, grab the Scent object
        try:
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
def api_show_scent(request, pk):
    if request.method == "GET":
        try:
            scents = Scent.objects.get(id=pk)
            return JsonResponse(
                {"scents": scents},
                encoder=ScentEncoder,
            )
        except Scent.DoesNotExist:
            response = JsonResponse(
                {"message": "Scent does not exist"}
                )
            response.status_code = 404
            return response            
    elif request.method == "DELETE":
        try:
            count, _ = Scent.objects.filter(id=pk).delete()
            return JsonResponse(
                {"deleted": count > 0}
            )

        except Scent.DoesNotExist:
            return JsonResponse(
                {"message": "Scent does not exist"}
        )
    # PUT
    else: 
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
            response = JsonResponse(
                {"message": "Scent does not exist"}
            )
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_list_sizes(request):
    if request.method == "GET":
        sizes = Size.objects.all()
        return JsonResponse(
            {"sizes": sizes},
            encoder=SizeEncoder,
        )
    #POST
    else:
        try:
            content = json.loads(request.body)
            size = Size.objects.create(**content)
            return JsonResponse(
                size,
                encoder=SizeEncoder,
                safe=False
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the size"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_size(request, pk):
    if request.method == "GET":
        try:
            sizes = Size.objects.get(id=pk)
            return JsonResponse(
                {"sizes": sizes},
                encoder=SizeEncoder,
            )
        except Size.DoesNotExist:
            response = JsonResponse(
                {"message": "Size does not exist"}
                )
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            count, _ = Size.objects.filter(id=pk).delete()
            return JsonResponse(
                {"deleted": count > 0}
            )
        except Size.DoesNotExist:
            return JsonResponse(
                {"message": "Size does not exist"}
            )
    # PUT
    else: 
        try:
            content = json.loads(request.body)
            size = Size.objects.get(id=pk)

            props = ["sizes"]
            for prop in props:
                if prop in content:
                    setattr(size, prop, content[prop])
            size.save()
            return JsonResponse(
                size,
                encoder=SizeEncoder,
                safe=False,
            )
        except Size.DoesNotExist:
            response = JsonResponse(
                {"message": "Size does not exist"}
            )
            response.status_code = 404
            return response
