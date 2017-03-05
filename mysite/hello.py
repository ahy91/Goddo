import sqlite3
from django.shortcuts import render

def index(request):
	con = sqlite3.connect("/home/ubuntu/Goddo/mysite/DB/test.db")
	cur = con.cursor()
	cur.execute("SELECT * FROM test;")
	for row in cur:
		msg = row
		return render(request, 'index.html', {'message': msg})
