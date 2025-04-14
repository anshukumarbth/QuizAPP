import { FaArrowRightLong } from "react-icons/fa6";
import { useState, useEffect } from "react";

// take props here
function QuizPage({ questions }) {
  const [selectedAns, setSelectedAns] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [timer, setTimer] = useState(30);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  useEffect(() => {
    console.log("Questions as props", questions);
  }, [questions]);

  useEffect(() => {
    if (!questions || questionCount >= questions.length) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          handleNext();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [questionCount, questions]);

  const handleOptionClick = ({ question, option, correctAns }) => {
    console.log({ question, option });

    const selectedForThisQuestion = selectedAns.filter(
      (ans) => ans.question.question === question.question
    );

    if (selectedForThisQuestion.length < correctAns.length) {
      setSelectedAns((prev) => [
        ...prev,
        {
          question: question,
          option: option,
          correctAns: correctAns,
        },
      ]);
    }
  };

  const handleNext = () => {
    if (questionCount < questions.length - 1) {
      setQuestionCount((prev) => prev + 1);
      setTimer(30);
    } else {
      console.log("Quiz complete", selectedAns);
      setIsQuizComplete(true);
    }
  };

  const checkIfCorrect = (selectedOptions, correctAns) => {
    if (selectedOptions.length !== correctAns.length) return false;

    // Compare element by element
    for (let i = 0; i < selectedOptions.length; i++) {
      if (selectedOptions[i] !== correctAns[i]) return false;
    }
    return true;
  };

  if (!questions || questions.length === 0 || !questions[questionCount]) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading questions...
      </div>
    );
  }

  const q = questions[questionCount];

  if (!isQuizComplete)
    return (
      <div className="container w-full min-h-screen flex justify-center items-center px-4 sm:px-6 md:px-8 ml-auto mr-auto">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg flex flex-col">
          {/* Header */}
          <div className="flex justify-between px-6 py-4 w-full">
            <h1 className="text-base sm:text-lg">{timer} sec</h1>
            <button className="border px-4 py-1 rounded-lg border-gray-300 text-sm sm:text-base">
              Quiz
            </button>
          </div>

          {/* Progress Bars */}
          <div className="flex flex-wrap justify-center gap-2 px-4 py-4">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`w-10 sm:w-15 h-1 border rounded-lg transition-all duration-300 ${
                  i <= questionCount
                    ? "bg-blue-500 border-blue-500"
                    : "bg-gray-200 border-gray-300"
                }`}
              ></div>
            ))}
          </div>

          <p className="flex gap-4 justify-center items-center mb-6">
            Selected Ans :
            {selectedAns.map((ans, i) => {
              return q === ans.question ? (
                <span className="bg-gray-100 rounded-md p-2" key={i}>
                  {ans.option}
                </span>
              ) : null;
            })}
          </p>

          {/* Question Content */}

          <div className="flex flex-col justify-center items-center gap-6 px-4 py-4">
            <p className="text-center text-sm sm:text-base md:text-lg font-semibold">
              Select the missing words in the correct order
            </p>
            <p className="text-center text-sm sm:text-base md:text-lg w-full sm:w-[90%]">
              <p>{q.question}</p>
            </p>

            {/* Option Buttons */}
            <div className="flex flex-wrap justify-center gap-4 w-full sm:w-[90%]">
              <div className="flex justify-center items-center gap-6 flex-wrap mt-4">
                {q.options.map((opt) => {
                  return (
                    <button
                      className="bg-gray-100 rounded-md p-2"
                      key={opt}
                      onClick={() =>
                        handleOptionClick({
                          question: q,
                          option: opt,
                          correctAns: q.correctAnswer,
                        })
                      }
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Navigation */}
            <button
              onClick={handleNext}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded ml-auto"
            >
              <FaArrowRightLong />
            </button>
          </div>
        </div>
      </div>
    );

  // Prepare Summary Details
  const questionMap = questions.map((q) => {
    const selectedForThisQ = selectedAns
      .filter((ans) => ans.question.question === q.question)
      .map((ans) => ans.option);

    const isCorrect = checkIfCorrect(selectedForThisQ, q.correctAnswer);
    return {
      question: q.question,
      selected: selectedForThisQ,
      correct: q.correctAnswer,
      isCorrect,
    };
  });

  const correctCount = questionMap.filter((q) => q.isCorrect).length;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <p className="text-2xl font-bold mb-4">Quiz Completed ✅</p>

      <div className="mb-6">
        <p>Total Questions: {questions.length}</p>
        <p>Score: {correctCount}</p>
        <p>Correct Answers: {correctCount}</p>
        <p>Incorrect Answers: {questions.length - correctCount}</p>
      </div>

      <div className="space-y-6">
        {questionMap.map((q, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <p className="font-medium mb-2">
              Q{index + 1}: {q.question}
            </p>
            <p>
              Selected: {q.selected.length > 0 ? q.selected.join(", ") : "None"}
            </p>
            <p>Correct: {q.correct.join(", ")}</p>
            <p>
              Result:{" "}
              <span
                className={`font-semibold ${
                  q.isCorrect ? "text-green-600" : "text-red-600"
                }`}
              >
                {q.isCorrect ? "Correct ✅" : "Incorrect ❌"}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizPage;
