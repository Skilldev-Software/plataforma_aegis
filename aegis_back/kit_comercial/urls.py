from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import DocumentoViewSet, get_files

router = DefaultRouter()
router.register(r'documento', DocumentoViewSet, basename='documento')

urlpatterns = [
    *router.urls,  # O desempacotamento está correto aqui
    path('get_files', view=get_files, name='get-files'),
]