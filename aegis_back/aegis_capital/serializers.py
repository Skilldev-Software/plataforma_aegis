from rest_framework import serializers
from .models import UsuarioPersonalizado
from django.conf import settings
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed

# class UsuarioSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UsuarioPersonalizado
#         fields = [
#             'id', 'email', 'nome', 'cpf', 'data_nascimento',
#             'data_criacao', 'is_active', 'is_staff',
#             'tipo_conta', 'status'
#         ]
#         read_only_fields = ['id', 'data_criacao']

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuarioPersonalizado
        fields = ['id', 'email', 'password', 'nome', 'data_nascimento']  # Adicione aqui os campos do seu modelo
        extra_kwargs = {
            'password': {'write_only': True},  # A senha só pode ser enviada no cadastro
        }

    # Sobrescrevendo o método de criação para criptografar a senha
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        # Autentica o usuário
        user = authenticate(username=username, password=password)

        if not user:
            raise AuthenticationFailed('Credenciais inválidas')

        return data
    

class ProfileImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuarioPersonalizado
        fields = ['profile_image']
