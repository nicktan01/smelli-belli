import React from "react";

class AccountPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    // accounts/<str:email>/
    render() {
        return (
            <div className="px-4 py-5 my-5 text-center">
                <h1 className="display-5 fw-bold">Smelli Belli</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">Home and body products</p>
                </div>
            </div>
        )
    }

}

export default AccountPage;