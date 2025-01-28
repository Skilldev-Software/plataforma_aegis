from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import CampanhaPromocionalViewSet

router = DefaultRouter()
router.register(r'', CampanhaPromocionalViewSet, basename='campanha_promocional')

urlpatterns = [
    *router.urls,  
]
