import React, { useState } from 'react';
import questions from './json/questions.json';
import css from './Quiz.module.css';

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [nextAnswer, setnextAnswer] = useState(false);
  const [checkAnswer, setcheckAnswer] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [styleAnswer, setStyleAnswer] = useState();
  const [answersArray, setAnswersArray] = useState([]);

  const handleAnswer = isCorrect => {
    if (checkAnswer) {
      setUserAnswers(prevAnswers => {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[currentQuestionIndex] = isCorrect;
        return updatedAnswers;
      });
      return;
    }
    setUserAnswers([...userAnswers, isCorrect]);
    setcheckAnswer(true);
  };

  const handleAnswerCheck = () => {
    const answer = userAnswers[currentQuestionIndex];
    if (answer) {
      setStyleAnswer(1);
      setAnswersArray([...answersArray, 1]);
    } else {
      setStyleAnswer(2);
      setAnswersArray([...answersArray, 2]);
    }
    setnextAnswer(true);
  };

  const nextButton = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setStyleAnswer(null);
    setnextAnswer(false);
    setcheckAnswer(false);
    setSelectedAnswerIndex(null);
  };

  const handleAnswerSelection = index => {
    setSelectedAnswerIndex(index);
  };

  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];

    return (
      <div style={{ padding: '15px' }}>
        <p className={css.title}>Question {currentQuestionIndex + 1} of 3</p>
        <h2>{currentQuestion.question}</h2>
        <ul className={css.answersArray}>
          {currentQuestion.answers.map((answer, index) => (
            <li key={index}>
              <button
                className={css.answers}
                disabled={
                  nextAnswer
                    ? selectedAnswerIndex === index
                      ? false
                      : true
                    : false
                }
                onClick={() => {
                  handleAnswer(answer.isCorrect);
                  handleAnswerSelection(index);
                }}
                style={{
                  backgroundColor:
                    styleAnswer && selectedAnswerIndex === index
                      ? styleAnswer === 1
                        ? 'green'
                        : 'red'
                      : selectedAnswerIndex === index
                      ? 'rgb(158, 159, 158)'
                      : 'rgb(218, 218, 218)',
                }}
              >
                {answer.text}
              </button>
            </li>
          ))}
        </ul>
        <button
          className={css.checkButton}
          onClick={() => {
            nextAnswer ? nextButton() : handleAnswerCheck();
          }}
          disabled={!checkAnswer}
        >
          {nextAnswer ? 'Next' : 'Check'}
        </button>
        <ul className={css.checkInputArray}>
          <li
            className={css.checkInput}
            style={{
              backgroundColor:
                answersArray[0] && (answersArray[0] === 1 ? 'green' : 'red'),
            }}
          ></li>
          <li
            className={css.checkInput}
            style={{
              backgroundColor:
                answersArray[1] && (answersArray[1] === 1 ? 'green' : 'red'),
            }}
          ></li>
          <li
            className={css.checkInput}
            style={{
              backgroundColor:
                answersArray[2] && (answersArray[2] === 1 ? 'green' : 'red'),
            }}
          ></li>
        </ul>
      </div>
    );
  };

  const renderResult = () => {
    const correctAnswers = userAnswers.filter(answer => answer).length;
    return (
      <div style={{ padding: '15px' }}>
        <h2>Quiz Result</h2>
        <p className={css.title}>
          You got {correctAnswers} out of {questions.length} questions correct!
        </p>
      </div>
    );
  };

  return (
    <div>
      {currentQuestionIndex < questions.length
        ? renderQuestion()
        : renderResult()}
    </div>
  );
};

export default Quiz;
