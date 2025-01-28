from django.urls import path
from .views import *

urlpatterns = [
    path('create_list', view=create_list, name='create-list-proposta'),
    path('get_proposta/<int:pk>', view=get_proposta, name='get-proposta'),
    path('upload_file/<int:pk>', view=upload_file, name='upload-file'),
    path('get_files', view=get_files, name='get-files'),
]