import React, { useState, useEffect } from 'react'
import './Quiz.css'
import { data } from '../../assets/data';

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[0]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (index < data.length) {
      setQuestion(data[index]);
      setLock(false);
      setSelectedOption(null);
    }
  }, [index]);

  const checkAns = (ans) => {
    if (!lock) {
      setSelectedOption(ans);
      if (question.ans === ans) {
        setScore(prevScore => prevScore + 1);
      }
      setLock(true);
    }
  };

  const nextQuestion = () => {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
      } else {
        setIndex(prevIndex => prevIndex + 1);
      }
    }
  };

  const resetQuiz = () => {
    setIndex(0);
    setScore(0);
    setLock(false);
    setResult(false);
    setSelectedOption(null);
  };

  const getOptionClass = (optionNum) => {
    if (!lock) return '';
    
    if (optionNum === question.ans) {
      return 'correct';
    }
    
    if (optionNum === selectedOption && optionNum !== question.ans) {
      return 'wrong';
    }
    
    return '';
  };

  if (result) {
    return (
      <div className='container'>
        <h1>Quiz Completed!</h1>
        <h2>Your Score: {score} out of {data.length}</h2>
        <button onClick={resetQuiz} className="reset-btn">Restart Quiz</button>
      </div>
    );
  }

  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr />
      <h2>{index + 1}. {question.question}</h2>
      <ul>
        <li 
          className={getOptionClass(1)}
          onClick={() => checkAns(1)}
        >
          {question.option1}
        </li>
        <li 
          className={getOptionClass(2)}
          onClick={() => checkAns(2)}
        >
          {question.option2}
        </li>
        <li 
          className={getOptionClass(3)}
          onClick={() => checkAns(3)}
        >
          {question.option3}
        </li>
        <li 
          className={getOptionClass(4)}
          onClick={() => checkAns(4)}
        >
          {question.option4}
        </li>
      </ul>
      <button 
        onClick={nextQuestion} 
        disabled={!lock}
        className={lock ? 'active' : 'inactive'}
      >
        {index === data.length - 1 ? 'Submit' : 'Next'}
      </button>
      <div className="index">{index + 1} of {data.length} questions</div>
    </div>
  );
};

export default Quiz;