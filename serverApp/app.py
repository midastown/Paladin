from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
import yaml

app = Flask(__name__)

db = yaml.load(open('db.yaml'), Loader=yaml.BaseLoader)
app.config['MYSQL_HOST'] = db['mysql_host']
app.config['MYSQL_USER'] = db['mysql_user']
app.config['MYSQL_PASSWORD'] = db['mysql_password']
app.config['MYSQL_DB'] = db['mysql_db']

mysql = MySQL(app)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        details = request.json
        url = details['url']
        cur = mysql.connection.cursor()
        results = cur.execute("SELECT * FROM articles WHERE url=%s", [url])
        if results > 0:
            votes = cur.fetchall()
            valid = votes[0][1]
            fake = votes[0][2]
            data = {'valid': valid, 'fake': fake}
            return jsonify(data), 200
    else:
        return 'not sucessing'
    

if __name__ == "__main__":
    app.run(debug=True)
