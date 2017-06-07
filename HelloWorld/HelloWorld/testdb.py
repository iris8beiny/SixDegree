# -*- coding: utf-8 -*-

from django.http import HttpResponse

from TestModel.models import person

# 数据库操作
def testdb(request):
    #p1 = Person(id=7).save()
    p2 = person.nodes.get(id=2)
    p4 = person.nodes.get(id=4)
    print p2, p4
    p2.knowing_p.connect = p4
    if p2.knowing_p.is_connected(p4):
        print("Jim's from Germany")
    return HttpResponse("<p>数据添加成功！</p>")