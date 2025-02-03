from pathlib import Path
import os
from datetime import timedelta
from corsheaders.defaults import default_headers


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-q-$+v)hpc9%k6^b6$^#s*c$q*s!)mgx5bfc2old^7on6(#jrx('

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'jazzmin',
    'corsheaders',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.humanize',
    'rest_framework',  
    'aegis_capital',  
    'api_bitrix',
    'aegis_academy',
    'django_extensions',
    'kit_comercial',
    'kanban',
    'campanhas_promocionais',
    '_propostas'
]

# Configuração do AUTH_USER_MODEL
AUTH_USER_MODEL = 'aegis_capital.UsuarioPersonalizado'  


MIDDLEWARE = [
    'kit_comercial.middleware.RequestHeaderLoggingMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'aegis_backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'aegis_backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'pt-br'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = '/static/'

MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}


JAZZMIN_SETTINGS = {
    # Títulos e Cabeçalhos
    "site_title": "Painel Administrativo - Aégis Capital",
    "site_header": "Administração Aégis Capital",
    "site_brand": "Aégis Capital",
    "site_logo": "static/img/logo.png",  # Coloque o caminho do logo da sua empresa
    "login_logo": "static/img/logo_login.png",  # Logo na tela de login (opcional)
    "login_logo_dark": "static/img/logo_login_dark.png",  # Logo na tela de login em modo escuro
    "site_logo_classes": "img-circle",
    "welcome_sign": "Bem-vindo ao Painel Administrativo da Aégis Capital",
    "copyright": "Aégis Capital © 2025",
    "search_model": "auth.User",  # Modelo padrão para a barra de pesquisa

    # Barra Lateral
    "show_sidebar": True,
    "navigation_expanded": True,
    "hide_apps": ["sessions"],  # Ocultar apps desnecessários
    "hide_models": ["auth.Permission"],  # Ocultar modelos desnecessários
    "order_with_respect_to": ["auth", "my_app"],  # Ordem dos apps na barra lateral
    "icons": {
        "auth": "fas fa-users-cog",
        "auth.user": "fas fa-user",
        "auth.Group": "fas fa-users",
        "my_app.ModelName": "fas fa-chart-line",  # Customize ícones para seus modelos
    },
    "custom_links": {
        "my_app": [  # Links personalizados para o app
            {
                "name": "Relatórios",
                "url": "my_app:report",  # Nome da URL
                "icon": "fas fa-file-alt",
            },
        ]
    },

    # Temas e Estilo
    "theme": "darkly",  # Exemplo de tema (pode ser cerulean, cosmo, cyborg, etc.)
    "dark_mode_theme": "darkly",
    "related_modal_active": True,  # Usar modais para campos relacionados

    # Configurações Avançadas
    "show_ui_builder": True,  # Exibe o botão para personalizar a interface
    "topmenu_links": [
        {"name": "Home", "url": "admin:index", "permissions": ["auth.view_user"]},
        {"name": "Documentação", "url": "https://meudominio.com/docs", "new_window": True},
        {"app": "auth"},  # Atalho para o app de autenticação
    ],
    "usermenu_links": [
        {"name": "Perfil", "url": "admin:auth_user_change", "new_window": False},
        {"name": "Configurações", "url": "/config/", "new_window": False},
    ],
    "custom_css": "static/css/admin_custom.css",  # CSS personalizado
    "custom_js": "static/js/admin_custom.js",  # JavaScript personalizado

    # Exibição de Dados
    "default_icon_parents": "fas fa-chevron-circle-down",
    "default_icon_children": "fas fa-circle",
    "related_models": {
        "auth.User": ["auth.Group"],  # Relacionamento para exibição
    },
    "changeform_format": "horizontal_tabs",  # Estilo dos formulários (tabs horizontais)
    "changeform_format_overrides": {
        "auth.user": "collapsible",  # Exemplo de configuração específica
    },
}


CORS_ALLOW_ALL_ORIGINS = False
ORS_ALLOWED_ORIGINS = [
    "http://aegishub.site/",  # A URL do seu frontend (ou outras URLs permitidas)
]


CORS_ALLOW_HEADERS = list(default_headers) + [
    'Authorization',
    'accept',
    'origin',
    'x-requested-with',
    'content-type',
]



SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),  
    'REFRESH_TOKEN_LIFETIME': timedelta(days=3),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': False,
}
