import { useState } from "react";

function BodyQuiz() {
  const [answerOne, setAnswerOne] = useState();
  const [answerTwo, setAnswerTwo] = useState();
  const [answerThree, setAnswerThree] = useState();
  const [answerFour, setAnswerFour] = useState();
  // const [questionOneComplete, setQuestionOneComplete] = useState(false);
  // ^ use this code for each question to set each questionComplete to false
  // when an answer is clicked, set that to true.
  // changing an answer shouldn't change this value
  // then, when all questionComplete are true, allow user to click a submit button

  return (
    <div className="container">
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold">Scent Finder</h1>
        <h2 className="display-7 fw-bold">Body Products</h2>
      </div>
      <div className="px-4 py-5 my-5 text-center" id="step-1">
        <h1>Question One</h1>
        <em>Please, choose one</em>
        <p>What kind of product are you looking for?</p>
        <div>
          <button onClick={() => setAnswerOne("Lotion")}>Lotion</button>
          <button onClick={() => setAnswerOne("Body Wash")}>Body Wash</button>
          <button onClick={() => setAnswerOne("Oils")}>Oils</button>
          <button onClick={() => setAnswerOne("Cologne/Perfume")}>
            Cologne/Perfume
          </button>
        </div>
      </div>
      <div className="px-4 py-5 my-5 text-center" id="step-2">
        <h1>Question Two</h1>
        <em>Please, choose one</em>
        <p>Which activity do you enjoy most?</p>
        <div>
          <button onClick={() => setAnswerTwo("amber")}>Reading</button>
          <button onClick={() => setAnswerTwo("fresh")}>Hiking</button>
          <button onClick={() => setAnswerTwo("gourmand")}>Baking</button>
          <button onClick={() => setAnswerTwo("floral")}>Gardening</button>
          <button onClick={() => setAnswerTwo("woody")}>Camping</button>
          <button onClick={() => setAnswerTwo("fruity")}>
            Drinking Cocktails
          </button>
        </div>
      </div>
      <div className="px-4 py-5 my-5 text-center" id="step-3">
        <h1>Question Three</h1>
        <em>Please, choose one</em>
        <p>What is your favorite season?</p>
        <div>
          <button onClick={() => setAnswerThree("amber")}>Winter</button>
          <button onClick={() => setAnswerThree("fresh")}>Spring</button>
          <button onClick={() => setAnswerThree("fruity")}>Summer</button>
          <button onClick={() => setAnswerThree("woody")}>Fall</button>
        </div>
      </div>
      <div className="px-4 py-5 my-5 text-center" id="step-4">
        <h1>Question Four</h1>
        <em>Please, choose one</em>
        <p>What clothing style is your favorite?</p>
        <div>
          <button onClick={() => setAnswerFour("athleisure")}>
            Athleisure
          </button>
          <button onClick={() => setAnswerFour("retro")}>Retro</button>
          <button onClick={() => setAnswerFour("bohemian")}>Bohemian</button>
          <button onClick={() => setAnswerFour("streetwear")}>
            Streetwear
          </button>
          <button onClick={() => setAnswerFour("minimalist")}>
            Minimalist
          </button>
        </div>
      </div>
    </div>
  );
}

export default BodyQuiz;
