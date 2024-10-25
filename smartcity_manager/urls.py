from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.login_view, name='login'),
    path('logout', views.logout_view, name='logout'),
    path('register', views.register, name='register'),
    path('profile', views.profile, name='profile'),
    path('support', views.support, name='support'),
    path('documentation', views.documentation, name='documentation'),

]