# function that loads default superuser into users table
#    used in pizza.load_db.py

from django.contrib.auth.models import User

def load_su():
    su = User.objects.create_superuser(username='user',
            email='user@user.com',
            password='password')
    su.save()

load_su()

