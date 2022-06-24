from django.http import JsonResponse
from django.test import TestCase, Client
from django.urls import reverse
from ..encoders import ProductListEncoder
from ..models import Product


class TestViews(TestCase):
    def setUp(self):
        Product.objects.create(
            name="Test Product",
            product_type="Home",
            product_category="Candle",
            size="8 oz",
            sku="12345",
            price="12.0",
            scent1="Fresh",
            scent2="Fruity",
            quantity="5",
        )

    def test_list_products_GET(self):
        client = Client()
        response = client.get(reverse("api_list_products"))
        self.assertEquals(response.status_code, 200)

    def test_list_products_search_filter(self):
        client = Client()
        url = "{url}?{filter}={value}".format(
            url=reverse("api_list_products"), filter="name", value="Test"
        )
        response = client.get(url)

        self.assertEquals(
            response.content,
            JsonResponse(
                {"products": Product.objects.filter(name__icontains="Test")},
                encoder=ProductListEncoder,
            ).content,
        )
