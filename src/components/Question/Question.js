import { useContext, useState } from "react";
// import Error from "../Error/Error";
import styles from "./Question.module.css";
import classNames from "classnames";
import ScoreContext from "../../ScoreContext";
import { useNavigate } from "react-router-dom";

export default function Question({
  currentQuestion,
  questions,
  choices,
  correctAnswer,
  setCurrentQuestion,
  setQuestions,
}) {
  const [selected, setSelected] = useState();
  // const [error, setError] = useState(false);
  const { setScore, score, saveScoreInLocalStorage } = useContext(ScoreContext);

  let navigate = useNavigate();

  const handleChoice = (choice) => {
    //if choice is correct
    if (selected === choice && selected === correctAnswer)
      return styles.correct;
    //if choice is incorrect
    else if (selected === choice && selected !== correctAnswer)
      return styles.incorrect;
    //if incorrect choice is chosen and show the correct one
    else if (choice === correctAnswer) return styles.correct;
  };

  const handleMarking = (choice) => {
    setSelected(choice);
    if (choice === correctAnswer) setScore(score + 1);

    if (currentQuestion > 8) {
      saveScoreInLocalStorage(score);
      setTimeout(() => {
        navigate("/result");
      }, 1500);
    } else {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelected();
      }, 1500);
    }
  };

  const handleSkip = () => {
    if (currentQuestion > 8) {
      navigate("/result");
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelected();
    }
  };

  const handleSubmit = () => {
    setCurrentQuestion(0);
    setQuestions();
    saveScoreInLocalStorage(score);
    navigate("/result");
  };

  const handlePrevious = () => {
    //takes me to previous question
    setCurrentQuestion(currentQuestion - 1);
    setSelected();
    setScore(score - 1);
  };

  return (
    <div className={styles.question_container}>
      <span className={styles.question_header}>
        Question No. {currentQuestion + 1}
      </span>

      <div className={styles.question}>
        <h3>{questions[currentQuestion].question}</h3>

        <div className={styles.choices_container}>
          {/* For showing any error to users */}
          {/* {error && <Error>{error}</Error>} */}
          {choices &&
            choices.map((choice) => (
              <button
                onClick={() => handleMarking(choice)}
                className={classNames(
                  styles.choice,
                  selected && handleChoice(choice)
                )}
                key={choice}
                disabled={selected}
              >
                {choice}
              </button>
            ))}
        </div>

        <div className={styles.buttons_container}>
          {/* <div className={styles.buttons}>
            <button className={styles.button}>Previous</button>
            <button className={styles.button}>Next</button>
          </div> */}
          <button className={styles.submit_btn} onClick={handleSubmit}>
            Submit
          </button>
          <span className={styles.skip} onClick={handleSkip}>
            Skip this question
          </span>
          {currentQuestion > 0 ? (
            <div>
              <span
                className={styles.previous}
                style={{ marginTop: "20px" }}
                onClick={handlePrevious}
              >
                Previous Question
              </span>
              <span className={styles.warning}>
                (Warning: Going back deducts a point from your current score!)
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
