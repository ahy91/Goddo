import sqlite3
from django.shortcuts import render

def index(request):
	msg = "hello world" 
	return render(request, 'index.html', {'message': msg})
