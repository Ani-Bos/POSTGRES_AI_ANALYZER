import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Home from "./components/Home";
import QueryPlanner from "./components/QueryPlanner";
import DbConnector from "./components/DbConnector";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import Prism from "prismjs";
import "prismjs/components/prism-sql";
import ChatInterface from "./components/ChatInterface";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/DBConnector" element={<DbConnector />} />
        <Route path="/QueryPlanner" element={<QueryPlanner />} />
        <Route path="/ChatInterface" element={<ChatInterface />} />
      </Routes>
    </Router>
  );
}
export default App;
