import sqlite3
from django.shortcuts import render

def create(request):
	# Get data from request
	if request.method == "GET":
		msg = request.GET
	#elif request.method == "POST":
	else:
		msg = request.POST

	id_v = msg['id']
	text = msg['text']
	deadline = msg['deadline']
	acc = msg['account']

	# Insert to databse
	con = sqlite3.connect("/home/ubuntu/Goddo/mysite/DB/test.db")
	cur = con.cursor()
	query = "INSERT INTO test VALUES(%s, \"%s\", \"%s\", \"%s\");" % (id_v, text, deadline, acc)
	row_count = cur.execute(query)
	#cur.execute("INSERT INTO test VALUES(?, ?, ?, ?);", (id_v, text, deadline, acc))
	con.commit()
	con.close()

	return render(request, 'index.html', {'message': query})
