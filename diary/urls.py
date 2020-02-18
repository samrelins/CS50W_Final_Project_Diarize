from django.urls import path

from . import views

urlpatterns = [
    path('', views.overview, name='overview'),
    path('entry/<int:entry_id>', views.view_entry, name='view_entry'),
    path('intro_pages/<int:page_no>', views.intro_pages, name='intro_pages'),
    path('intro_pages/entry', views.example_entry, name='example_entry'),
    path('intro', views.intro, name='intro'),
    path('plan_pages/<int:page_no>', views.plan_pages, name='plan_pages'),
    path('plan_entry', views.plan_entry, name='plan_entry'),
    path('review_pages/<int:page_no>', views.review_pages, name='review_pages'),
    path('review_entry', views.review_entry, name='review_entry'),
]

