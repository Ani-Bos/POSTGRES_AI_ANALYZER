import sqlglot
from sqlglot.errors import ParseError

class QueryParser:
    def __init__(self,query):
        self.query = query
    def checkQuery(self):
       try:
            isSQL = False
            if(sqlglot.parse_one(self.query,read="postgres")):
                isSQL = True
            
            return isSQL 
       except ParseError as e:
         print("Failed to validate expression",e)
    

        
#pip install toon-llm