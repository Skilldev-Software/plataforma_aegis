from rest_framework import viewsets#, permissions
from .models import Video
from .serializers import VideoSerializer

class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all().order_by('-data_adicao')  # Ordena por data de criação
    serializer_class = VideoSerializer
    #permission_classes = [permissions.IsAuthenticated]