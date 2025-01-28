from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import UsuarioPersonalizado
from rest_framework import status
from .serializers import UsuarioSerializer, LoginSerializer, ProfileImageSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny
from django.contrib.auth.hashers import make_password
from rest_framework.parsers import MultiPartParser, FormParser



class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = UsuarioPersonalizado.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Personalize o comportamento de criação, se necessário
    def perform_create(self, serializer):
        serializer.save()

        
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer_class = LoginSerializer
        # Recuperando os dados do corpo da requisição
        email = request.data.get('email')
        senha = request.data.get('senha')

        print(email)
        print(senha)

        # Verificando as credenciais
        user = authenticate(username=email, password=senha)

        if user is not None:
            # Se as credenciais forem válidas, gerar o JWT
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            return Response({
                'message': 'Login bem-sucedido',
                'token': access_token,
                'username': user.nome,
            })
        else:
            return Response({
                'message': 'Credenciais inválidas'
            }, status=status.HTTP_401_UNAUTHORIZED)
        

class RegistrarUsuarioView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UsuarioSerializer(data=request.data)
        
        if serializer.is_valid():
            # Criptografa a senha antes de salvar
            serializer.validated_data['password'] = make_password(serializer.validated_data['password'])
            user = serializer.save()

            # Gerar o token JWT para o usuário recém-criado
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            return Response({
                'message': 'Usuário cadastrado com sucesso!',
                'user': serializer.data,
                'token': access_token
            }, status=status.HTTP_201_CREATED)
        else:
            return Response({
                'message': 'Erro ao cadastrar usuário',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

from django.conf import settings

class GetUserProfile(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        user = UsuarioPersonalizado.objects.get(email=user.email)

        # Formatação das datas para "dia/mês/ano"
        data_nascimento = user.data_nascimento.strftime('%d/%m/%Y') if user.data_nascimento else None
        data_criacao = user.data_criacao.strftime('%d/%m/%Y') if user.data_criacao else None

        # Construir a URL absoluta para a imagem de perfil
        profile_image_url = request.build_absolute_uri(user.profile_image.url) if user.profile_image else None

        return Response({
            "username": user.nome,
            "Email": user.email,
            "Cpf": user.cpf,
            "Data de Nascimento": data_nascimento,
            "Data de Cadastro": data_criacao,
            "Imagem": profile_image_url
        })


class ProfileImage(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, *args, **kwargs):
        user = request.user  # Obtém o usuário autenticado

        serializer = ProfileImageSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Imagem atualizada com sucesso!", "data": serializer.data}, status=status.HTTP_200_OK)
        return Response({"message": "Erro ao atualizar a imagem.", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

