from flask import request, make_response
from flask_restx import Resource, Namespace

from service.reputation_service import reputation_generator

Reputation = Namespace('reputation')

@Reputation.route('')
class TestClass(Resource):
    def post(self):
        text = request.json.get("text")

        result = reputation_generator(text)
        # result = {
        #     "pos" : 0.4312,
        #     "neg" : 0.7492
        # }

        return make_response(result, 200)
