import React, { useState, useEffect, useContext } from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Question from "../../components/Question/Question";
import ScoreContext from "../../ScoreContext";
//import axios from "axios";
import styles from "./Quiz.module.css";

export default function Quiz() {
  // const [questions, setQuestions] = useState();
  const [choices, setChoices] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { userName, score, questions, setQuestions } = useContext(ScoreContext);

  // const fetchQuestions = async () => {
  //   const res = await fetch(
  //     `https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple`
  //   );
  //   const data = await res.json();
  //   setQuestions(data.results);
  //   //Setting my questions State
  // };

  //So fetching questions in this Component made it calling
  //the API in an infinite loop even with dependency provided
  //the idea is to fetch the question once in a component that will
  //mount once. Hence, the fetching is done from my Score Context, instead
  //of in this Component. Keeping the above code for reference that it does
  //not work :)

  useEffect(() => {
    // fetchQuestions();
    setChoices(
      questions &&
        shuffleQuestions([
          questions[currentQuestion]?.correct_answer,
          ...questions[currentQuestion]?.incorrect_answers,
        ])
    );
    //console.log(questions);
  }, [questions, currentQuestion]);

  const shuffleQuestions = (choices) => {
    return choices.sort(() => Math.random() - 0.5);
  };

  return (
    <div className={styles.quiz_container}>
      <div className={styles.quiz_header}>
        <p>Hey {userName}, answer as much as you can!</p>
      </div>
      {questions ? (
        <>
          <div className={styles.score_card}>Score: {score} </div>

          <Question
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            questions={questions}
            choices={choices}
            correctAnswer={questions[currentQuestion]?.correct_answer}
            setQuestions={setQuestions}
          />
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}
