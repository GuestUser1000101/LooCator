from __future__ import print_function # In python 2.7
from flask import Flask, render_template, request, redirect, session, json, jsonify, Response
from flask_cors import CORS

from database_search import DateConstraint, DatabaseSearch

import sys

#reqs = ['Parking', 'ParkingAccessible', 'MLAK24', 'PaymentRequired', 'ChaningPlaces', 'Shower', 'BabyChange', 'DumpPoint', 'Unisex', 'Accessible', 'SharpsDisposal', 'DrinkingWater', 'SanitaryDisposal']

api = Flask(__name__)
CORS(api)

@api.route('/search', methods=['POST'])
def post_companies():
  content = request.json
  print("\n\n\n", file=sys.stderr)
  print(content, file=sys.stderr)
  print("\n\n\n", file=sys.stderr)
  reqs = []
  for key in content['requirementJson']:
    value = content['requirementJson'][key]
    print("The key and value are ({}) = ({})".format(key, value))
    reqs.append(key)
  lat = content['lat']

  print(lat, file=sys.stderr)
  print("\n\n\n", file=sys.stderr)

  long = content['long']
  print(long, file=sys.stderr)
  print("\n\n\n HELLO", file=sys.stderr)


  returnData = DatabaseSearch.search(content['lat'], content['long'], content['searchResults'], content['time'], reqs)
  response = Response(
    response=returnData,
    status=201,
    mimetype='application/json'
  )
  print(returnData, sys.stderr)
  print("\n\n\n HELLO", file=sys.stderr)
  print(response, file=sys.stderr)
  print("\n\n\n HELLO", file=sys.stderr)
  
  return response

if __name__ == '__main__':
    api.run()