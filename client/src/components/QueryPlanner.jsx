import React from 'react'

const QueryPlanner = () => {
  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute top-[-10rem] left-1/2 -translate-x-1/2 h-[32rem] w-[32rem] rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 opacity-30 blur-3xl" />
        <div className="absolute bottom-[-10rem] right-1/2 translate-x-1/2 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-pink-500 to-indigo-500 opacity-20 blur-3xl" />
      </div>

      {/* Content */}
      <main className="flex min-h-screen items-center justify-center px-6">
        {/* Glass Card */}
        <div className="w-full max-w-md rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-white text-center">
            Query Plan Analyzer
          </h2>


          <form className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="query"
                className="block mb-1 text-sm font-medium text-gray-300"
              >
                Enter your Query
              </label>
              <input
                type="text"
                id="query"
                placeholder="Enter the SQl query to analyze"
                className="w-full rounded-md bg-gray-900 border border-white/10 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            

            <button
              type="submit"
              className="w-full rounded-md bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Analyze
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default QueryPlanner