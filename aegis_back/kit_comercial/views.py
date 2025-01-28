from rest_framework import viewsets#, permissions
from .models import *
from .serializers import *
from datetime import datetime
import humanize
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

class DocumentoViewSet(viewsets.ModelViewSet):
    queryset = Documento.objects.all().order_by('-data_criacao')  # Ordena por data de criação
    serializer_class = DocumentoSerializer
    # permission_classes = [permissions.IsAuthenticated]

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
                doc['titulo'] = doc['titulo'].replace(".pdf", "")

                data = datetime.strptime(doc['data_modificacao'], "%Y-%m-%dT%H:%M:%S.%fZ")
                mes_formatado = meses[data.month]
                doc['data_modificacao'] = f"{data.day:02}, {mes_formatado} {data.year}"
                
                documento_obj = Documento.objects.get(id=doc['id'])
                arq = documento_obj.arquivo_pdf  # Acessa o campo FileField
                doc['size'] = humanize.naturalsize(arq.size) if arq else "0 bytes"
                doc['type'] = documento_obj.arquivo_pdf.name.split('.')[-1].upper()
                doc['name'] = doc.pop('titulo')
                doc['date'] = doc.pop('data_modificacao')
                doc['category'] = 'a'
                doc.pop('arquivo_pdf')
                doc.pop('id')
                doc.pop('data_criacao')
                doc.pop('descricao')

            return Response(docs)
        
