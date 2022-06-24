import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../authApi";

// This function populates the columns with Product Cards matching the user's
// scent profile results
export function ProductColumn(props) {
  return (
    <div className="col">
      {props.list.map((product) => {
        return (
          <div key={product.href} className="card mb-3 shadow">
            {product.image && (
              <Link to={`/products/${product.sku}`}>
                <img 
                src={product.image} 
                className="card-img-top" 
                alt="product" 
                />
              </Link>
            )}
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">${product.price}.00</p>
            </div>
            <div className="card-footer text-muted">
              <h6 className="card-subtitle mb-2 text-muted">
                Scent Categories: {product.scent1} | {product.scent2}
              </h6>
            </div>
          </div>
        );
      })}
    </div>
  );
}

class BodyQuiz extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      noAuth: false,
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
      noMatches: false,
      created: "",
      quizQuestionsComplete: false,
      quizCompleted: false,
      resultsSubmitted: false,
      products: [],
      productColumns: [[], [], [], []],
      currentStep: 1,
    };

    // We need to bind this to all of these properties so that we can track
    // when a user has answered a question, or clicked the "Next" button
    this.handlePageBack = this.handlePageBack.bind(this);
    this.handlePageForward = this.handlePageForward.bind(this);
    this.handleNoSignUp = this.handleNoSignUp.bind(this);
    this.handleQuestionOne = this.handleQuestionOne.bind(this);
    this.handleQuestionTwo = this.handleQuestionTwo.bind(this);
    this.handleQuestionThree = this.handleQuestionThree.bind(this);
    this.handleQuestionFour = this.handleQuestionFour.bind(this);
    this.handleQuestionFive = this.handleQuestionFive.bind(this);
    this.handlePageOneComplete = this.handlePageOneComplete.bind(this);
    this.handleSeeFilteredProducts = this.handleSeeFilteredProducts.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // This function creates an empty list when the page is first rendered
  // that we can later add products to when the user finishes the quiz
  async componentDidMount() {
    const productUrl = `${process.env.REACT_APP_INVENTORY_HOST}/api/products/`;
    const productResponse = await fetch(productUrl);

    if (productResponse.ok) {
      let emptyProductsList = [];
      this.setState({ products: emptyProductsList });
    }
  }

  handleNoSignUp() {
    this.setState({ noAuth: true });
  }

  handleQuestionOne(event) {
    // sets answer = to the id of the button clicked by the user
    const id = event.currentTarget.id;
    this.setState({ answerOne: id });
    this.setState({ questionOneAnswered: true }); // marks q as answered
    this.setState({ currentStep: this.state.currentStep + 1 });
  }

  handleQuestionTwo(event) {
    const id = event.currentTarget.id;
    this.setState({ answerTwo: id });
    this.setState({ questionTwoAnswered: true });
    this.setState({ currentStep: this.state.currentStep + 1 });
  }

  handleQuestionThree(event) {
    const id = event.currentTarget.id;
    this.setState({ answerThree: id });
    this.setState({ questionThreeAnswered: true });
    this.setState({ currentStep: this.state.currentStep + 1 });
  }

  handleQuestionFour(event) {
    const id = event.currentTarget.id;
    this.setState({ answerFour: id });
    this.setState({ questionFourAnswered: true });
    this.setState({ currentStep: this.state.currentStep + 1 });
  }

  handleQuestionFive(event) {
    const value = event.currentTarget.value;
    this.setState({ answerFive: parseInt(value) }); // parses the int value
    this.setState({ questionFiveAnswered: true });
  }

  handlePageBack() {
    this.setState({ currentStep: this.state.currentStep - 1 });
  }

  handlePageForward() {
    this.setState({ currentStep: this.state.currentStep + 1 });
  }

  async handlePageOneComplete() {
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
      this.setState({ quizQuestionsComplete: true });
    }

    const url = `${process.env.REACT_APP_INVENTORY_HOST}/api/products/`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();

        const requests = [];
        for (let product of data.products) {
          const detailUrl = `${process.env.REACT_APP_INVENTORY_HOST}${product.href}`;
          requests.push(fetch(detailUrl));
        }

        const products = [];
        for (let product of data.products) {
          // First, filter the list of products to match the product category
          // that the user is looking for: Lotion, Body Wash, Soap, or Deodorant
          if (String(product.product_category) === this.state.answerOne) {
            // Then, check for any products that match either of the two scent
            // categories that the user matched with in their scent profile quiz
            if (
              String(product.scent1) === this.state.answerTwo ||
              String(product.scent1) === this.state.answerThree
            ) {
              // Add these products to the filtered products list
              products.push(product);
            }
          }
        }

        const productColumns = [[], [], [], []];

        let i = 0;
        for (const product of products) {
          productColumns[i].push(product);
          i += 1;
          if (i > 3) {
            i = 0;
          }
        }

        // Then, finally, set the state of productColumns = to that filtered list!
        this.setState({ productColumns: productColumns });

        // We also set products = to the filtered list, so we can track if
        // there are no matches
        this.setState({ products: products });
      }
    } catch (e) {
      console.error("error:", e);
    }
  }

  // This is the code that handles filtering the products based on the user's
  // input and adding those products to the products list that is then
  // kicked back to the user
  async handleSeeFilteredProducts() {
    this.setState({ quizCompleted: true });

    if (this.state.products.length === 0) {
      this.setState({ noMatches: true });
    }
  }

  // This block handles quiz completion and the optional saving of a user's
  // scent profile results.
  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };

    // Converting our camel case javascript variables to variables named with
    // snake case to match the endpoints in our python backend
    data.answer_1 = data.answerOne;
    data.answer_2 = data.answerTwo;
    data.answer_3 = data.answerThree;
    data.answer_4 = data.answerFour;
    data.answer_5 = data.answerFive;

    // Delete the properties that don't appear on our quiz data models . . .
    delete data.noAuth;
    delete data.answerOne;
    delete data.answerTwo;
    delete data.answerThree;
    delete data.answerFour;
    delete data.answerFive;
    delete data.questionOneAnswered;
    delete data.questionTwoAnswered;
    delete data.questionThreeAnswered;
    delete data.questionFourAnswered;
    delete data.questionFiveAnswered;
    delete data.quizQuestionsComplete;
    delete data.quizCompleted;
    delete data.products;
    delete data.productColumns;
    delete data.resultsSubmitted;
    delete data.noMatches;
    delete data.currentStep;

    // . . . so that we can POST a quiz object into our database!
    const quizResultsUrl = `${process.env.REACT_APP_CUSTOMER_HOST}/api/bodyquizzes/`;
    const token = this.context.token;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(quizResultsUrl, fetchConfig);

    // then clear the responses after posting to the backend's endpoint
    if (response.ok) {
      this.setState({
        noAuth: false,
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
        quizQuestionsComplete: false,
        quizCompleted: false,
        pageOneComplete: false,
        products: [],
        productColumns: [],
        resultsSubmitted: true,
        currentStep: 1,
      });
    }
  }

  render() {
    let token = this.context.token;

    // These variables dictate Bootstrap CSS styling rules to toggle
    // displaying or hiding certain "pages" of the quiz
    // An empty string is displayed, and "d-none" will be hidden!
    let quiz = "";
    let noAuthClasses = "d-none";
    let quizPageOneClasses = "my-5";
    let quizPageTwoClasses = "my-5 d-none";
    let quizPageThreeClasses = "my-5 d-none";
    let quizPageFourClasses = "my-5 d-none";
    let quizPageFiveClasses = "my-5 d-none";
    let quizResultsClasses = "d-none";
    let quizPageFiveButtonClasses = "d-none";
    let displayProductsClasses = "d-none";
    let seeProductsButtonClasses = "d-none";
    let saveScentProfileButtonClasses = "d-none";
    let noProductsClasses = "d-none";
    let resultsSubmittedClasses = "alert alert-success mb-0 d-none";

    // Display quiz normally if user is logged in
    // If the user clicks an answer for Question One, then hide Question One
    // and display Question Two
    if (this.state.currentStep === 1 && token) {
      quizPageOneClasses = "my-5";
      quizPageTwoClasses = "d-none";
      quizPageThreeClasses = "d-none";
      quizPageFourClasses = "d-none";
      quizPageFiveClasses = "d-none";
    }

    // Display sign up prompt if user is logged out
    if (this.state.currentStep === 1 && !token) {
      noAuthClasses = "my-5";
      quizPageOneClasses = "d-none";
      quizPageTwoClasses = "d-none";
      quizPageThreeClasses = "d-none";
      quizPageFourClasses = "d-none";
      quizPageFiveClasses = "d-none";
    }

    // Display quiz if user does not want to sign up
    if (this.state.noAuth) {
      noAuthClasses = "d-none";
      quizPageOneClasses = "my-5";
      quizPageTwoClasses = "d-none";
      quizPageThreeClasses = "d-none";
      quizPageFourClasses = "d-none";
      quizPageFiveClasses = "d-none";
    }

    if (this.state.currentStep === 2) {
      quizPageOneClasses = "d-none";
      quizPageTwoClasses = "my-5";
      quizPageThreeClasses = "d-none";
      quizPageFourClasses = "d-none";
      quizPageFiveClasses = "d-none";
    }

    if (this.state.currentStep === 3) {
      quizPageOneClasses = "d-none";
      quizPageTwoClasses = "d-none";
      quizPageThreeClasses = "my-5";
      quizPageFourClasses = "d-none";
      quizPageFiveClasses = "d-none";
    }

    if (this.state.currentStep === 4) {
      quizPageOneClasses = "d-none";
      quizPageTwoClasses = "d-none";
      quizPageThreeClasses = "d-none";
      quizPageFourClasses = "my-5";
      quizPageFiveClasses = "d-none";
    }

    if (this.state.currentStep === 5) {
      quizPageOneClasses = "d-none";
      quizPageTwoClasses = "d-none";
      quizPageThreeClasses = "d-none";
      quizPageFourClasses = "d-none";
      quizPageFiveClasses = "my-5";
    }

    // If the user clicks an answer for Question Five, then display the Next
    // button that will take them to the Authentication Screen (not yet implemented)
    if (this.state.questionFiveAnswered) {
      quizPageFiveButtonClasses = "px-4 py-5 my-5 text-center";
    }

    // AUTH TOKEN, DISPLAY SAVE SCENT PROFILE BUTTON
    // If all the questions have been answered, and the Next button has been
    // clicked by the User, then display the Results page
    if (this.state.quizQuestionsComplete && token) {
      quizResultsClasses = "my-5";
      seeProductsButtonClasses = "my-5 btn btn-primary";
      saveScentProfileButtonClasses = "my-5 btn btn-primary";
      quiz = "d-none";
    }

    // NO AUTH TOKEN, HIDE SAVE SCENT PROFILE BUTTON
    // If all the questions have been answered, and the Next button has been
    // clicked by the User, then display the Results page
    if (this.state.quizQuestionsComplete && !token) {
      quizResultsClasses = "my-5";
      seeProductsButtonClasses = "my-5 btn btn-primary";
      saveScentProfileButtonClasses = "d-none";
      quiz = "d-none";
    }

    // If the User clicks the "See Products" button, then display the filtered
    // products cards!
    if (this.state.quizCompleted) {
      displayProductsClasses = "";
      seeProductsButtonClasses = "d-none";
    }

    // If there are no matches, display an error message!
    if (this.state.noMatches) {
      quizResultsClasses = "d-none";
      noProductsClasses = "";
    }

    // If the User clicks the "Save My Results" button, then display a success
    // message and hide the form from re-appearing
    if (this.state.resultsSubmitted) {
      resultsSubmittedClasses = "alert alert-success mb-0";
      quiz = "d-none";
      quizResultsClasses = "d-none";
      displayProductsClasses = "d-none";
    }

    return (
      <div className="container px-4 py-5 my-5 text-center">
        <div className={quiz}>
          <h1 className="display-3 fw-bold">Scent Finder</h1>
          <h2 className="display-7 fw-bold">Body Products</h2>
          <div className={noAuthClasses}>
            <h2>Save Your Scent Profile Results For Later</h2>
            <em>
              We see you aren't logged in today. Sign up and enjoy access to the
              latest Smelli Belli news and save your Scent Profile results for
              later!
            </em>
            <div className="my-5 d-grid gap-4 d-md-flex justify-content-center">
              <button
                className="btn btn-secondary"
                onClick={this.handleNoSignUp}
              >
                No, thank you.
              </button>
              <Link to="/signup">
                <button className="btn btn-primary">Sign me up!</button>
              </Link>
            </div>
          </div>
          <div className={quizPageOneClasses} id="step-1">
            <div className="container">
              <div
                className="btn-toolbar justify-content-around mb-5"
                role="toolbar"
                aria-label="Toolbar with button groups"
              >
                <button
                  type="button"
                  className="btn-sm btn-secondary"
                  disabled={true}
                >
                  Previous
                </button>
                <h6 className="pt-1">1 of 5</h6>
                <button
                  type="button"
                  className="btn-sm btn-primary"
                  disabled={!this.state.questionOneAnswered}
                  onClick={this.handlePageForward}
                >
                  Next
                </button>
              </div>
            </div>
            <h4>What kind of product are you looking for?</h4>
            <em>Please, choose one</em>
            <div className="my-5 d-grid gap-4 d-md-flex justify-content-center">
              <button
                onClick={this.handleQuestionOne}
                value={this.state.answerOne}
                id="Lotion"
                className="btn btn-primary"
              >
                Lotion
              </button>
              <button
                onClick={this.handleQuestionOne}
                value={this.state.answerOne}
                id="Body Wash"
                className="btn btn-primary"
              >
                Body Wash
              </button>
              <button
                onClick={this.handleQuestionOne}
                value={this.state.answerOne}
                id="Soap"
                className="btn btn-primary"
              >
                Soap
              </button>
              <button
                onClick={this.handleQuestionOne}
                value={this.state.answerOne}
                id="Deodorant"
                className="btn btn-primary"
              >
                Deodorant
              </button>
            </div>
          </div>
          <div className={quizPageTwoClasses} id="step-2">
            <div className="container">
              <div
                className="btn-toolbar justify-content-around mb-5"
                role="toolbar"
                aria-label="Toolbar with button groups"
              >
                <button
                  type="button"
                  className="btn-sm btn-primary"
                  onClick={this.handlePageBack}
                >
                  Previous
                </button>
                <h6 className="pt-1">2 of 5</h6>
                <button
                  type="button"
                  className="btn-sm btn-primary"
                  disabled={!this.state.questionTwoAnswered}
                  onClick={this.handlePageForward}
                >
                  Next
                </button>
              </div>
            </div>
            <h4>Which activity do you enjoy most?</h4>
            <em>Please, choose one</em>
            <div className="my-5 d-grid gap-4 d-md-flex justify-content-center">
              <button
                onClick={this.handleQuestionTwo}
                value={this.state.answerTwo}
                id="Fresh"
                className="btn btn-primary"
              >
                Hiking
              </button>
              <button
                onClick={this.handleQuestionTwo}
                value={this.state.answerTwo}
                id="Amber"
                className="btn btn-primary"
              >
                Baking
              </button>
              <button
                onClick={this.handleQuestionTwo}
                value={this.state.answerTwo}
                id="Floral"
                className="btn btn-primary"
              >
                Gardening
              </button>
              <button
                onClick={this.handleQuestionTwo}
                value={this.state.answerTwo}
                id="Woody"
                className="btn btn-primary"
              >
                Camping
              </button>
              <button
                onClick={this.handleQuestionTwo}
                value={this.state.answerTwo}
                id="Fruity"
                className="btn btn-primary"
              >
                Drinking Cocktails
              </button>
            </div>
          </div>
          <div className={quizPageThreeClasses} id="step-3">
            <div className="container">
              <div
                className="btn-toolbar justify-content-around mb-5"
                role="toolbar"
                aria-label="Toolbar with button groups"
              >
                <button
                  type="button"
                  className="btn-sm btn-primary"
                  onClick={this.handlePageBack}
                >
                  Previous
                </button>
                <h6 className="pt-1">3 of 5</h6>
                <button
                  type="button"
                  className="btn-sm btn-primary"
                  disabled={!this.state.questionThreeAnswered}
                  onClick={this.handlePageForward}
                >
                  Next
                </button>
              </div>
            </div>
            <h4>What is your favorite season?</h4>
            <em>Please, choose one</em>
            <div className="my-5 d-grid gap-4 d-md-flex justify-content-center">
              <button
                onClick={this.handleQuestionThree}
                value={this.state.answerThree}
                id="Amber"
                className="btn btn-primary"
              >
                Winter
              </button>
              <button
                onClick={this.handleQuestionThree}
                value={this.state.answerThree}
                id="Fresh"
                className="btn btn-primary"
              >
                Spring
              </button>
              <button
                onClick={this.handleQuestionThree}
                value={this.state.answerThree}
                id="Fruity"
                className="btn btn-primary"
              >
                Summer
              </button>
              <button
                onClick={this.handleQuestionThree}
                value={this.state.answerThree}
                id="Woody"
                className="btn btn-primary"
              >
                Fall
              </button>
            </div>
          </div>
          <div className={quizPageFourClasses} id="step-4">
            <div className="container">
              <div
                className="btn-toolbar justify-content-around mb-5"
                role="toolbar"
                aria-label="Toolbar with button groups"
              >
                <button
                  type="button"
                  className="btn-sm btn-primary"
                  onClick={this.handlePageBack}
                >
                  Previous
                </button>
                <h6 className="pt-1">4 of 5</h6>
                <button
                  type="button"
                  className="btn-sm btn-primary"
                  disabled={!this.state.questionFourAnswered}
                  onClick={this.handlePageForward}
                >
                  Next
                </button>
              </div>
            </div>
            <h4>What clothing style is your favorite?</h4>
            <em>Please, choose one</em>
            <div className="my-5 d-grid gap-4 d-md-flex justify-content-center">
              <button
                onClick={this.handleQuestionFour}
                value={this.state.answerFour}
                id="Athleisure"
                className="btn btn-primary"
              >
                Athleisure
              </button>
              <button
                onClick={this.handleQuestionFour}
                value={this.state.answerFour}
                id="Retro"
                className="btn btn-primary"
              >
                Retro
              </button>
              <button
                onClick={this.handleQuestionFour}
                value={this.state.answerFour}
                id="Bohemian"
                className="btn btn-primary"
              >
                Bohemian
              </button>
              <button
                onClick={this.handleQuestionFour}
                value={this.state.answerFour}
                id="Streetwear"
                className="btn btn-primary"
              >
                Streetwear
              </button>
              <button
                onClick={this.handleQuestionFour}
                value={this.state.answerFour}
                id="Minimalist"
                className="btn btn-primary"
              >
                Minimalist
              </button>
            </div>
          </div>
          <div className={quizPageFiveClasses} id="step-5">
            <div className="container">
              <div
                className="btn-toolbar justify-content-around mb-5"
                role="toolbar"
                aria-label="Toolbar with button groups"
              >
                <button
                  type="button"
                  className="btn-sm btn-primary"
                  onClick={this.handlePageBack}
                >
                  Previous
                </button>
                <h6 className="pt-1">5 of 5</h6>
                <button
                  type="button"
                  className="btn-sm btn-secondary"
                  disabled={true}
                >
                  Next
                </button>
              </div>
            </div>
            <h4>How intense would you like your scent?</h4>
            <em>Drag the slider to the desired value</em>
            <div className="my-5">
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
          <div className={quizPageFiveButtonClasses}>
            <button
              onClick={this.handlePageOneComplete}
              className="btn btn-primary"
            >
              Next
            </button>
          </div>
        </div>
        <div className={quizResultsClasses}>
          <h2>
            You got {this.state.answerTwo} and {this.state.answerThree}!
          </h2>
          <h2>
            Here are some {this.state.answerOne} products that match your Scent
            Profile:
          </h2>
          <button
            onClick={this.handleSeeFilteredProducts}
            className={seeProductsButtonClasses}
          >
            See Products
          </button>
          <div className={displayProductsClasses}>
            <div className="row">
              {this.state.productColumns.map((productList, index) => {
                return <ProductColumn key={index} list={productList} />;
              })}
            </div>
            <button
              onClick={this.handleSubmit}
              className={saveScentProfileButtonClasses}
            >
              Save My Scent Profile!
            </button>
          </div>
        </div>
        <div className={noProductsClasses}>
          <h2 className="fw-bold mt-5">We are so sorry.</h2>
          <h3>
            Unfortunately, we do not yet have any products that match your scent
            profile. Please check again soon!
          </h3>
        </div>
        <div className={resultsSubmittedClasses} id="success-message">
          You have saved your Body Scent Profile results!
        </div>
      </div>
    );
  }
}

export default BodyQuiz;
