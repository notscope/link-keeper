from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import UserSerializer, LinkSerializer, CollectionSerializer, CollectionDetailSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Link, Collection
# Create your views here.

class CollectionListCreate(generics.ListCreateAPIView):
    serializer_class = CollectionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Collection.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class CollectionCount(generics.ListAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = self.request.user
        count = Collection.objects.filter(author=user).count()
        return Response({"collectionCount": count})

class CurrentUser(generics.ListAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class CollectionDetail(generics.ListAPIView):
    serializer_class = CollectionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        collection_id = self.kwargs['pk']
        return Collection.objects.filter(id=collection_id)
    
    def delete(self, request, *args, **kwargs):
        collection = self.get_queryset().filter(pk=kwargs["pk"]).first()

        # Prevent deletion if the collection title is "Unorganized"
        if collection and collection.title == "Unorganized":
            return Response({"error": "You cannot delete the 'Unorganized' collection."}, status=status.HTTP_403_FORBIDDEN)

        return super().delete(request, *args, **kwargs)

class CollectionDelete(generics.DestroyAPIView):
    serializer_class = CollectionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Collection.objects.filter(author=user)

class LinkListCreate(generics.ListCreateAPIView):
    serializer_class = LinkSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Link.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class PinnedLinksList(generics.ListAPIView):
    serializer_class = LinkSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Link.objects.filter(author=self.request.user, pinned=True)

class LinkListCount(generics.ListAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = self.request.user
        count = Link.objects.filter(author=user).count()  # Get the count of links
        return Response({"linkCount": count})
    
class PinnedLinkListCount(generics.ListAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        count = Link.objects.filter(author=self.request.user, pinned=True).count()  # Get the count of links
        return Response({"pinnedLinkCount": count})

class RecentLinks(generics.ListAPIView):
    serializer_class = LinkSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Link.objects.filter(author=user).order_by('-date_created')[:10]

class LinkDelete(generics.DestroyAPIView):
    serializer_class = LinkSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Link.objects.filter(author=user)
    
class LinkUpdate(generics.UpdateAPIView):
    serializer_class = LinkSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Link.objects.filter(author=user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class TogglePinView(generics.UpdateAPIView):
    """Toggles the pinned status of a link."""
    serializer_class = LinkSerializer
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        try:
            link = Link.objects.get(id=kwargs["pk"], author=request.user)
            link.pinned = not link.pinned  # Toggle pin status
            link.save()
            return Response({"message": "Pin status updated", "pinned": link.pinned})
        except Link.DoesNotExist:
            return Response({"error": "Link not found"}, status=404)