import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "customer_project.settings")
django.setup()

from customer_rest.models import ProductVO


def get_products():
    response = requests.get(os.environ["INVENTORY_POLLER_HOST"])
    content = json.loads(response.content)
    for product in content["products"]:
        ProductVO.objects.update_or_create(
            import_href=product["href"],
            defaults={
                "name": product["name"],
                "sku": product["sku"],
                "price": product["price"],
                "image": product["image"],
            },
        )


def poll():
    while True:
        print("Customer Poller polling for data")
        try:
            get_products()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
