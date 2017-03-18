from django.shortcuts import render
from django.http import JsonResponse
import sqlite3

def read(request):
	# Get data from request
	if request.method == "GET":
		msg = request.GET
	#elif request.method == "POST":
	else:
		msg = request.POST

	acc = msg.get('account')

	# Insert to databse
	"""
	con = sqlite3.connect("/home/ubuntu/Goddo/GodDo/DB/test.db")
	cur = con.cursor()
	query = "SELECT * FROM test WHERE (account = \"%s\");" % acc
	cur.execute(query)
		
	con.close()
	"""
	result = {'ret': "OK"
		, 'data':[{'id':123, 'text':'test_text', 'deadline':'2009-03-02'}]}
	return JsonResponse(result)
