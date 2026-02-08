import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute top-[-10rem] left-1/2 -translate-x-1/2 h-[30rem] w-[30rem] rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 opacity-30 blur-3xl" />
        <div className="absolute bottom-[-10rem] right-1/2 translate-x-1/2 h-[30rem] w-[30rem] rounded-full bg-gradient-to-tr from-pink-500 to-indigo-500 opacity-20 blur-3xl" />
      </div>

      {/* Content */}
      <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
          PostgreSQL Query Planner
          <br />
          <span className="text-indigo-400">& Analyzer AI</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-400 sm:text-xl">
          Summarize Query plan and inmprovise and give insights to PostgreSQL query using AI
        </p>

        <div className="mt-10">
                  <button onClick={() => {
                      navigate("/DBConnector")
          }} className="rounded-md bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-400 transition">
            Get Started
          </button>
        </div>

        {/* <pre className="mt-12 max-w-xl rounded-lg bg-black/40 p-4 text-left text-sm text-green-400">
          {`Hash Join  (cost=125.00..450.00 rows=12000)
  -> Seq Scan on orders
  -> Index Scan using idx_customers_id`}
        </pre> */}
      </main>
    </div>
  );
};

export default Home;
