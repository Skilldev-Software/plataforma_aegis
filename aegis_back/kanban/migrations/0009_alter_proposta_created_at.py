# Generated by Django 5.1.2 on 2025-01-24 17:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kanban', '0008_proposta_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='proposta',
            name='created_at',
            field=models.DateField(auto_now_add=True),
        ),
    ]
