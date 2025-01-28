# Arquivo: models.py
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone

# Gerenciador de usuário personalizado
class GerenciadorUsuario(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('O campo de e-mail é obrigatório')
        email = self.normalize_email(email)
        usuario = self.model(email=email, **extra_fields)
        usuario.set_password(password)
        usuario.save(using=self._db)
        return usuario

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

# Modelo de Usuário Personalizado
class UsuarioPersonalizado(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    nome = models.CharField(max_length=255)
    cpf = models.CharField(max_length=11, blank=True, null=True)
    data_nascimento = models.DateField('Data de Nascimento', blank=True, null=True)
    data_criacao = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    profile_image = models.ImageField(upload_to='prof_images', blank=True, null=True)

    ACCOUNT_CHOICES = [
        ('standard', 'Padrão'),
        ('admin', 'Administrador'),
    ]
    tipo_conta = models.CharField(max_length=10, choices=ACCOUNT_CHOICES, default='standard')
    
    STATUS_CHOICES = [
        ('active', 'Ativa'),
        ('suspended', 'Suspensa'),
        ('inactive', 'Inativa'),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')

    objects = GerenciadorUsuario()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nome']

    def __str__(self):
        return self.email
