from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.db.models.functions import Lower
import json
from .encoders import (
    ProductDetailEncoder,
    ProductListEncoder,
)
from .models import Product


def get_price(e):
    return e["price"]


def get_name(e):
    return e["name"]


@require_http_methods(["GET", "POST"])
def api_list_products(request):
    if request.method == "GET":
        sortBy = request.GET.get("sortBy", "bestselling")
        scents = list(filter(bool, request.GET.get("scents", "").split(",")))

        products = Product.objects
        if sortBy == "name-desc":
            products = products.order_by(Lower("name").desc())
        elif sortBy == "name-asc":
            products = products.order_by(Lower("name").asc())
        elif sortBy == "price-asc":
            products = products.order_by("price")
        elif sortBy == "price-desc":
            products = products.order_by("-price")

        if len(scents) > 0:
            products = products.filter(scent1__in=scents)

        filters = {}
        search = request.GET.get("name")
        if search:
            filters["name__icontains"] = search
        products = products.filter(**filters)
        return JsonResponse(
            {"products": products.all()},
            encoder=ProductListEncoder,
        )

    elif request.method == "POST":
        content = json.loads(request.body)

        # Then, grab the Product object
        try:
            product = Product.objects.create(**content)
            return JsonResponse(product, encoder=ProductDetailEncoder, safe=False)
        except:
            response = JsonResponse({"message": "Could not create the product"})
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_product(request, sku):
    if request.method == "GET":
        try:
            # Note: we are grabbing Product objects by their SKU
            product = Product.objects.get(sku=sku)
            return JsonResponse(product, encoder=ProductDetailEncoder, safe=False)
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
    elif request.method == "PUT":
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
            return JsonResponse(product, encoder=ProductDetailEncoder, safe=False)
        except Product.DoesNotExist:
            response = JsonResponse({"message": "Product does not exist"})
            response.status_code = 404
            return response
