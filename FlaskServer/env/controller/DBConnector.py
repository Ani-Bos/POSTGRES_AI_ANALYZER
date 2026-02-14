import psycopg2

class DBConnector:
    def __init__(self, host, database, port, username, password):
        self.host = host
        self.database = database
        self.port = port
        self.username = username
        self.password = password

    def connectTODB(self):
        return psycopg2.connect(
            host=self.host,
            database=self.database,
            port=self.port,
            user=self.username,
            password=self.password
        )
    


      