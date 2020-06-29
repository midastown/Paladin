from flask import Flask, request
from flask_mysqldb import MySQL
import yaml

app = Flask(__name__)

db = yaml.load(open('db.yaml'))
app.configure('MYSQL_HOST') = db['mysql_host']
app.configure('MYSQL_USER') = db['mysql_user']
app.configure('MYSQL_PASSWORD') = db['mysql_password']
app.configure('MYSQL_DB') = db['mysql_db']

mysql = MySQL(app)

@app.route('/', methods=['GET', 'POST'])
def index():
    # if GET method
    cur = mysql.connection.cursor()
    url = request.message[1]           # request sent from content.js
    table = cur.execute("SELECT * FROM votes WHERE url = " + url) # need to check url before tho
    if table > 0:      # if url exists
        votes = cur.fetchall()
        return render_template('votes.html', votes=votes)

        
    # if POST method
    msg = request.message
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO votes(url, valid, invalid) VALUES(%s, %s)", (msg[1], msg[2], msg[3]))
    mysql.connection.commit()
    cur.close()

    return


    

if __name__ == "__main__":
    app.run(debug=True)
