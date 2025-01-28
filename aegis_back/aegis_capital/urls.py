# aegis_capital/urls.py
from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import LoginView, RegistrarUsuarioView

from .views import LoginView, RegistrarUsuarioView, GetUserProfile, ProfileImage

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import UsuarioViewSet #UploadProdutoView,   # Corrija para importar UploadProdutoView


# Criação do router para o ViewSet
router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet, basename='usuarios')

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login',LoginView.as_view(), name='login'),
    path('registrar', RegistrarUsuarioView.as_view(), name='registrar_usuario'),
    path('profile', GetUserProfile.as_view(), name='profile'),
    path('profile_image', ProfileImage.as_view(), name='profile-image-update')
]

urlpatterns += router.urls