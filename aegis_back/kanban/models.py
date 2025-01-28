from django.db import models

"""class Column(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    column = models.ForeignKey(Column, on_delete=models.CASCADE, related_name="tasks")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title"""
    

class Proposta(models.Model):
    #id_broker pra ser passado com o originalizador pro bitrix
    nome_empresa = models.CharField(max_length=255)
    cnpj_empresa = models.CharField(max_length=18, unique=True)  # Formato do CNPJ: 'XX.XXX.XXX/XXXX-XX'
    site_empresa = models.URLField(blank=True, null=True)
    email_empresa = models.EmailField(blank=True, null=True)
    contato_empresa = models.CharField(max_length=255, blank=True, null=True)
    proposta = models.TextField(blank=True, null=True)
    setor_operacao = models.CharField(max_length=50, blank=True, null=False)
    recuperacao_judicial = models.CharField(max_length=50, blank=True, null=False)
    balanço_auditado = models.CharField(max_length=50,blank=True, null=False)
    tipo_operacao = models.CharField(max_length=50, blank=True, null=True)
    setor_atuacao = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.nome

    garantias_disponiveis = models.TextField()
    valor = models.DecimalField(max_digits=15, decimal_places=2)

    def __str__(self):
        return f'Garantia de {self.valor} para {self.empresa.nome}'

    faturamento_2022 = models.DecimalField(max_digits=15, decimal_places=2, blank=True, null=True)
    faturamento_2023 = models.DecimalField(max_digits=15, decimal_places=2, blank=True, null=True)
    faturamento_2024 = models.DecimalField(max_digits=15, decimal_places=2, blank=True, null=True)
    possui_dividas = models.BooleanField(default=False)
    valor_total_dividas = models.DecimalField(max_digits=15, decimal_places=2, blank=True, null=True)
    divida_tributaria = models.DecimalField(max_digits=15, decimal_places=2, blank=True, null=True)
    divida_bancaria = models.DecimalField(max_digits=15, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return f'Informações Financeiras de {self.empresa.nome}'

    file_faturamento_2024 = models.FileField(upload_to='media/documentos/', blank=True, null=True)
    file_faturamento_2023 = models.FileField(upload_to='media/documentos/', blank=True, null=True)
    file_faturamento_2022 = models.FileField(upload_to='media/documentos/', blank=True, null=True)
    
    file_balanco_dre_2024 = models.FileField(upload_to='media/documentos/', blank=True, null=True)
    file_balanco_dre_2023 = models.FileField(upload_to='media/documentos/', blank=True, null=True)
    file_balanco_dre_2022 = models.FileField(upload_to='media/documentos/', blank=True, null=True)
    
    file_contrato_social = models.FileField(upload_to='media/documentos/', blank=True, null=True)
    file_cnh_rg_socios = models.FileField(upload_to='media/documentos/', blank=True, null=True)
    file_irpf_socios = models.FileField(upload_to='media/documentos/', blank=True, null=True)
    
    file_outros_documentos = models.FileField(upload_to='media/documentos/', blank=True, null=True)

    def __str__(self):
        return f"Documentos da empresa {self.nome_empresa}"