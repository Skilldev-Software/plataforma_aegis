from django.db import models

class Video(models.Model):
    titulo = models.CharField(max_length=255, verbose_name="Título")
    descricao = models.TextField(blank=True, verbose_name="Descrição")
    url = models.URLField(verbose_name="URL do vídeo")
    data_adicao = models.DateTimeField(auto_now_add=True, verbose_name="Data de adição")

    def __str__(self):
        return self.titulo

    class Meta:
        verbose_name = "Vídeo"
        verbose_name_plural = "Vídeos"
