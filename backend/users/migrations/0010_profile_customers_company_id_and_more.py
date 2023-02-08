# Generated by Django 4.1.5 on 2023-01-31 18:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0009_remove_profile_customers_company_id_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='Customers_company_id',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='users.customers_company'),
        ),
        migrations.AddField(
            model_name='profile',
            name='Supplier_company_id',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='users.supplier_company'),
        ),
    ]
