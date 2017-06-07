# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.
from TestModel.models import person
def get_books(request):
    return render('TestModel/person.html', request, {'peeson': person.nodes.all()})