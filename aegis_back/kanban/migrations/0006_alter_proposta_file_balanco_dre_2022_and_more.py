# Generated by Django 5.1.5 on 2025-01-18 17:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kanban', '0005_alter_proposta_balanço_auditado_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='proposta',
            name='file_balanco_dre_2022',
            field=models.FileField(blank=True, null=True, upload_to='media/documentos/'),
        ),
        migrations.AlterField(
            model_name='proposta',
            name='file_balanco_dre_2023',
            field=models.FileField(blank=True, null=True, upload_to='media/documentos/'),
        ),
        migrations.AlterField(
            model_name='proposta',
            name='file_balanco_dre_2024',
            field=models.FileField(blank=True, null=True, upload_to='media/documentos/'),
        ),
        migrations.AlterField(
            model_name='proposta',
            name='file_cnh_rg_socios',
            field=models.FileField(blank=True, null=True, upload_to='media/documentos/'),
        ),
        migrations.AlterField(
            model_name='proposta',
            name='file_contrato_social',
            field=models.FileField(blank=True, null=True, upload_to='media/documentos/'),
        ),
        migrations.AlterField(
            model_name='proposta',
            name='file_faturamento_2022',
            field=models.FileField(blank=True, null=True, upload_to='media/documentos/'),
        ),
        migrations.AlterField(
            model_name='proposta',
            name='file_faturamento_2023',
            field=models.FileField(blank=True, null=True, upload_to='media/documentos/'),
        ),
        migrations.AlterField(
            model_name='proposta',
            name='file_faturamento_2024',
            field=models.FileField(blank=True, null=True, upload_to='media/documentos/'),
        ),
        migrations.AlterField(
            model_name='proposta',
            name='file_irpf_socios',
            field=models.FileField(blank=True, null=True, upload_to='media/documentos/'),
        ),
        migrations.AlterField(
            model_name='proposta',
            name='file_outros_documentos',
            field=models.FileField(blank=True, null=True, upload_to='media/documentos/'),
        ),
    ]
