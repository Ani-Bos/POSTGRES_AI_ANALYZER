import psycopg2

class DBConnector:
    _instance = None
    _connection = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super(DBConnector, cls).__new__(cls)
        return cls._instance

    def __init__(self, host, database, port, username, password):
        if self._connection is None:
            self._connection = psycopg2.connect(
                host=host,
                database=database,
                port=port,
                user=username,
                password=password
            )

    def get_connection(self):
        return self._connection

    def executeQueryPlan(self, query):
        try:
            cursor = self._connection.cursor()
            cursor.execute(
                f"EXPLAIN (ANALYZE, VERBOSE, BUFFERS, FORMAT JSON) {query}"
            )
            plan = cursor.fetchone()[0]
            cursor.close()
            return plan
        except Exception as e:
            raise e