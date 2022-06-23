# Generated by Django 4.0.3 on 2022-06-08 23:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        (
            "inventory_rest",
            "0007_remove_product_created_remove_product_updated_and_more",
        ),
    ]

    operations = [
        migrations.AlterField(
            model_name="product",
            name="size",
            field=models.CharField(
                choices=[
                    ("1.0 fl oz", "1.0 fl oz"),
                    ("2.0 fl oz", "2.0 fl oz"),
                    ("4.0 fl oz", "4.0 fl oz"),
                    ("8.0 fl oz", "8.0 fl oz"),
                    ("16.0 fl oz", "16.0 fl oz"),
                    ("1.0 oz", "1.0 oz"),
                    ("2.0 oz", "2.0 oz"),
                    ("4.0 oz", "4.0 oz"),
                    ("8.0 oz", "8.0 oz"),
                    ("16.0 oz", "16.0 oz"),
                ],
                default="",
                max_length=25,
            ),
        ),
        migrations.DeleteModel(
            name="Size",
        ),
    ]
