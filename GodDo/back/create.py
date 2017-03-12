from django.shortcuts import render
from django.http import JsonResponse
import sqlite3

def create(request):
	# Get data from request
	if request.method == "GET":
		msg = request.GET
	#elif request.method == "POST":
	else:
		msg = request.POST

	id_v = msg.get('id')
	text = msg.get('text')
	deadline = msg.get("deadline")
	acc = msg.get('account')

	# Insert to databse
	con = sqlite3.connect("/home/ubuntu/Goddo/GodDo/DB/test.db")
	cur = con.cursor()
	query = "INSERT INTO test VALUES(%s, \"%s\", \"%s\", \"%s\");" % (id_v, text, deadline, acc)
	cur.execute(query)
	#cur.execute("INSERT INTO test VALUES(?, ?, ?, ?);", (id_v, text, deadline, acc))
	con.commit()
	con.close()

#return render(request, 'html/index.html', {})
	return JsonResponse({'ret':'OK'})
