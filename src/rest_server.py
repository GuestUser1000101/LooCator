from __future__ import print_function # In python 2.7
from flask import Flask, render_template, request, redirect, session, json, jsonify, Response


import sys

companies = [{"id": 1, "name": "Company One"}, {"id": 2, "name": "Company Two"}]

api = Flask(__name__)

@api.route('/search', methods=['POST'])
def post_companies():
  content = request.json
  print("\n\n\n", file=sys.stderr)
  print(content['lat'], file=sys.stderr)
  print("\n\n\n", file=sys.stderr)
  
  lat = content['lat']

  print(lat, file=sys.stderr)
  print("\n\n\n", file=sys.stderr)

  long = content['long']
  print(long, file=sys.stderr)
  print("\n\n\n HELLO", file=sys.stderr)
  returnData = [{"success" : True}]
  response = Response(
    response=json.dumps(returnData),
    status=200,
    mimetype='application/json'
  )
  print(returnData, sys.stderr)
  print("\n\n\n HELLO", file=sys.stderr)
  print(response, file=sys.stderr)
  print("\n\n\n HELLO", file=sys.stderr)
  
  return response

if __name__ == '__main__':
    api.run()