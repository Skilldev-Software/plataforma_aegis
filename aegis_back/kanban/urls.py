from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropostaViewSet 

router = DefaultRouter()
router.register('proposta', PropostaViewSet, basename ='proposta')

urlpatterns = [
    path('', include(router.urls)),
]
