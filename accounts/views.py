from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.shortcuts import render, redirect


def auth_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, 
                            username=username, 
                            password=password)
        if user is not None:
            login(request, user)
            return redirect('/')
        else:
            return render(request, 
                          'accounts/login.html', 
                          {'message': 'Invalid login details'})

    if request.method == 'GET':
        return render(request, 
                      'accounts/login.html', 
                      {'messgage': None})


def auth_register(request):

    if request.method == 'POST':
        username = request.POST['username']
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        email = request.POST['email']
        password = request.POST['password']
        try:
            user = User.objects.create_user(username = username, 
                                            first_name = first_name, 
                                            last_name = last_name, 
                                            email = email, 
                                            password = password)
        except:
            return render(request, 
                          'accounts/register.html', 
                          {'messgage': 'An Error occurred'})
            
        login(request, user)
        return redirect('/intro')

    if request.method == 'GET':
        return render(request, 
                      'accounts/register.html', 
                      {'messgage': None})


def auth_logout(request):
    logout(request)
    return redirect('login')


