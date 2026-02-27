import React, { useState } from "react";

const ChatInterface = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage = { role: "user", content: query };
    setMessages((prev) => [...prev, userMessage]);
    setQuery("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      });

      const data = await res.json();
      const botMessage = {
        role: "assistant",
        content: data.error ? data.error : data.response,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong." + e},
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold text-white mb-8">
        🚀 Postgres AI Agent
      </h1>

      <div className="w-full max-w-4xl bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-700">
        <div className="space-y-4 mb-6 max-h-[500px] overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white self-end"
                  : "bg-gray-800 text-white"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything about your database..."
            rows="3"
            className="w-full p-4 bg-gray-900 text-gray-200 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all p-3 rounded-xl text-white font-semibold shadow-lg disabled:opacity-50"
          >
            {loading ? "Thinking..." : "Ask ✨"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
