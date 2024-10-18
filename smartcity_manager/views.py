from django.http import HttpResponse
from django.shortcuts import render, HttpResponseRedirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from django.db import IntegrityError

from smartcity_manager.models import User

def index(request):
    return render(request, 'smartcity/index.html')

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse('index'))
        else:
            message = 'user not found'
            return render(request, 'smartcity/login.html', {
                'message':message,
            })
    return render(request, 'smartcity/login.html')

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirm"]
        if password != confirmation:
            return render(request, "smartcity/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username=username, password=password)
            user.save()
        except IntegrityError as e:
            print(e)
            return render(request, "smartcity/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "smartcity/register.html")

def documentation(request):
    return render(request, 'smartcity/documentation.html')

def profile(request):
    return render(request, 'smartcity/profile.html')

def support(request):
    return render(request, 'smartcity/support.html')