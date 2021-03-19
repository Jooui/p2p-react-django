import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE','app.settings')

import django
django.setup()

from app.modules.articles.models import Article, Comment, Tag
from app.modules.profiles.models import Profile
from app.modules.authentication.models import User
from faker import Faker

fake = Faker()

def call(N):
    for i in range(N):
        fake_tag = fake.word()
        fake_slug = fake.slug()
        tag = Tag.objects.get_or_create(tag=fake_tag, slug=fake_slug)[0]
        
        fake_slug = fake.slug()
        fake_title = fake.word()
        fake_description = fake.text()
        fake_body = fake.text()
        author = Profile.objects.get_or_create(user__username='revand')[0]
    
        a = Article.objects.get_or_create(slug=fake_slug, title=fake_title, description=fake_description, body=fake_body, author=author)[0]
        a.tags.add(tag)
        
        fake_body = fake.text()
        c = Comment.objects.get_or_create(body=fake_body, article=a, author=author)[0]


if __name__ == '__main__':
    print("Filling random data")
    call(10)
    print("Filling done ")
    