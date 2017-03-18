from django.shortcuts import render
from django.http import JsonResponse
import sqlite3

def update(request):
	# Get data from request
	if request.method == "GET":
		msg = request.GET
	#elif request.method == "POST":
	else:
		msg = request.POST

	id_v = msg.get('id')
	text = msg.get('text')
	acc = msg.get('account')

	# Insert to databse
	con = sqlite3.connect("/home/ubuntu/Goddo/GodDo/DB/test.db")
	cur = con.cursor()
	#query = "SELECT * FROM test WHERE (account = \"%s\");" % acc
	query = "UPDATE test SET text = \"%s\" WHERE id = %s AND account = \"%s\";" % (text, id_v, acc)
	cur.execute(query)

	con.commit()
	con.close()

	# need to check if query did well
	result = {'ret':'OK'}

	return JsonResponse(result)
