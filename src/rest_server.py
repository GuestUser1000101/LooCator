from __future__ import print_function # In python 2.7
from flask import Flask, render_template, request, redirect, session, json


import sys

companies = [{"id": 1, "name": "Company One"}, {"id": 2, "name": "Company Two"}]

api = Flask(__name__)

@api.route('/search', methods=['POST'])
def post_companies():
  print("\n\n\n", file=sys.stderr)
  print(request, file=sys.stderr)
  print("\n\n\n", file=sys.stderr)
  print(request.form, file=sys.stderr)
  lat = request.form['lat']
  long = request.form['long']
  return json.dumps({"success": True}), 201

if __name__ == '__main__':
    api.run()