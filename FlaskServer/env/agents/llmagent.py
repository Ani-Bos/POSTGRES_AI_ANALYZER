from langchain_google_genai import ChatGoogleGenerativeAI
import dotenv
class LLMAgent:
    def __init__(self, api_key: str):
        self.model = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash-lite",
            google_api_key=dotenv.get_key(".env", "GEMINI_API_KEY")
        )

    def analyze_with_llm(self, plan_json):
        prompt = f"""
        {plan_json}
        """
        response = self.model.invoke(prompt)
        return response.content
