from django.urls import path
from . import views

urlpatterns = [
    path("current-user/", views.CurrentUser.as_view(), name="current-user"),
    path("links/", views.LinkListCreate.as_view(), name="link-list"),
    path("links/recent", views.RecentLinks.as_view(), name="recent-links"),
    path("links/count/", views.LinkListCount.as_view(), name="link-count"),
    path("links/pinned/", views.PinnedLinksList.as_view(), name="pinned-links"),
    path("links/pinned/count/", views.PinnedLinkListCount.as_view(), name="pinned-links-count"),
    path("links/<int:pk>/delete/", views.LinkDelete.as_view(), name="delete-link"),
    path("links/<int:pk>/pin/", views.TogglePinView.as_view(), name="toggle-pin"),
    path("links/<int:pk>/update/", views.LinkUpdate.as_view(), name="update-link"),

    path("collections/", views.CollectionListCreate.as_view(), name="collection-list"),
    path("collections/count/", views.CollectionCount.as_view(), name="collection-count"),
    path("collections/<int:pk>", views.CollectionDetail.as_view(), name="collection-detail"),
    path("collections/<int:pk>/delete/", views.CollectionDelete.as_view(), name="delete-collection")
]