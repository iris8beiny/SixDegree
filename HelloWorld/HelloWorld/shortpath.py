# -*- coding: utf-8 -*-

from django.http import HttpResponse
from neomodel import db
from TestModel.models import person

# 数据库操作
def testdb(request):
    #p1 = Person(id=7).save()
    '''
    p2 = Person.nodes.get(id=2)
    p4 = Person.nodes.get(id=4)
    print p2, p4
    p2.knowing_p.connect = p4
    if p2.knowing_p.is_connected(p4):
        print("Jim's from Germany")
    '''
    query = 'match (n) return count(n)'
    #query = "match (s),(d) where s.id = {id1} and d.id = {id2} match p=shortestPath((s)-[*..]->(d)) RETURN p;"
    params = {"id1": 1, "id2": 4}
    results, meta = db.cypher_query(query, params)
    print results
    #print type(results[0][0])
    #print (results[0][0]).nodes, (results[0][0]).relationships
    #path =''
    #for node in results[0][0].nodes:
    #    path += (str)(node.properties['id'])+'->'
    #nodes返回的结果就是最短路径上的所有节点，下面就是要把这些节点写成json格式返回客户端 ，让客户端去解析json文件生成可视化路径
    #people = [Person.inflate(row[0]) for row in results]
    return HttpResponse("<p>"+"success!"+"</p>")