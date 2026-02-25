import React, { useState } from "react";

const ChatInterface = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatResponse, setChatResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setChatResponse("");

    try {
      console.log("Sending query to backend:", query);
      const res = await fetch("http://localhost:5000/textToSQL", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }), 
      });
      const resp = await res.json();
      console.log("response is",resp.response)
      if (resp.error) {
        setChatResponse(resp.error);
      } else {
        setChatResponse(resp.response);
      }
    } catch (e) {
      setChatResponse("Something went wrong",e);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold text-white mb-8">
        🚀 Ask Postgres Agent
      </h1>

      <div className="w-full max-w-4xl bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything about your database..."
            rows="4"
            className="w-full p-4 bg-gray-900 text-gray-200 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all p-3 rounded-xl text-white font-semibold shadow-lg disabled:opacity-50"
          >
            {loading ? "Generating..." : "Ask ✨"}
          </button>
        </form>
      </div>

      {chatResponse && (
        <div className="bg-gray-800 text-white p-6 rounded-xl mt-8 w-full max-w-4xl shadow-lg border border-gray-700">
          <p className="whitespace-pre-wrap">{chatResponse}</p>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
