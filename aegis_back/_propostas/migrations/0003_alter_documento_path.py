# Generated by Django 5.1.5 on 2025-01-19 23:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('_propostas', '0002_alter_propostabase_data_envio_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='documento',
            name='path',
            field=models.FileField(upload_to='docs/<django.db.models.fields.related.ForeignKey>'),
        ),
    ]
