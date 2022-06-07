import React from "react";

class BodyQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: "",
            answer: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAnswerChange = this.handleSubmit.bind(this);
    }

    async handleSubmit(event){
        event.preventDefault();
        const data = {...this.state};

        const url = 'http://localhost:8090/api/customers/bodyquiz'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json',
            }
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const newBodyquiz = await response.json();
            console.log(newBodyquiz);
            this.setState({
                question: "",
                answer: "",
            })
        }
    }

    handleAnswerChange(event){
        const value = event.target.value;
        this.setState({ answer: value });
    }
    render(){
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Body Quiz</h1>
                        <form onSubmit={this.handleSubmit} id="bodyquiz">
                            <div className="form-floating mb-3">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default BodyQuiz