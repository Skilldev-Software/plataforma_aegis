from rest_framework import viewsets, permissions
from .models import *
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.response import Response

"""class ColumnViewSet(viewsets.ModelViewSet):
    queryset = Column.objects.all()
    serializer_class = ColumnSerializer
    permission_classes = [permissions.IsAuthenticated]

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
"""
class PropostaViewSet(viewsets.ModelViewSet):
    queryset = Proposta.objects.all()
    serializer_class = PropostaSerializer
    #permission_classes = [permissions.IsAuthenticated]

@api_view(['GET'])
def listar_propostas(request):
    try:
        # Busca todas as propostas do banco de dados
        propostas = Proposta.objects.all()
        
        # Serializa os dados das propostas
        serializer = PropostaSerializer(propostas, many=True)
        
        # Retorna os dados serializados como JSON
        return Response(serializer.data, status=200)
    except Exception as e:
        return Response({'error': str(e)}, status=500)