from django.conf.urls import url

from .views import ProfileRetrieveAPIView, ProfilesRetrieveAPIView, ProfileFollowAPIView, FollowersAPIView

app_name = 'profiles'

urlpatterns = [
    url(r'^profile/followers/?$', FollowersAPIView.as_view()),
    url(r'^profile/(?P<username>\w+)/?$', ProfileRetrieveAPIView.as_view()),
    url(r'^profiles/(?P<username>\w+)/?$', ProfilesRetrieveAPIView.as_view()),
    url(r'^profiles/(?P<username>\w+)/follow/?$', 
        ProfileFollowAPIView.as_view()),

]
