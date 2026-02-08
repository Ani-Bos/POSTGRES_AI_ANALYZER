import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Home from "./components/Home";
import QueryPlanner from "./components/QueryPlanner";
import DbConnector from "./components/DbConnector";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/DBConnector" element={<DbConnector />} />
        <Route path="/QueryPlanner" element={<QueryPlanner />} />
      </Routes>
    </Router>
  );
}
export default App;
