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
    
    def executeQueryPlan(self, query):
        try:
            connection = self.connectTODB()
            cursor = connection.cursor()
            cursor.execute(f"EXPLAIN (ANALYZE, VERBOSE, BUFFERS, FORMAT JSON) {query}")
            plan = cursor.fetchone()[0]   
            cursor.close()
            return plan
        except Exception as e:
            print("Error while connection to postgres DB",e)
            raise e

      