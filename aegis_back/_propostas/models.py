from django.db import models
from aegis_capital.models import UsuarioPersonalizado

class PropostaBase(models.Model):
    originador = models.ForeignKey(UsuarioPersonalizado, on_delete=models.CASCADE, related_name='proposta_base')
    # originador = models.IntegerField()
    nome_proposta = models.CharField(max_length=255)
    segmento = models.TextField()
    data_envio = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=255)

    class Meta:
        verbose_name = "Proposta"
        verbose_name_plural = "Propostas"

    def __str__(self):
        return self.nome_proposta


class Garantias(models.Model):
    p_base = models.ForeignKey(PropostaBase, on_delete=models.CASCADE, related_name="garantias")
    disponiveis = models.TextField()
    valor = models.FloatField()


class Faturamento(models.Model):
    p_base = models.ForeignKey(PropostaBase, on_delete=models.CASCADE, related_name="faturamento")
    faturamento_2022 = models.FloatField()
    faturamento_2023 = models.FloatField()
    faturamento_2024 = models.FloatField()


class Dividas(models.Model):
    p_base = models.ForeignKey(PropostaBase, on_delete=models.CASCADE, related_name="dividas")
    valor_total = models.FloatField()
    div_tributaria = models.FloatField()
    div_bancaria = models.FloatField()


class Documento(models.Model):
    p_base = models.ForeignKey(PropostaBase, on_delete=models.CASCADE, related_name="docs")
    arq = models.CharField(max_length=255)
    path = models.FileField(upload_to=f"docs")
    data_criacao = models.DateTimeField(auto_now_add=True, verbose_name="Data de Criação")
    data_modificacao = models.DateTimeField(auto_now=True, verbose_name="Última Modificação")


class Empresa(models.Model):
    p_base = models.ForeignKey(PropostaBase, on_delete=models.CASCADE, related_name="empresa")
    nome = models.CharField(max_length=255)
    cnpj = models.CharField(max_length=18)
    site = models.CharField(max_length=255)
    email = models.EmailField()
    contato = models.CharField(max_length=11)
    coments = models.TextField()
    setor_atuacao = models.CharField(max_length=255) # pode ser choice
    recuperacao_judicial = models.BooleanField()
    balanco_auditado = models.BooleanField()

    tipo_operacao = models.CharField(max_length=255, null=True) # exclusivo de pj # pode ser choice


class ClienteOutro(models.Model):
    p_base = models.ForeignKey(PropostaBase, on_delete=models.CASCADE, related_name="cliente_outro")
    tipo_cliente = models.CharField(max_length=255) # pode ser choice
    nome = models.CharField(max_length=255)
    email = models.EmailField()
    contato = models.CharField(max_length=11)
    coments = models.TextField()
    tipo_operacao = models.CharField(max_length=255)


class ClienteInvestidor(models.Model):
    p_base = models.ForeignKey(PropostaBase, on_delete=models.CASCADE, related_name="cliente_investidor")
    nome = models.CharField(max_length=255)
    profissao = models.CharField(max_length=255)
    estado_civil = models.CharField(max_length=255)
    cpf = models.CharField(max_length=255)
    moradia = models.CharField(max_length=255)
    coments = models.TextField(max_length=255)
    cliente_investe = models.BooleanField()
    quant_aplicado = models.FloatField(blank=True)
    faturamento = models.FloatField()
    idade = models.IntegerField()
    rentabilidade_esperada = models.FloatField()

    fisico_juridico = models.CharField(max_length=255)
    profissional_qualificado = models.CharField(max_length=255)
