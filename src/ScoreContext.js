import React, { createContext, useEffect, useState } from "react";
import useLocalStorage from "./Custom Hooks/useLocalStorage";
const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [userName, setUserName] = useState(null);
  const [questions, setQuestions] = useState();
  const [scoreArray, setScoreArray] = useLocalStorage("Score_Array", []);

  const saveNameInLocalStorage = (name) => {
    localStorage.setItem("Name", name);
    setUserName(name);
  };

  useEffect(() => {
    const name = localStorage.getItem("Name");
    setUserName(name);
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple`
    );
    const data = await res.json();
    setQuestions(data.results);
    //Setting my questions State
  };
  const saveScoreInLocalStorage = (score) => {
    setScoreArray((prevScores) => {
      return [...prevScores, JSON.stringify(score)];
    });
  };

  return (
    <ScoreContext.Provider
      value={{
        score,
        setScore,
        saveNameInLocalStorage,
        userName,
        questions,
        setQuestions,
        saveScoreInLocalStorage,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

export default ScoreContext;
