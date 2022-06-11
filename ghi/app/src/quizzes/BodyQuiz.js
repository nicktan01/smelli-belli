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
      products: [],
    };

    // We need to bind this to all of these properties so that we can track
    // when a user has answered a question, or clicked the "Next" button
    this.handleQuestionOne = this.handleQuestionOne.bind(this);
    this.handleQuestionTwo = this.handleQuestionTwo.bind(this);
    this.handleQuestionThree = this.handleQuestionThree.bind(this);
    this.handleQuestionFour = this.handleQuestionFour.bind(this);
    this.handleQuestionFive = this.handleQuestionFive.bind(this);
    this.handlePageOneComplete = this.handlePageOneComplete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleQuestionOne(event) {
    // sets answer = to the id of the button clicked by the user
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
    this.setState({ answerFive: parseInt(value) });
    this.setState({ questionFiveAnswered: true });
  }

  handlePageOneComplete() {
    // We need to pull the date when the user clicks the next button
    // and set it to the created property, which is on our quiz data models
    const date = new Date().toISOString().slice(0, 10);
    this.setState({ created: date });

    // Checks that each question was answered
    if (
      this.state.questionOneAnswered &&
      this.state.questionTwoAnswered &&
      this.state.questionThreeAnswered &&
      this.state.questionFourAnswered &&
      this.state.questionFiveAnswered
    ) {
      // We change this boolean so we can change the classNames stored in our
      // quizPageOneClasses variable to control displaying the quiz's "pages"
      this.setState({ pageOneComplete: true });
    } else {
      this.setState({ incompleteQuiz: true });
    }

    // async function getUser() {
    //   const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/accounts/me/`;
    //   const response = await fetch(url, {
    //     credentials: "include",
    //   });
    //   if (response.ok) {
    //     const user = await response.json();
    //     console.log(user);
    //     setUser(user);
    //   }
    // }

    /*****************************************************************************/
    // THE BELOW CODE DOES NOT WORK, I AM TRYING TO CHECK TO SEE IF A TOKEN
    // EXISTS AT THE ENDPOINT LISTED. THEN, IF ONE DOES JUST SKIP STRAIGHT TO
    // DISPLAYING THE SCENT PROFILE AND FILTERED PRODUCT PAGE USING resultsClasses

    // ELSE, IF THERE IS NO AUTH TOKEN, DISPLAY A CONDENSED USER SIGN UP FORM
    // OFFERING USER TO SAVE THE RESULTS OF THEIR QUIZ USING signupClasses.
    // THEN, PROCEED AS ABOVE.

    // const authTokenUrl = "http://localhost:9080/api/accounts/me/";
    // const authTokenResponse = await fetch(authTokenUrl);

    // if (authTokenResponse.ok) {
    //   const authTokenData = await authTokenResponse.json();
    //   console.log("what is authTokenData:", authTokenData);
    // }
    /*****************************************************************************/
  }

  /*****************************************************************************/
  // THIS CODE WILL MAKE CALLS TO OUR USER ENDPOINT TO PULL THE USERNAME AND
  // STASH IT IN THE USER FIELD ON THE QUIZ DATA MODEL SO IT CAN SAVE
  // AS WELL AS CALLS TO OUR PRODUCTS ENDPOINT TO MAKE THE QUERIES BASED ON
  // SCENT PROFILE RESULTS

  // componentDidMount() {
  //   async function getUserData() {
  //     const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/accounts/me/`;
  //     const response = await fetch(url, { credentials: "include" });
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data);
  //       this.setState({
  //         username: data.username,
  //       });
  //     }
  //   }
  //   getUserData();
  //   console.log(this.state.username);

  //   const productUrl = "http://localhost:8100/api/products/";
  //   const productResponse = await fetch(productUrl);
  //   if (productResponse.ok) {
  //     const productData = await productResponse.json();
  //   }
  // }
  /*****************************************************************************/

  async componentDidMount() {
    const productUrl = "http://localhost:8100/api/products/";
    const productResponse = await fetch(productUrl);

    if (productResponse.ok) {
      let emptyProductsList = [];
      this.setState({ products: emptyProductsList });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();

    this.setState({ quizCompleted: true });

    const productUrl = "http://localhost:8100/api/products/";
    const productResponse = await fetch(productUrl);

    if (productResponse.ok) {
      const productData = await productResponse.json();

      let filteredProductsList = [];
      for (const product of productData.products) {
        if (String(product.product_category) === this.state.answerOne) {
          if (
            String(product.scent1) === this.state.answerTwo ||
            String(product.scent1) === this.state.answerThree
          ) {
            filteredProductsList.push(product);
          }
        }
      }

      this.setState({ products: filteredProductsList });
    }

    const data = { ...this.state };

    // Converting our camel case javascript variables to variables named with
    // snake case to match the endpoints in our python backend
    data.answer_1 = data.answerOne;
    data.answer_2 = data.answerTwo;
    data.answer_3 = data.answerThree;
    data.answer_4 = data.answerFour;
    data.answer_5 = data.answerFive;

    // Delete the properties that don't appear on our quiz data models . . .
    // delete data.answerOne;
    // delete data.answerTwo;
    // delete data.answerThree;
    // delete data.answerFour;
    // delete data.answerFive;
    // delete data.created;
    // delete data.incompleteQuiz;
    // delete data.questionOneAnswered;
    // delete data.questionTwoAnswered;
    // delete data.questionThreeAnswered;
    // delete data.questionFourAnswered;
    // delete data.questionFiveAnswered;
    // delete data.pageOneComplete;
    // delete data.quizCompleted;

    // . . . so that we can POST a quiz object into our database!
    // const quizResultsUrl = "http://localhost:8090/api/bodyquizzes/";
    // const fetchConfig = {
    //   method: "post",
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    // const response = await fetch(quizResultsUrl, fetchConfig);

    // then clear the responses after posting to the backend's endpoint
    // if (response.ok) {
    //   this.setState({
    //     answerOne: "",
    //     questionOneAnswered: false,
    //     answerTwo: "",
    //     questionTwoAnswered: false,
    //     answerThree: "",
    //     questionThreeAnswered: false,
    //     answerFour: "",
    //     questionFourAnswered: false,
    //     answerFive: "",
    //     questionFiveAnswered: false,
    //     created: "",
    //     pageOneComplete: false,
    //   });
    // }
  }

  render() {
    let quizPageOneClasses = "";
    let quizPageOneButtonClasses = "px-4 py-5 my-5 text-center";
    let quizPageTwoClasses = "d-none";
    let incompleteClasses = "d-none";
    let filteredProductsListClasses = "d-none";
    if (this.state.incompleteQuiz) {
      incompleteClasses = "alert alert-warning mb-0";
    }
    if (this.state.pageOneComplete) {
      quizPageOneClasses = "d-none";
      quizPageOneButtonClasses = "px-4 py-5 my-5 text-center d-none";
      quizPageTwoClasses = "";
    }
    if (this.state.quizCompleted) {
      filteredProductsListClasses = "";
    }

    return (
      <div className="container">
        <div className="px-4 py-5 my-5 text-center">
          <h1 className="display-5 fw-bold">Scent Finder</h1>
          <h2 className="display-7 fw-bold">Body Products</h2>
        </div>
        <div className={quizPageOneClasses}>
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
              <p>Intensity: {this.state.answerFive}</p>
            </div>
          </div>
        </div>
        <div className={quizPageOneButtonClasses}>
          <button
            onClick={this.handlePageOneComplete}
            className="btn btn-primary"
          >
            Next
          </button>
          <p className={incompleteClasses}>Please answer all questions.</p>
        </div>
        <div className={quizPageTwoClasses}>
          <div className="px-4 py-5 my-5 text-center">
            <h2>
              You got {this.state.answerTwo} and {this.state.answerThree}! Here
              are some {this.state.answerOne} products that match your Scent
              Profile:
            </h2>
            <button onClick={this.handleSubmit} className="btn btn-primary">
              See Products
            </button>
            <div className={filteredProductsListClasses}>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Size</th>
                    <th>SKU</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.products.map((product) => {
                    return (
                      <tr key={product.sku}>
                        <td>{product.name}</td>
                        <td>{product.size}</td>
                        <td>{product.sku}</td>
                        <td>${product.price}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
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
