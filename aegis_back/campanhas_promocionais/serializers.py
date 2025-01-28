from rest_framework import serializers
from .models import CampanhaPromocional

class CampanhaPromocionalSerializer(serializers.ModelSerializer):
    class Meta:
        model = CampanhaPromocional
        fields = '__all__'