from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('send_mail/', SendMail.as_view()),

]
