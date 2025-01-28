from rest_framework import serializers
from .models import PropostaBase, Garantias, Faturamento, Dividas, Documento, Documento, Empresa, ClienteInvestidor, ClienteOutro

class PropostaBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropostaBase
        fields = '__all__'


class GarantiasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Garantias
        fields = '__all__'


class FaturamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Faturamento
        fields = '__all__'


class DividasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dividas
        fields = '__all__'


class DocumentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Documento
        fields = '__all__'


class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = '__all__'


class ClienteOutroSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClienteOutro
        fields = '__all__'


class ClienteInvestidorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClienteInvestidor
        fields = '__all__'