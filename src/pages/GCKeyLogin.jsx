import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "../context/LanguageContext";

export default function GCKeyLogin() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowError(false);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          login(data.user, data.token);
        }
        if (data.user && data.user.role === "admin") {
          navigate("/admin");
        } else if (data.user && (data.user.role === "employe" || data.user.role === "employee")) {
          navigate("/employee");
        } else {
          navigate("/mycic/home");
        }
      } else {
        setShowError(true);
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setShowError(true);
      setUsername("");
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setUsername("");
    setPassword("");
    setShowError(false);
  };

  const handleExitSubmit = (e) => {
    e.preventDefault();
    navigate("/en/index");
  };

  return (
    <main role="main" property="mainContentOfPage">
      <SEO
        title="Welcome to GCKey - Sign In / Sign Up"
        description="Sign in with your GCKey username and password to access Government of Canada online services, IRCC account, and application portals."
        keywords="GCKey login, Government of Canada login, GCKey sign in, IRCC login, MyCIC login"
      />
      <div className="row">
        <div className="col-xs-12">
          <h1 id="wb-cont">{t('welcomeGCKey')}</h1>
          {showError && (
            <div className="row col-md-8">
              <div id="errors-login" role="alert" tabIndex="-1">
                <p>
                  <strong>
                    The form could not be submitted because 2 errors were found.
                    For your security, all fields have been cleared.
                  </strong>
                </p>
                <ul>
                  <li>
                    <a href="#token1">
                      <span className="prefix">Error 1: </span>Username may be
                      missing, invalid or incomplete.
                    </a>
                  </li>
                  <li>
                    <a href="#token2">
                      <span className="prefix">Error 2: </span>Password may be
                      missing, invalid or incomplete.
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}
          <noscript>
            <div className="row nojs-show">
              <div className="col-xs-12">
                <div className="alert alert-warning">
                  <p>
                    GCKey login requires that your JavaScript function be
                    enabled in your browser settings. Please enable JavaScript
                    to proceed.
                  </p>
                </div>
              </div>
            </div>
          </noscript>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="margin-top-medium">
            <div className="panel panel-default login-panel">
              <div className="panel-body" style={{ paddingTop: "27px" }}>
                <div className="row">
                  <div className="wb-sec hidden-md hidden-lg col-xs-12">
                    <div className="col-xs-12">
                      <h2 style={{ marginTop: "0" }}>{t('simpleSecureAccess')}</h2>
                      <p>
                        A simple way to securely access Government of Canada
                        online services.
                      </p>
                      <p></p>
                      <ul style={{ paddingLeft: "0px" }}>
                        <li style={{ listStyle: "none" }}>One username.</li>
                        <li style={{ listStyle: "none" }}>One password.</li>
                      </ul>
                      <p>
                        Your GCKey can be used to access multiple Government of
                        Canada online{" "}
                        <a
                          href="/ES-01"
                          target="_blank"
                          title="Enabled Services (opens in a new window)"
                        >
                          Enabled Services
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                  <div id="left-box" className="col-md-8 col-xs-12">
                    <div className="col-xs-12">
                      <h2 style={{ marginTop: "0" }}>{t('signInBtn')}</h2>
                    </div>
                    <div className="col-xs-12">
                      <form
                        autoComplete="off"
                        role="form"
                        id="login"
                        onSubmit={handleLoginSubmit}
                      >
                        <div className="form-group">
                          <label htmlFor="token1">
                            <span className="field-name">
                              {t('username')}: <strong>(required)</strong>
                            </span>
                          </label>

                          {showError && (
                            <strong>
                              <span className="inputError">
                                <span className="prefix">Error 1: </span>Your
                                Username may be missing, invalid or incomplete.
                              </span>
                            </strong>
                          )}
                          <input
                            type="text"
                            className="form-control ho01e1"
                            id="token1"
                            name="token1"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            title="Mandatory - Enter your username."
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="token2">
                            <span className="field-name">
                              {t('password')}: <strong>(required)</strong>
                            </span>
                          </label>

                          {showError && (
                            <strong>
                              <span className="inputError">
                                <span className="prefix">Error 2: </span>Your
                                Password may be missing, invalid or incomplete.
                              </span>
                            </strong>
                          )}
                          <input
                            type="password"
                            className="form-control ho01e2"
                            id="token2"
                            name="token2"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            title="Mandatory - Enter your password."
                          />
                        </div>
                        <div className="form-group form-buttons">
                          <div style={{ textAlign: "center" }}>
                            <button
                              type="submit"
                              id="button"
                              className="btn btn-primary"
                              title="Connect to the GCKey service"
                              style={{
                                marginLeft: "auto",
                                marginRight: "auto",
                              }}
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <span>
                                  <style>{`@keyframes spinner-rot { to { transform: rotate(360deg); } }`}</style>
                                  <span
                                    className="glyphicon glyphicon-refresh"
                                    style={{
                                      animation:
                                        "spinner-rot 1s linear infinite",
                                      marginRight: "5px",
                                    }}
                                  ></span>
                                  Signing In...
                                </span>
                              ) : (
                                t('signInBtn')
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={handleClear}
                              className="btn btn-default cancel"
                              id="button2"
                              title="Information entered will be cleared"
                              style={{
                                marginLeft: "auto",
                                marginRight: "auto",
                              }}
                            >
                              {t('clearBtn')}
                            </button>
                            <Link
                              to="/j/eng/rg"
                              id="signUpButtonMobile"
                              className="btn btn-primary visible-xs visible-sm"
                              style={{
                                margin: "5px",
                                marginLeft: "auto",
                                marginRight: "auto",
                              }}
                              title="Sign Up / Register for a new GCKey"
                            >
                              Sign Up
                            </Link>
                          </div>
                        </div>
                        <input
                          type="hidden"
                          id="captcha-token"
                          name="captcha-token"
                        />
                        <input
                          type="hidden"
                          id="captcha-error"
                          name="captcha-error"
                        />
                        <input
                          type="hidden"
                          name="_csrf"
                          value="d1abe798-1c5b-4ed0-b162-805f9f43f20b"
                        />
                      </form>
                    </div>
                    <div className="col-xs-12 text-center">
                      <Link
                        className="mrgn-tp-sm visible-xs-block visible-sm-block visible-md-inline visible-lg-inline"
                        to="/fu"
                        id="forgotUsernameLink"
                        title="Forgot your username?"
                      >
                        Forgot your username?
                      </Link>
                      <span className="mrgn-lft-md mrgn-rght-md hidden-sm hidden-xs">
                        •
                      </span>
                      <Link
                        className="mrgn-tp-sm visible-xs-block visible-sm-block visible-md-inline visible-lg-inline"
                        to="/fp"
                        id="forgotPasswordLink"
                        title="Forgot your password? Reset it here."
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </div>
                  <div className="wb-sec col-md-4 hidden-xs hidden-sm">
                    <div className="col-xs-12">
                      <h2 style={{ marginTop: "0" }}>Simple Secure Access</h2>
                      <p>
                        A simple way to securely access Government of Canada
                        online services.
                      </p>
                      <p></p>
                      <ul style={{ paddingLeft: "0px" }}>
                        <li style={{ listStyle: "none" }}>One username.</li>
                        <li style={{ listStyle: "none" }}>One password.</li>
                      </ul>
                      <p
                        style={{
                          textAlign: "center",
                          marginTop: "20px",
                          marginBottom: "20px",
                        }}
                      >
                        <Link
                          to="/j/eng/rg"
                          id="signUpButton"
                          className="btn btn-primary"
                          style={{ width: "13em" }}
                          title="Sign Up / Register for a new GCKey"
                        >
                          Sign Up
                        </Link>
                      </p>
                      <p>
                        Your GCKey can be used to access multiple Government of
                        Canada online{" "}
                        <Link
                          to="/ES-01"
                          target="_blank"
                          title="Enabled Services (opens in a new window)"
                        >
                          Enabled Services
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="col-xs-12">
            <div className="col-xs-12">
              <div className="text-center">
                <p>
                  Please select <strong>Exit</strong> to leave the GCKey service
                  and return to the Government of Canada online service.
                </p>
                <form autoComplete="off" onSubmit={handleExitSubmit}>
                  <div className="form-buttons" style={{ textAlign: "center" }}>
                    <button
                      type="submit"
                      className="btn btn-default cancel"
                      title="Exit the GCKey service"
                      id="Exit"
                      style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      Exit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pagedetails">
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
