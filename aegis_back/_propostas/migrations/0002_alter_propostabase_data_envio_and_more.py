# Generated by Django 5.1.5 on 2025-01-19 16:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('_propostas', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='propostabase',
            name='data_envio',
            field=models.DateField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='propostabase',
            name='status',
            field=models.CharField(max_length=255),
        ),
    ]
