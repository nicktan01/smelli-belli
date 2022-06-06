import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "customer_project.settings")
django.setup()

# Import models from service_rest, here.
# from service_rest.models import Something
from customer_rest.models import ProductVO

def get_products():
    response = requests.get("http://inventory-api:8000/api/products/")
    content = json.loads(response.content)
    for product in content["product"]:
        ProductVO.objects.update_or_create(
            import_href=product["href"],
            defaults={
                "name": product["name"],
                "price": product["price"],
                "sku": product["sku"],
                "image": product["image"],
            },
        )

<<<<<<< HEAD
=======
def get_scents():
    response = requests.get("http://inventory-api:8000/api/scents/")
    content = json.loads(response.content)
    for scent in content["scent"]:
        ScentVO.objects.update_or_create(
            import_href=scent["href"],
            defaults={
                "name": scent["name"],
            },
        ) 

>>>>>>> main
def poll():
    while True:
        print('Customer poller polling for data')
        try:
            # Write your polling logic, here
            get_products()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
