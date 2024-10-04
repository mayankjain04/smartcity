from django.http import HttpResponse
from django.shortcuts import render

def index(request):
    return render(request, 'smartcity/index.html')

def login(request):
    return render(request, 'smartcity/login.html')

def register(request):
    return render(request, 'smartcity/register.html')

def documentation(request):
    return render(request, 'smartcity/documentation.html')

def profile(request):
    return render(request, 'smartcity/profile.html')