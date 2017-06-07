'''
def application(env, start_response):
	start_response('200 OK', [('Content-Type','text/html')])
	return "Hello World"
'''

t = (1,2,3)
print len(t),type(t),t[0]