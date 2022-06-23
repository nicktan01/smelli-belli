# Generated by Django 4.0.3 on 2022-06-23 19:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employee_rest', '0002_lineitem_rename_totals_order_total_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='products',
        ),
        migrations.AddField(
            model_name='order',
            name='products',
            field=models.ManyToManyField(null=True, to='employee_rest.lineitem'),
        ),
    ]
