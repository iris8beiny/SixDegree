# -*- coding: utf-8 -*-
from __future__ import unicode_literals
'''
from django.db import models
from datetime import datetime
from django_neomodel import DjangoNode
from neomodel import StructuredNode, StringProperty, DateTimeProperty, UniqueIdProperty

# Create your models here.

class Book(DjangoNode):
    uid = UniqueIdProperty()
    title = StringProperty(unique_index=True)

    status = StringProperty(choices=(
            ('Available', 'A'),
            ('On loan', 'L'),
            ('Damaged', 'D'),
        ), default='Available')
    created = DateTimeProperty(default=datetime.utcnow)

    class Meta:
        app_label = 'library'

class BookForm(ModelForm):
    class Meta:
        model = Book
        fields = ['title', 'status']
'''

from neomodel import (config, StructuredNode, StringProperty, IntegerProperty,
    UniqueIdProperty, RelationshipTo, RelationshipFrom)

config.DATABASE_URL = 'bolt://neo4j:test@localhost:7687'


class person(StructuredNode):
    id = IntegerProperty(unique_index=True)

    # traverse outgoing IS_FROM relations, inflate to Country objects
    following_p = RelationshipTo('person', 'FOLLOW')
    followed_p = RelationshipFrom('person', 'FOLLOW')













