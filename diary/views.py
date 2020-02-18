from django.contrib.auth.decorators import login_required
from django.http import HttpResponseForbidden, HttpResponseBadRequest
from django.shortcuts import render, redirect
from .models import *


@login_required
def overview(request):
    entries = request.user.entries.all().order_by('-day_no')
    unfinished_entry = entries.filter(complete=False).first()
    complete_entries = entries.filter(complete=True).all()
    context = {
        'unfinished_entry': unfinished_entry,
        'complete_entries': complete_entries,
    }
    return render(request, 'diary/overview.html', context)


@login_required
def view_entry(request, entry_id):
    entry = Entry.objects.get(id=entry_id)
    if entry.user != request.user:
        return HttpResponseForbidden(
            'User authorised to access this page'
        )
    completed_goals = (
        entry.goal_items
        .filter(goal_completed=True).all()
    )
    incomplete_goals = (
       entry.goal_items
        .filter(goal_completed=False).all()
    )
    context = {
        'entry': entry,
        'completed_goals': completed_goals,
        'incomplete_goals': incomplete_goals
    }
    return render(request, 'diary/entry.html', context)


@login_required
def plan_entry(request):

    last_entry = request.user.entries.last()
    if last_entry:
        if not last_entry.complete:
            return HttpResponseBadRequest(
                'User has not completed most recent entry'
            )
        day_no = last_entry.day_no + 1
    else:
        day_no = 1

    if request.method == 'POST':

        user_input = request.POST

        new_entry = Entry(
            user = request.user, 
            day_no = day_no,
            grateful_1 = user_input.get('grateful_1'),
            grateful_2 = user_input.get('grateful_2'),
            grateful_3 = user_input.get('grateful_3'),
            good_deed = user_input.get('good_deed'),
            adventure = user_input.get('adventure')
        )
        new_entry.save()

        goal_data = zip(
            user_input.getlist('descriptions'),
            user_input.getlist('impacts')
        )
        for description, impact in goal_data:
            goal_item = GoalItem(
                parent_entry=new_entry,
                description=description,
                impact=impact
            )
            goal_item.save()
        
        return redirect('overview')
    
    else:
        return render(request, 'diary/plan_base.html') 


@login_required
def plan_pages(request, page_no):
    last_entry = request.user.entries.last()
    if last_entry:
        day_no = last_entry.day_no + 1
    else:
        day_no = 1
    page_loc = 'diary/plan_pages/plan' + str(page_no) + '.html'
    return render(request, page_loc, {'day_no': day_no})


@login_required
def review_entry(request):
    unfinished_entry = request.user.entries.last()
    if unfinished_entry.complete:
        return HttpResponseBadRequest(
            'User has already completed most recent entry'
        )

    if request.method == 'POST':
        user_input = request.POST

        goal_data = zip(
            unfinished_entry.goal_items.all(),
            user_input.getlist('goals_completed')
        )
        for goal_item, completed in goal_data:
            goal_item.goal_completed = bool(completed)
            goal_item.save()

        unfinished_entry.improvement = user_input.get('improvement')
        
        if user_input.get('adventure_done'):
            unfinished_entry.adventure_completed = True
                        
        if user_input.get('deed'):
            unfinished_entry.good_deed = user_input.get('deed')
        unfinished_entry.good_deed_impact = user_input.get('impact')

        events = user_input.getlist('great_things')
        for description in events:
            event = Event(parent_entry=unfinished_entry,
                          description=description)
            event.save()
        unfinished_entry.complete = True
        unfinished_entry.save()
        return redirect('overview')

    else:
        return render(request, 'diary/review_base.html')


@login_required
def review_pages(request, page_no):
    unfinished_entry = request.user.entries.last()
    if unfinished_entry.complete:
        return HttpResponseBadRequest(
            'User has already completed most recent entry'
        )
    page_loc = 'diary/review_pages/review' + str(page_no) + '.html'
    return render(request, page_loc, {'entry': unfinished_entry})


@login_required
def intro(request):
    return render(request, 'diary/intro_base.html')


@login_required
def intro_pages(request, page_no):
    page_loc = 'diary/intro_pages/intro' + str(page_no) + '.html'
    return render(request, page_loc)


@login_required
def example_entry(request):
    return render(request, 'diary/intro_pages/entry.html')