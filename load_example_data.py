# function (a crude one!) that loads Pinochio's menu into database
#    used in menu.tests.py and pizza.load_db.py

from diary.models import *
from django.contrib.auth.models import User

su = User.objects.create_superuser(username='user',
        email='user@user.com',
        password='password')
su.save()

user = User.objects.get(username='user')

for i in range(10):
    entry = Entry(user=user)
    entry.day_no = i
    entry.complete = True
    entry.grateful_1 = f"example grateful entry 1 day {i}"
    entry.grateful_2 = f"example grateful entry 2 day {i}"
    entry.grateful_3 = f"example grateful entry 3 day {i}"
    entry.good_deed = f"example good deed plan day {i}"
    entry.good_deed_impact = f"example good deed impact day {i}"
    entry.adventure = f"adventure day {i}"
    entry.adventure_completed = bool(i % 2)
    entry.improvement = f"example improvement day {i}"
    entry.save()

    for j in range(3):
        goal =  GoalItem(parent_entry=entry)
        goal.description = f"example goal description {j} day {i}"
        goal.impact = f"example goal impact {j} day {i}"
        goal.goal_completed = bool((j + i) % 2)
        goal.save()

    for k in range(3):
        event = Event(parent_entry=entry)
        event.description = f"example event {k} day {i}"
        event.save()
