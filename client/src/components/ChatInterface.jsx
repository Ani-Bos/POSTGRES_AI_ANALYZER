import React, { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";

const ChatInterface = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [sessionID, setSessionID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const toggleSidebar = () => setSidebar(!sidebar);
  useEffect(() => {
    if (sidebar) {
      console.log("eNTERING into fetching sessions data")
      fetch("http://localhost:5000/session")
        .then((res) => res.json())
        .then((data) => setSessions(data.sessions));
    }
  }, [sidebar]);
  const loadSession = async (id) => {
    console.log("eNTERING into fetching sessions data using session id");
    const res = await fetch(`http://localhost:5000/session/${id}`);
    const resp = await res.json();
    console.log("session messgae data is ", resp)
    setMessages(resp.messages);
    setSessionID(id);
    setSidebar(false);
  };
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
        body: JSON.stringify({
          message: userMessage.content,
          session_id: sessionID,
        }),
      });
      const data = await res.json();
      console.log("chat response from llm ", data);
      if (!sessionID) {
        setSessionID(data.session_id);
      }
      const botMessage = {
        role: "assistant",
        content: data.response,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong." ,e},
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-black text-white min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {sidebar && (
        <div className="w-64 bg-gray-900 p-4 overflow-y-auto">
          <h2 className="font-bold mb-4">Chat History</h2>
          {sessions.map((session) => (
            <div
              key={session.id}
              onClick={() => loadSession(session.id)}
              className="p-2 mb-2 bg-gray-800 rounded cursor-pointer hover:bg-gray-700"
            >
              {session.title}
            </div>
          ))}
        </div>
      )}

      <div className="flex-1 flex flex-col items-center p-6">
        <FiMenu
          className="text-3xl cursor-pointer self-start mb-4"
          onClick={toggleSidebar}
        />

        <h1 className="text-3xl font-bold mb-6">🚀 Postgres AI Agent</h1>

        <div className="w-full max-w-3xl bg-gray-900 p-6 rounded-xl flex flex-col h-[70vh]">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  msg.role === "user" ? "bg-indigo-600 self-end" : "bg-gray-700"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything about your database..."
              rows="3"
              className="w-full p-3 bg-gray-800 rounded-lg mb-3"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 p-3 rounded-lg"
            >
              {loading ? "Generating..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
