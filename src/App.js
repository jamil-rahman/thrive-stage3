import styles from "./App.module.css";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/HomePage/Home";
import Result from "./views/ResultPage/Result";
import Quiz from "./views/QuizPage/Quiz";

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/quiz" element={<Quiz />} />
          <Route exact path="/result" element={<Result />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
