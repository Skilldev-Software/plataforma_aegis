import requests
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, permissions
from django.conf import settings  

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def send_to_webhook(request):
    data = request.data
    url = 'https://b24-c2d8dr.bitrix24.com.br/rest/23/znwiqx8ibzt2vixd/crm.lead.add.json'
    

    
    headers = {
        'Content-Type': 'application/json',
    }

    payload = {
        "fields": {
            "TITLE": data.get("TITLE", "Desenvolvimento"),
            "COMPANY_TITLE": data.get("COMPANY_TITLE", "Skilldev"),
            "NAME": data.get("NAME", "braian"),
            "LAST_NAME": data.get("LAST_NAME", "rodrigues"),
            "OPPORTUNITY": data.get("OPPORTUNITY", 100),
            "CURRENCY_ID": data.get("CURRENCY_ID", "BRL")
        }
    }

    # Enviar dados para o Bitrix24
    try:
        # Realizar o POST e verificar a resposta
        response = requests.post(url, headers=headers, json=payload)

        # Levanta um erro se a requisição falhar
        response.raise_for_status()

        # Se tudo ocorrer bem, retorna a resposta
        return Response({
            "message": "Dados enviados para o Bitrix24 com sucesso!",
            "data": response.json()
        }, status=status.HTTP_200_OK)

    except requests.exceptions.HTTPError as e:
        # Log detalhado do erro
        return Response({
            "error": f"Erro HTTP ao enviar dados: {str(e)}",
            "response": response.json() if response.status_code != 404 else "Sem resposta do servidor"
        }, status=status.HTTP_400_BAD_REQUEST)
    
    except requests.exceptions.RequestException as e:
        # Log detalhado de erros de conexão
        return Response({
            "error": f"Erro ao fazer requisição para o Bitrix24: {str(e)}"
        }, status=status.HTTP_400_BAD_REQUEST)
