from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import UsuarioPersonalizado

class UsuarioPersonalizadoAdmin(BaseUserAdmin):
    # Campos exibidos no Django Admin
    list_display = ('email', 'nome', 'is_active', 'is_staff', 'is_superuser')
    list_filter = ('is_active', 'is_staff', 'is_superuser')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Informações pessoais', {'fields': ('nome', 'cpf', 'data_nascimento')}),
        ('Permissões', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Datas importantes', {'fields': ('last_login', 'data_criacao')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'nome', 'password1', 'password2'),
        }),
    )
    search_fields = ('email', 'nome')
    ordering = ('email',)
    filter_horizontal = ('groups', 'user_permissions')

    # Sobrescrever o método save para criptografar a senha
    def save_model(self, request, obj, form, change):
        if form.cleaned_data.get('password'):
            obj.set_password(form.cleaned_data['password'])
        super().save_model(request, obj, form, change)

# Registrar o modelo de usuário personalizado no admin
admin.site.register(UsuarioPersonalizado, UsuarioPersonalizadoAdmin)