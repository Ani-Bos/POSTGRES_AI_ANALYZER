import React, { useState } from "react";

const Section = ({ title, content }) => {
  if (!content) return null;

  const colorMap = {
    "Query Overview": "bg-blue-900/40 border-blue-500",
    "Performance Summary": "bg-green-900/40 border-green-500",
    "Execution Plan Analysis": "bg-purple-900/40 border-purple-500",
    "Performance Issues": "bg-red-900/40 border-red-500",
    "Optimization Suggestions": "bg-yellow-900/40 border-yellow-500",
    "Index Recommendations": "bg-indigo-900/40 border-indigo-500",
  };

  const styles = colorMap[title] || "bg-gray-800 border-gray-600";

  return (
    <div className={`mb-8 p-6 rounded-xl border ${styles} backdrop-blur-sm`}>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="text-gray-200 whitespace-pre-wrap leading-relaxed">
        {content}
      </div>
    </div>
  );
};


const QueryPlanner = () => {
  const [query, setQuery] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);


  const parseAnalysisText = (text) => {
    const sections = {
      queryOverview: "",
      performanceSummary: "",
      executionPlanAnalysis: "",
      performanceIssues: "",
      optimizationSuggestions: "",
      indexRecommendations: "",
    };

    const splitRegex =
      /1\. Query Overview:|2\. Performance Summary:|3\. Execution Plan Analysis:|4\. Performance Issues:|5\. Optimization Suggestions:|6\. Index Recommendations:/g;

    const parts = text.split(splitRegex).filter(Boolean);

    if (parts.length >= 6) {
      sections.queryOverview = parts[0].trim();
      sections.performanceSummary = parts[1].trim();
      sections.executionPlanAnalysis = parts[2].trim();
      sections.performanceIssues = parts[3].trim();
      sections.optimizationSuggestions = parts[4].trim();
      sections.indexRecommendations = parts[5].trim();
    }

    return sections;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAnalysis(null);

    try {
      const resp = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await resp.json();

      if (data.error) {
        setAnalysis({ error: data.error });
      } else {
        // 🔥 Parse the plain text response
        const structured = parseAnalysisText(data.summary);
        setAnalysis(structured);
      }
    } catch (err) {
      setAnalysis({ error: err.message });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold text-white mb-8">
        🚀 AI Query Plan Analyzer
      </h1>

      <div className="w-full max-w-4xl bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your SQL query..."
            rows="4"
            className="w-full p-4 bg-gray-900 text-gray-200 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all p-3 rounded-xl text-white font-semibold shadow-lg"
          >
            Analyze Query ✨
          </button>
        </form>
      </div>

      {loading && (
        <div className="mt-8 text-indigo-400 font-semibold animate-pulse">
          Analyzing Query Plan...
        </div>
      )}

      {analysis && !loading && (
        <div className="w-full max-w-4xl mt-10 bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-700">
          {analysis.error ? (
            <div className="text-red-400 font-semibold">{analysis.error}</div>
          ) : (
            <>
              <Section
                title="Query Overview"
                content={analysis.queryOverview}
              />
              <Section
                title="Performance Summary"
                content={analysis.performanceSummary}
              />
              <Section
                title="Execution Plan Analysis"
                content={analysis.executionPlanAnalysis}
              />
              <Section
                title="Performance Issues"
                content={analysis.performanceIssues}
              />
              <Section
                title="Optimization Suggestions"
                content={analysis.optimizationSuggestions}
              />
              <Section
                title="Index Recommendations"
                content={analysis.indexRecommendations}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default QueryPlanner;
