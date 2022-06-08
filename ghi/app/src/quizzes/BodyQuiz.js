import { useState } from "react";

function BodyQuiz() {
  const questionOne = "A or B?";
  const questionTwo = "C or D?";
  const [answer, setAnswer] = useState();
  const [currentStep, setCurrentStep] = useState(1);

  // JUST EXPLORING HOW TO MAKE A QUESTION ALL ON THE FRONT END SIDE PLEASE IGNORE THIS TEST CODE

  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Scent Finder</h1>
      <h2 className="display-7 fw-bold">Body Products</h2>
      <div currentStep={1}>
        <p>{questionOne}</p>
        <button onClick={() => setCurrentStep(currentStep + 1)}>A</button>
        <button onClick={() => setCurrentStep(currentStep + 1)}>B</button>
      </div>
      <div currentStep={2}>
        <p>{questionTwo}</p>
        <button>C</button>
        <button>D</button>
      </div>
      {/* <p>What is your favorite scent from the options below?</p>
      <button onClick={() => setAnswer("Woodsy")}>Woodsy</button>
      <button onClick={() => setAnswer("Fresh")}>Fresh</button>
      <button onClick={() => setAnswer("Fruity")}>Fruity</button>
      <button onClick={() => setAnswer("Floral")}>Floral</button>
      <button onClick={() => setAnswer("Amber")}>Amber</button> */}
    </div>
  );
}

export default BodyQuiz;

// import React from "react";

// class BodyQuiz extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       question: "",
//       answer: "",
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleAnswerChange = this.handleSubmit.bind(this);
//   }

//   async handleSubmit(event) {
//     event.preventDefault();
//     const data = { ...this.state };

//     const url = "http://localhost:8090/api/customers/bodyquiz";
//     const fetchConfig = {
//       method: "post",
//       body: JSON.stringify(data),
//       headers: {
//         "Content-type": "application/json",
//       },
//     };
//     const response = await fetch(url, fetchConfig);
//     if (response.ok) {
//       const newBodyquiz = await response.json();
//       console.log(newBodyquiz);
//       this.setState({
//         question: "",
//         answer: "",
//       });
//     }
//   }

//   handleAnswerChange(event) {
//     const value = event.target.value;
//     this.setState({ answer: value });
//   }

//   handleQuestionChange(event) {
//     const value = event.target.value;
//     this.setState({ question: value });
//   }

//   render() {
//     let messageClasses = "alert alert-success d-none mb-0";
//     let formClasses = "";
//     if (this.state.customerCreated) {
//       messageClasses = "alert alert-success mb-0";
//       formClasses = "d-none";
//     }

//     return (
//       <div className="row">
//         <div className="offset-3 col-6">
//           <div className="shadow p-4 mt-4">
//             <h1>Body Quiz</h1>
//             <form
//               className={formClasses}
//               onSubmit={this.handleSubmit}
//               id="bodyquiz"
//             >
//               <div className="form-floating mb-3">
//                 <input
//                   className="form-control"
//                   onChange={this.handleQuestionChange}
//                   value={this.state.question}
//                   placeholder="Question"
//                   required
//                   type="text"
//                   name="question"
//                   id="name"
//                 />
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default BodyQuiz;
