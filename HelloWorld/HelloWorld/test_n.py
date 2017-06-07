from neo4j.v1 import GraphDatabase, basic_auth
'''
driver = GraphDatabase.driver("bolt://222.29.197.234:7687")
session = driver.session()

session.run("CREATE (a:Person {name: {name}, title: {title}})",
              {"name": "Arthur", "title": "King"})

result = session.run("MATCH (a:Person) WHERE a.name = {name} "
                       "RETURN a.name AS name, a.title AS title",
                       {"name": "Arthur"})
for record in result:
    print("%s %s" % (record["title"], record["name"]))

session.close()
< form
action = "/search-post"
method = "post" >
{ % csrf_token %}
< input
type = "text"
name = "q" >
< input
type = "submit"
value = "Submit" >
< / form >
'''
a = '111'

print type(a)