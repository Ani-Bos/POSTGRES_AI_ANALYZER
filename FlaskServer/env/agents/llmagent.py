from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
import os
import json
load_dotenv()

class LLMAgent:
    def __init__(self):
        self.model = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash-lite",
            google_api_key=os.getenv("GEMINI_API_KEY")
        )

    def analyze_with_llm(self, plan_json):

        formatted_plan = json.dumps(plan_json, indent=2)

        prompt = f"""
        You are a PostgreSQL performance expert.

        Below is a query execution plan in JSON format:

        {formatted_plan}

        Please:
        - Summarize what the query is doing
        - Identify costly operations
        - Suggest performance improvements
        """

        response = self.model.invoke(prompt)
        return response.content
