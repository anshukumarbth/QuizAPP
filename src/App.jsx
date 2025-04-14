import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizHome from "./components/QuizHome/QuizHome";
import QuizPage from "./components/QuizPage/QuizPage";

function App() {
  const [Questions, setQuestions] = useState([]);
  useEffect(() => {
    fetch("/data/db.json")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.data.questions);
        console.log(data.data.questions);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizHome />} />
        <Route path="/quizpage" element={<QuizPage questions={Questions} />} />
        <Route path="/results" element={<h1>Results Page</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
