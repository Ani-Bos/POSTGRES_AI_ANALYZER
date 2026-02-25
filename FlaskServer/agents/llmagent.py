from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain_postgres import PGVector
from langchain_classic.memory import VectorStoreRetrieverMemory, ConversationBufferMemory, CombinedMemory
# from langchain.chains import ConversationChain
from langchain_classic.chains import ConversationChain
from langchain_core.documents import Document
import os
from dotenv import load_dotenv

load_dotenv()


class LLMAgent:
    def __init__(self):

        self.model = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash-lite",
            google_api_key=os.getenv("GEMINI_API_KEY"),
            temperature=0.2
        )

        embeddings = GoogleGenerativeAIEmbeddings(
            model="models/embedding-001",
            google_api_key=os.getenv("GEMINI_API_KEY")
        )

        CONNECTION_STRING = "postgresql+psycopg2://postgres:postgres@db:5432/postgres"
        collection_name = "chat_memory"
        vector_store = PGVector(
            embeddings=embeddings,
            collection_name=collection_name,
            connection=CONNECTION_STRING,
            use_jsonb=True,
        )

        self.retriever = vector_store.as_retriever(
            search_kwargs={"k": 5}
        )
        self.memory = ConversationBufferMemory(
            memory_key="history",
            return_messages=True
        )

    def text_to_sql(self, message: str):

        prompt = f"""
        You are a PostgreSQL expert.

        Rules:
        - Only return SQL.
        - Do not include explanations.
        - Use proper PostgreSQL syntax.
        - Limit results to 10 rows unless specified.

        User request:
        {message}

        SQL:
        """

        response = self.model.invoke(prompt)
        sql = response.content.strip()

        sql = sql.replace("```sql", "").replace("```", "").strip()

        return sql


    def chat(self, message: str):

        docs = self.retriever.get_relevant_documents(message)

        long_term_context = "\n".join(
            [doc.page_content for doc in docs]
        )

 
        history_data = self.memory.load_memory_variables({})
        chat_history = history_data.get("history", "")


        prompt = f"""
        You are an intelligent SQL assistant.

        Chat History:
        {chat_history}

        Relevant Long-Term Context:
        {long_term_context}

        User: {message}
        Assistant:
        """


        response = self.model.invoke(prompt)
        answer = response.content

        self.memory.save_context(
            {"input": message},
            {"output": answer}
        )

        self.vectorstore.add_documents([
            Document(
                page_content=f"User: {message}\nAssistant: {answer}",
                metadata={"type": "conversation"}
            )
        ])

        return answer

