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
	con = sqlite3.connect("/home/ubuntu/Goddo/GodDo/DB/test.db")
	cur = con.cursor()
	query = "SELECT * FROM test WHERE (account = \"%s\");" % acc
	cur.execute(query)

	data = list() 
	for row in cur:
		row_dict ={'id':row[0], 'text':row[1], 'deadline':row[2]}
		data.append(row_dict)
	
	result = {'ret':'OK'}
	result['data'] = data

	con.close()
	
	return JsonResponse(result)
