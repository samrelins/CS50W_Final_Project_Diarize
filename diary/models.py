from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now

weekdays = ['Monday', 'Tuesday', 'Wednesday', 
            'Thursday', 'Friday', 'Saturday', 
            'Sunday']

months = ['Jan', 'Feb', 'Mar', 'Apr', 'may', 'Jun', 
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
class Entry(models.Model):
    user = models.ForeignKey(User, 
                             related_name='entries', 
                             on_delete=models.CASCADE)
    day_no = models.PositiveIntegerField()
    date = models.DateTimeField(default=now, 
                                editable=False)
    complete = models.BooleanField(default=False)
    grateful_1 = models.CharField(max_length=1000)
    grateful_2 = models.CharField(max_length=1000)
    grateful_3 = models.CharField(max_length=1000)
    good_deed = models.CharField(max_length=1000)
    good_deed_impact = models.CharField(max_length=1000, 
                                        blank=True)
    adventure = models.CharField(max_length=1000)
    adventure_completed = models.BooleanField(default=False)
    improvement = models.CharField(max_length=1000, 
                                   blank=True)

    def __str__(self):
        string = (f"Entry - User: {self.user.username}, "
                  + f"Date: {self.date}, " 
                  + f"Complete: {self.complete}") 
        return string

    def get_date(self):
        date = (str(self.date.day) 
                + " " + months[self.date.month - 1] 
                + " " + str(self.date.year))
        return date

    def get_weekday(self):
        return weekdays[self.date.weekday()]
        
    def get_weekday_abbr(self):
        return weekdays[self.date.weekday()][:3]


class GoalItem(models.Model):
    parent_entry = models.ForeignKey(Entry, 
                                     related_name = 'goal_items', 
                                     on_delete=models.CASCADE)
    description = models.CharField(max_length=250)
    impact = models.CharField(max_length=250, blank=True)
    goal_completed = models.BooleanField(default=False)

    def __str__(self):
        string = (f"GoalItem - User: {self.parent_entry.user.username} "
                  + f"Entry Date: {self.parent_entry.date}")
        return string

class Event(models.Model):
    parent_entry = models.ForeignKey(Entry, 
                                     related_name = 'events', 
                                     on_delete=models.CASCADE)
    description = models.CharField(max_length=250)

    def __str__(self):
        string = (f"Event - User: {self.parent_entry.user.username} "
                  + f"Entry Date: {self.parent_entry.date}")
        return string