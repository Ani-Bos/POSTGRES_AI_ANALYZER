import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// psql -U username -d dbname -h localhost -p 5444
const DbConnector = () => {
  const navigate = useNavigate();
  const [host, setHost] = useState("");
  const [dbname, setDbname] = useState(""); 
  const [port, setPort] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const requestToDatabse = async () => {
    try {
      const resp = await fetch("http://localhost:5000/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          host,
          database: dbname,
          port: Number(port),
          username,
          password,
        }),
      });

      const res = await resp.json();
      console.log(res);

      if (resp.ok) {
        navigate("/QueryPlanner");
      } else {
        alert(res.error || "Connection failed");
      }
    } catch (err) {
      console.error("Request failed:", err);
    }
  };

  const HandleSubmit = (e)=> {
     e.preventDefault();
    requestToDatabse();
  }
    return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden">
      {/* Gradient background */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute top-[-10rem] left-1/2 -translate-x-1/2 h-[32rem] w-[32rem] rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 opacity-30 blur-3xl" />
        <div className="absolute bottom-[-10rem] right-1/2 translate-x-1/2 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-pink-500 to-indigo-500 opacity-20 blur-3xl" />
      </div>

      {/* Content */}
      <main className="flex min-h-screen items-center justify-center px-6">
        {/* Glass Card */}
        <div className="w-full max-w-md rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-white text-center">
            Connect PostgreSQL Database
          </h2>

          <p className="mt-2 text-center text-sm text-gray-400">
            Provide database credentials to analyze query execution plans
          </p>

          <form className="mt-8 space-y-5">

            <div>
              <label
                htmlFor="host"
                className="block mb-1 text-sm font-medium text-gray-300"
              >
                Host
              </label>
              <input
                type="text"
                  id="host"
                  onChange={(e) => {
                    setHost(e.target.value);
                  }}
                placeholder="localhost"
                className="w-full rounded-md bg-gray-900 border border-white/10 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="dbname"
                className="block mb-1 text-sm font-medium text-gray-300"
              >
                Database Name
              </label>
              <input
                type="text"
                  id="dbname"
                  onChange={(e) => {
                    setDbname(e.target.value);
                  }}
                placeholder="my_database"
                className="w-full rounded-md bg-gray-900 border border-white/10 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="port"
                className="block mb-1 text-sm font-medium text-gray-300"
              >
                Port
              </label>
              <input
                type="text"
                  id="port"
                  onChange={(e) => {
                    setPort(e.target.value)
                  }}
                placeholder="5432"
                className="w-full rounded-md bg-gray-900 border border-white/10 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>


            <div>
              <label
                htmlFor="username"
                className="block mb-1 text-sm font-medium text-gray-300"
              >
                Username
              </label>
              <input
                type="text"
                  id="username"
                  onChange={(e) => {
                    setUsername(e.target.value)
                  }}
                placeholder="postgres"
                className="w-full rounded-md bg-gray-900 border border-white/10 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>


            <div>
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                  id="password"
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                placeholder="••••••••"
                className="w-full rounded-md bg-gray-900 border border-white/10 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>


            <button
                type="submit"
                onClick={HandleSubmit}
              className="w-full rounded-md bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Connect Database
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default DbConnector;
