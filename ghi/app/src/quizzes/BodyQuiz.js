import React from "react";

class BodyQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerOne: "",
      answerTwo: "",
      answerThree: "",
      answerFour: "",
      answerFive: "",
      quizCompleted: false,
    };

    this.handleQuestionOne = this.handleQuestionOne.bind(this);
    this.handleQuestionTwo = this.handleQuestionTwo.bind(this);
    this.handleQuestionThree = this.handleQuestionThree.bind(this);
    this.handleQuestionFour = this.handleQuestionFour.bind(this);
    this.handleQuestionFive = this.handleQuestionFive.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleQuestionOne(event) {
    const id = event.currentTarget.id;
    this.setState({ answerOne: id });
  }

  handleQuestionTwo(event) {
    const id = event.currentTarget.id;
    this.setState({ answerTwo: id });
  }

  handleQuestionThree(event) {
    const id = event.currentTarget.id;
    this.setState({ answerThree: id });
  }

  handleQuestionFour(event) {
    const id = event.currentTarget.id;
    this.setState({ answerFour: id });
  }

  handleQuestionFive(event) {
    const value = event.currentTarget.value;
    this.setState({ answerFive: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    delete data.quizCompleted;

    const quizResultsUrl = "http://localhost:8090/api/bodyprofiles/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(quizResultsUrl, fetchConfig);

    if (response.ok) {
      this.setState({
        answerOne: "",
        answerTwo: "",
        answerThree: "",
        answerFour: "",
        answerFive: "",
        quizCompleted: true,
      });
    }
  }

  render() {
    let messageClasses = "alert alert-success d-none mb-0";
    let formClasses = "";
    if (this.state.quizCompleted) {
      messageClasses = "alert alert-success mb-0";
      formClasses = "d-none";
    }

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
            <button
              onClick={this.handleQuestionOne}
              value={this.state.answerOne}
              id="Lotion"
            >
              Lotion
            </button>
            <button
              onClick={this.handleQuestionOne}
              value={this.state.answerOne}
              id="Body Wash"
            >
              Body Wash
            </button>
            <button
              onClick={this.handleQuestionOne}
              value={this.state.answerOne}
              id="Soap"
            >
              Soap
            </button>
            <button
              onClick={this.handleQuestionOne}
              value={this.state.answerOne}
              id="Deodorant"
            >
              Deodorant
            </button>
          </div>
        </div>
        <div className="px-4 py-5 my-5 text-center" id="step-2">
          <h1>Question Two</h1>
          <em>Please, choose one</em>
          <p>Which activity do you enjoy most?</p>
          <div>
            <button
              onClick={this.handleQuestionTwo}
              value={this.state.answerTwo}
              id="Fresh"
            >
              Hiking
            </button>
            <button
              onClick={this.handleQuestionTwo}
              value={this.state.answerTwo}
              id="Amber"
            >
              Baking
            </button>
            <button
              onClick={this.handleQuestionTwo}
              value={this.state.answerTwo}
              id="Floral"
            >
              Gardening
            </button>
            <button
              onClick={this.handleQuestionTwo}
              value={this.state.answerTwo}
              id="Woody"
            >
              Camping
            </button>
            <button
              onClick={this.handleQuestionTwo}
              value={this.state.answerTwo}
              id="Fruity"
            >
              Drinking Cocktails
            </button>
          </div>
        </div>
        <div className="px-4 py-5 my-5 text-center" id="step-3">
          <h1>Question Three</h1>
          <em>Please, choose one</em>
          <p>What is your favorite season?</p>
          <div>
            <button
              onClick={this.handleQuestionThree}
              value={this.state.answerThree}
              id="Amber"
            >
              Winter
            </button>
            <button
              onClick={this.handleQuestionThree}
              value={this.state.answerThree}
              id="Fresh"
            >
              Spring
            </button>
            <button
              onClick={this.handleQuestionThree}
              value={this.state.answerThree}
              id="Fruity"
            >
              Summer
            </button>
            <button
              onClick={this.handleQuestionThree}
              value={this.state.answerThree}
              id="Woody"
            >
              Fall
            </button>
          </div>
        </div>
        <div className="px-4 py-5 my-5 text-center" id="step-4">
          <h1>Question Four</h1>
          <em>Please, choose one</em>
          <p>What clothing style is your favorite?</p>
          <div>
            <button
              onClick={this.handleQuestionFour}
              value={this.state.answerFour}
              id="Athleisure"
            >
              Athleisure
            </button>
            <button
              onClick={this.handleQuestionFour}
              value={this.state.answerFour}
              id="Retro"
            >
              Retro
            </button>
            <button
              onClick={this.handleQuestionFour}
              value={this.state.answerFour}
              id="Bohemian"
            >
              Bohemian
            </button>
            <button
              onClick={this.handleQuestionFour}
              value={this.state.answerFour}
              id="Streetwear"
            >
              Streetwear
            </button>
            <button
              onClick={this.handleQuestionFour}
              value={this.state.answerFour}
              id="Minimalist"
            >
              Minimalist
            </button>
          </div>
        </div>
        <div className="px-4 py-5 my-5 text-center" id="step-5">
          <h1>Question Five</h1>
          <p>How intense would you like your scent?</p>
          <div>
            <label htmlFor="smellIntensity" className="form-label">
              On a scale of 1 (subtle) to 5 (INTENSE)
            </label>
            <input
              onChange={this.handleQuestionFive}
              defaultValue={this.state.answerFive}
              type="range"
              className="form-range"
              min="1"
              max="5"
              id="smellIntensity"
            />
          </div>
        </div>
        <button className="btn btn-primary">Create</button>
      </div>
    );
  }
}

export default BodyQuiz;

// import { useState } from "react";

// function BodyQuiz() {
//   const [answerOne, setAnswerOne] = useState();
//   const [answerTwo, setAnswerTwo] = useState();
//   const [answerThree, setAnswerThree] = useState();
//   const [answerFour, setAnswerFour] = useState();
//   const [answerFive, setAnswerFive] = useState();
// const [questionOneComplete, setQuestionOneComplete] = useState(false);
// ^ use this code for each question to set each questionComplete to false
// when an answer is clicked, set that to true.
// changing an answer shouldn't change this value
// then, when all questionComplete are true, allow user to click a submit button

//   return (
//     <div className="container">
//       <div className="px-4 py-5 my-5 text-center">
//         <h1 className="display-5 fw-bold">Scent Finder</h1>
//         <h2 className="display-7 fw-bold">Body Products</h2>
//       </div>
//       <div className="px-4 py-5 my-5 text-center" id="step-1">
//         <h1>Question One</h1>
//         <em>Please, choose one</em>
//         <p>What kind of product are you looking for?</p>
//         <div>
//           <button onClick={() => setAnswerOne("Lotion")}>Lotion</button>
//           <button onClick={() => setAnswerOne("Body Wash")}>Body Wash</button>
//           <button onClick={() => setAnswerOne("Oils")}>Oils</button>
//           <button onClick={() => setAnswerOne("Cologne/Perfume")}>
//             Cologne/Perfume
//           </button>
//         </div>
//       </div>
//       <div className="px-4 py-5 my-5 text-center" id="step-2">
//         <h1>Question Two</h1>
//         <em>Please, choose one</em>
//         <p>Which activity do you enjoy most?</p>
//         <div>
//           <button onClick={() => setAnswerTwo("fresh")}>Hiking</button>
//           <button onClick={() => setAnswerTwo("amber")}>Baking</button>
//           <button onClick={() => setAnswerTwo("floral")}>Gardening</button>
//           <button onClick={() => setAnswerTwo("woody")}>Camping</button>
//           <button onClick={() => setAnswerTwo("fruity")}>
//             Drinking Cocktails
//           </button>
//         </div>
//       </div>
//       <div className="px-4 py-5 my-5 text-center" id="step-3">
//         <h1>Question Three</h1>
//         <em>Please, choose one</em>
//         <p>What is your favorite season?</p>
//         <div>
//           <button onClick={() => setAnswerThree("amber")}>Winter</button>
//           <button onClick={() => setAnswerThree("fresh")}>Spring</button>
//           <button onClick={() => setAnswerThree("fruity")}>Summer</button>
//           <button onClick={() => setAnswerThree("woody")}>Fall</button>
//         </div>
//       </div>
//       <div className="px-4 py-5 my-5 text-center" id="step-4">
//         <h1>Question Four</h1>
//         <em>Please, choose one</em>
//         <p>What clothing style is your favorite?</p>
//         <div>
//           <button onClick={() => setAnswerFour("athleisure")}>
//             Athleisure
//           </button>
//           <button onClick={() => setAnswerFour("retro")}>Retro</button>
//           <button onClick={() => setAnswerFour("bohemian")}>Bohemian</button>
//           <button onClick={() => setAnswerFour("streetwear")}>
//             Streetwear
//           </button>
//           <button onClick={() => setAnswerFour("minimalist")}>
//             Minimalist
//           </button>
//         </div>
//       </div>
//       <div className="px-4 py-5 my-5 text-center" id="step-5">
//         <h1>Question Five</h1>
//         <p>How intense would you like your scent?</p>
//         <div>
//           <label for="smellIntensity" className="form-label">
//             On a scale of 1 (subtle) to 5 (INTENSE)
//           </label>
//           <input
//             type="range"
//             class="form-range"
//             min="0"
//             max="5"
//             id="smellIntensity"
//           />
//         </div>
//       </div>
//       <button className="btn btn-primary">Create</button>
//     </div>
//   );
// }
