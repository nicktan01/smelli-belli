import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "employee_project.settings")
django.setup()

from employee_rest.models import ProductVO, UserVO

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
                "size": product["size"],
                "quantity": product["quantity"] ,
                "limited_item": product["limited_item"],
                "image": product["image"],
            },
        )


def poll():
    while True:
        print('employee poller polling for data')
        try:
            get_products()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
