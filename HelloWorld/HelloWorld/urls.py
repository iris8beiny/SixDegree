"""HelloWorld URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin

from django.conf.urls import url

from . import view, search, search2, getPath, testdb, shortpath

urlpatterns = [
    url(r'^index$', view.index),
    url(r'^add/((?:-|\d)+)/((?:-|\d)+)/$', view.add),
    #url(r'^$', view.hello),
    url(r'^search_form$', search.search_form),
    url(r'^search$', search.search),
    url(r'^search-post$', search2.search_post),
    url(r'^search-post$', search2.visit_neo4j),
    url(r'^path$', getPath.shortest1),
    url(r'^testdb$', shortpath.testdb),
    url(r'^sixDegree$', getPath.index),
    url(r'^sixDegree/$', getPath.index),
    url(r'^getpath/$', getPath.shortest2),
    url(r'^sixDegree/big$', getPath.small),
    url(r'^big$', getPath.small),
    url(r'^sixDegree/sixDegree/big$', getPath.small),
    url(r'^$', view.index),
    url(r'^add/$', view.add),
    url(r'^ajax_list/$', view.ajax_list),
    url(r'^ajax_dict/$', view.ajax_dict),

]