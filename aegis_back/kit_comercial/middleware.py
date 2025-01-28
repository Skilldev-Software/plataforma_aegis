# middleware.py

from django.utils.deprecation import MiddlewareMixin

class RequestHeaderLoggingMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # Exibe todos os cabeçalhos
        print("Request Headers:", request.headers)
        # Ou para um cabeçalho específico
        print("User-Agent:", request.headers.get('User-Agent'))
