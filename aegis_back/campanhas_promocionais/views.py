from rest_framework import viewsets#, permissions
from .models import *
from .serializers import *

class CampanhaPromocionalViewSet(viewsets.ModelViewSet):
    queryset = CampanhaPromocional.objects.all()  
    serializer_class = CampanhaPromocionalSerializer
    #permission_classes = [permissions.IsAuthenticated]
    
