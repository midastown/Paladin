from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import yaml

app = Flask(__name__)

db = yaml.load(open('db.yaml'), Loader=yaml.BaseLoader)
app.config['MYSQL_HOST'] = db['mysql_host']
app.config['MYSQL_USER'] = db['mysql_user']
app.config['MYSQL_PASSWORD'] = db['mysql_password']
app.config['MYSQL_DB'] = db['mysql_db']

mysql = MySQL(app)

limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        url = request.args.get('url')
        cur = mysql.connection.cursor()
        results = cur.execute("SELECT * FROM articles WHERE url=%s", [url])
        if results > 0:
            votes = cur.fetchall()
            data = jsonify(isError=False, 
                    message="Success", statusCode=200,
                    valid=votes[0][1], fake=votes[0][2])
            return data, 200
        return jsonify(isError=True, message="Failure", statusCode=418), 418
    
    if request.method == 'POST':
        url = request.args.get('url')
        valid = int(request.args.get('valid'))
        fake = int(request.args.get('fake'))
        cur = mysql.connection.cursor()
        results =  cur.execute("SELECT * FROM articles WHERE url=%s", [url])
        if results > 0:
            votes = cur.fetchall()
            if valid > 0:
                cur.execute("UPDATE articles SET valid = valid + 1 WHERE url=%s", [url])
            else:
                cur.execute("UPDATE articles SET fake = fake + 1 WHERE url=%s", [url])
            mysql.connection.commit()
            data = jsonify(isError=False,
                    message="Success", statusCode=200,
                    good=votes[0][1] + valid, bad=votes[0][2] + fake)
            return data, 200
        
        cur.execute('INSERT INTO articles(url, valid, fake) VALUES(%s, %s, %s)', [url, valid, fake])
        mysql.connection.commit()
        data = jsonify(isError=False,
                message="Success",
                good=valid, bad=fake,
                statusCode=200)
        return data, 200
    

if __name__ == "__main__":
    app.run(debug=True)








