import React from "react";

// This function populates the page with Product Cards matching the user's
// scent profile results
function ProductColumn(props) {
  return (
    <div className="card col-3 my-2 mx-2">
      {props.product.image && (
        <img src={props.product.image} className="card-img-top" alt="Product" />
      )}
      <div className="card-body">
        <h5 className="card-title">{props.product.name}</h5>
        <h6 className="card-subtitle text-muted">{props.product.price}</h6>
      </div>
    </div>
  );
}

class HomeQuiz extends React.Component {
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
      noMatches: false,
      created: "",
      quizQuestionsComplete: false,
      quizCompleted: false,
      resultsSubmitted: false,
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
    this.handleSeeFilteredProducts = this.handleSeeFilteredProducts.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // This function creates an empty list when the page is first rendered
  // that we can later add products to when the user finishes the quiz
  async componentDidMount() {
    const productUrl = "http://localhost:8100/api/products/";
    const productResponse = await fetch(productUrl);

    if (productResponse.ok) {
      let emptyProductsList = [];
      this.setState({ products: emptyProductsList });
    }
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
    this.setState({ answerFive: parseInt(value) }); // parses the int value
    this.setState({ questionFiveAnswered: true });
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

    const url = "http://localhost:8100/api/products/";

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();

        const products = [];
        for (let product of data.products) {
          // First, filter the list of products to match the product category
          // that the user is looking for: Candle, Incense, or Room Spray
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
    // delete data.productsColumns;
    delete data.resultsSubmitted;
    delete data.noMatches;

    // . . . so that we can POST a quiz object into our database!
    const quizResultsUrl = "http://localhost:8090/api/homequizzes/";
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
        quizQuestionsComplete: false,
        quizCompleted: false,
        pageOneComplete: false,
        products: [],
        resultsSubmitted: true,
      });
    }
  }

  render() {
    // These variables dictate Bootstrap CSS styling rules to toggle
    // displaying or hiding certain "pages" of the quiz
    // An empty string is displayed, and "d-none" will be hidden!
    let quiz = "";
    let quizPageOneClasses = "";
    let quizPageTwoClasses = "d-none";
    let quizPageThreeClasses = "d-none";
    let quizPageFourClasses = "d-none";
    let quizPageFiveClasses = "d-none";
    let quizResultsClasses = "d-none";
    let quizPageFiveButtonClasses = "d-none";
    let displayProductsClasses = "d-none";
    let noProductsClasses = "d-none";
    let resultsSubmittedClasses = "alert alert-success mb-0 d-none";

    // If the user clicks an answer for Question One, then hide Question One
    // and display Question Two
    if (this.state.questionOneAnswered) {
      quizPageOneClasses = "d-none";
      quizPageTwoClasses = "";
    }
    if (this.state.questionTwoAnswered) {
      quizPageTwoClasses = "d-none";
      quizPageThreeClasses = "";
    }
    if (this.state.questionThreeAnswered) {
      quizPageThreeClasses = "d-none";
      quizPageFourClasses = "";
    }
    if (this.state.questionFourAnswered) {
      quizPageFourClasses = "d-none";
      quizPageFiveClasses = "";
    }

    // If the user clicks an answer for Question Five, then display the Next
    // button that will take them to the Authentication Screen (not yet implemented)
    if (this.state.questionFiveAnswered) {
      quizPageFiveButtonClasses = "px-4 py-5 my-5 text-center";
    }

    //If all the questions have been answered, and the Next button has been
    // clicked by the User, then display the Results page
    if (this.state.quizQuestionsComplete) {
      quizResultsClasses = "";
      quizPageFiveClasses = "d-none";
      quizPageFiveButtonClasses = "d-none";
    }

    // If the User clicks the "See Products" button, then display the filtered
    // products cards!
    if (this.state.quizCompleted) {
      displayProductsClasses = "";
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
      <div className="container">
        <div className="px-4 py-5 my-5 text-center">
          <h1 className="display-5 fw-bold">Scent Finder</h1>
          <h2 className="display-7 fw-bold">Home Products</h2>
        </div>
        <div className={quiz}>
          <div className={quizPageOneClasses} id="step-1">
            <div className="px-4 py-5 my-5 text-center">
              <h1>Question One</h1>
              <em>Please, choose one</em>
              <p>What kind of product are you looking for?</p>
              <div className="d-grid gap-4 d-md-flex justify-content-center">
                <button
                  onClick={this.handleQuestionOne}
                  value={this.state.answerOne}
                  id="Candle"
                  className="btn btn-primary"
                >
                  Candle
                </button>
                <button
                  onClick={this.handleQuestionOne}
                  value={this.state.answerOne}
                  id="Room Spray"
                  className="btn btn-primary"
                >
                  Room Spray
                </button>
                <button
                  onClick={this.handleQuestionOne}
                  value={this.state.answerOne}
                  id="Incense"
                  className="btn btn-primary"
                >
                  Incense
                </button>
              </div>
            </div>
          </div>
          <div className={quizPageTwoClasses}>
            <div className="px-4 py-5 my-5 text-center" id="step-2">
              <h1>Question Two</h1>
              <em>Please, choose one</em>
              <p>Where is your happy place?</p>
              <div className="d-grid gap-4 d-md-flex justify-content-center">
                <button
                  onClick={this.handleQuestionTwo}
                  value={this.state.answerTwo}
                  id="Fresh"
                  className="btn btn-primary"
                >
                  Mountain
                </button>
                <button
                  onClick={this.handleQuestionTwo}
                  value={this.state.answerTwo}
                  id="Amber"
                  className="btn btn-primary"
                >
                  Bookstore
                </button>
                <button
                  onClick={this.handleQuestionTwo}
                  value={this.state.answerTwo}
                  id="Floral"
                  className="btn btn-primary"
                >
                  Garden
                </button>
                <button
                  onClick={this.handleQuestionTwo}
                  value={this.state.answerTwo}
                  id="Woody"
                  className="btn btn-primary"
                >
                  Forest
                </button>
                <button
                  onClick={this.handleQuestionTwo}
                  value={this.state.answerTwo}
                  id="Fruity"
                  className="btn btn-primary"
                >
                  Tropical Beach
                </button>
              </div>
            </div>
          </div>
          <div className={quizPageThreeClasses}>
            <div className="px-4 py-5 my-5 text-center" id="step-3">
              <h1>Question Three</h1>
              <em>Please, choose one</em>
              <p>What is your favorite season?</p>
              <div className="d-grid gap-4 d-md-flex justify-content-center">
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
          </div>
          <div className={quizPageFourClasses}>
            <div className="px-4 py-5 my-5 text-center" id="step-4">
              <h1>Question Four</h1>
              <em>Please, choose one</em>
              <p>What clothing style is your favorite?</p>
              <div className="d-grid gap-4 d-md-flex justify-content-center">
                <button
                  onClick={this.handleQuestionFour}
                  value={this.state.answerFour}
                  id="Modern"
                  className="btn btn-primary"
                >
                  Modern
                </button>
                <button
                  onClick={this.handleQuestionFour}
                  value={this.state.answerFour}
                  id="Rustic"
                  className="btn btn-primary"
                >
                  Rustic
                </button>
                <button
                  onClick={this.handleQuestionFour}
                  value={this.state.answerFour}
                  id="Minimalist"
                  className="btn btn-primary"
                >
                  Minimalist
                </button>
                <button
                  onClick={this.handleQuestionFour}
                  value={this.state.answerFour}
                  id="Industrial"
                  className="btn btn-primary"
                >
                  Industrial
                </button>
                <button
                  onClick={this.handleQuestionFour}
                  value={this.state.answerFour}
                  id="Coastal"
                  className="btn btn-primary"
                >
                  Coastal
                </button>
              </div>
            </div>
          </div>
          <div className={quizPageFiveClasses}>
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
          <div className={quizPageFiveButtonClasses}>
            <button
              onClick={this.handlePageOneComplete}
              className="btn btn-primary"
            >
              Next
            </button>
          </div>
          <div className={quizResultsClasses}>
            <div className="px-4 py-5 my-5 text-center">
              <h2>
                You got {this.state.answerTwo} and {this.state.answerThree}!
                Here are some {this.state.answerOne} products that match your
                Scent Profile:
              </h2>
              <button
                onClick={this.handleSeeFilteredProducts}
                className="btn btn-primary"
              >
                See Products
              </button>
              <div className={displayProductsClasses}>
                <h2>Your Matched Products</h2>
                <div className="row">
                  {this.state.products.map((product) => {
                    return (
                      <ProductColumn product={product} key={product.href} />
                    );
                  })}
                </div>
                <button onClick={this.handleSubmit} className="btn btn-primary">
                  Save My Scent Profile!
                </button>
              </div>
            </div>
          </div>
          <div className={noProductsClasses}>
            <h3>
              We are so sorry. Unfortunately, we do not yet have any products
              that match your scent profile. Please check again soon!
            </h3>
          </div>
        </div>
        <div className={resultsSubmittedClasses} id="success-message">
          You have saved your Body Scent Profile results!
        </div>
      </div>
    );
  }
}

export default HomeQuiz;
