import React, { useState } from "react";

const QueryPlanner = () => {
  const [query, setQuery] = useState("");
  const [plan, setPlan] = useState("");
  const [analysis, setAnalysis] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resp = await fetch("http://localhost:5000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const data = await resp.json();
    console.log(data)
    setPlan(data.plan);
    setAnalysis(data.analysis);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-md bg-white/5 p-8 rounded-xl">
        <h2 className="text-white text-2xl text-center">Query Plan Analyzer</h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter SQL query"
            className="w-full p-2 bg-gray-800 text-white rounded"
          />

          <button
            type="submit"
            className="w-full bg-indigo-500 p-2 rounded text-white"
          >
            Analyze ✨
          </button>
        </form>

        {plan && (
          <div className="mt-4 text-gray-300">
            <h3>Query Plan:</h3>
            <pre>{JSON.stringify(plan, null, 2)}</pre>
          </div>
        )}

        {analysis && (
          <div className="mt-4 text-gray-300">
            <h3>AI Analysis:</h3>
            <pre>{analysis}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default QueryPlanner;
