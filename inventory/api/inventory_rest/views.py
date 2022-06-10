from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .encoders import (
    ProductDetailEncoder,
    ProductListEncoder,
)
from .models import Product


@require_http_methods(["GET", "POST"])
def api_list_products(request):
    if request.method == "GET":
        products = Product.objects.all()
        return JsonResponse(
            {"products": products},
            encoder=ProductListEncoder,
        )
    # POST
    else:
        content = json.loads(request.body)

        # Then, grab the Product object
        try:
            product = Product.objects.create(**content)
            return JsonResponse(
                product, encoder=ProductDetailEncoder, safe=False
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
                product, encoder=ProductDetailEncoder, safe=False
            )
        except Product.DoesNotExist:
            response = JsonResponse({"message": "Product does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            # Again, making sure to grab Product objects by their SKU
            # Count is being used here to display "deleted": true
            # in the JSON response
            count, _ = Product.objects.filter(sku=sku).delete()
            return JsonResponse({"deleted": count > 0})
        except Product.DoesNotExist:
            return JsonResponse({"message": "Product does not exist"})
    # PUT
    else:
        try:
            content = json.loads(request.body)
            # Grabbing Product objects by their SKU
            product = Product.objects.get(sku=sku)

            props = [
                "name",
                "product_type",
                "product_category",
                "sku",
                "price",
                "size",
                "scent1",
                "scent2",
                "quantity",
                "image",
                "description",
                "status",
            ]
            for prop in props:
                if prop in content:
                    setattr(product, prop, content[prop])
            product.save()
            return JsonResponse(
                product, encoder=ProductDetailEncoder, safe=False
            )
        except Product.DoesNotExist:
            response = JsonResponse({"message": "Product does not exist"})
            response.status_code = 404
            return response
