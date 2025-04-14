
import { useNavigate } from "react-router-dom";
import icon1 from "../../assets/icons.png";


function QuizHome() {
  const navigate = useNavigate();
  const handleClick1 = () => {
    navigate('/');
  };
  const handleClick = () => {
    navigate('/quizpage');
  };



  return (
    <div className="container h-screen w-full ml-auto mr-auto flex justify-center items-center">
      <div className="flex flex-col justify-start items-center h-auto w-auto  bg-white rounded-lg shadow-lg py-5">
        <img src={icon1} alt=""/>
        <div className="text-[#0F1010] flex flex-col justify-center items-center">
          <h1
            className="text-[40px]"
            style={{
              fontWeight: "600",
              fontFamily: "'Martel Sans', sans-serif",
              fontStyle: "normal",
            }}
          >
            Sentence Construction
          </h1>
          <p
            className="w-[70%] text-center"
            style={{
              fontWeight: "300",
              fontFamily: "'Martel Sans', sans-serif",
              fontStyle: "normal",
            }}
          >
            Select the correct words to complete the sentence by arranging the
            provided options in the right order.
          </p>
        </div>

        <div
          className="flex justify-center items-center gap-6  w-full py-5"
          style={{
            fontFamily: "'Martel Sans', sans-serif",
          }}
        >
          <div>
            <h1>Time Per Question</h1>
            <h5 className="font-[10]">30 sec</h5>
          </div>
          <div className="border-l border-r px-10">
            <h1>Questions</h1>
            <h5 className="font-[10]">10</h5>
          </div>
          <div>
            <h1>Coins</h1>
            <h5 className="font-[10] flex items-center gap-1"><p className="w-4 h-4 rounded-full bg-[#F5CE00]"></p>0</h5>
          </div>
        </div>
        <div className="w-[80%] flex justify-around ">
          <button onClick={handleClick1} className="border border-[#453FE1] py-2 px-9 text-xl rounded-lg ">Back</button>
          <button onClick={handleClick} className="border bg-[#453FE1] border-[#453FE1] py-2 px-9 text-xl text-white rounded-lg">Start</button>
        </div>
      </div>
    </div>
  );
}

export default QuizHome;
