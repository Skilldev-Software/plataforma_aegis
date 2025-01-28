from django.db import models

class CampanhaPromocional(models.Model):
    titulo = models.CharField(max_length=255)
    descricao = models.TextField()
    data_inicio = models.DateField()
    data_fim = models.DateField()
    imagem = models.ImageField(upload_to='campanhas_promocionais/', blank=True, null=True)
    
    def __str__(self):
        return self.titulo