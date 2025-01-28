from rest_framework import serializers
from .models import *

"""class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class ColumnSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = Column
        fields = '__all__'"""


class PropostaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proposta
        fields = '__all__'
