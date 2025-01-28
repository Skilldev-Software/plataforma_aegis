from django.urls import path
from .views import send_to_webhook

urlpatterns = [
    path('send-to-webhook/', send_to_webhook, name='send_to_webhook'),
]
