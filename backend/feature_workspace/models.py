from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

User = get_user_model()

class Workspace(models.Model):
    owner = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name="workspaces"
    ) 
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True) 

    ai_rules = models.TextField(
        blank=True, 
        default='', 
        help_text=_("Instructions for AI on what tasks belongs here.")
    )

    is_default = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Task(models.Model):

    class Status(models.TextChoices):
        TODO = 'TODO', _('To Do')
        IN_PROGRESS = 'IN_PROGRESS', _('In Progress')
        DONE = 'DONE', _('Done')
        BACKLOG = 'BACKLOG', _('Backlog')

    class Priority(models.IntegerChoices):
        LOW = 1, _('Low')
        MEDIUM = 2, _('Medium')
        HIGH = 3, _('High')
        CRITICAL = 4, _('Critical')

    owner = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name="tasks"
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    workspace = models.ForeignKey(
        Workspace, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name="tasks"
    ) 
    
    priority = models.PositiveSmallIntegerField(
        choices=Priority.choices, 
        default=Priority.MEDIUM
    )
    status = models.CharField(
        max_length=20, 
        choices=Status.choices, 
        default=Status.TODO
    )
    deadline = models.DateTimeField(null=True, blank=True)

    original_input = models.TextField(blank=True, default='')
    is_ai_generated = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title