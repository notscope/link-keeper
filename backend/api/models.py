from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
class Collection(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="collections")

    def __str__(self):
        return self.title
    
    def collection_count(self):
        return self.count()

class Link(models.Model):
    title = models.CharField(max_length=100)
    url = models.TextField()
    description = models.TextField()
    pinned = models.BooleanField(default=False)
    date_created = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="links")
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE, related_name="links", null=True, blank=True)

    def save(self, *args, **kwargs):
        if not Collection.objects.filter(title="Unorganized").exists():
            Collection.objects.create(title="Unorganized", description="", author=self.author)
        # Check if collection is not provided, assign the default "Unorganized" collection
        if not self.collection:
            self.collection = Collection.objects.get(title="Unorganized", author=self.author)   
        
        super(Link, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.title}" 

@receiver(post_save, sender=User)
def create_unorganized_collection(sender, instance, created, **kwargs):
    if created:  # Check if the user was just created
        Collection.objects.create(
            title="Unorganized",
            description="",
            author=instance
        )