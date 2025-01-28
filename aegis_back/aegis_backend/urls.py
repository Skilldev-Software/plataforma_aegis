from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('aegis_capital.urls')), 
    path('webhook/', include('api_bitrix.urls')), 
    path('academy/', include('aegis_academy.urls')),
    path('kit_comercial/', include('kit_comercial.urls')),
    path('kanban/', include('kanban.urls')),
    path('campanhas_promocionais/', include('campanhas_promocionais.urls')),
    path('teste_proposta/', include('_propostas.urls'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
