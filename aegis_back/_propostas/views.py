from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from validate_docbr import CPF, CNPJ
from django.core.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
import json
from django.http import Http404
from .models import *
from aegis_capital.models import UsuarioPersonalizado
from .serializers import *
from datetime import datetime
import humanize

@permission_classes([IsAuthenticated])
@api_view(['GET', 'POST'])
def create_list(request):
    user=request.user

    if request.method == 'GET':

        if user.groups.filter(name="Admin").exists():
            p_base_user = PropostaBase.objects.all()
        else:
            p_base_user = PropostaBase.objects.filter(originador=user.id)

        if (not p_base_user):
            return Response({"res": "Sem propostas encontradas."})

        return Response({"deu": PropostaBaseSerializer(p_base_user, many=True).data})

    elif request.method == 'POST':

        data = request.data
        p_base_json = data.get('p_base')
        p_base_json["originador"] = user.id
        
        serialized_p_base = PropostaBaseSerializer(data=p_base_json)
        if not serialized_p_base.is_valid():
            return Response(serialized_p_base.errors, status=status.HTTP_400_BAD_REQUEST)
        
        p_base = serialized_p_base.save()
        if p_base.segmento == 'pj' or p_base.segmento == 'internacional':
            empresa_json = data.get('empresa')
            garantias_json = data.get('garantias')
            faturamento_json = data.get('faturamento')
            dividas_json = data.get('dividas')
            empresa_json['p_base'] = p_base.pk
            serialized_empresa = EmpresaSerializer(data=empresa_json)

            cnpj_validator = CNPJ()
            if not cnpj_validator.validate(str(empresa_json['cnpj'])):
                return Response({"Erro": "CNPJ inválido."}, status=status.HTTP_400_BAD_REQUEST)

            if not serialized_empresa.is_valid():
                return Response(serialized_empresa.errors, status=status.HTTP_400_BAD_REQUEST)
            serialized_empresa.save()
            
            garantias_json['p_base'] = p_base.pk
            serialized_garantias = GarantiasSerializer(data=garantias_json)
            if not serialized_garantias.is_valid():
                return Response(serialized_garantias.errors, status=status.HTTP_400_BAD_REQUEST)
            serialized_garantias.save()

            faturamento_json['p_base'] = p_base.pk
            serialized_faturamento = FaturamentoSerializer(data=faturamento_json)
            if not serialized_faturamento.is_valid():
                return Response(serialized_faturamento.errors, status=status.HTTP_400_BAD_REQUEST)
            serialized_faturamento.save()
            
            dividas_json['p_base'] = p_base.pk
            serialized_dividas = DividasSerializer(data=dividas_json)
            if not serialized_dividas.is_valid():
                return Response(serialized_dividas.errors, status=status.HTTP_400_BAD_REQUEST)
            serialized_dividas.save()
            

        elif p_base.segmento == 'outro' or p_base.segmento == 'investimento':
            cliente_json = data.get('cliente')
            cliente_json['p_base'] = p_base.pk

            if p_base.segmento == 'investimento':
                cpf_validator = CPF()
                if not cpf_validator.validate(str(empresa_json['cpf'])):
                    return Response({"Erro": "CPF inválido."}, status=status.HTTP_400_BAD_REQUEST)

            if p_base.segmento == 'outro':
                serialized_cliente = ClienteOutroSerializer(data=cliente_json)
            else:
                serialized_cliente = ClienteInvestidorSerializer(data=cliente_json)


            if not serialized_cliente.is_valid():
                return Response(serialized_cliente.errors, status=status.HTTP_400_BAD_REQUEST)
            
            serialized_cliente.save()

        return Response({"sucesso": PropostaBaseSerializer(p_base).data})


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_proposta(request, pk):
    if request.method == 'GET':
            
        p_base_user = PropostaBase.objects.get(pk=pk)

        proposta_data = {}
        proposta_data["p_base"] = PropostaBaseSerializer(p_base_user).data

        if p_base_user.segmento == 'pj' or p_base_user.segmento == 'internacional':
            data_empresa = EmpresaSerializer(p_base_user.empresa.all().first()).data
            data_garantia = GarantiasSerializer(p_base_user.garantias.all().first()).data
            data_faturamento = FaturamentoSerializer(p_base_user.faturamento.all().first()).data
            data_divida = DividasSerializer(p_base_user.dividas.all().first()).data

            proposta_data['empresa'] = data_empresa
            proposta_data['garantias'] = data_garantia
            proposta_data['faturamentos'] = data_faturamento
            proposta_data['dividas'] = data_divida

        elif p_base_user.segmento == 'outro' or p_base_user.segmento == 'investimento':
            if p_base_user.segmento == 'outro':
                data_cliente = ClienteOutroSerializer(p_base_user.cliente_outro.all().first()).data
            else:
                data_cliente = ClienteInvestidorSerializer(p_base_user.cliente_investidor.all().first()).data   
            
            proposta_data['cliente'] = data_cliente

        return Response(proposta_data)
    
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def upload_file(request, pk):
    if request.method == 'POST':
        parser_classes = (MultiPartParser, FormParser)
        doc = {}
        doc['p_base'] = pk
        print("doc: ",doc)

        file = request.FILES.get('file')
        if not file:
            return Response({"error": "Nenhum arquivo enviado."}, status=status.HTTP_400_BAD_REQUEST)
        print(str(file))
        doc['arq'] = str(file)
        doc['path'] = file
        print("achou o file")
        serialized_doc = DocumentoSerializer(data=doc)
        if not serialized_doc.is_valid():
            return Response(serialized_doc.errors, status=status.HTTP_400_BAD_REQUEST)
        
        serialized_doc.save()
        return Response(status=status.HTTP_201_CREATED)


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_files(request):
    if request.method == 'GET':
        
        query = request.GET.get('query')
        if query:
            docs = Documento.objects.filter(arq=query)
        else:
            docs = Documento.objects.all()

        docs = DocumentoSerializer(docs, many=True).data
        
        meses = {
            1: "Jan", 2: "Fev", 3: "Mar", 4: "Abr", 5: "Maio", 6: "Jun",
            7: "Jul", 8: "Ago", 9: "Set", 10: "Out", 11: "Nov", 12: "Dez"
        }

        for doc in docs:
            doc['arq'] = doc['arq'].replace(".pdf", "")

            data = datetime.strptime(doc['data_modificacao'], "%Y-%m-%dT%H:%M:%S.%fZ")
            mes_formatado = meses[data.month]
            doc['data_modificacao'] = f"{data.day:02}, {mes_formatado} {data.year}"
            
            documento_obj = Documento.objects.get(id=doc['id'])
            arq = documento_obj.path  # Acessa o campo FileField
            doc['size'] = humanize.naturalsize(arq.size) if arq else "0 bytes"
            doc['type'] = documento_obj.path.name.split('.')[-1].upper()
            doc['name'] = doc.pop('arq')
            doc['date'] = doc.pop('data_modificacao')
            doc['category'] = 'a'
            doc.pop('path')
            doc.pop('id')
            doc.pop('data_criacao')
            doc.pop('p_base')

        return Response(docs)

