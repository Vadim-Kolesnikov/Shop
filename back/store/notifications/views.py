from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail


class SendMail(APIView):

    def get(self, request):
    
        send_mail(
            'Django mail', 
            'This e-mail was sent with Django.', 
            'jewerly.shop.sam@gmail.com', 
            ['koleso3576@gmail.com'], 
            fail_silently=False
        )
        
        return Response("mail sended")
