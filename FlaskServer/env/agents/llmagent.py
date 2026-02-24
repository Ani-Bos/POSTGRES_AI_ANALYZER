from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import PGVector
# from langchain.memory import VectorStoreRetrieverMemory, ConversationBufferMemory, CombinedMemory
from langchain_classic.memory import VectorStoreRetrieverMemory, ConversationBufferMemory, CombinedMemory
# from langchain.chains import ConversationChain
from langchain_classic.chains import ConversationChain
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

        vectorstore = PGVector(
            connection_string=CONNECTION_STRING,
            embedding_function=embeddings,
            collection_name="chat_memory"
        )


        vector_memory = VectorStoreRetrieverMemory(
            retriever=vectorstore.as_retriever()
        )

        buffer_memory = ConversationBufferMemory(
            return_messages=True
        )

        self.memory = CombinedMemory(memories=[
            buffer_memory,
            vector_memory
        ])


        self.chain = ConversationChain(
            llm=self.model,
            memory=self.memory,
            verbose=True
        )

    def chat(self, message):
        return self.chain.predict(input=message)