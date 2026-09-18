import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";

export default function GCKeyForgotUsername() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setShowError(true);
      return;
    }
    // Proceed if valid...
    setShowError(false);
  };

  const handleClear = () => {
    setEmail("");
    setShowError(false);
  };

  return (
    <main role="main" property="mainContentOfPage">
      <SEO
        title="Recover Username Step 1 of 2 - GCKey"
        description="Recover your GCKey username by entering your registered email address."
        keywords="GCKey recover username, forgot GCKey username, GCKey password recovery"
      />
      <h1 id="wb-cont">Recover Username Step 1 of 2</h1>
      <noscript>
        <div className="row nojs-show">
          <div className="col-xs-12">
            <div className="alert alert-warning">
              <p>
                GCKey login requires that your JavaScript function be enabled in
                your browser settings. Please enable JavaScript to proceed.
              </p>
            </div>
          </div>
        </div>
      </noscript>

      {showError && (
        <div className="row col-md-8">
          <div id="errors-login" role="alert" tabIndex="-1">
            <p>
              <strong>
                The form could not be submitted because 1 error was found.
              </strong>
            </p>
            <ul>
              <li>
                <a href="#email">
                  <span className="prefix">Error 1: </span>Email Address is
                  missing, invalid or incomplete.
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-md-8">
          <form autoComplete="off" id="login" onSubmit={handleSubmit}>
            <p>
              Enter the email address associated with your account. We will send
              you an email with your username.
            </p>
            <div className="form-group">
              <label htmlFor="email">
                Email Address: <strong>(required)</strong>
              </label>

              {showError && (
                <strong>
                  <span className="inputError">
                    <span className="prefix">Error 1: </span>Your Email Address
                    is missing, invalid or incomplete.
                  </span>
                </strong>
              )}
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control noClearOnError emailValidation"
                title="Mandatory - Enter your Email Address."
              />
            </div>
            <p>
              Please select <strong>Continue</strong> to proceed or select{" "}
              <strong>Cancel</strong> to end this process.
            </p>
            <div className="form-group form-buttons">
              <p style={{ textAlign: "center" }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="button"
                  title="Submit your data and continue the process"
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                >
                  Continue
                </button>{" "}
                <button
                  type="button"
                  onClick={handleClear}
                  className="btn btn-default cancel"
                  id="button2"
                  title="Information entered will be cleared"
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                >
                  Clear All
                </button>{" "}
                <button
                  type="button"
                  onClick={() => navigate("/j/eng/l")}
                  className="btn btn-default cancel"
                  id="button3"
                  title="Cancel the process"
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                >
                  Cancel
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="row col-md-12 pagedetails">
        <div className="datemod">
          <dl id="wb-dtmd" role="contentinfo">
            <dt>Date modified:</dt>
            <dd>
              <time property="dateModified">2026-01-18</time>
            </dd>
          </dl>
        </div>
      </div>
    </main>
  );
}
