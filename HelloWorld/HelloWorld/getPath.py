# -*- coding: utf-8 -*-
import json
from django.shortcuts import render
from django.views.decorators import csrf
from django.http import HttpResponse
from neomodel import db
from TestModel.models import person
from django.template import RequestContext
def index(request):
    return render(request, 'web.html')

def small(request):
    return render(request, 'sweb.html')

def shortest1(request):

    from neo4j.v1 import GraphDatabase, basic_auth

    driver = GraphDatabase.driver("bolt://222.29.197.234:7687")
    session = driver.session()
    ctx = {}
    if request.POST:
        id1 = (int)(request.POST.get('node1'))
        id2 = (int)(request.POST.get('node2'))
        print id1, id2
        result = session.run("match (s),(d) where s.id = {id1} and d.id = {id2} match p=shortestPath((s)-[*..]->(d))"
                             "RETURN p",
                             {"id1": id1, "id2": id2})
        print result
        for record in result:
            print record
            ctx['path'] = record['p']

    session.close()
    return render(request, "path.html", ctx)

def shortest2(request):
    #ctx = {}
    path = ''
    if request.GET:
        id1 = (request.GET.get('src'))
        id2 = (request.GET.get('des'))
        query = "match (s),(d) where s.id = {id1} and d.id = {id2} match p=shortestPath((s)-[*..]->(d)) RETURN p;"
        params = {"id1": id1, "id2": id2}
        results, meta = db.cypher_query(query, params)
        # print type(results[0][0])
        # print (results[0][0]).nodes, (results[0][0]).relationships
        path += '['
        cnt = 0
        try:
            length = len(results[0][0].nodes)
        except IndexError:
            print "error!!!"
            return HttpResponse(-1)
        else:
            print length
            print type(results[0][0].nodes)
            for i in range(length-1):

                node1 = (results[0][0].nodes)[i]
                node2 = (results[0][0].nodes)[i+1]
                print "node1" + str(node1.properties['id'])
                print "node2" + str(node2.properties['id'])
                cnt += 1
                rel = ''
                if cnt != 1:
                    rel += ','
                rel += '[' + node1.properties['id'] + ',' +node2.properties['id'] +']'
                path += rel
                #path += ','+ (node.properties['id'])
            path += ']'
            #ctx['path'] = path
            # nodes返回的结果就是最短路径上的所有节点，下面就是要把这些节点写成json格式返回客户端 ，让客户端去解析json文件生成可视化路径
            # people = [Person.inflate(row[0]) for row in results]
            print path
        #return HttpResponse(json.dumps(path), content_type='application/json')
        return HttpResponse(path)
        #return render(request, "web.html", ctx)
        #return render_to_response("web.html", ctx, RequestContext(request))
        #return render_to_response('web.html', ctx, context_instance=RequestContext(request))