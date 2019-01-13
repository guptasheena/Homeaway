import React, { Component } from "react";
import Navbar from "../common/navbar";
import { Redirect } from "react-router";
import { getQuestion, getAnswer, sendAnswer } from "../../actions/inboxActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getTravelerToken,
  getOwnerToken,
  getJWTUsername
} from "../common/auth";
import { Field, reduxForm } from "redux-form";
import { If, Else, Then } from "react-if";

class Inbox extends Component {
  componentDidMount() {
    this.props.getQuestion(getJWTUsername());
    this.props.getAnswer(getJWTUsername());
  }

  onSubmit(values) {
    var data = {
      message: values.answer,
      propertyID: this.props.question[0].propertyID,
      askedTo: getJWTUsername(),
      askedBy: this.props.question[0].askedBy
    };

    this.props.sendAnswer(data);
    window.alert("Message sent successfully!");
    window.location.reload();
  }

  renderTextArea(field) {
    const {
      meta: { touched, error }
    } = field;

    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    return (
      <div className={className}>
        <textarea
          className="form-control"
          rows="5"
          {...field.input}
          placeholder={field.label}
        />
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    const username = getJWTUsername();

    let redirectVar = null;
    if (!getTravelerToken() && !getOwnerToken()) {
      redirectVar = <Redirect to="/home" />;
    }

    const { question, answer } = this.props;

    if (question.length === 0) {
      return (
        <React.Fragment>
          {redirectVar}
          <Navbar />
          <p className="notfound">You don't have any messages.</p>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {redirectVar}
        <Navbar />
        {question &&
          question.map((ques, index1) => (
            <div className="inbox_body" key={ques.askedTo}>
              <h4>{ques.message}</h4>
              <h6>
                Property ID:{" "}
                <Link
                  to={{
                    pathname: "/viewdashboardproperty",
                    state: {
                      propertyID: ques.propertyID
                    }
                  }}
                >
                  {ques.propertyID}
                </Link>
              </h6>

              <If condition={ques.askedBy === username}>
                <Then>
                  <h6>
                    {answer[index1] ? "Answered by:" : "Asked to:"}{" "}
                    <Link
                      to={{
                        pathname: "/viewdashboardprofile",
                        state: {
                          username: ques.askedTo
                        }
                      }}
                    >
                      {ques.askedTo}
                    </Link>
                  </h6>
                </Then>
                <Else>
                  <h6>
                    Asked by:{" "}
                    <Link
                      to={{
                        pathname: "/viewdashboardprofile",
                        state: {
                          username: ques.askedBy
                        }
                      }}
                    >
                      {ques.askedBy}
                    </Link>
                  </h6>
                </Else>
              </If>
              <If condition={answer[index1]}>
                <Then>{answer[index1] ? answer[index1].message : ""}</Then>
                <Else>
                  <If condition={ques.askedBy === username}>
                    <Then>No response yet.</Then>
                    <Else>
                      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field
                          name="answer"
                          component={this.renderTextArea}
                          label="Type your answer here..."
                        />
                        <button type="submit" className="btn btn-primary">
                          Send
                        </button>
                      </form>
                    </Else>
                  </If>
                </Else>
              </If>
            </div>
          ))}
      </React.Fragment>
    );
  }
}

Inbox.propTypes = {
  getAnswer: PropTypes.func.isRequired,
  getQuestion: PropTypes.func.isRequired,
  sendAnswer: PropTypes.func.isRequired
};

// const mapStateToProps = state => ({
//   question: state.inbox.question,
//   answer: state.inbox.answer
// });

// export default reduxForm({
//   form: "inboxForm"
// })(
//   connect(
//     mapStateToProps,
//     { getAnswer, sendMessage, getQuestion }
//   )
// )(Inbox);

Inbox = reduxForm({
  form: "inboxForm"
})(Inbox);

Inbox = connect(
  state => ({
    question: state.inbox.question,
    answer: state.inbox.answer
    // initialValues: state.inbox.answer
  }),
  { getAnswer, sendAnswer, getQuestion }
)(Inbox);

export default Inbox;
