import React from "react";

class BodyQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerOne: "",
      questionOneAnswered: false,
      answerTwo: "",
      questionTwoAnswered: false,
      answerThree: "",
      questionThreeAnswered: false,
      answerFour: "",
      questionFourAnswered: false,
      answerFive: "",
      questionFiveAnswered: false,
      created: "",
      incompleteQuiz: false,
      quizCompleted: false,
    };

    // We need to bind this to all of these properties so that we can track
    // when a user has answered a question, or clicked the "Next" button
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
    this.setState({ questionOneAnswered: true }); // marks q as answered
  }

  handleQuestionTwo(event) {
    const id = event.currentTarget.id;
    this.setState({ answerTwo: id });
    this.setState({ questionTwoAnswered: true });
  }

  handleQuestionThree(event) {
    const id = event.currentTarget.id;
    this.setState({ answerThree: id });
    this.setState({ questionThreeAnswered: true });
  }

  handleQuestionFour(event) {
    const id = event.currentTarget.id;
    this.setState({ answerFour: id });
    this.setState({ questionFourAnswered: true });
  }

  handleQuestionFive(event) {
    const value = event.currentTarget.value;
    this.setState({ answerFive: value });
    this.setState({ questionFiveAnswered: true });
  }

  // async componentDidMount() {
  //   const productUrl = "http://localhost:8100/api/products/";

  //   const productResponse = await fetch(productUrl);

  //   if (productResponse.ok) {
  //     const productData = await productResponse.json();
  //   }
  // }

  async handleSubmit(event) {
    event.preventDefault();

    // We need to pull the date when the user clicks the next button
    // and set it to the created property, which is on our quiz data models
    const date = new Date().toISOString().slice(0, 10);
    this.setState({ created: date });

    const data = { ...this.state };

    // Checks that each question was answered
    if (
      data.questionOneAnswered === true &&
      data.questionTwoAnswered === true &&
      data.questionThreeAnswered === true &&
      data.questionFourAnswered === true &&
      data.questionFiveAnswered === true
    ) {
      data.answer_1 = data.answerOne;
      data.answer_2 = data.answerTwo;
      data.answer_3 = data.answerThree;
      data.answer_4 = data.answerFour;
      data.answer_5 = data.answerFive;

      // Delete the properties that don't appear on our quiz data models . . .
      delete data.answerOne;
      delete data.answerTwo;
      delete data.answerThree;
      delete data.answerFour;
      delete data.answerFive;
      delete data.created;
      delete data.incompleteQuiz;
      delete data.questionOneAnswered;
      delete data.questionTwoAnswered;
      delete data.questionThreeAnswered;
      delete data.questionFourAnswered;
      delete data.questionFiveAnswered;
      delete data.quizCompleted;

      // . . . so that we can POST a quiz object into our database!
      const quizResultsUrl = "http://localhost:8090/api/bodyquizzes/";
      const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(quizResultsUrl, fetchConfig);

      // then clear the responses after posting to the backend's endpoint
      if (response.ok) {
        this.setState({
          answerOne: "",
          questionOneAnswered: false,
          answerTwo: "",
          questionTwoAnswered: false,
          answerThree: "",
          questionThreeAnswered: false,
          answerFour: "",
          questionFourAnswered: false,
          answerFive: "",
          questionFiveAnswered: false,
          created: "",
          quizCompleted: true,
        });
      }
    } else {
      this.setState({ incompleteQuiz: true });
    }
  }

  render() {
    let messageClasses = "alert alert-success d-none mb-0";
    let formClasses = "";
    let incompleteClass = "d-none";
    if (this.state.incompleteQuiz) {
      incompleteClass = "alert alert-warning mb-0";
    }
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
          <div className="d-grid gap-4 d-md-flex justify-content-center">
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
          <div className="d-grid gap-4 d-md-flex justify-content-center">
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
          <div className="d-grid gap-4 d-md-flex justify-content-center">
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
          <div className="d-grid gap-4 d-md-flex justify-content-center">
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
        <div className="px-4 py-5 my-5 text-center">
          <button onClick={this.handleSubmit} className="btn btn-primary">
            Next
          </button>
          <p className={incompleteClass}>Please answer all questions.</p>
        </div>
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
//             className="form-range"
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
