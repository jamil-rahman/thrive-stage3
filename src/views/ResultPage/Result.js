import React, { useContext, useEffect, useState } from "react";
import ScoreContext from "../../ScoreContext";
import useWindowDimensions from "../../Custom Hooks/useWindowSize";
import Confetti from "react-confetti";
import styles from "./Result.module.css";
import { useNavigate } from "react-router-dom";

export default function Result() {
  const { score, userName } = useContext(ScoreContext);
  const { height, width } = useWindowDimensions();
  const [scoreArray, setScoreArray] = useState([]);

  let navigate = useNavigate();
  //console.log(sumValues);

  useEffect(() => {
    setScoreArray(JSON.parse(localStorage.getItem("Score_Array")));
  }, []);

  return (
    <div className={styles.result_container}>
      <Confetti width={width} height={height} />
      <p className={styles.text}>
        Congratulations {userName}! You scored {score}{" "}
        {score > 1 ? `points!` : `point`}
      </p>
      <button className={styles.btn} onClick={() => navigate("/quiz")}>
        <i className="fa fa-undo" aria-hidden="true"></i>
        <span>Try Again</span>
      </button>

      <div className={styles.statistics_container}>
        <div className={styles.header}>
          <h3>Your Statistics</h3>
        </div>
        <ul>
          <li>Total Quizzes given: {scoreArray.length} </li>
        </ul>
      </div>
    </div>
  );
}
