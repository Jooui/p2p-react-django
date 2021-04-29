import datetime
from django.core.cache import cache
from django.conf import settings

class ActiveUserMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.process_request(request)
        print("aaaa")
        print(request.user)
        return response


    def process_request(self, request):
        print(request.user)
        # request = self.context.get('request', None)
        print("ENTRA MIDDLEWARE!!!!!!!!!!!")
        current_user = request.user
        print(request.user)
        if request.user.is_authenticated:
            now = datetime.datetime.now()
            cache.set('seen_%s' % (current_user.username), now, settings.USER_LASTSEEN_TIMEOUT)


