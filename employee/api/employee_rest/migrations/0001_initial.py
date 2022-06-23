# Generated by Django 4.0.3 on 2022-06-06 22:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="ProductVO",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=50)),
                ("sku", models.CharField(max_length=12, unique=True)),
                ("price", models.DecimalField(decimal_places=2, max_digits=5)),
                ("size", models.CharField(max_length=25)),
                ("quantity", models.PositiveSmallIntegerField()),
                ("limited_item", models.BooleanField()),
                ("image", models.URLField()),
                ("import_href", models.CharField(max_length=200, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name="UserVO",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("import_href", models.CharField(max_length=200, unique=True)),
                ("username", models.CharField(max_length=200, unique=True)),
                ("email", models.CharField(max_length=250, unique=True)),
                ("first_name", models.CharField(max_length=250)),
                ("last_name", models.CharField(max_length=250)),
            ],
        ),
        migrations.CreateModel(
            name="Order",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("quantity", models.PositiveSmallIntegerField()),
                (
                    "totals",
                    models.DecimalField(decimal_places=2, max_digits=10),
                ),
                ("order_number", models.IntegerField()),
                ("created", models.DateTimeField(auto_now_add=True)),
                (
                    "customer",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="order",
                        to="employee_rest.uservo",
                    ),
                ),
                (
                    "products",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="order",
                        to="employee_rest.productvo",
                    ),
                ),
            ],
        ),
    ]
