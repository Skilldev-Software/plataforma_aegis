from django.db import models

class Documento(models.Model):
    titulo = models.CharField(max_length=255, verbose_name="Título")
    descricao = models.TextField(blank=True, null=True, verbose_name="Descrição")
    arquivo_pdf = models.FileField(upload_to="documentos/", verbose_name="Arquivo PDF")
    data_criacao = models.DateTimeField(auto_now_add=True, verbose_name="Data de Criação")
    data_modificacao = models.DateTimeField(auto_now=True, verbose_name="Última Modificação")

    def __str__(self):
        return self.titulo

    class Meta:
        verbose_name = "Documento"
        verbose_name_plural = "Documentos"
        ordering = ["-data_criacao"]
