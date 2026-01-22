from django.db.models.signals import post_save
from django.dispatch import receiver
from feature_workspace.models import Workspace
from django.contrib.auth import get_user_model

User = get_user_model()

@receiver(post_save, sender=User)
def create_default_workspace(sender, instance, created, **kwargs):
    if created:
        Workspace.objects.create(
            owner=instance,
            title="General",
            description="Default workspace for general tasks",
            is_default=True,
            ai_rules="Use this workspace for personal tasks, miscellaneous items, or anything that does not fit into other specific workspaces."
        )