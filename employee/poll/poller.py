import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "employee_project.settings")
django.setup()

from employee_rest.models import ProductVO
# from customer_rest.models import CustomerVO

def get_products():
    response = requests.get("http://inventory-api:8100/api/products/")
    content = json.loads(response.content)
    for product in content["product"]:
        ProductVO.objects.update_or_create(
            import_href=product["href"],
            defaults={
                "id" : product["id"],
                "name": product["name"],
                "price": product["price"],
                "sku": product["sku"],
                "image": product["image"],
                "size": product["size"],
                "quantity": product["quantity"] ,
                "limited_item": product["limited_item"],
                "created": product["created"],
                "updated": product["updated"],
                "import_href": product["import_href"]
            },
        )

# def get_user():
#     response = requests.get("http://user-api:8100/api/users/")
#     content = json.loads(response.content)
#     for user in content["users"]:
#         UserVO.objects.update_or_create(
#             import_href=user["href"],
#             defaults={
#                 "name": user["name"],
#             },
#         )


def poll():
    while True:
        print('Sales poller polling for data')
        try:
            get_products()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
