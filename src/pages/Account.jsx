import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Key, Landmark, UserPen } from 'lucide-react';
import SEO from '../components/SEO';

export default function Account() {
  return (
    <main property="mainContentOfPage" resource="#wb-main" typeof="WebPageElement">
      <SEO
        title="IRCC secure account : Sign in"
        description="Sign in or register for an IRCC secure account using GCKey or Sign-In Partner to apply online, check application status, and submit documents."
        keywords="IRCC secure account, sign in GCKey, Sign-In Partner, register IRCC account, Canada visa account"
      />
      {/* Breadcrumb */}
      {/* <nav id="wb-bc" property="breadcrumb">
        <h2 className="wb-inv">You are here:</h2>
        <div className="container">
          <ol className="breadcrumb">
            <li><a href="/en">Canada.ca</a></li>
            <li><a href="/immigration-citizenship">Immigration and citizenship</a></li>
            <li><a href="/immigration-refugees-citizenship/services/application">Your IRCC application</a></li>
          </ol>
        </div>
      </nav> */}

      {/* ── Section 1: Page title + intro ── */}
      <div className="mwsgeneric-base-html parbase section">
        <div className="container">
          <h1 property="name" id="wb-cont" dir="ltr">
            <span className="stacked">
              <span>IRCC secure account</span>
              {" : "}
              <span>Sign in</span>
            </span>
          </h1>

          <p>We have different accounts for some applications.</p>
          <p>
            <strong>You may need a different account to apply</strong>,
            depending on the application you submit.
          </p>

          <h2>Check if this is the right account for you</h2>

          {/* Apply */}
          <details>
            <summary>
              <strong>Apply</strong> for these applications
            </summary>
            <ul>
              <li>work permits</li>
              <li>Express Entry (immigrating as a skilled worker)</li>
              <li>International Experience Canada</li>
              <li>extending work and study permits</li>
              <li>visitor records (to stay in Canada longer)</li>
              <li>change your school (if you have a study permit)</li>
              <li>change conditions on your work permit</li>
              <li>Canadian citizenship certificates (proof of citizenship)</li>
              <li>search of citizenship records</li>
              <li>
                temporary health benefits for refugees and protected persons
                (the Interim Federal Health Program)
              </li>
            </ul>
            <p>
              You might also need to use this account for these applications,
              depending on your situation:
            </p>
            <ul>
              <li>
                study permits, including those under the Francophone Minority
                Communities Student Pilot (FMCSP)
              </li>
              <li>
                some visitor visas (
                <a href="/immigration-refugees-citizenship/services/visit-canada/apply-visitor-visa">
                  get visitor visa instructions for your situation)
                </a>
              </li>
            </ul>
            <p>
              <strong>
                If your application isn't listed, review your program content to
                get instructions on how to apply:
              </strong>
            </p>
            <ul>
              <li>
                <a href="/immigration-refugees-citizenship/services/visit-canada">
                  Visit Canada
                </a>
                &nbsp;(includes visas and electronic travel authorizations)
              </li>
              <li>
                <a href="/immigration-refugees-citizenship/services/immigrate-canada">
                  Immigrate to Canada
                </a>
                &nbsp;(includes family sponsorship, Express entry and other
                economic immigration programs)
              </li>
              <li>
                <a href="/immigration-refugees-citizenship/services/work-canada">
                  Work in Canada
                </a>
                &nbsp;(includes work permits and International Experience
                Canada)
              </li>
              <li>
                <a href="/immigration-refugees-citizenship/services/study-canada">
                  Study in Canada
                </a>
                &nbsp;(includes study permits and extensions)
              </li>
              <li>
                <a href="/immigration-refugees-citizenship/services/canadian-citizenship">
                  Canadian citizenship
                </a>
                &nbsp;(includes applying for citizenship and proof of
                citizenship)
              </li>
              <li>
                <a href="/immigration-refugees-citizenship/services/refugees">
                  Refugees and asylum
                </a>
                &nbsp;(includes asylum claims and sponsoring refugees)
              </li>
            </ul>
          </details>

          {/* Check status */}
          <details>
            <summary>
              <strong>Check the status</strong> of these applications
            </summary>
            <ul>
              <li>applications you submitted in this account</li>
              <li>
                these applications (after you{" "}
                <a href="/immigration-refugees-citizenship/services/application/account/link-paper-online">
                  link the application to your account
                </a>
                ):
                <ul>
                  <li>Agri-Food Pilot</li>
                  <li>Atlantic Immigration Pilot</li>
                  <li>Atlantic Immigration Program</li>
                  <li>Caring for children</li>
                  <li>Caring for people with high medical needs</li>
                  <li>electronic travel authorization (eTA)</li>
                  <li>Express Entry</li>
                  <li>
                    family sponsorship (excluding applications to become a
                    sponsor)
                  </li>
                  <li>Home Child Care Provider Pilot</li>
                  <li>Home Support Worker Pilot</li>
                  <li>in-Canada live-in caregivers</li>
                  <li>
                    in-Canada protected persons and convention refugees
                    (excluding dependant applications)
                  </li>
                  <li>Interim Federal Health Program</li>
                  <li>International Experience Canada (IEC)</li>
                  <li>permanent resident card</li>
                  <li>Provincial Nominee Program</li>
                  <li>Quebec entrepreneurs</li>
                  <li>Quebec investors</li>
                  <li>Quebec-selected skilled worker</li>
                  <li>Rural and Northern Immigration Pilot</li>
                  <li>self-employed persons (including Quebec)</li>
                  <li>start-up visa</li>
                  <li>study permit and extension</li>
                  <li>
                    Temporary Resident to Permanent Resident Pathway (TR to PR
                    Pathway)
                  </li>
                  <li>visitor visa</li>
                  <li>visitor record</li>
                  <li>work permit and extension</li>
                </ul>
              </li>
            </ul>
            <p>
              Can't find your application?{" "}
              <a href="/immigration-refugees-citizenship/services/application/check-status">
                Get instructions on how to check your application status.
              </a>
            </p>
          </details>

          {/* Upload documents */}
          <details>
            <summary>
              <strong>Upload requested documents</strong> for these applications
            </summary>
            <ul>
              <li>
                applications you submitted in this account (
                <strong>only if</strong> we ask you for the document)
              </li>
              <li>
                electronic travel authorizations (eTA) (<strong>only if</strong>{" "}
                we email you about submitting your documents)
              </li>
            </ul>
            <p>
              <a href="https://ircc.canada.ca/english/helpcentre/answer.asp?qnum=1310&top=23">
                Get more help with submitting documents we request.
              </a>
            </p>
          </details>
        </div>
      </div>

      {/* ── Section 2: Alerts ── */}
      <div className="mwsgeneric-base-html parbase section">
        <div id="alerts">
          <section className="brdr-0 mrgn-bttm-0 infobg">
            <div className="container">
              <h2 className="wb-inv">Alerts</h2>
              <div className="row mrgn-tp-md d-flex align-items-center">
                <div className="col-md-1 col-xs-12 hidden-xs hidden-sm">
                  <div className="text-center">
                    <AlertCircle size={48} aria-hidden="true" />
                  </div>
                </div>
                <div className="col-md-11 col-xs-12">
                  <details className="mrgn-tp-0">
                    <summary>Study permit applicants</summary>
                    <p>
                      As of 8:30 am ET on January 22, 2024, most students must
                      include a provincial attestation letter (PAL) from the
                      province or territory where they plan to study with their
                      study permit application.
                    </p>
                    <p>
                      In most cases, if you apply without a PAL, your
                      application will be returned with fees.
                    </p>
                    <p>
                      <a href="/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents#attestation">
                        Learn more about the provincial attestation letter.
                      </a>
                    </p>
                    <details>
                      <summary>
                        New PAL/TAL exemptions for study permit applications
                      </summary>
                      <p>
                        The exemptions for including a PAL/TAL with your study
                        permit application have changed. If your application is
                        already in progress (but hasn't been submitted), check
                        the list of{" "}
                        <a href="/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents/provincial-attestation-letter#exemptions">
                          PAL/TAL exemptions
                        </a>{" "}
                        to see if you need to include one.
                      </p>
                    </details>
                  </details>

                  <details className="mrgn-tp-0">
                    <summary>
                      Delays with the status of your medical exam results
                    </summary>
                    <details>
                      <summary>
                        If we asked you for a medical exam after you applied
                      </summary>
                      <p>
                        You may not see the status of your results updated right
                        away.
                      </p>
                      <ul>
                        <li>
                          Your results <strong>usually</strong> show up in your
                          account <strong>within 30 days</strong> of the date
                          you booked your exam.
                        </li>
                        <li>
                          It may <strong>take longer </strong>(for example, if
                          we need more information from you).
                        </li>
                      </ul>
                    </details>
                    <details>
                      <summary>
                        If you got your medical exam before you applied (upfront
                        medical exam)
                      </summary>
                      <p>
                        You may not see the status of your results updated in
                        your account until we finish processing your immigration
                        application. We need time to
                      </p>
                      <ul>
                        <li>process your application</li>
                        <li>link the results to your application</li>
                      </ul>
                      <p>
                        <a href="/immigration-refugees-citizenship/services/application/check-processing-times">
                          Check the application processing time
                        </a>
                        .
                      </p>
                    </details>
                    <details>
                      <summary>
                        If we ask or if a panel physician asks you for
                        additional medical information, tests or treatment
                      </summary>
                      <p>To avoid more delays, you must</p>
                      <ul>
                        <li>go back to see the physician</li>
                        <li>
                          complete the requirement <strong>before</strong> we
                          can assess your medical exam
                        </li>
                      </ul>
                      <p>
                        Don't complete a new medical exam unless we instruct you
                        to do so.
                      </p>
                      <p>
                        Your panel physician can explain how long it will take
                        to complete additional testing or treatment.
                      </p>
                    </details>
                  </details>

                  <details className="mrgn-tp-0">
                    <summary>
                      Student Direct Stream{" "}
                      <span className="label label-danger">Closed</span>
                    </summary>
                    <p>
                      The last day to apply was November 8, 2024, before 2 p.m.
                      ET.
                    </p>
                  </details>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ── Section 3: Sweet class action alert ── */}
      <div className="mwscolumns section">
        <div className="row row-no-gutters mrgn-tp-md">
          <div className="container">
            <div className="alert alert-warning">
              <h3>
                <em>Sweet</em> class action:
              </h3>
              <p>
                A settlement agreement in the <em>Sweet</em> Class Action has
                been approved by the Federal Court. Learn more about available
                compensation in the{" "}
                <a href="/government/system/digital-government/online-security-privacy/sweet-hmk-class-action-suit/notice-settlement-approval-sweet-v-his-majesty-king-federal-court-file-t-982-20">
                  Notice of Settlement Approval
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 4: Sign in / Create account ── */}
      <div className="mwsgeneric-base-html parbase section">
        <section className="container">
          <h2 className="wb-inv">IRCC secure account access</h2>

          <div className="well well-sm brdr-rds-0 mrgn-tp-md">
            <div className="panel mrgn-bttm-0 brdr-rds-0">
              <div className="panel-body">
                <div className="cnjnctn-type-or cnjnctn-md mrgn-tp-0 brdr-0">
                  {/* Sign in column */}
                  <div className="cnjnctn-col">
                    <h3 className="mrgn-tp-sm">Sign in</h3>
                    <div className="row mrgn-tp-md">
                      <div className="col-sm-10 col-sm-offset-1">
                        <ul className="list-unstyled lst-spcd-2">
                          <li>
                            <Link
                              className="btn btn-primary btn-block p-sm-3"
                              to="/j/eng/l"
                            >
                              <span className="h6 mrgn-tp-0 mrgn-bttm-0 d-flex align-items-center">
                                <Key
                                  size={20}
                                  className="mrgn-rght-sm"
                                  aria-hidden="true"
                                />
                                <span className="text-center full-width">
                                  GCKey username and password
                                  <span className="wb-inv">GCKey Sign-In</span>
                                </span>
                              </span>
                            </Link>
                          </li>
                          <li>
                            <a
                              className="btn btn-primary btn-block p-sm-3"
                              href="https://onlineservices-servicesenligne-cic.fjgc-gccf.gc.ca/mycic/gccf?lang=eng&idp=securekey&svc=/mycic/start"
                            >
                              <span className="h6 mrgn-tp-0 mrgn-bttm-0 d-flex align-items-center">
                                <Landmark
                                  size={20}
                                  className="mrgn-rght-sm"
                                  aria-hidden="true"
                                />
                                <span className="text-center full-width">
                                  Canadian <i>Interac</i>® Sign-In Partner
                                  <span className="wb-inv">bank Sign-In</span>
                                </span>
                              </span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <details className="mrgn-bttm-md">
                      <summary>Not sure how to sign in?</summary>
                      <p>
                        You registered with either GCKey or your Canadian
                        banking Sign-In Partner when you created your account.
                      </p>
                      <p>
                        Use the option you registered with every time you sign
                        in. It's tied to your account and user profile.
                      </p>
                      <p>
                        If you want to choose the other sign-in option, you'll
                        have to register for it.
                      </p>
                      <p>
                        <a href="#help">Get more help with your account</a>.
                      </p>
                    </details>
                  </div>

                  {/* Create account column */}
                  <div className="cnjnctn-col">
                    <h3 className="mrgn-tp-sm">Create an account</h3>
                    <div className="row mrgn-tp-md">
                      <div className="col-sm-10 col-sm-offset-1">
                        <a
                          href="/immigration-refugees-citizenship/services/application/register"
                          className="btn btn-default btn-block p-sm-3"
                        >
                          <span className="h6 mrgn-tp-0 mrgn-bttm-0 d-flex align-items-center">
                            <UserPen
                              size={20}
                              className="mrgn-rght-sm"
                              aria-hidden="true"
                            />
                            <span className="text-center full-width">
                              Register for an account
                            </span>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 5: Help with your account ── */}
        <div className="well brdr-0 brdr-rds-0 mrgn-tp-lg">
          <section className="container">
            <h2 id="help" className="mrgn-tp-0">
              Help with your account
            </h2>
            <div className="row wb-eqht-grd">
              {/* Errors and issues */}
              <div className="col-xs-12 col-md-6">
                <details>
                  <summary>
                    <span id="errors">Errors and issues when you sign in</span>
                  </summary>
                  <p>
                    You can use the same GCKey username and password on
                    different computers, phones and tablets.
                  </p>
                  <details>
                    <summary>If you're getting error messages:</summary>
                    <ul>
                      <li>
                        Use the{" "}
                        <a href="https://ircc.canada.ca/english/helpcentre/answer.asp?qnum=316&top=23">
                          most recent version of a supported web browser
                        </a>{" "}
                        like
                        <ul>
                          <li>Safari</li>
                          <li>Chrome</li>
                          <li>Firefox</li>
                          <li>Microsoft Edge</li>
                        </ul>
                        <p>
                          <strong>If you're using Internet Explorer</strong>,
                          update your browser to Microsoft Edge.
                        </p>
                      </li>
                      <li>
                        Don't use a favourite link or bookmark to pages inside
                        the account. You must sign in to see them.
                      </li>
                      <li>
                        Use your browser's default settings. GCKey needs
                        JavaScript and cookies enabled.
                      </li>
                      <li>
                        Update your browser if you see one of these messages
                        when you try to sign in:
                        <ul>
                          <li>Page Can't Be Displayed</li>
                          <li>Cannot Establish a Secure Connection</li>
                          <li>Page Not Available</li>
                        </ul>
                        <p>
                          You can usually find the option to update your browser
                          in your browser menu's settings or preferences.
                        </p>
                      </li>
                    </ul>
                  </details>
                  <details>
                    <summary>Other technical issues</summary>
                    <ul>
                      <li>
                        <strong>Too many attempts</strong>
                        <p>
                          You may get a failure message if you make too many
                          unsuccessful attempts to sign in during the same
                          session. Close your browser window or tab and try
                          again.
                        </p>
                      </li>
                      <li>
                        <strong>Experiencing technical difficulties</strong>
                        <p>
                          The site could be down for a number of reasons,
                          including for system maintenance. We apologize for the
                          inconvenience. Try again later.
                        </p>
                      </li>
                      <li>
                        <strong>Session expired</strong>
                        <p>
                          For security, your session will be closed if it's
                          inactive for a certain number of minutes. Sign in
                          again.
                        </p>
                      </li>
                    </ul>
                  </details>
                  <p>
                    <a href="https://ircc.canada.ca/english/helpcentre/answer.asp?qnum=1491&top=23.3">
                      Get more help with sign-in issues
                    </a>
                  </p>
                </details>
              </div>

              {/* Forgot GCKey */}
              <div className="col-xs-12 col-md-6">
                <details>
                  <summary>
                    <span id="forgot">
                      You forgot your GCKey password or username
                    </span>
                  </summary>
                  <p>Read the instructions for your situation.</p>
                  <details>
                    <summary>
                      Forgot your username <strong>and</strong> password
                    </summary>
                    <ol>
                      <li>
                        Follow the{" "}
                        <a href="#username">
                          steps to recover your username first
                        </a>
                        .
                      </li>
                      <li>
                        Once you have your username, follow the{" "}
                        <a href="#password">steps to recover your password</a>.
                      </li>
                    </ol>
                    <details>
                      <summary>
                        You lost or no longer use the email you registered with
                      </summary>
                      <ol>
                        <li>Sign up for a new GCKey username and password.</li>
                        <li>
                          Create a new account in the IRCC secure account.
                        </li>
                      </ol>
                      <p>
                        You may not be able to find your application in your new
                        account. You may need to{" "}
                        <a href="/immigration-refugees-citizenship/services/application/account/link-paper-online">
                          link your application to your new account
                        </a>
                        .
                      </p>
                    </details>
                  </details>

                  <details>
                    <summary id="username">Forgot your username</summary>
                    <details>
                      <summary>If you have a recovery email address</summary>
                      <ol>
                        <li>
                          Select <strong>GCKey username and password</strong>.
                        </li>
                        <li>
                          Select <strong>Forgot your username?</strong> on the{" "}
                          <strong>Welcome to GCKey</strong> page.
                        </li>
                        <li>
                          Enter your recovery email address on the{" "}
                          <strong>Recover Username Step 1 of 2</strong> page.
                          <ul>
                            <li>
                              You provided your recovery email address either
                              when you signed up for a GCKey username and
                              password or at a later time.
                            </li>
                          </ul>
                        </li>
                        <li>
                          Select <strong>Continue</strong>.
                          <ul>
                            <li>
                              You'll be brought to a page that explains where
                              we'll email your username and what to do if you
                              don't receive the email.
                            </li>
                          </ul>
                        </li>
                        <li>
                          Select <strong>Continue</strong> again.
                        </li>
                        <li>
                          Check your email. You should get an email from the
                          Government of Canada with your GCKey username.
                        </li>
                        <li>
                          Sign in with your username and password on the{" "}
                          <strong>Welcome to GCKey</strong> page.
                        </li>
                      </ol>
                    </details>
                    <details>
                      <summary>
                        If you don't have a recovery email address
                      </summary>
                      <ol>
                        <li>
                          Select <strong>GCKey username and password</strong>.
                        </li>
                        <li>
                          Select <strong>Sign up</strong> on the{" "}
                          <strong>Welcome to GCKey</strong> page to create a new
                          GCKey username and password.
                        </li>
                        <li>
                          Create a new account in the IRCC secure account.
                        </li>
                      </ol>
                      <p>During this process, you may be able to:</p>
                      <ul>
                        <li>recover your account</li>
                        <li>
                          <a href="/immigration-refugees-citizenship/services/application/account/link-paper-online">
                            link your existing applications to your new account
                          </a>
                        </li>
                      </ul>
                    </details>
                  </details>

                  <details>
                    <summary id="password">Forgot your password</summary>
                    <ol>
                      <li>
                        Select <strong>GCKey username and password</strong>.
                      </li>
                      <li>
                        Select <strong>Forgot your password?</strong> on the{" "}
                        <strong>Welcome to GCKey</strong> page.
                      </li>
                      <li>Enter your GCKey username.</li>
                      <li>
                        Select <strong>Continue</strong>.
                        <ul>
                          <li>
                            If you used an email address when signing up for
                            your GCKey username,{" "}
                            <a href="#pw-reset-email">
                              reset your password with your email address
                            </a>
                            .
                          </li>
                          <li>
                            If you didn't use an email address to sign up,{" "}
                            <a href="#pw-reset-recovery">
                              reset your password using recovery questions
                            </a>
                            .
                          </li>
                        </ul>
                      </li>
                    </ol>
                    <details>
                      <summary id="pw-reset-email">
                        Password reset using an email address
                      </summary>
                      <ol>
                        <li>Enter your email address.</li>
                        <li>
                          Check your email account. You should get an email from
                          the Government of Canada with a confirmation code.
                        </li>
                        <li>
                          Enter the confirmation code on the{" "}
                          <strong>Forgot Your Password Step 2 of 4</strong>{" "}
                          page.
                          <ul>
                            <li>
                              This page should load automatically after you
                              enter your username and select{" "}
                              <strong>Continue</strong> on the previous page.
                            </li>
                          </ul>
                        </li>
                        <li>
                          Select <strong>Continue</strong>.
                        </li>
                        <li>
                          Enter the answer to the recovery question you're
                          prompted with in the{" "}
                          <strong>My Recovery Answer</strong> field.
                        </li>
                        <li>
                          Select <strong>Continue</strong>.
                        </li>
                        <li>
                          Enter a new password in the{" "}
                          <strong>New Password</strong> field.
                        </li>
                        <li>
                          Re-enter that same password in the{" "}
                          <strong>Confirm New Password</strong> field.
                        </li>
                        <li>
                          Select <strong>Continue</strong>.
                        </li>
                        <li>
                          Select <strong>Continue</strong> again on the{" "}
                          <strong>Forget Your Password Complete</strong> page.
                        </li>
                      </ol>
                    </details>
                    <details>
                      <summary id="pw-reset-recovery">
                        Password reset using recovery questions
                      </summary>
                      <ol>
                        <li>
                          Select <strong>Recovery Q&amp;A</strong> in the{" "}
                          <strong>Recovery Questions and Answers</strong> box on
                          the <strong>Forget Your Password Step 2 of 4</strong>{" "}
                          page.
                        </li>
                        <li>
                          Enter your answers in the{" "}
                          <strong>My Recovery Answer</strong>,{" "}
                          <strong>My Memorable Person Answer</strong> and{" "}
                          <strong>My Memorable Date</strong> fields.
                          <ul>
                            <li>
                              You should find the questions and hints above each
                              field.
                            </li>
                          </ul>
                        </li>
                        <li>
                          Enter a new password in the{" "}
                          <strong>Create Your New Password</strong> field.
                        </li>
                        <li>
                          Enter the same password in the{" "}
                          <strong>Confirm Your New Password</strong> field.
                        </li>
                        <li>
                          Select <strong>Continue</strong>.
                        </li>
                        <li>
                          Select <strong>Continue</strong> again on the{" "}
                          <strong>Forget Your Password Complete</strong> page.
                          <ul>
                            <li>
                              If you correctly answered all the recovery
                              questions, you'll automatically be brought to this
                              page.
                            </li>
                          </ul>
                        </li>
                      </ol>
                    </details>
                  </details>
                  <p>
                    <a href="/government/sign-in-online-account/gckey">
                      Get more help with GCKey
                    </a>
                  </p>
                </details>
              </div>

              {/* Two-factor authentication */}
              <div className="col-xs-12 col-md-6">
                <details>
                  <summary>
                    <span id="mfa">GCKey two-factor authentication</span>
                  </summary>
                  <p>
                    Two-factor authentication protects your account. You need to
                    choose a second authentication method (other than your
                    username and password) to use each time you sign in.
                  </p>
                  <p>
                    <a href="/immigration-refugees-citizenship/services/application/two-factor-authentication#register">
                      Set up your two-factor authentication method
                    </a>
                  </p>
                  <h3>Change your two-factor authentication method</h3>
                  <p>
                    You need access to your existing email or authenticator app,
                    or to your saved recovery codes.
                  </p>
                  <details>
                    <summary>
                      If you have access to your two-factor authentication
                      method
                    </summary>
                    <ol>
                      <li>
                        Sign in to your account with your GCKey username and
                        password.
                      </li>
                      <li>
                        Select <strong>Continue</strong> on the{" "}
                        <strong>Welcome</strong> page.
                      </li>
                      <li>Use your current two-factor method.</li>
                      <li>
                        On the <strong>Authentication success</strong> page,
                        select{" "}
                        <strong>Change your two-factor authentication</strong>.
                      </li>
                      <li>
                        On the <strong>Two-factor authentication</strong> page,
                        follow the prompts to set up two-factor authentication
                        again.
                      </li>
                      <li>
                        Save your new recovery codes somewhere safe. Your old
                        codes will no longer work.
                      </li>
                    </ol>
                  </details>
                  <details>
                    <summary>
                      If you don't have access to your two-factor authentication
                      method
                    </summary>
                    <details>
                      <summary>You have recovery codes:</summary>
                      <ol>
                        <li>
                          Sign in to your account with your GCKey username and
                          password.
                        </li>
                        <li>
                          Select <strong>Recover account</strong> on the
                          two-factor authentication page.
                        </li>
                        <li>
                          Enter one of the recovery codes you saved when you
                          first set up two-factor authentication.
                        </li>
                        <li>
                          Select{" "}
                          <strong>Change your two-factor authentication</strong>{" "}
                          on the authentication success page.
                        </li>
                        <li>
                          Follow the prompts to set up two-factor authentication
                          again.
                        </li>
                        <li>
                          Save your new recovery codes somewhere safe. Your old
                          codes will no longer work.
                        </li>
                      </ol>
                    </details>
                    <details>
                      <summary>You don't have recovery codes:</summary>
                      <ol>
                        <li>Sign up for a new GCKey username and password.</li>
                        <li>
                          Create a new account in the IRCC secure account.
                        </li>
                        <li>
                          Follow the prompts to set up two-factor authentication
                          again.
                        </li>
                        <li>
                          Save your new recovery codes somewhere safe. Your old
                          codes will no longer work.
                        </li>
                      </ol>
                      <p>During this process, you may be able to:</p>
                      <ul>
                        <li>recover your account</li>
                        <li>
                          <a href="/immigration-refugees-citizenship/services/application/account/link-paper-online">
                            link your existing applications to your new account
                          </a>
                        </li>
                      </ul>
                    </details>
                  </details>
                  <details>
                    <summary>Contact the GCKey Service Desk</summary>
                    <p>
                      <strong>
                        GCKey representatives can only help with GCKey issues
                        (including two-factor authentication)
                      </strong>
                      . They don't have access to any Government of Canada
                      account or application information.
                    </p>
                    <ul>
                      <li>Canada and the United States: 1-855-438-1102</li>
                      <li>Text telephone (TTY/TDD): 1-855-438-1103</li>
                      <li>
                        Outside Canada and the United States: 1-800-2318-6290
                      </li>
                    </ul>
                    <p>
                      GCKey representatives are available to assist you by phone
                      year round, 24 hours a day, 7 days a week.
                    </p>
                  </details>
                  <p>
                    <a href="/immigration-refugees-citizenship/services/application/two-factor-authentication">
                      Get more help with two-factor authentication
                    </a>
                  </p>
                </details>
              </div>

              {/* GCKey revoked */}
              <div className="col-xs-12 col-md-6">
                <details>
                  <summary>
                    <span id="revoked">GCKey revoked</span>
                  </summary>
                  <p>
                    You can't recover your GCKey username and password if they
                    were revoked. They can be revoked if:
                  </p>
                  <ul>
                    <li>your username and password are compromised</li>
                    <li>
                      you haven't used GCKey in the last 2 years
                      <ul>
                        <li>
                          Don't use the same username and password you use for
                          GCKey for any other online accounts.
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <p>
                    If your GCKey username and password were revoked, you can
                    choose a different Sign-In method or sign up for a GCKey
                    username and password again.
                  </p>
                  <p>To sign up for a new GCKey username and password:</p>
                  <ol>
                    <li>
                      Select <strong>GCKey username and password</strong>.
                    </li>
                    <li>
                      Select <strong>Sign up</strong> on the{" "}
                      <strong>Welcome to GCKey</strong> page to create a new
                      GCKey username and password.
                    </li>
                    <li>Create a new account in the IRCC secure account.</li>
                  </ol>
                  <p>During this process, you may be able to:</p>
                  <ul>
                    <li>recover your account</li>
                    <li>
                      <a href="/immigration-refugees-citizenship/services/application/account/link-paper-online">
                        link your existing applications to your new account
                      </a>
                    </li>
                  </ul>
                </details>
              </div>

              {/* Change Sign-In Partner */}
              <div className="col-xs-12 col-md-6">
                <details>
                  <summary>
                    <span id="switch">Change your Sign-In Partner</span>
                  </summary>
                  <p>
                    If you moved to a new bank or credit union, you may be able
                    to switch your Sign-In Partner:
                  </p>
                  <ol>
                    <li>
                      Select{" "}
                      <strong>
                        Canadian <i>Interac</i>® Sign-In Partner
                      </strong>
                      .
                    </li>
                    <li>
                      Select <strong>Switch My Sign-In Partner</strong> from the
                      menu on the <strong>Select a Sign-In Partner</strong>{" "}
                      page.
                    </li>
                    <li>Follow the steps to change your Sign-In Partner.</li>
                  </ol>
                </details>
              </div>

              {/* Application not found */}
              <div className="col-xs-12 col-md-6">
                <details>
                  <summary>
                    If you don't find your application in your account
                  </summary>
                  <p>This can happen if you:</p>
                  <ul>
                    <li>created a new GCKey username and password</li>
                    <li>switched to a different Sign-In Partner</li>
                  </ul>
                  <p>
                    To fix this, you need to{" "}
                    <a href="/immigration-refugees-citizenship/services/application/account/link-paper-online">
                      link the application to your account
                    </a>
                    .
                  </p>
                </details>
              </div>

              {/* Personal reference code */}
              <div className="col-xs-12 col-md-6">
                <details>
                  <summary>
                    If your personal reference code doesn't work
                  </summary>
                  <p>
                    You may have a personal reference code (from the{" "}
                    <a href="/immigration-refugees-citizenship/services/come-canada-tool">
                      Come to Canada tool
                    </a>
                    ) for these applications:
                  </p>
                  <ul>
                    <li>Express Entry (to immigrate as a skilled worker)</li>
                    <li>International Experience Canada (IEC)</li>
                    <li>study permits (and extensions)</li>
                    <li>work permits (and extensions)</li>
                    <li>visitor visas and visitor records</li>
                  </ul>
                  <p>
                    Make sure you enter the code correctly in your account. Your
                    personal reference code will expire 60 days after you get
                    it.
                  </p>
                  <p>
                    You <strong>don't</strong> need a personal reference code to
                    start an application in the IRCC secure account.
                  </p>
                  <h3>Express Entry and International Experience Canada</h3>
                  <p>
                    The code <strong>won't</strong> work if you created a
                    profile in the account <strong>before</strong> using the
                    Come to Canada tool. You can still continue your profile
                    without the code, but you will need to enter your
                    information again.
                  </p>
                </details>
              </div>

              {/* More help options */}
              <div className="col-xs-12 col-md-6">
                <details>
                  <summary>More help options</summary>
                  <details>
                    <summary>Help Centre</summary>
                    <p>Find answers to questions about</p>
                    <ul>
                      <li>
                        <a href="https://ircc.canada.ca/english/helpcentre/results-by-topic.asp?st=23.3">
                          common technical issues
                        </a>
                      </li>
                      <li>
                        <a href="https://ircc.canada.ca/english/helpcentre/results-by-topic.asp?st=23.2">
                          GCKey and Sign-In Partner
                        </a>
                      </li>
                      <li>
                        <a href="https://ircc.canada.ca/english/helpcentre/index-featured-can.asp">
                          other topics
                        </a>
                      </li>
                    </ul>
                  </details>
                  <details>
                    <summary>GCKey</summary>
                    <p>For more information and help:</p>
                    <ul>
                      <li>
                        read
                        <ul>
                          <li>
                            the{" "}
                            <a href="/government/sign-in-online-account/gckey">
                              GCKey help page
                            </a>
                          </li>
                          <li>
                            our{" "}
                            <a href="https://ircc.canada.ca/english/helpcentre/results-by-topic.asp?st=23.2.2">
                              answers to common GCKey questions
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        review the help options in the menu after you select{" "}
                        <strong>GCKey username and password</strong>
                      </li>
                    </ul>
                    <details>
                      <summary>Contact the GCKey Service Desk</summary>
                      <p>
                        <strong>
                          GCKey representatives can only help with GCKey issues
                          (including two-factor authentication)
                        </strong>
                        . They don't have access to any Government of Canada
                        account or application information.
                      </p>
                      <ul>
                        <li>Canada and the United States: 1-855-438-1102</li>
                        <li>Text telephone (TTY/TDD): 1-855-438-1103</li>
                        <li>
                          Outside Canada and the United States: 1-800-2318-6290
                        </li>
                      </ul>
                      <p>
                        GCKey representatives are available to assist you by
                        phone year round, 24 hours a day, 7 days a week.
                      </p>
                    </details>
                  </details>
                  <details>
                    <summary>Sign-In Partner</summary>
                    <p>
                      Find help and frequently asked questions in the Sign-In
                      Partner menu after you select{" "}
                      <strong>
                        <i>Interac</i>® Sign-In Partner
                      </strong>
                      .
                    </p>
                    <p>
                      You can also{" "}
                      <a href="https://ircc.canada.ca/english/helpcentre/results-by-topic.asp?st=23.2.1">
                        read our answers to common Sign-In Partner questions
                      </a>
                      .
                    </p>
                  </details>
                </details>
              </div>
            </div>
          </section>
        </div>

        {/* ── Section 6: Find another government account ── */}
        <section className="container gc-srvinfo">
          <h2 id="other-accounts" className="mrgn-tp-0">
            Find another government account
          </h2>
          <div className="row">
            <div className="col-xs-12 col-md-6">
              <h3 className="mrgn-tp-0">
                <a href="/government/sign-in-online-account">
                  All Government of Canada online accounts
                </a>
              </h3>
              <p>
                There are many accounts across the Government of Canada for
                different services. Find the service you need.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ── Page details ── */}
      <section className="pagedetails container">
        <h2 className="wb-inv">Page details</h2>
        <div className="row">
          <div className="col-sm-8 col-md-9 col-lg-9">
            <div className="well mrgn-bttm-0">
              <h3>Did you find what you were looking for?</h3>
              <div>
                <button className="btn btn-primary">Yes</button>
                <button className="btn btn-primary mrgn-lft-sm">No</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row mrgn-tp-md">
          <div className="col-xs-12">
            <p className="mrgn-bttm-0">
              <span className="small">Date modified: </span>
              <strong className="small">2026-08-11</strong>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
