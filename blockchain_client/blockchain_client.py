from flask import Flask, jsonify, render_template
from argparse import ArgumentParser
import Crypto
import Crypto.Random
from Crypto.PublicKey import RSA
import binascii

class Transaction:
  def __init__(self, sender_address, sender_private_key, receiver_address, value):
    self.sender_address = sender_address
    self.sender_private_key = sender_private_key
    self.receiver_address = receiver_address
    self.value = value


app = Flask(__name__)

@app.route('/')
def index():
  return render_template('index.html')
  
@app.route('/make/transaction')
def make_transaction():
  return render_template('make_transaction.html')
    
@app.route('/view/transactions')
def view_transactions():
  return render_template('view_transactions.html')

@app.route('/wallet/new')
def new_wallet():
  random_gen = Crypto.Random.new().read
  private_key = RSA.generate(1024, random_gen)
  public_key = private_key.publickey()

  response = {
    'private_key': binascii.hexlify(private_key.export_key(format('DER'))).decode('ascii'),
    'public_key': binascii.hexlify(public_key.export_key(format('DER'))).decode('ascii')
  }
  return jsonify(response), 200

if __name__ == '__main__':
  parser = ArgumentParser()
  parser.add_argument('-p', '--port', default=8081, type=int, help="port to listen to")
  args = parser.parse_args()
  port = args.port

  app.run(host='127.0.0.1', port = port, debug=True)

