# -*- coding: utf-8 -*-

from django.shortcuts import render
from django.views.decorators import csrf


# 接收POST请求数据

def search_post(request):
    ctx = {}
    if request.POST:
        ctx['rlt'] = request.POST['q']
    return render(request, "post.html", ctx)

def visit_neo4j(request):

    from neo4j.v1 import GraphDatabase, basic_auth

    driver = GraphDatabase.driver("bolt://222.29.197.234:7687")
    session = driver.session()
    ctx = {}
    if request.POST:
        id = (int)(request.POST.get('node'))
        print id
        result = session.run("MATCH (a) WHERE a.id = {id} "
                             "RETURN a.name",
                             {"id": id})
        print result
        for record in result:
            print record
            ctx['name'] = record['a.name']

    session.close()
    return render(request, "post.html", ctx)