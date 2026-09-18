import { useEffect } from "react";
import SEO from "../components/SEO";

const IRCCAccount = () => {
  useEffect(() => {
    const executeAction = (action) => {
      if (action.action === "addClass") {
        const sources = action.source.split(",");
        sources.forEach((src) => {
          document.querySelectorAll(src.trim()).forEach((el) => {
            action.class.split(" ").forEach((cls) => {
              if (cls) el.classList.add(cls);
            });
          });
        });
      } else if (action.action === "removeClass") {
        const sources = action.source.split(",");
        sources.forEach((src) => {
          document.querySelectorAll(src.trim()).forEach((el) => {
            action.class.split(" ").forEach((cls) => {
              if (cls) el.classList.remove(cls);
            });
          });
        });
      } else if (action.action === "run" && action.trggroup) {
        document.querySelectorAll("[data-wb-actionmng]").forEach((mngEl) => {
          try {
            const mngStr = mngEl.getAttribute("data-wb-actionmng");
            if (mngStr) {
              const mngActions = JSON.parse(mngStr);
              mngActions
                .filter((a) => a.trggroup === action.trggroup)
                .forEach(executeAction);
            }
          } catch (e) {
            console.error("Error parsing data-wb-actionmng", e);
          }
        });
      }
    };

    const handleClick = (e) => {
      const target = e.target.closest("[data-wb-doaction]");
      if (!target) return;

      if (
        target.tagName === "A" &&
        target.getAttribute("href")?.startsWith("#")
      ) {
        e.preventDefault();
      }
      if (target.tagName === "BUTTON") {
        e.preventDefault();
      }

      try {
        const actionStr = target.getAttribute("data-wb-doaction");
        if (actionStr) {
          const actions = JSON.parse(actionStr);
          actions.forEach(executeAction);
        }
      } catch (err) {
        console.error("Error parsing data-wb-doaction", err);
      }
    };

    document.addEventListener("click", handleClick);

    if (window.wb && window.wb.isReady) {
      window.wb.trigger("wb-update.wb");
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <main
        property="mainContentOfPage"
        resource="#wb-main"
        typeof="WebPageElement"
      >
        <SEO
          title="Sign in to your IRCC account"
          description="Sign in to your official IRCC account to submit applications, view application updates, and manage your Canadian visa profile."
          keywords="Sign in IRCC account, GCKey sign in, IRCC portal login, Canada immigration account"
        />
        <div className="mwsgeneric-base-html parbase section">
          <div className="container">
            <div className="row">
              <div className="col-md-9 col-xs-12">
                <h1
                  property="name"
                  id="wb-cont"
                  dir="ltr"
                  className="mrgn-tp-lg mrgn-bttm-lg"
                >
                  Sign in to your IRCC account
                </h1>
                <div className="lead">
                  <p>
                    <strong>
                      We have many accounts you could be looking for.
                    </strong>
                  </p>
                  <p>
                    To get to the right account, you need to tell us about your
                    application.
                  </p>
                </div>
              </div>
              <div className="col-md-3 hidden-xs hidden-sm">
                <img
                  src="/content/dam/ircc/images/services/application/all-accounts.png"
                  alt=""
                  className="full-width"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mwsgeneric-base-html parbase section">
          <div id="account-wizard" className=" mrgn-bttm-md">
            <div className="container">
              <div
                className="row wb-eqht wb-init wb-eqht-inited"
                id="wb-auto-4"
              >
                <div className="col-md-5 col-md-offset-1 col-sm-6">
                  <div className="mrgn-tp-md mrgn-bttm-0 panel panel-default panel-body position-relative signin-create-btn signin">
                    <button
                      id="sign-in-button"
                      className="eqht-trgt text-center stretched-link btn-link no-undrln full-width"
                      data-scroll-target="sign-in-button"
                      data-gc-analytics-customclick="IRCC:AccountWizard_SignInTab"
                      data-wb-doaction='[
                    { "action": "run", "trggroup": "back" },
                    { "action": "removeClass", "class": "nojs-show", "source": ".signin-opt, .account-chooser, .selection" },
                    { "action": "addClass", "class": "nojs-show", "source": ".find-header, .find-program" },
                    { "action": "addClass", "class": "sign-in", "source": ".account-banner" },
                    { "action": "removeClass", "class": "create", "source": ".account-banner" },
                    { "action": "addClass", "class": "active", "source": ".signin-create-btn" }
                ]'
                      style={{ verticalAlign: "top", minHeight: "38px" }}
                    >
                      <strong>Sign in to your existing account</strong>
                    </button>
                  </div>
                </div>
                <div className="col-md-5 col-sm-6">
                  <div className="mrgn-tp-md mrgn-bttm-0 panel panel-default panel-body position-relative signin-create-btn create">
                    <button
                      id="create-account-button"
                      className="eqht-trgt text-center stretched-link btn-link no-undrln full-width"
                      data-scroll-target="sign-in-button"
                      data-gc-analytics-customclick="IRCC:AccountWizard_NoAccountTab"
                      data-wb-doaction='[
                    { "action": "run", "trggroup": "back" },
                    { "action": "removeClass", "class": "nojs-show", "source": ".find-header, .find-program, .account-chooser" },
                    { "action": "addClass", "class": "nojs-show", "source": ".signin-opt" },
                    { "action": "removeClass", "class": "sign-in", "source": ".account-banner" },
                    { "action": "addClass", "class": "create", "source": ".account-banner" } ,
                    { "action": "addClass", "class": "active", "source": ".signin-create-btn" }
                ]'
                      style={{ verticalAlign: "top", minHeight: "38px" }}
                    >
                      <strong>You don't have an account</strong>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="account-banner">
              <div className="container">
                <div
                  id="account-chooser"
                  className="account-chooser nojs-show wb-init wb-actionmng-inited"
                  data-wb-actionmng='[
            { "trggroup":"back", "action": "addClass", "class": "nojs-show", "source": ".selection-options, .result" },
            { "trggroup":"toggle-result", "action": "addClass", "class": "stretched-link", "source": ".account-chooser a.btn-link" },
            { "trggroup":"toggle-result", "action": "addClass", "class": "nojs-show", "source": ".result, .bottom-reset" }
        ]'
                >
                  <div className="panel panel-body signin-opt nojs-show">
                    <div className="row">
                      <div className="col-md-10 col-md-offset-1">
                        <p>
                          <strong>
                            We have many accounts you could sign in to.
                          </strong>
                        </p>
                        <p>
                          To get to the right account sign-in page, tell us what
                          your application is for.
                        </p>
                      </div>
                    </div>
                    <div className="selection  ">
                      <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                          <ul className="list-unstyled lst-scpd">
                            <li className="panel panel-default panel-body position-relative">
                              <button
                                className="text-left stretched-link btn-link no-undrln full-width p-0 visitor-visa"
                                data-wb-doaction='[
                                    { "action": "run", "trggroup": "toggle-result" },
                                    { "action": "removeClass", "class": "stretched-link nojs-show", "source": ".visitor-visa" }
                                    ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q2:SignIn_VisitorVisa"
                              >
                                Visitor visa
                              </button>
                              <div className="result visitor-visa nojs-show mrgn-lft-sm mrgn-rght-sm">
                                <p>You used one of these 3 accounts:</p>
                                <div className="row-no-gutters clearfix">
                                  <ul className="cnjnctn-type-or cnjnctn-type-or-horizontal col-md-9">
                                    <li className="cnjnctn-col p-0">
                                      <div className="panel panel-default mrgn-bttm-md">
                                        <div className="panel-body position-relative d-flex align-items-center">
                                          {" "}
                                          <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                          <a
                                            
                                            href="/immigration-refugees-citizenship/services/application/account"
                                            className="stretched-link no-undrln"
                                            data-gc-analytics-customclick="IRCC:AccountWizard_Q2:SignIn_VisitorVisa_IRCCSecure"
                                          >
                                            IRCC secure account (GCKey or
                                            Sign-In Partner){" "}
                                            
                                          </a>{" "}
                                        </div>
                                      </div>
                                    </li>
                                    <li className="cnjnctn-col position-relative p-0">
                                      <div className="panel panel-default mrgn-bttm-md">
                                        <div className="panel-body position-relative d-flex align-items-center">
                                          {" "}
                                          <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                          <a
                                            
                                            href="/immigration-refugees-citizenship/services/visit-canada/portal-application-process"
                                            className="stretched-link no-undrln"
                                            data-gc-analytics-customclick="IRCC:AccountWizard_Q2:SignIn_VisitorVisa_IRCCPortal"
                                          >
                                            IRCC portal{" "}
                                            
                                          </a>{" "}
                                        </div>
                                      </div>
                                    </li>
                                    <li className="cnjnctn-col position-relative p-0">
                                      <div className="panel panel-default mrgn-bttm-md">
                                        <div className="panel-body position-relative d-flex align-items-center">
                                          {" "}
                                          <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                          <a
                                            
                                            href="/immigration-refugees-citizenship/services/application/online-account"
                                            className="stretched-link no-undrln"
                                            data-gc-analytics-customclick="IRCC:AccountWizard_Q2:SignIn_VisitorVisa_IRCCPortal_new_version"
                                          >
                                            IRCC portal – New version
                                            
                                          </a>{" "}
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                                <div className="clearfix"></div>
                                <p>
                                  <a
                                    href="#hints-2"
                                    className="wb-lbx wb-init wb-lbx-inited"
                                    role="button"
                                    id="wb-auto-5"
                                  >
                                    <i
                                      className="fas fa-info-circle mrgn-rght-sm"
                                      aria-hidden="true"
                                    ></i>
                                    Not sure which account you used?
                                  </a>
                                </p>
                              </div>
                            </li>
                            <li className="panel panel-default panel-body position-relative">
                              <button
                                className="text-left stretched-link btn-link no-undrln full-width p-0 express-entry"
                                data-wb-doaction='[
                                    { "action": "run", "trggroup": "toggle-result" },
                                    { "action": "removeClass", "class": "stretched-link nojs-show", "source": ".express-entry" }
                                    ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q2:SignIn_EE"
                              >
                                Express Entry
                              </button>
                              <div className="result express-entry nojs-show mrgn-lft-sm mrgn-rght-sm">
                                <p>
                                  You used the IRCC secure account (GCKey or
                                  Sign-In Partner).
                                </p>
                                <div className="row-no-gutters">
                                  <div className="col-md-9">
                                    <div className="panel panel-default mrgn-bttm-md">
                                      <div className="panel-body position-relative d-flex align-items-center">
                                        {" "}
                                        <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                        <a
                                          
                                          href="/immigration-refugees-citizenship/services/application/account"
                                          className="stretched-link no-undrln"
                                          data-gc-analytics-customclick="IRCC:AccountWizard_Q2:SignIn_EE_IRCCSecure"
                                        >
                                          IRCC secure account (GCKey or Sign-In
                                          Partner){" "}
                                          
                                        </a>{" "}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="clearfix"></div>
                              </div>
                            </li>
                            <li className="panel panel-default panel-body position-relative">
                              <button
                                className="text-left stretched-link btn-link no-undrln full-width p-0 study-permit"
                                data-wb-doaction='[
                            { "action": "run", "trggroup": "toggle-result" },
                            { "action": "removeClass", "class": "stretched-link nojs-show", "source": ".study-permit" }
                        ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q2:SignIn_StudyPermit"
                              >
                                Study permit
                              </button>
                              <div className="result study-permit nojs-show mrgn-lft-sm mrgn-rght-sm">
                                <p>You used one of these 2 accounts:</p>
                                <div className="row-no-gutters clearfix">
                                  <ul className="cnjnctn-type-or cnjnctn-type-or-horizontal col-md-9">
                                    <li className="cnjnctn-col position-relative p-0">
                                      <div className="panel panel-default mrgn-bttm-md">
                                        <div className="panel-body position-relative d-flex align-items-center">
                                          {" "}
                                          <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                          <a
                                            
                                            href="/immigration-refugees-citizenship/services/application/account"
                                            className="stretched-link no-undrln"
                                            data-gc-analytics-customclick="IRCC:AccountWizard_Q3:Study_StudyPermit_IRCCSecure"
                                          >
                                            IRCC secure account (GCKey or
                                            Sign-In Partner){" "}
                                            
                                          </a>{" "}
                                        </div>
                                      </div>
                                    </li>
                                    <li className="cnjnctn-col p-0">
                                      <div className="panel panel-default mrgn-bttm-md">
                                        <div className="panel-body position-relative d-flex align-items-center">
                                          {" "}
                                          <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                          <a
                                            
                                            href="/immigration-refugees-citizenship/services/study-canada/portal-application-process-study"
                                            className="stretched-link no-undrln"
                                            data-gc-analytics-customclick="IRCC:AccountWizard_Q3:Study_StudyPermit_IRCCPortal"
                                          >
                                            IRCC portal{" "}
                                            
                                          </a>{" "}
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                                <div className="clearfix"></div>
                                <p>
                                  <a
                                    href="#hints-2"
                                    className="wb-lbx wb-init wb-lbx-inited"
                                    role="button"
                                    id="wb-auto-6"
                                  >
                                    <i
                                      className="fas fa-info-circle mrgn-rght-sm"
                                      aria-hidden="true"
                                    ></i>
                                    Not sure which account you used?
                                  </a>
                                </p>
                              </div>
                            </li>
                            <li className="panel panel-default panel-body position-relative">
                              <button
                                className="text-left stretched-link btn-link no-undrln full-width p-0 work-permit"
                                data-wb-doaction='[
                            { "action": "run", "trggroup": "toggle-result" },
                            { "action": "removeClass", "class": "stretched-link nojs-show", "source": ".work-permit" }
                            ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q2:SignIn_WorkPermit"
                              >
                                Work permit (including post-graduation, IEC and
                                extensions)
                              </button>
                              <div className="result work-permit nojs-show mrgn-lft-sm mrgn-rght-sm">
                                <p>
                                  You used the IRCC secure account (GCKey or
                                  Sign-In Partner).
                                </p>
                                <div className="row-no-gutters">
                                  <div className="col-md-9">
                                    <div className="panel panel-default mrgn-bttm-md">
                                      <div className="panel-body position-relative d-flex align-items-center">
                                        {" "}
                                        <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                        <a
                                          
                                          href="/immigration-refugees-citizenship/services/application/account"
                                          className="stretched-link no-undrln"
                                          data-gc-analytics-customclick="IRCC:AccountWizard_Q2:SignIn_WorkPermit_IRCCSecure"
                                        >
                                          IRCC secure account (GCKey or Sign-In
                                          Partner){" "}
                                          
                                        </a>{" "}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="clearfix"></div>
                              </div>
                            </li>
                            <li className="panel panel-default panel-body position-relative">
                              {" "}
                              <a
                                href="#application"
                                className="text-left stretched-link btn-link no-undrln full-width p-0"
                                data-wb-doaction='[
                                    { "action": "addClass", "class": "nojs-show", "source": ".selection, .result" },
                                    { "action": "removeClass", "class": "nojs-show", "source": ".application" }
                                ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q2:SignIn_OtherApp"
                              >
                                Another application (passport renewal, study
                                extension, immigration, citizenship and more)
                              </a>{" "}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div
                      className="selection-options application nojs-show"
                      id="application"
                    >
                      <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                          <div className="position-relative mrgn-bttm-sm">
                            {" "}
                            <a
                              href="#account-chooser"
                              className="text-left btn-link no-undrln d-flex align-items-center nojs-hide"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Back:FinishSubmit"
                              data-wb-doaction='[
                                { "action": "addClass", "class": "nojs-show", "source": ".application" },
                                { "action": "removeClass", "class": "nojs-show", "source": ".selection" }
                            ]'
                            >
                              <span className="fas fa-chevron-left pull-left mrgn-rght-md"></span>
                              Back
                            </a>{" "}
                          </div>
                          <ul className="list-unstyled lst-scpd">
                            <li className="panel panel-default panel-body position-relative visit">
                              {" "}
                              <a
                                href="#visit"
                                className="text-left stretched-link btn-link no-undrln full-width p-0 "
                                data-wb-doaction='[
                                    { "action": "addClass", "class": "nojs-show", "source": ".application" },
                                    { "action": "removeClass", "class": "nojs-show", "source": ".visit" }
                                ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q3:FinishSubmit_Visit"
                              >
                                Visiting Canada
                              </a>{" "}
                            </li>
                            <li className="panel panel-default panel-body position-relative">
                              {" "}
                              <a
                                href="#immigrate"
                                className="text-left stretched-link btn-link no-undrln full-width p-0 "
                                data-wb-doaction='[
                                    { "action": "addClass", "class": "nojs-show", "source": ".application" },
                                    { "action": "removeClass", "class": "nojs-show", "source": ".immigrate" }
                                ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q3:FinishSubmit_Immigrate"
                              >
                                Immigrating to Canada (becoming a permanent
                                resident)
                              </a>{" "}
                            </li>
                            <li className="panel panel-default panel-body position-relative">
                              {" "}
                              <a
                                href="#family"
                                className="text-left stretched-link btn-link no-undrln full-width p-0 "
                                data-wb-doaction='[
                                    { "action": "addClass", "class": "nojs-show", "source": ".application" },
                                    { "action": "removeClass", "class": "nojs-show", "source": ".family" }
                                ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q3:FinishSubmit_Sponsor"
                              >
                                Sponsoring family (including adoption through
                                the immigration process)
                              </a>{" "}
                            </li>
                            <li className="panel panel-default panel-body position-relative">
                              {" "}
                              <a
                                href="#working"
                                className="text-left stretched-link btn-link no-undrln full-width p-0 "
                                data-wb-doaction='[
                                    { "action": "addClass", "class": "nojs-show", "source": ".application" },
                                    { "action": "removeClass", "class": "nojs-show", "source": ".working" }
                                ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q3:FinishSubmit_WorkingTemp"
                              >
                                Working in Canada temporarily (work permits)
                              </a>{" "}
                            </li>
                            <li className="panel panel-default panel-body position-relative">
                              {" "}
                              <a
                                href="#study"
                                className="text-left stretched-link btn-link no-undrln full-width p-0 "
                                data-wb-doaction='[
                                    { "action": "addClass", "class": "nojs-show", "source": ".application" },
                                    { "action": "removeClass", "class": "nojs-show", "source": ".study" }
                                ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q3:FinishSubmit_Study"
                              >
                                Studying in Canada
                              </a>{" "}
                            </li>

                            <li className="panel panel-default panel-body position-relative">
                              {" "}
                              <a
                                
                                href="/immigration-refugees-citizenship/services/canadian-passports/renew-adult-passport/online-account"
                                className="stretched-link btn-link no-undrln full-width"
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q3:FinishSubmit_RenewPassport"
                              >
                                <div className="row d-flex align-items-center text-left">
                                  <div className="col-xs-11">
                                    Renewing a Canadian passport (online
                                    applications)
                                  </div>
                                  <div className="col-xs-1">
                                    
                                    <span className="fas fa-share pull-right"></span>
                                  </div>
                                </div>
                              </a>{" "}
                            </li>

                            <li className="panel panel-default panel-body position-relative">
                              {" "}
                              <a
                                href="#citizenship"
                                className="text-left stretched-link btn-link no-undrln full-width p-0 "
                                data-wb-doaction='[
                                    { "action": "addClass", "class": "nojs-show", "source": ".application" },
                                    { "action": "removeClass", "class": "nojs-show", "source": ".citizenship" }
                                ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q3:FinishSubmit_Citizenship"
                              >
                                Canadian citizenship
                              </a>{" "}
                            </li>
                            <li className="panel panel-default panel-body position-relative">
                              {" "}
                              <a
                                href="#refugees"
                                className="text-left stretched-link btn-link no-undrln full-width p-0 "
                                data-wb-doaction='[
                                    { "action": "addClass", "class": "nojs-show", "source": ".application" },
                                    { "action": "removeClass", "class": "nojs-show", "source": ".refugees" }
                                ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q3:FinishSubmit_RefugeesAsylum"
                              >
                                Refugees and asylum
                              </a>{" "}
                            </li>
                            <li className="panel panel-default panel-body position-relative">
                              {" "}
                              <a
                                href="#special-measures"
                                className="text-left stretched-link btn-link no-undrln full-width p-0 "
                                data-wb-doaction='[
                                    { "action": "addClass", "class": "nojs-show", "source": ".application" },
                                    { "action": "removeClass", "class": "nojs-show", "source": ".special-measures" }
                                ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q3:FinishSubmit_SpecialMeasures"
                              >
                                One of the special measures (such as for
                                Ukraine, Sudan, or other)
                              </a>{" "}
                            </li>
                            <li className="panel panel-default panel-body position-relative">
                              {" "}
                              <a
                                href="#pr"
                                className="text-left stretched-link btn-link no-undrln full-width p-0 "
                                data-wb-doaction='[
                                { "action": "addClass", "class": "nojs-show", "source": ".application" },
                                { "action": "removeClass", "class": "nojs-show", "source": ".pr" }
                            ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q3:FinishSubmit_PR"
                              >
                                Permanent resident cards and travel documents
                                (if you’re already a permanent resident)
                              </a>{" "}
                            </li>
                          </ul>
                          <div className="position-relative mrgn-bttm-sm">
                            {" "}
                            <a
                              href="#account-chooser"
                              className="text-left btn-link no-undrln d-flex align-items-center nojs-hide"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Back"
                              data-wb-doaction='[
                        { "action": "addClass", "class": "nojs-show", "source": ".application" },
                        { "action": "removeClass", "class": "nojs-show", "source": ".selection" }
                    ]'
                            >
                              <span className="fas fa-chevron-left pull-left mrgn-rght-md"></span>
                              Back
                            </a>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="finishOrCheck">
                      <div
                        id="visit"
                        className="selection-options visit nojs-show"
                      >
                        <div className="row">
                          <div className="col-md-10 col-md-offset-1">
                            <h2 className="mrgn-tp-md nojs-show">
                              Sign in to your account:&nbsp;Visiting Canada
                            </h2>
                            <div className="position-relative mrgn-bttm-sm">
                              {" "}
                              <a
                                href="#account-chooser"
                                className="text-left btn-link no-undrln d-flex align-items-center nojs-hide"
                                data-gc-analytics-customclick="IRCC:AccountWizard_Back:Other_Visiting"
                                data-wb-doaction='[
                                { "action": "run", "trggroup": "back" },
                                { "action": "removeClass", "class": "nojs-show", "source": ".application" }
                            ]'
                              >
                                <span className="fas fa-chevron-left pull-left mrgn-rght-md"></span>
                                Back
                              </a>{" "}
                            </div>
                            <div className="panel panel-default panel-body position-relative">
                              <button
                                className="text-left stretched-link btn-link no-undrln full-width p-0 visitor-visa"
                                data-wb-doaction='[
                            { "action": "run", "trggroup": "toggle-result" },
                            { "action": "removeClass", "class": "stretched-link nojs-show", "source": ".visitor-visa" }
                            ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Visit_VisitorVisa"
                              >
                                Visitor visa
                              </button>
                              <div className="result visitor-visa nojs-show mrgn-lft-sm mrgn-rght-sm">
                                <p>You used one of these 3 accounts:</p>
                                <div className="row-no-gutters clearfix">
                                  <ul className="cnjnctn-type-or cnjnctn-type-or-horizontal col-md-9">
                                    <li className="cnjnctn-col p-0">
                                      <div className="panel panel-default mrgn-bttm-md">
                                        <div className="panel-body position-relative d-flex align-items-center">
                                          {" "}
                                          <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                          <a
                                            
                                            href="/immigration-refugees-citizenship/services/application/account"
                                            className="stretched-link no-undrln"
                                            data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Visit_VisitorVisa_IRCCSecure"
                                          >
                                            IRCC secure account (GCKey or
                                            Sign-In Partner){" "}
                                            
                                          </a>{" "}
                                        </div>
                                      </div>
                                    </li>
                                    <li className="cnjnctn-col position-relative p-0">
                                      <div className="panel panel-default mrgn-bttm-md">
                                        <div className="panel-body position-relative d-flex align-items-center">
                                          {" "}
                                          <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                          <a
                                            
                                            href="/immigration-refugees-citizenship/services/visit-canada/portal-application-process"
                                            className="stretched-link no-undrln"
                                            data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Visit_VisitorVisa_IRCCPortal"
                                          >
                                            IRCC portal{" "}
                                            
                                          </a>{" "}
                                        </div>
                                      </div>
                                    </li>
                                    <li className="cnjnctn-col position-relative p-0">
                                      <div className="panel panel-default mrgn-bttm-md">
                                        <div className="panel-body position-relative d-flex align-items-center">
                                          {" "}
                                          <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                          <a
                                            
                                            href="/immigration-refugees-citizenship/services/application/online-account"
                                            className="stretched-link no-undrln"
                                            data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Visit_VisitorVisa_IRCCPortal_new_version"
                                          >
                                            IRCC portal – New version{" "}
                                            
                                          </a>{" "}
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                                <div className="clearfix"></div>
                                <p>
                                  <a
                                    href="#hints-2"
                                    className="wb-lbx wb-init wb-lbx-inited"
                                    role="button"
                                    data-gc-analytics-customclick="IRCC:AccountWizard_TT_VisitorVisa"
                                    id="wb-auto-7"
                                  >
                                    <i
                                      className="fas fa-info-circle mrgn-rght-sm"
                                      aria-hidden="true"
                                    ></i>
                                    Not sure which account you used?
                                  </a>
                                </p>
                              </div>
                            </div>
                            <div className="panel panel-default panel-body position-relative">
                              <button
                                className="text-left stretched-link btn-link no-undrln full-width p-0 eta"
                                data-wb-doaction='[
                        { "action": "run", "trggroup": "toggle-result" },
                        { "action": "removeClass", "class": "stretched-link nojs-show", "source": ".eta" }
                            ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Visit_eTA"
                              >
                                Submit your electronic travel authorization
                                (eTA) documents
                              </button>
                              <div className="result eta nojs-show mrgn-lft-sm mrgn-rght-sm">
                                <p>
                                  Use the IRCC secure account (GCKey or Sign-In
                                  Partner) if we asked you to{" "}
                                  <strong>submit documents</strong> for your eTA
                                  application.
                                </p>
                                <div className="row-no-gutters">
                                  <div className="col-md-9">
                                    <div className="panel panel-default mrgn-bttm-md">
                                      <div className="panel-body position-relative d-flex align-items-center ">
                                        {" "}
                                        <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                        <a
                                          
                                          href="/immigration-refugees-citizenship/services/application/account"
                                          className="stretched-link no-undrln"
                                          data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Visit_VisitorVisa_eTA_IRCCSecure"
                                        >
                                          IRCC secure account (GCKey or Sign-In
                                          Partner){" "}
                                          
                                        </a>{" "}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="clearfix"></div>
                              </div>
                            </div>
                            <div className="panel panel-default panel-body position-relative">
                              <button
                                className="text-left stretched-link btn-link no-undrln full-width p-0 visitor-record"
                                data-wb-doaction='[
                        { "action": "run", "trggroup": "toggle-result" },
                        { "action": "removeClass", "class": "stretched-link nojs-show", "source": ".visitor-record" }
                            ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Visit_VisitorRecord"
                              >
                                Visitor record (to extend your stay in Canada)
                              </button>
                              <div className="result visitor-record nojs-show mrgn-lft-sm mrgn-rght-sm">
                                <p>
                                  You used the IRCC secure account (GCKey or
                                  Sign-In Partner).
                                </p>
                                <div className="row-no-gutters">
                                  <div className="col-md-9">
                                    <div className="panel panel-default mrgn-bttm-md">
                                      <div className="panel-body position-relative d-flex align-items-center">
                                        {" "}
                                        <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                        <a
                                          
                                          href="/immigration-refugees-citizenship/services/application/account"
                                          className="stretched-link no-undrln"
                                          data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Visit_VisitorRecord_IRCCSecure"
                                        >
                                          IRCC secure account (GCKey or Sign-In
                                          Partner){" "}
                                          
                                        </a>{" "}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="clearfix"></div>
                              </div>
                            </div>
                            <div className="panel panel-default panel-body position-relative">
                              <button
                                className="text-left stretched-link btn-link no-undrln full-width p-0 super-visa"
                                data-wb-doaction='[
                        { "action": "run", "trggroup": "toggle-result" },
                        { "action": "removeClass", "class": "stretched-link nojs-show", "source": ".super-visa" }
                            ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Visit_SuperVisa"
                              >
                                Super visa (for parents and grandparents)
                              </button>
                              <div className="result super-visa nojs-show mrgn-lft-sm mrgn-rght-sm">
                                <p>You used one of these 3 accounts:</p>
                                <div className="row-no-gutters clearfix">
                                  <ul className="cnjnctn-type-or cnjnctn-type-or-horizontal col-md-9">
                                    <li className="cnjnctn-col p-0">
                                      <div className="panel panel-default mrgn-bttm-md">
                                        <div className="panel-body position-relative d-flex align-items-center">
                                          {" "}
                                          <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                          <a
                                            
                                            href="/immigration-refugees-citizenship/services/application/account"
                                            className="stretched-link no-undrln"
                                            data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Visit_SuperVisa_IRCCSecure"
                                          >
                                            IRCC secure account (GCKey or
                                            Sign-In Partner){" "}
                                            
                                          </a>{" "}
                                        </div>
                                      </div>
                                    </li>
                                    <li className="cnjnctn-col position-relative p-0">
                                      <div className="panel panel-default mrgn-bttm-md">
                                        <div className="panel-body position-relative d-flex align-items-center">
                                          {" "}
                                          <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                          <a
                                            
                                            href="/immigration-refugees-citizenship/services/visit-canada/portal-application-process"
                                            className="stretched-link no-undrln"
                                            data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Visit_SuperVisa_IRCCPortal"
                                          >
                                            IRCC portal{" "}
                                            
                                          </a>{" "}
                                        </div>
                                      </div>
                                    </li>
                                    <li className="cnjnctn-col position-relative p-0">
                                      <div className="panel panel-default mrgn-bttm-md">
                                        <div className="panel-body position-relative d-flex align-items-center">
                                          {" "}
                                          <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                          <a
                                            
                                            href="/immigration-refugees-citizenship/services/application/online-account"
                                            className="stretched-link no-undrln"
                                            data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Visit_SuperVisa_IRCCPortal_new_version"
                                          >
                                            IRCC portal – New version{" "}
                                            
                                          </a>{" "}
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                                <div className="clearfix"></div>
                                <p>
                                  <a
                                    href="#hints-2"
                                    data-gc-analytics-customclick="IRCC:AccountWizard_TT_SuperVisa"
                                    className="wb-lbx wb-init wb-lbx-inited"
                                    role="button"
                                    id="wb-auto-8"
                                  >
                                    <i
                                      className="fas fa-info-circle mrgn-rght-sm"
                                      aria-hidden="true"
                                    ></i>
                                    Not sure which account you used?
                                  </a>
                                </p>
                              </div>
                            </div>
                            <div className="panel panel-default panel-body position-relative">
                              <button
                                className="text-left stretched-link btn-link no-undrln full-width p-0 transit-visa"
                                data-wb-doaction='[
                        { "action": "run", "trggroup": "toggle-result" },
                        { "action": "removeClass", "class": "stretched-link nojs-show", "source": ".transit-visa" }
                            ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Visit_TransitVisa"
                              >
                                Transit visa
                              </button>
                              <div className="result transit-visa nojs-show mrgn-lft-sm mrgn-rght-sm">
                                <p>You used one of these 2 accounts:</p>
                                <div className="row-no-gutters clearfix">
                                  <ul className="cnjnctn-type-or cnjnctn-type-or-horizontal col-md-9">
                                    <li className="cnjnctn-col p-0">
                                      <div className="panel panel-default mrgn-bttm-md">
                                        <div className="panel-body position-relative d-flex align-items-center">
                                          {" "}
                                          <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                          <a
                                            
                                            href="/immigration-refugees-citizenship/services/application/account"
                                            className="stretched-link no-undrln"
                                            data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Visit_TransitVisa_IRCCSecure"
                                          >
                                            IRCC secure account (GCKey or
                                            Sign-In Partner){" "}
                                            
                                          </a>{" "}
                                        </div>
                                      </div>
                                    </li>
                                    <li className="cnjnctn-col position-relative p-0">
                                      <div className="panel panel-default mrgn-bttm-md">
                                        <div className="panel-body position-relative d-flex align-items-center">
                                          {" "}
                                          <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                          <a
                                            
                                            href="/immigration-refugees-citizenship/services/visit-canada/transit/transit-visa/apply"
                                            className="stretched-link no-undrln"
                                            data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Visit_TransitVisa_IRCCPortal"
                                          >
                                            IRCC portal{" "}
                                            
                                          </a>{" "}
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                                <div className="clearfix"></div>
                                <p>
                                  <a
                                    href="#hints-2"
                                    data-gc-analytics-customclick="IRCC:AccountWizard_TT_TransitVisa"
                                    className="wb-lbx wb-init wb-lbx-inited"
                                    role="button"
                                    id="wb-auto-9"
                                  >
                                    <i
                                      className="fas fa-info-circle mrgn-rght-sm"
                                      aria-hidden="true"
                                    ></i>
                                    Not sure which account you used?
                                  </a>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        id="immigrate"
                        className="selection-options immigrate nojs-show"
                      >
                        <div className="row">
                          <div className="col-md-10 col-md-offset-1">
                            <h2 className="mrgn-tp-md nojs-show">
                              Sign in to your account:&nbsp;Immigrating to
                              Canada
                            </h2>
                            <div className="position-relative mrgn-bttm-sm">
                              {" "}
                              <a
                                href="#account-chooser"
                                className="text-left btn-link no-undrln d-flex align-items-center nojs-hide"
                                data-gc-analytics-customclick="IRCC:AccountWizard_Back:Other_Immigrating"
                                data-wb-doaction='[
                                { "action": "run", "trggroup": "back" },
                                { "action": "removeClass", "class": "nojs-show", "source": ".application" }
                            ]'
                              >
                                <span className="fas fa-chevron-left pull-left mrgn-rght-md"></span>
                                Back
                              </a>{" "}
                            </div>
                            <div className="panel panel-default panel-body position-relative">
                              <button
                                className="text-left stretched-link btn-link no-undrln full-width p-0 express-entry"
                                data-wb-doaction='[
                            { "action": "run", "trggroup": "toggle-result" },
                            { "action": "removeClass", "class": "stretched-link nojs-show", "source": ".express-entry" }
                            ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Immigrate_EE"
                              >
                                Express Entry
                              </button>
                              <div className="result express-entry nojs-show mrgn-lft-sm mrgn-rght-sm">
                                <p>
                                  You used the IRCC secure account (GCKey or
                                  Sign-In Partner).
                                </p>
                                <div className="row-no-gutters">
                                  <div className="col-md-9">
                                    <div className="panel panel-default mrgn-bttm-md">
                                      <div className="panel-body position-relative d-flex align-items-center">
                                        {" "}
                                        <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                        <a
                                          
                                          href="/immigration-refugees-citizenship/services/application/account"
                                          className="stretched-link no-undrln"
                                          data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Immigrate_EE_IRCCSecure"
                                        >
                                          IRCC secure account (GCKey or Sign-In
                                          Partner){" "}
                                          
                                        </a>{" "}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="clearfix"></div>
                              </div>
                            </div>
                            <div className="panel panel-default panel-body position-relative">
                              <button
                                className="text-left stretched-link btn-link no-undrln full-width p-0 tr-pr"
                                data-wb-doaction='[
                            { "action": "run", "trggroup": "toggle-result" },
                            { "action": "removeClass", "class": "stretched-link nojs-show", "source": ".tr-pr" }
                            ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Immigrate_TRPR"
                              >
                                Temporary resident to permanent resident
                                (TR-to-PR) pathway
                              </button>
                              <div className="result tr-pr nojs-show mrgn-lft-sm mrgn-rght-sm">
                                {/*  <p>View your TR-to-PR application:</p>
                      <div className="row-no-gutters">
                        <div className="col-md-9">
                          <div className="panel panel-default mrgn-bttm-md">
                            <div className="panel-body position-relative d-flex align-items-center"> <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i> <a  data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Immigrate_TRPR_Portal" href="https://trprpath-voiertrp.apps.cic.gc.ca/landing" className="stretched-link no-undrln">TR-to-PR portal </a> </div>
                          </div>
                        </div>
                      </div>
                      <div className="clearfix"></div> */}
                                <p>View your work permit application:</p>
                                <div className="row-no-gutters">
                                  <div className="col-md-9">
                                    <div className="panel panel-default mrgn-bttm-md">
                                      <div className="panel-body position-relative d-flex align-items-center">
                                        {" "}
                                        <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                        <a
                                          
                                          data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Immigrate_TRPR_IRCCSecure"
                                          href="/immigration-refugees-citizenship/services/application/account"
                                          className="stretched-link no-undrln"
                                        >
                                          IRCC secure account (GCKey or Sign-In
                                          Partner){" "}
                                          
                                        </a>{" "}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="clearfix"></div>

                                <p>
                                  Get updates on your permanent residence
                                  application and send us documents:
                                </p>
                                <div className="row-no-gutters">
                                  <div className="col-md-9">
                                    <div className="panel panel-default mrgn-bttm-md">
                                      <div className="panel-body position-relative d-flex align-items-center">
                                        {" "}
                                        <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                        <a
                                          
                                          data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Immigrate_TRPR_IRCCSecure"
                                          href="/immigration-refugees-citizenship/services/application/account/link-paper-online"
                                          className="stretched-link no-undrln"
                                        >
                                          Link an application to your IRCC
                                          secure account{" "}
                                          
                                        </a>{" "}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="clearfix"></div>
                              </div>
                            </div>
                            <div className="panel panel-default panel-body position-relative">
                              <button
                                className="text-left stretched-link btn-link no-undrln full-width p-0 other"
                                data-wb-doaction='[
                            { "action": "run", "trggroup": "toggle-result" },
                            { "action": "removeClass", "class": "stretched-link nojs-show", "source": ".other" }
                            ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Immigrate_Other"
                              >
                                Another immigration program
                              </button>
                              <div className="result other nojs-show mrgn-lft-sm mrgn-rght-sm">
                                <p>You used the Permanent residence portal.</p>
                                <div className="row-no-gutters">
                                  <div className="col-md-9">
                                    <div className="panel panel-default mrgn-bttm-md">
                                      <div className="panel-body position-relative d-flex align-items-center">
                                        {" "}
                                        <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                        <a
                                          
                                          href="/immigration-refugees-citizenship/services/immigrate-canada/how-to-apply-online"
                                          className="stretched-link no-undrln"
                                          data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Immigrate_Other_PRPortal"
                                        >
                                          Permanent residence portal{" "}
                                          
                                        </a>{" "}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="clearfix"></div>
                                <p>Other immigration programs include:</p>
                                <ul>
                                  <li>Agri-Food Pilot</li>
                                  <li>Atlantic Immigration Program</li>
                                  <li>Economic Mobility Pathways Pilot</li>
                                  <li>
                                    Family-based humanitarian program for
                                    Colombians, Haitians and Venezuelans
                                  </li>
                                  <li>
                                    Family-based permanent residence program for
                                    Ukrainian nationals{" "}
                                  </li>
                                  <li>
                                    Family-based permanent residence pathway for
                                    people affected by the conflict in Sudan
                                  </li>
                                  <li>
                                    Family sponsorship (including adoption
                                    through the immigration process)
                                  </li>
                                  <li>Home Care Worker Immigration pilots</li>
                                  <li>
                                    Home Child Care and Home Support Worker
                                    Pilots
                                  </li>
                                  <li>
                                    Humanitarian and compassionate reasons
                                  </li>
                                  <li>
                                    Permanent residence pathways for Hong Kong
                                    residents
                                  </li>
                                  <li>Protected persons</li>
                                  <li>
                                    Provincial Nominee Program (non-Express
                                    Entry route)
                                  </li>
                                  <li>Quebec entrepreneurs</li>
                                  <li>Quebec investors</li>
                                  <li>Quebec self-employed persons</li>
                                  <li>Quebec skilled workers</li>
                                  <li>Rural and Northern Immigration Pilot</li>
                                  <li>Self-employed persons</li>
                                  <li>Start-up Visa</li>
                                  <li>
                                    Temporary resident permit holder applying
                                    for permanent residence
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        id="family"
                        className="selection-options family nojs-show"
                      >
                        <div className="row">
                          <div className="col-md-10 col-md-offset-1">
                            <h2 className="mrgn-tp-md nojs-show">
                              Sign in to your account:&nbsp;Sponsoring family
                            </h2>
                            <a
                              href="#account-chooser"
                              className="text-left btn-link no-undrln d-flex align-items-center nojs-hide"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Back:Other_SponsoringFamily"
                              data-wb-doaction='[
                            { "action": "run", "trggroup": "back" },
                            { "action": "removeClass", "class": "nojs-show", "source": ".application" }
                        ]'
                            >
                              <span className="fas fa-chevron-left pull-left mrgn-rght-md"></span>
                              Back
                            </a>
                            <div className="panel panel-default panel-body position-relative">
                              <div className="result family nojs-show mrgn-lft-sm mrgn-rght-sm">
                                <p>You used the Permanent residence portal.</p>
                                <div className="row-no-gutters">
                                  <div className="col-md-9">
                                    <div className="panel panel-default mrgn-bttm-md">
                                      <div className="panel-body position-relative d-flex align-items-center">
                                        {" "}
                                        <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                        <a
                                          
                                          href="/immigration-refugees-citizenship/services/immigrate-canada/how-to-apply-online"
                                          className="stretched-link no-undrln"
                                          data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Immigrate_Sponsor_PRPortal"
                                        >
                                          Permanent residence portal{" "}
                                          
                                        </a>{" "}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="clearfix"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        id="working"
                        className="selection-options working nojs-show"
                      >
                        <div className="row">
                          <div className="col-md-10 col-md-offset-1">
                            <h2 className="mrgn-tp-md nojs-show">
                              Sign in to your account:&nbsp;Working in Canada
                              temporarily
                            </h2>
                            <div className="position-relative mrgn-bttm-sm">
                              {" "}
                              <a
                                href="#account-chooser"
                                className="text-left btn-link no-undrln d-flex align-items-center nojs-hide"
                                data-gc-analytics-customclick="IRCC:AccountWizard_Back:Other_Working"
                                data-wb-doaction='[
                                    { "action": "run", "trggroup": "back" },
                                    { "action": "removeClass", "class": "nojs-show", "source": ".application" }
                                ]'
                              >
                                <span className="fas fa-chevron-left pull-left mrgn-rght-md"></span>
                                Back
                              </a>{" "}
                            </div>
                            <div className="panel panel-default panel-body position-relative">
                              <button
                                className="text-left stretched-link btn-link no-undrln full-width p-0 work-permit"
                                data-wb-doaction='[
                            { "action": "run", "trggroup": "toggle-result" },
                            { "action": "removeClass", "class": "stretched-link nojs-show", "source": ".work-permit" }
                            ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q4:WorkTemp_WorkPermit"
                              >
                                Work permit and work permit extension
                              </button>
                              <div className="result work-permit nojs-show mrgn-lft-sm mrgn-rght-sm">
                                <p>
                                  You used the IRCC secure account (GCKey or
                                  Sign-In Partner).
                                </p>
                                <div className="row-no-gutters">
                                  <div className="col-md-9">
                                    <div className="panel panel-default mrgn-bttm-md">
                                      <div className="panel-body position-relative d-flex align-items-center">
                                        {" "}
                                        <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                        <a
                                          
                                          href="/immigration-refugees-citizenship/services/application/account"
                                          className="stretched-link no-undrln"
                                          data-gc-analytics-customclick="IRCC:AccountWizard_Q4:WorkTemp_WorkPermit_IRCCSecure"
                                        >
                                          IRCC secure account (GCKey or Sign-In
                                          Partner){" "}
                                          
                                        </a>{" "}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="clearfix"></div>
                              </div>
                            </div>
                            <div className="panel panel-default panel-body position-relative">
                              <button
                                className="text-left stretched-link btn-link no-undrln full-width p-0 iec"
                                data-wb-doaction='[
                            { "action": "run", "trggroup": "toggle-result" },
                            { "action": "removeClass", "class": "stretched-link nojs-show", "source": ".iec" }
                            ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q4:WorkTemp_IEC"
                              >
                                International Experience Canada
                              </button>
                              <div className="result iec nojs-show mrgn-lft-sm mrgn-rght-sm">
                                <p>
                                  You used the IRCC secure account (GCKey or
                                  Sign-In Partner).
                                </p>
                                <div className="row-no-gutters">
                                  <div className="col-md-9">
                                    <div className="panel panel-default mrgn-bttm-md">
                                      <div className="panel-body position-relative d-flex align-items-center">
                                        {" "}
                                        <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                        <a
                                          
                                          href="/immigration-refugees-citizenship/services/application/account"
                                          className="stretched-link no-undrln"
                                          data-gc-analytics-customclick="IRCC:AccountWizard_Q4:WorkTemp_IEC_IRCCSecure"
                                        >
                                          IRCC secure account (GCKey or Sign-In
                                          Partner){" "}
                                          
                                        </a>{" "}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="clearfix"></div>
                              </div>
                            </div>
                            <div className="panel panel-default panel-body position-relative">
                              <button
                                className="text-left stretched-link btn-link no-undrln full-width p-0 pgwp"
                                data-wb-doaction='[
                            { "action": "run", "trggroup": "toggle-result" },
                            { "action": "removeClass", "class": "stretched-link nojs-show", "source": ".pgwp" }
                            ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q4:WorkTemp_PostGrad"
                              >
                                Post-graduation work permit
                              </button>
                              <div className="result pgwp nojs-show mrgn-lft-sm mrgn-rght-sm">
                                <p>
                                  You used the IRCC secure account (GCKey or
                                  Sign-In Partner).
                                </p>
                                <div className="row-no-gutters">
                                  <div className="col-md-9">
                                    <div className="panel panel-default mrgn-bttm-md">
                                      <div className="panel-body position-relative d-flex align-items-center">
                                        {" "}
                                        <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                        <a
                                          
                                          href="/immigration-refugees-citizenship/services/application/account"
                                          className="stretched-link no-undrln"
                                          data-gc-analytics-customclick="IRCC:AccountWizard_Q4:WorkTemp_PostGrad_IRCCSecure"
                                        >
                                          IRCC secure account (GCKey or Sign-In
                                          Partner){" "}
                                          
                                        </a>{" "}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="clearfix"></div>
                              </div>
                            </div>
                            <div className="panel panel-default panel-body position-relative">
                              <button
                                className="text-left stretched-link btn-link no-undrln full-width p-0 h-1b"
                                data-wb-doaction='[
                            { "action": "run", "trggroup": "toggle-result" },
                            { "action": "removeClass", "class": "stretched-link nojs-show", "source": ".h-1b" }
                        ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q4:WorkTemp_H-1B"
                              >
                                H-1B visa holder work permit
                              </button>
                              <div className="result h-1b nojs-show mrgn-lft-sm mrgn-rght-sm">
                                <p>You used the IRCC portal.</p>
                                <div className="row-no-gutters">
                                  <div className="col-md-9">
                                    <div className="panel panel-default mrgn-bttm-md">
                                      <div className="panel-body position-relative d-flex align-items-center">
                                        {" "}
                                        <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                        <a
                                          
                                          data-gc-analytics-customclick="IRCC:AccountWizard_Q4:WorkTemp_H-1B_IRCCPortal"
                                          href="https://portal-portail.apps.cic.gc.ca/signin?lang=en"
                                          className="stretched-link no-undrln"
                                        >
                                          IRCC portal{" "}
                                          
                                        </a>{" "}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="clearfix"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        id="study"
                        className="selection-options study nojs-show"
                      >
                        <div className="row">
                          <div className="col-md-10 col-md-offset-1">
                            <h2 className="mrgn-tp-md nojs-show">
                              Sign in to your account:&nbsp;Studying in Canada
                            </h2>
                            <div className="position-relative mrgn-bttm-sm">
                              {" "}
                              <a
                                href="#account-chooser"
                                className="text-left btn-link no-undrln d-flex align-items-center nojs-hide"
                                data-gc-analytics-customclick="IRCC:AccountWizard_Back:Other_Studying"
                                data-wb-doaction='[
                                    { "action": "run", "trggroup": "back" },
                                    { "action": "removeClass", "class": "nojs-show", "source": ".application" }
                                ]'
                              >
                                <span className="fas fa-chevron-left pull-left mrgn-rght-md"></span>
                                Back
                              </a>{" "}
                            </div>
                            <div className="panel panel-default panel-body position-relative">
                              <button
                                className="text-left stretched-link btn-link no-undrln full-width p-0 study-permit"
                                data-wb-doaction='[
                            { "action": "run", "trggroup": "toggle-result" },
                            { "action": "removeClass", "class": "stretched-link nojs-show", "source": ".study-permit" }
                        ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Study_StudyPermit"
                              >
                                Study permit
                              </button>
                              <div className="result study-permit nojs-show mrgn-lft-sm mrgn-rght-sm">
                                <p>You used one of these 2 accounts:</p>
                                <div className="row-no-gutters clearfix">
                                  <ul className="cnjnctn-type-or cnjnctn-type-or-horizontal col-md-9">
                                    <li className="cnjnctn-col position-relative p-0">
                                      <div className="panel panel-default mrgn-bttm-md">
                                        <div className="panel-body position-relative d-flex align-items-center">
                                          {" "}
                                          <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                          <a
                                            
                                            href="/immigration-refugees-citizenship/services/application/account"
                                            className="stretched-link no-undrln"
                                            data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Study_StudyPermit_IRCCSecure"
                                          >
                                            IRCC secure account (GCKey or
                                            Sign-In Partner){" "}
                                            
                                          </a>{" "}
                                        </div>
                                      </div>
                                    </li>
                                    <li className="cnjnctn-col p-0">
                                      <div className="panel panel-default mrgn-bttm-md">
                                        <div className="panel-body position-relative d-flex align-items-center">
                                          {" "}
                                          <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                          <a
                                            
                                            href="/immigration-refugees-citizenship/services/study-canada/portal-application-process-study"
                                            className="stretched-link no-undrln"
                                            data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Study_StudyPermit_IRCCPortal"
                                          >
                                            IRCC portal{" "}
                                            
                                          </a>{" "}
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                                <div className="clearfix"></div>
                                <p>
                                  <a
                                    href="#hints-2"
                                    data-gc-analytics-customclick="IRCC:AccountWizard_TT_StudyPermit"
                                    className="wb-lbx wb-init wb-lbx-inited"
                                    role="button"
                                    id="wb-auto-10"
                                  >
                                    <i
                                      className="fas fa-info-circle mrgn-rght-sm"
                                      aria-hidden="true"
                                    ></i>
                                    Not sure which account you used?
                                  </a>
                                </p>
                              </div>
                            </div>
                            <div className="panel panel-default panel-body position-relative">
                              <button
                                className="text-left stretched-link btn-link no-undrln full-width p-0 study-permit-fam"
                                data-wb-doaction='[
                            { "action": "run", "trggroup": "toggle-result" },
                            { "action": "removeClass", "class": "stretched-link nojs-show", "source": ".study-permit-fam" }
                        ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Study_StudyPermitFamily"
                              >
                                Study permit (with a family member who needs a
                                work permit)
                              </button>
                              <div className="result study-permit-fam nojs-show mrgn-lft-sm mrgn-rght-sm">
                                <p>
                                  You used the IRCC secure account (GCKey or
                                  Sign-In Partner).
                                </p>
                                <div className="row-no-gutters">
                                  <div className="col-md-9">
                                    <div className="panel panel-default mrgn-bttm-md">
                                      <div className="panel-body position-relative d-flex align-items-center">
                                        {" "}
                                        <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                        <a
                                          
                                          href="/immigration-refugees-citizenship/services/application/account"
                                          className="stretched-link no-undrln"
                                          data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Study_StudyPermitFamily_IRCCSecure"
                                        >
                                          IRCC secure account (GCKey or Sign-In
                                          Partner){" "}
                                          
                                        </a>{" "}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="clearfix"></div>
                              </div>
                            </div>
                            <div className="panel panel-default panel-body position-relative">
                              <button
                                className="text-left stretched-link btn-link no-undrln full-width p-0 study-permit-fmcsp"
                                data-wb-doaction='[{ "action": "run", "trggroup": "toggle-result" }, { "action": "removeClass", "class": "stretched-link nojs-show", "source": ".study-permit-fmcsp" }]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Study_FMCSP"
                              >
                                Francophone Minority Communities Student Pilot
                                (FMCSP)
                              </button>
                              <div className="result study-permit-fmcsp nojs-show mrgn-lft-sm mrgn-rght-sm">
                                <p>You used one of these 2 accounts:</p>
                                <div className="row-no-gutters clearfix">
                                  <ul className="cnjnctn-type-or cnjnctn-type-or-horizontal col-md-9">
                                    <li className="cnjnctn-col position-relative p-0">
                                      <div className="panel panel-default mrgn-bttm-md">
                                        <div className="panel-body position-relative d-flex align-items-center">
                                          {" "}
                                          <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                          <a
                                            
                                            href="/immigration-refugees-citizenship/services/application/account"
                                            className="stretched-link no-undrln"
                                            data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Study_FMCSP_IRCCSecure"
                                          >
                                            IRCC secure account (GCKey or
                                            Sign-In Partner){" "}
                                            
                                          </a>{" "}
                                        </div>
                                      </div>
                                    </li>
                                    <li className="cnjnctn-col p-0">
                                      <div className="panel panel-default mrgn-bttm-md">
                                        <div className="panel-body position-relative d-flex align-items-center">
                                          {" "}
                                          <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                          <a
                                            
                                            href="/immigration-refugees-citizenship/services/study-canada/portal-application-process-study"
                                            className="stretched-link no-undrln"
                                            data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Study_FMCSP_IRCCPortal"
                                          >
                                            IRCC portal{" "}
                                            
                                          </a>{" "}
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                                <div className="clearfix"></div>
                                <p>
                                  <a
                                    href="#hints-2"
                                    className="wb-lbx wb-init wb-lbx-inited"
                                    role="button"
                                    id="wb-auto-11"
                                  >
                                    <i
                                      className="fas fa-info-circle mrgn-rght-sm"
                                      data-gc-analytics-customclick="IRCC:AccountWizard_TT_FMCSP"
                                      aria-hidden="true"
                                    ></i>
                                    Not sure which account you used?
                                  </a>
                                </p>
                              </div>
                            </div>
                            <div className="panel panel-default panel-body position-relative">
                              <button
                                className="text-left stretched-link btn-link no-undrln full-width p-0 study-permit-fmcsp-family"
                                data-wb-doaction='[{ "action": "run", "trggroup": "toggle-result" },  { "action": "removeClass", "class": "stretched-link nojs-show", "source": ".study-permit-fmcsp-family"}]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Study_FMCSP_With_Family_Member"
                              >
                                Francophone Minority Communities Student Pilot
                                (with a family member who needs a work
                                permit){" "}
                              </button>
                              <div className="result study-permit-fmcsp-family nojs-show mrgn-lft-sm mrgn-rght-sm">
                                <p>
                                  You used the IRCC secure account (GCKey or
                                  Sign-In Partner).
                                </p>
                                <div className="row-no-gutters">
                                  <div className="col-md-9">
                                    <div className="panel panel-default mrgn-bttm-md">
                                      <div className="panel-body position-relative d-flex align-items-center">
                                        {" "}
                                        <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                        <a
                                          
                                          href="/immigration-refugees-citizenship/services/application/account"
                                          className="stretched-link no-undrln"
                                          data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Study_SFMCSP_With_Family_Member_IRCCSecure"
                                        >
                                          IRCC secure account (GCKey or Sign-In
                                          Partner){" "}
                                          
                                        </a>{" "}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="clearfix"></div>
                              </div>
                            </div>
                            <div className="panel panel-default panel-body position-relative">
                              <button
                                className="text-left stretched-link btn-link no-undrln full-width p-0 study-permit-ext"
                                data-wb-doaction='[
                            { "action": "run", "trggroup": "toggle-result" },
                            { "action": "removeClass", "class": "stretched-link nojs-show", "source": ".study-permit-ext" }
                        ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Study_Extension"
                              >
                                Study permit extension
                              </button>
                              <div className="result study-permit-ext nojs-show mrgn-lft-sm mrgn-rght-sm">
                                <p>
                                  You used the IRCC secure account (GCKey or
                                  Sign-In Partner).
                                </p>
                                <div className="row-no-gutters">
                                  <div className="col-md-9">
                                    <div className="panel panel-default mrgn-bttm-md">
                                      <div className="panel-body position-relative d-flex align-items-center">
                                        {" "}
                                        <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                        <a
                                          
                                          href="/immigration-refugees-citizenship/services/application/account"
                                          className="stretched-link no-undrln"
                                          data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Study_Extension_IRCCSecure"
                                        >
                                          IRCC secure account (GCKey or Sign-In
                                          Partner){" "}
                                          
                                        </a>{" "}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="clearfix"></div>
                              </div>
                            </div>
                            <div className="panel panel-default panel-body position-relative">
                              <button
                                className="text-left stretched-link btn-link no-undrln full-width p-0 change-school"
                                data-wb-doaction='[
                            { "action": "run", "trggroup": "toggle-result" },
                            { "action": "removeClass", "class": "stretched-link nojs-show", "source": ".change-school" }
                        ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Study_ChangeSchool"
                              >
                                Change your school
                              </button>
                              <div className="result change-school nojs-show mrgn-lft-sm mrgn-rght-sm">
                                <p>
                                  You used the IRCC secure account (GCKey or
                                  Sign-In Partner).
                                </p>
                                <div className="row-no-gutters">
                                  <div className="col-md-9">
                                    <div className="panel panel-default mrgn-bttm-md">
                                      <div className="panel-body position-relative d-flex align-items-center">
                                        {" "}
                                        <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                        <a
                                          
                                          href="/immigration-refugees-citizenship/services/application/account"
                                          className="stretched-link no-undrln"
                                          data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Study_ChangeSchool_IRCCSecure"
                                        >
                                          IRCC secure account (GCKey or Sign-In
                                          Partner){" "}
                                          
                                        </a>{" "}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="clearfix"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        id="citizenship"
                        className="selection-options citizenship nojs-show"
                      >
                        <div className="row">
                          <div className="col-md-10 col-md-offset-1">
                            <h2 className="mrgn-tp-md nojs-show">
                              Sign in to your account:&nbsp;Canadian citizenship
                            </h2>
                            <div className="position-relative mrgn-bttm-sm">
                              {" "}
                              <a
                                href="#account-chooser"
                                className="text-left btn-link no-undrln d-flex align-items-center nojs-hide"
                                data-gc-analytics-customclick="IRCC:AccountWizard_Back:Other_Citizenship"
                                data-wb-doaction='[
                                { "action": "run", "trggroup": "back" },
                                { "action": "removeClass", "class": "nojs-show", "source": ".application" }
                            ]'
                              >
                                <span className="fas fa-chevron-left pull-left mrgn-rght-md"></span>
                                Back
                              </a>{" "}
                            </div>
                            <div className="panel panel-default panel-body position-relative">
                              <button
                                className="text-left stretched-link btn-link no-undrln full-width p-0 grant"
                                data-wb-doaction='[
                            { "action": "run", "trggroup": "toggle-result" },
                            { "action": "removeClass", "class": "stretched-link nojs-show", "source": ".grant" }
                        ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Citizenship_Cit"
                              >
                                Canadian citizenship application (to become a
                                Canadian citizen)
                              </button>
                              <div className="result grant nojs-show mrgn-lft-sm mrgn-rght-sm">
                                <p>
                                  You used the online citizenship application.
                                </p>
                                <div className="row-no-gutters">
                                  <div className="col-md-9">
                                    <div className="panel panel-default mrgn-bttm-md">
                                      <div className="panel-body position-relative d-flex align-items-center">
                                        {" "}
                                        <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                        <a
                                          
                                          href="https://citapply-citdemande.apps.cic.gc.ca/sign-in"
                                          data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Citizenship_Cit_CitApp"
                                          className="stretched-link no-undrln"
                                        >
                                          Online citizenship application{" "}
                                          
                                        </a>{" "}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="clearfix"></div>
                              </div>
                            </div>
                            <div className="panel panel-default panel-body position-relative">
                              <button
                                className="text-left stretched-link btn-link no-undrln full-width p-0 certificate"
                                data-wb-doaction='[
                            { "action": "run", "trggroup": "toggle-result" },
                            { "action": "removeClass", "class": "stretched-link nojs-show", "source": ".certificate" }
                        ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Citizenship_Certificate"
                              >
                                Citizenship certificate application (to prove or
                                confirm your Canadian citizenship)
                              </button>
                              <div className="result certificate nojs-show mrgn-lft-sm mrgn-rght-sm">
                                <p>
                                  You used the IRCC secure account (GCKey or
                                  Sign-In Partner).
                                </p>
                                <div className="row-no-gutters">
                                  <div className="col-md-9">
                                    <div className="panel panel-default mrgn-bttm-md">
                                      <div className="panel-body position-relative d-flex align-items-center">
                                        {" "}
                                        <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                        <a
                                          
                                          href="/immigration-refugees-citizenship/services/application/account"
                                          data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Citizenship_Certificate_IRCCSecure"
                                          className="stretched-link no-undrln"
                                        >
                                          IRCC secure account (GCKey or Sign-In
                                          Partner){" "}
                                          
                                        </a>{" "}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="clearfix"></div>
                              </div>
                            </div>
                            <div className="panel panel-default panel-body position-relative">
                              <button
                                className="text-left stretched-link btn-link no-undrln full-width p-0 test"
                                data-wb-doaction='[
                            { "action": "run", "trggroup": "toggle-result" },
                            { "action": "removeClass", "class": "stretched-link nojs-show", "source": ".test" }
                        ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Citizenship_Test"
                              >
                                Canadian citizenship test
                              </button>
                              <div className="result test nojs-show mrgn-lft-sm mrgn-rght-sm">
                                <p>
                                  You need the online citizenship test portal.
                                </p>
                                <div className="row-no-gutters">
                                  <div className="col-md-9">
                                    <div className="panel panel-default mrgn-bttm-md">
                                      <div className="panel-body position-relative d-flex align-items-center">
                                        {" "}
                                        <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                        <a
                                          
                                          href="/immigration-refugees-citizenship/services/canadian-citizenship/become-canadian-citizen/citizenship-test/online"
                                          className="stretched-link no-undrln"
                                          data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Citizenship_Test_Online"
                                        >
                                          Online citizenship test{" "}
                                          
                                        </a>{" "}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="clearfix"></div>
                                <p>
                                  <strong>
                                    If you{" "}
                                    <a
                                      
                                      href="/immigration-refugees-citizenship/services/canadian-citizenship/become-canadian-citizen/apply/accommodation"
                                    >
                                      requested an accommodation
                                      <span className="fas fa-share mrgn-lft-sm">
                                        
                                      </span>
                                    </a>
                                  </strong>
                                  , we may invite you to take the test on
                                  Microsoft Teams or in person. In this case,
                                  you won’t need the online test portal.
                                </p>
                              </div>
                            </div>
                            <div className="panel panel-default panel-body position-relative">
                              <button
                                className="text-left stretched-link btn-link no-undrln full-width p-0 certificate-download"
                                data-wb-doaction='[
                            { "action": "run", "trggroup": "toggle-result" },
                            { "action": "removeClass", "class": "stretched-link nojs-show", "source": ".certificate-download" }
                        ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Citizenship_Download"
                              >
                                Electronic citizenship certificate download
                              </button>
                              <div className="result certificate-download nojs-show mrgn-lft-sm mrgn-rght-sm">
                                <p>
                                  Use the IRCC portal to download your
                                  electronic citizenship certificate
                                  (e-certificate) if you asked for an
                                  e-certificate in your citizenship application.
                                </p>
                                <div className="row-no-gutters">
                                  <div className="col-md-9">
                                    <div className="panel panel-default mrgn-bttm-md">
                                      <div className="panel-body position-relative d-flex align-items-center">
                                        {" "}
                                        <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                        <a
                                          
                                          href="https://portal-portail.apps.cic.gc.ca/signin?lang=en"
                                          data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Citizenship_Download_IRCCPortal"
                                          className="stretched-link no-undrln"
                                        >
                                          IRCC portal{" "}
                                          
                                        </a>{" "}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="clearfix"></div>
                                <p>
                                  <strong>Need help?</strong>{" "}
                                  <a
                                    
                                    href="/immigration-refugees-citizenship/services/canadian-citizenship/proof-citizenship/valid/e-certificate#s3"
                                  >
                                    Find out how to view and download your
                                    e-certificate.
                                    <span className="fas fa-share mrgn-lft-sm">
                                      
                                    </span>
                                  </a>
                                </p>
                              </div>
                            </div>
                            <div className="panel panel-default panel-body position-relative">
                              <button
                                className="text-left stretched-link btn-link no-undrln full-width p-0 cit-records"
                                data-wb-doaction='[
                            { "action": "run", "trggroup": "toggle-result" },
                            { "action": "removeClass", "class": "stretched-link nojs-show", "source": ".cit-records" }
                        ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Citizenship_SearchRecords"
                              >
                                Search citizenship records
                              </button>
                              <div className="result cit-records nojs-show mrgn-lft-sm mrgn-rght-sm">
                                <p>
                                  You used the IRCC secure account (GCKey or
                                  Sign-In Partner).
                                </p>
                                <div className="row-no-gutters">
                                  <div className="col-md-9">
                                    <div className="panel panel-default mrgn-bttm-md">
                                      <div className="panel-body position-relative d-flex align-items-center">
                                        {" "}
                                        <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                        <a
                                          
                                          href="/immigration-refugees-citizenship/services/application/account"
                                          data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Citizenship_SearchRecords_IRCCSecure"
                                          className="stretched-link no-undrln"
                                        >
                                          IRCC secure account (GCKey or Sign-In
                                          Partner){" "}
                                          
                                        </a>{" "}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="clearfix"></div>
                              </div>
                            </div>
                            <div className="panel panel-default panel-body position-relative">
                              <button
                                className="text-left stretched-link btn-link no-undrln full-width p-0 calculator"
                                data-wb-doaction='[
                            { "action": "run", "trggroup": "toggle-result" },
                            { "action": "removeClass", "class": "stretched-link nojs-show", "source": ".calculator" }
                        ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Citizenship_PhysicalPresence"
                              >
                                Physical presence calculator (for paper
                                applications)
                              </button>
                              <div className="result calculator nojs-show mrgn-lft-sm mrgn-rght-sm">
                                <p>
                                  You should only use this calculator if you’re
                                  applying for Canadian citizenship{" "}
                                  <strong>on paper</strong>.
                                </p>
                                <div className="row-no-gutters">
                                  <div className="col-md-9">
                                    <div className="panel panel-default mrgn-bttm-md">
                                      <div className="panel-body position-relative d-flex align-items-center">
                                        {" "}
                                        <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                        <a
                                          
                                          href="https://eservices.cic.gc.ca/rescalc/resCalcStartNew.do?&amp;lang=en"
                                          data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Citizenship_PhysicalPresence_calc"
                                          className="stretched-link no-undrln"
                                        >
                                          Physical presence calculator{" "}
                                          
                                        </a>{" "}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="clearfix"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        id="refugees"
                        className="selection-options refugees nojs-show"
                      >
                        <div className="row">
                          <div className="col-md-10 col-md-offset-1">
                            <h2 className="mrgn-tp-md nojs-show">
                              Sign in to your account:&nbsp;Refugees and asylum
                            </h2>
                            <div className="position-relative mrgn-bttm-sm">
                              {" "}
                              <a
                                href="#account-chooser"
                                className="text-left btn-link no-undrln d-flex align-items-center nojs-hide"
                                data-gc-analytics-customclick="IRCC:AccountWizard_Back:Other_Refugees"
                                data-wb-doaction='[
                                    { "action": "run", "trggroup": "back" },
                                    { "action": "removeClass", "class": "nojs-show", "source": ".application" }
                                ]'
                              >
                                <span className="fas fa-chevron-left pull-left mrgn-rght-md"></span>
                                Back
                              </a>{" "}
                            </div>
                            <div className="panel panel-default panel-body position-relative">
                              <button
                                className="text-left stretched-link btn-link no-undrln full-width p-0 asylum"
                                data-wb-doaction='[
                                { "action": "run", "trggroup": "toggle-result" },
                                { "action": "removeClass", "class": "stretched-link nojs-show", "source": ".asylum" }
                            ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Refugee_Asylum"
                              >
                                Asylum claim
                              </button>
                              <div className="result asylum nojs-show mrgn-lft-sm mrgn-rght-sm">
                                <p>You used the IRCC portal.</p>
                                <div className="row-no-gutters">
                                  <div className="col-md-9">
                                    <div className="panel panel-default mrgn-bttm-md">
                                      <div className="panel-body position-relative d-flex align-items-center">
                                        {" "}
                                        <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                        <a
                                          
                                          href="https://portal-portail.apps.cic.gc.ca/signin?lang=en"
                                          data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Refugee_Asylum_IRCCPortal"
                                          className="stretched-link no-undrln"
                                        >
                                          IRCC portal{" "}
                                          
                                        </a>{" "}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="clearfix"></div>
                              </div>
                            </div>
                            <div className="panel panel-default panel-body position-relative">
                              <button
                                className="text-left stretched-link btn-link no-undrln full-width p-0 ifhp"
                                data-wb-doaction='[
                                { "action": "run", "trggroup": "toggle-result" },
                                { "action": "removeClass", "class": "stretched-link nojs-show", "source": ".ifhp" }
                            ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Refugee_IFHP"
                              >
                                Interim Federal Health Program
                              </button>
                              <div className="result ifhp nojs-show mrgn-lft-sm mrgn-rght-sm">
                                <p>
                                  You used the IRCC secure account (GCKey or
                                  Sign-In Partner).
                                </p>
                                <div className="row-no-gutters">
                                  <div className="col-md-9">
                                    <div className="panel panel-default mrgn-bttm-md">
                                      <div className="panel-body position-relative d-flex align-items-center">
                                        {" "}
                                        <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                        <a
                                          
                                          href="/immigration-refugees-citizenship/services/application/account"
                                          className="stretched-link no-undrln"
                                          data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Refugee_IFHP_IRCCSecure"
                                        >
                                          IRCC secure account (GCKey or Sign-In
                                          Partner){" "}
                                          
                                        </a>{" "}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="clearfix"></div>
                              </div>
                            </div>
                            <div className="panel panel-default panel-body position-relative">
                              <button
                                className="text-left stretched-link btn-link no-undrln full-width p-0 sponsor-refugee"
                                data-wb-doaction='[
                                { "action": "run", "trggroup": "toggle-result" },
                                { "action": "removeClass", "class": "stretched-link nojs-show", "source": ".sponsor-refugee" }
                            ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Refugee_Sponsor"
                              >
                                Sponsor a refugee
                              </button>
                              <div className="result sponsor-refugee nojs-show mrgn-lft-sm mrgn-rght-sm">
                                <p>You used the Permanent residence portal.</p>
                                <div className="row-no-gutters">
                                  <div className="col-md-9">
                                    <div className="panel panel-default mrgn-bttm-md">
                                      <div className="panel-body position-relative d-flex align-items-center">
                                        {" "}
                                        <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                        <a
                                          
                                          data-gc-analytics-customclick="IRCC:AccountWizard_Q4:Refugee_Sponsor"
                                          href="/immigration-refugees-citizenship/services/immigrate-canada/how-to-apply-online"
                                        >
                                          Permanent residence portal
                                        </a>{" "}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="clearfix"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        id="special-measures"
                        className="selection-options special-measures nojs-show"
                      >
                        <div className="row">
                          <div className="col-md-10 col-md-offset-1">
                            <h2 className="mrgn-tp-md nojs-show">
                              Sign in to your account:&nbsp;One of the special
                              measures
                            </h2>
                            <div className="position-relative mrgn-bttm-sm">
                              {" "}
                              <a
                                href="#account-chooser"
                                className="text-left btn-link no-undrln d-flex align-items-center nojs-hide"
                                data-gc-analytics-customclick="IRCC:AccountWizard_Back:Other_SpecialMeasures"
                                data-wb-doaction='[
                                    { "action": "run", "trggroup": "back" },
                                    { "action": "removeClass", "class": "nojs-show", "source": ".application" }
                                ]'
                              >
                                <span className="fas fa-chevron-left pull-left mrgn-rght-md"></span>
                                Back
                              </a>{" "}
                            </div>
                            <div className="panel panel-default panel-body position-relative">
                              <div className="result special-measures nojs-show mrgn-lft-sm mrgn-rght-sm">
                                <p>You used one of these 3 accounts:</p>
                                <div className="row-no-gutters clearfix">
                                  <ul className="cnjnctn-type-or cnjnctn-type-or-horizontal col-md-9">
                                    <li className="cnjnctn-col position-relative p-0">
                                      <div className="panel panel-default">
                                        <div className="panel-body position-relative d-flex align-items-center">
                                          {" "}
                                          <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                          <a
                                            
                                            data-gc-analytics-customclick="IRCC:AccountWizard_Q3:SpecialMeasures_IRCCSecure"
                                            href="/immigration-refugees-citizenship/services/application/account"
                                            className="stretched-link no-undrln"
                                          >
                                            IRCC secure account (GCKey or
                                            Sign-In Partner){" "}
                                            
                                          </a>{" "}
                                        </div>
                                      </div>
                                    </li>
                                    <li className="cnjnctn-col position-relative p-0">
                                      <div className="panel panel-default">
                                        <div className="panel-body position-relative d-flex align-items-center">
                                          {" "}
                                          <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                          <a
                                            
                                            data-gc-analytics-customclick="IRCC:AccountWizard_Q3:SpecialMeasures_IRCCPortal"
                                            href="https://portal-portail.apps.cic.gc.ca/signin?lang=en"
                                            className="stretched-link no-undrln"
                                          >
                                            IRCC portal{" "}
                                            
                                          </a>{" "}
                                        </div>
                                      </div>
                                    </li>
                                    <li className="cnjnctn-col position-relative p-0">
                                      <div className="panel panel-default">
                                        <div className="panel-body position-relative d-flex align-items-center">
                                          {" "}
                                          <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                          <a
                                            
                                            href="/immigration-refugees-citizenship/services/immigrate-canada/how-to-apply-online"
                                            data-gc-analytics-customclick="IRCC:AccountWizard_Q3:SpecialMeasures_PRPortal"
                                            className="stretched-link no-undrln"
                                          >
                                            Permanent residence portal{" "}
                                            
                                          </a>{" "}
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                                <div className="clearfix"></div>
                                <p>
                                  <a
                                    href="#hints-3"
                                    data-gc-analytics-customclick="IRCC:AccountWizard_TT_SpecialMeasures"
                                    className="wb-lbx wb-init wb-lbx-inited"
                                    role="button"
                                    id="wb-auto-12"
                                  >
                                    <i
                                      className="fas fa-info-circle mrgn-rght-sm"
                                      aria-hidden="true"
                                    ></i>
                                    Not sure which account you used?
                                  </a>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="pr" className="selection-options pr nojs-show">
                        <div className="row">
                          <div className="col-md-10 col-md-offset-1">
                            <h2 className="mrgn-tp-md nojs-show">
                              Sign in to your account:&nbsp;Permanent resident
                              cards and travel documents
                            </h2>
                            <div className="position-relative mrgn-bttm-sm">
                              {" "}
                              <a
                                href="#account-chooser"
                                className="text-left btn-link no-undrln d-flex align-items-center nojs-hide"
                                data-gc-analytics-customclick="IRCC:AccountWizard_Back:Other_PR"
                                data-wb-doaction='[
                                    { "action": "run", "trggroup": "back" },
                                    { "action": "removeClass", "class": "nojs-show", "source": ".application" }
                                ]'
                              >
                                <span className="fas fa-chevron-left pull-left mrgn-rght-md"></span>
                                Back
                              </a>{" "}
                            </div>
                            <div className="panel panel-default panel-body position-relative">
                              <div className="result pr nojs-show mrgn-lft-sm mrgn-rght-sm">
                                <p>You used the Permanent residence portal.</p>
                                <div className="row-no-gutters">
                                  <div className="col-md-9">
                                    <div className="panel panel-default mrgn-bttm-md">
                                      <div className="panel-body position-relative d-flex align-items-center">
                                        {" "}
                                        <i className="fas fa-user fa-2x pull-left mrgn-rght-md"></i>{" "}
                                        <a
                                          
                                          href="https://prson-srpel.apps.cic.gc.ca/login"
                                          data-gc-analytics-customclick="IRCC:AccountWizard_Q4:SignIn_PRPortal"
                                          className="stretched-link no-undrln"
                                        >
                                          Permanent residence portal{" "}
                                          
                                        </a>{" "}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="clearfix"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="find-program">
                    <div className="row">
                      <div className="col-md-10 col-md-offset-1">
                        <div className="find-header  nojs-show mrgn-lft-md mrgn-rght-md mrgn-tp-md">
                          <p>
                            <strong>
                              We have many accounts. Let us help you find the
                              right one.
                            </strong>
                          </p>
                          <p>
                            Tell us what you want to apply for and we’ll point
                            you to the page where you can find out how to apply.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="selection-options find-program nojs-show  mrgn-lft-md mrgn-rght-md">
                      <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                          <ul className="list-unstyled lst-scpd">
                            <li className="panel panel-default panel-body position-relative">
                              <button
                                className="text-left stretched-link btn-link no-undrln full-width p-0 "
                                data-wb-doaction='[
                                        { "action": "addClass", "class": "nojs-show", "source": ".find-program, .reset" },
                                        { "action": "removeClass", "class": "nojs-show", "source": ".known-program" }
                                    ]'
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q2:FindProgram_Know"
                              >
                                You know the program you want to apply to
                              </button>
                            </li>
                            <li className="panel panel-default panel-body position-relative">
                              {" "}
                              <a
                                
                                href="https://ircc.canada.ca/explore-programs"
                                className="stretched-link btn-link no-undrln full-width"
                                data-gc-analytics-customclick="IRCC:AccountWizard_Q2:FindProgram_Explore"
                              >
                                <div className="row d-flex align-items-center text-left">
                                  <div className="col-xs-11">
                                    You want to explore immigration programs
                                  </div>
                                  <div className="col-xs-1">
                                    
                                    <span className="fas fa-share pull-right"></span>
                                  </div>
                                </div>
                              </a>{" "}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div id="known-program">
                      <div className="selection-options known-program nojs-show mrgn-lft-md mrgn-rght-md">
                        <div className="row">
                          <div className="col-md-10 col-md-offset-1">
                            <div className="position-relative mrgn-bttm-sm">
                              {" "}
                              <a
                                href="#account-chooser"
                                className="text-left btn-link no-undrln d-flex align-items-center nojs-hide"
                                data-gc-analytics-customclick="IRCC:AccountWizard_Back:KnownProgram"
                                data-wb-doaction='[
                            { "action": "addClass", "class": "nojs-show", "source": ".known-program" },
                            { "action": "removeClass", "class": "nojs-show", "source": ".find-program" }
                        ]'
                              >
                                <span className="fas fa-chevron-left pull-left mrgn-rght-md"></span>
                                Back
                              </a>{" "}
                            </div>
                            <ul className="list-unstyled lst-scpd">
                              <li className="panel panel-default panel-body position-relative visit-known">
                                {" "}
                                <a
                                  href="#visit-known"
                                  className="text-left stretched-link btn-link no-undrln full-width p-0 "
                                  data-wb-doaction='[
                                        { "action": "addClass", "class": "nojs-show", "source": ".known-program" },
                                        { "action": "removeClass", "class": "nojs-show", "source": ".visit-known" }
                                    ]'
                                  data-gc-analytics-customclick="IRCC:AccountWizard_Q3:KnownProgram_Visit"
                                >
                                  Visiting Canada
                                </a>{" "}
                              </li>
                              <li className="panel panel-default panel-body position-relative">
                                {" "}
                                <a
                                  href="#immigrate-known"
                                  className="text-left stretched-link btn-link no-undrln full-width p-0 "
                                  data-wb-doaction='[
                                        { "action": "addClass", "class": "nojs-show", "source": ".known-program" },
                                        { "action": "removeClass", "class": "nojs-show", "source": ".immigrate-known" }
                                    ]'
                                  data-gc-analytics-customclick="IRCC:AccountWizard_Q3:KnownProgram_Immigrate"
                                >
                                  Immigrating to Canada (becoming a permanent
                                  resident)
                                </a>{" "}
                              </li>
                              <li className="panel panel-default panel-body position-relative">
                                {" "}
                                <a
                                  href="#family-known"
                                  className="text-left stretched-link btn-link no-undrln full-width p-0 "
                                  data-wb-doaction='[
                                        { "action": "addClass", "class": "nojs-show", "source": ".known-program" },
                                        { "action": "removeClass", "class": "nojs-show", "source": ".family-known" }
                                    ]'
                                  data-gc-analytics-customclick="IRCC:AccountWizard_Q3:KnownProgram_Sponsor"
                                >
                                  Sponsoring family (including adoption through
                                  the immigration process)
                                </a>{" "}
                              </li>
                              <li className="panel panel-default panel-body position-relative">
                                {" "}
                                <a
                                  href="#working-known"
                                  className="text-left stretched-link btn-link no-undrln full-width p-0 "
                                  data-wb-doaction='[
                                        { "action": "addClass", "class": "nojs-show", "source": ".known-program" },
                                        { "action": "removeClass", "class": "nojs-show", "source": ".working-known" }
                                    ]'
                                  data-gc-analytics-customclick="IRCC:AccountWizard_Q3:KnownProgram_WorkTemp"
                                >
                                  Working in Canada temporarily (work permits)
                                </a>{" "}
                              </li>
                              <li className="panel panel-default panel-body position-relative">
                                {" "}
                                <a
                                  href="#study-known"
                                  className="text-left stretched-link btn-link no-undrln full-width p-0 "
                                  data-wb-doaction='[
                                        { "action": "addClass", "class": "nojs-show", "source": ".known-program" },
                                        { "action": "removeClass", "class": "nojs-show", "source": ".study-known" }
                                    ]'
                                  data-gc-analytics-customclick="IRCC:AccountWizard_Q3:KnownProgram_Study"
                                >
                                  Studying in Canada
                                </a>{" "}
                              </li>

                              <li className="panel panel-default panel-body position-relative">
                                {" "}
                                <a
                                  
                                  href="/immigration-refugees-citizenship/services/canadian-passports/renew-adult-passport/submit-form-fees"
                                  className="stretched-link btn-link no-undrln full-width"
                                  data-gc-analytics-customclick="IRCC:AccountWizard_Q3:KnownProgram_RenewPassport"
                                >
                                  <div className="row d-flex align-items-center text-left">
                                    <div className="col-xs-11">
                                      Renewing a Canadian passport
                                    </div>
                                    <div className="col-xs-1">
                                      
                                      <span className="fas fa-share pull-right"></span>
                                    </div>
                                  </div>
                                </a>{" "}
                              </li>

                              <li className="panel panel-default panel-body position-relative">
                                {" "}
                                <a
                                  href="#citizenship-known"
                                  className="text-left stretched-link btn-link no-undrln full-width p-0 "
                                  data-wb-doaction='[
                                        { "action": "addClass", "class": "nojs-show", "source": ".known-program" },
                                        { "action": "removeClass", "class": "nojs-show", "source": ".citizenship-known" }
                                    ]'
                                  data-gc-analytics-customclick="IRCC:AccountWizard_Q3:KnownProgram_Citizenship"
                                >
                                  Canadian citizenship
                                </a>{" "}
                              </li>
                              <li className="panel panel-default panel-body position-relative">
                                {" "}
                                <a
                                  href="#refugees-known"
                                  className="text-left stretched-link btn-link no-undrln full-width p-0 "
                                  data-wb-doaction='[
                                        { "action": "addClass", "class": "nojs-show", "source": ".known-program" },
                                        { "action": "removeClass", "class": "nojs-show", "source": ".refugees-known" }
                                    ]'
                                  data-gc-analytics-customclick="IRCC:AccountWizard_Q3:KnownProgram_RefugeesAsylum"
                                >
                                  Refugees and asylum
                                </a>{" "}
                              </li>
                              <li className="panel panel-default panel-body position-relative">
                                {" "}
                                <a
                                  href="#pr-known"
                                  className="text-left stretched-link btn-link no-undrln full-width p-0 "
                                  data-wb-doaction='[
                                        { "action": "addClass", "class": "nojs-show", "source": ".known-program" },
                                        { "action": "removeClass", "class": "nojs-show", "source": ".pr-known" }
                                    ]'
                                  data-gc-analytics-customclick="IRCC:AccountWizard_Q3:KnownProgram_PR"
                                >
                                  Permanent resident cards and travel documents
                                  (if you’re already a permanent resident)
                                </a>{" "}
                              </li>
                            </ul>
                            <div className="position-relative mrgn-bttm-sm">
                              {" "}
                              <a
                                href="#account-chooser"
                                className="text-left btn-link no-undrln d-flex align-items-center nojs-hide"
                                data-gc-analytics-customclick="IRCC:AccountWizard_Back"
                                data-wb-doaction='[
                            { "action": "addClass", "class": "nojs-show", "source": ".known-program" },
                            { "action": "removeClass", "class": "nojs-show", "source": ".find-program" }
                        ]'
                              >
                                <span className="fas fa-chevron-left pull-left mrgn-rght-md"></span>
                                Back
                              </a>{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="visit-known"
                      className="selection-options visit-known nojs-show mrgn-lft-md mrgn-rght-md"
                    >
                      <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                          <h2 className="mrgn-tp-md nojs-show">
                            Create an account: Visiting Canada
                          </h2>
                          <div className="position-relative mrgn-bttm-sm">
                            {" "}
                            <a
                              href="#account-chooser"
                              className="text-left btn-link no-undrln d-flex align-items-center nojs-hide"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Back:KnowProgram_Visiting"
                              data-wb-doaction='[
                        { "action": "run", "trggroup": "back" },
                        { "action": "removeClass", "class": "nojs-show", "source": ".known-program" }
                    ]'
                            >
                              <span className="fas fa-chevron-left pull-left mrgn-rght-md"></span>
                              Back
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/visit-canada/apply-visitor-visa"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Visit_VisitorVisa"
                              
                              className="stretched-link btn-link no-undrln full-width"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">Visitor visa</div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/visit-canada/eta/apply"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Visit_eTA"
                              
                              className="stretched-link btn-link no-undrln full-width"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Electronic travel authorization (eTA)
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/visit-canada/extend-stay/apply"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Visit_VisitorRecord"
                              
                              className="stretched-link btn-link no-undrln full-width"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Visitor record (to extend your stay in Canada)
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/visit-canada/parent-grandparent-super-visa/apply"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Visit_SuperVisa"
                              
                              className="stretched-link btn-link no-undrln full-width"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Super visa (for parents and grandparents)
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/visit-canada/transit/transit-visa/apply"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Visit_Transit"
                              
                              className="stretched-link btn-link no-undrln full-width"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">Transit visa</div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="immigrate-known"
                      className="selection-options immigrate-known nojs-show mrgn-lft-md mrgn-rght-md"
                    >
                      <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                          <h2 className="mrgn-tp-md nojs-show">
                            Create an account: Immigrating to Canada
                          </h2>
                          <div className="position-relative mrgn-bttm-sm">
                            {" "}
                            <a
                              href="#account-chooser"
                              className="text-left btn-link no-undrln d-flex align-items-center nojs-hide"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Back:KnowProgram_Immigrating"
                              data-wb-doaction='[
                        { "action": "run", "trggroup": "back" },
                        { "action": "removeClass", "class": "nojs-show", "source": ".known-program" }
                    ]'
                            >
                              <span className="fas fa-chevron-left pull-left mrgn-rght-md"></span>
                              Back
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/immigrate-canada/atlantic-immigration/how-to-immigrate/permanent-residence"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Immigrate_AIP"
                              
                              className="stretched-link btn-link no-undrln full-width"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Atlantic Immigration Program
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          {/*    <div className="panel panel-default panel-body position-relative"> <a href="/content/canadasite/en/immigration-refugees-citizenship/services/refugees/economic-mobility-pathways-pilot/immigrate/apply" data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Immigrate_EMPP"  className="stretched-link btn-link no-undrln full-width">
                  <div className="row d-flex align-items-center text-left">
                    <div className="col-xs-11">Economic Mobility Pathways Pilot</div>
                    <div className="col-xs-1"><span className="fas fa-share pull-right"></span></div>
                  </div>
                  </a> </div>  */}
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/immigrate-canada/express-entry/submit-profile"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Immigrate_EE"
                              
                              className="stretched-link btn-link no-undrln full-width"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">Express Entry</div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>

                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/immigrate-canada/rural-franco-pilots/franco-immigration/permanent-residence"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Immigrate_FCIP"
                              
                              className="stretched-link btn-link no-undrln full-width"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Francophone Community Immigration Pilots
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          {/*      <div className="panel panel-default panel-body position-relative"> <a href="/content/canadasite/en/immigration-refugees-citizenship/services/immigrate-canada/ukraine-measures/pr-family-reunification/apply"  className="stretched-link btn-link no-undrln full-width" data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Immigrate_FamilyPRUkraine">
                  <div className="row d-flex align-items-center text-left">
                    <div className="col-xs-11">Family-based permanent residence program for Ukrainian nationals</div>
                    <div className="col-xs-1"><span className="fas fa-share pull-right"></span></div>
                  </div>
                  </a> </div>  */}
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/immigrate-canada/caregivers/home-care-worker-immigration-pilots/child-care-home-support/apply"
                              
                              className="stretched-link btn-link no-undrln full-width"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Immigrate_FamilyHCWPilot"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Home Care Worker Immigration pilots
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/immigrate-canada/hong-kong-residents-permanent-residence/apply"
                              
                              className="stretched-link btn-link no-undrln full-width"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Immigrate_PRHK"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Permanent residence pathways for Hong Kong
                                  residents
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/immigrate-canada/provincial-nominees/express-entry/get-confirm-nomination"
                              
                              className="stretched-link btn-link no-undrln full-width"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Immigrate_PNP_EE"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Provincial Nominee Program (through Express
                                  Entry)
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/immigrate-canada/provincial-nominees/non-express-entry/eligibility"
                              
                              className="stretched-link btn-link no-undrln full-width"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Immigrate_PNP"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Provincial Nominee Program (non-Express Entry
                                  route)
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/application/application-forms-guides/application-permanent-residence-quebec-selected-business-class-applicants-investors-entrepreneurs"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Immigrate_QuebecEntrepreneur"
                              
                              className="stretched-link btn-link no-undrln full-width"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Quebec entrepreneurs or investors
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/immigrate-canada/self-employed/apply"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Immigrate_QuebecSelfEmployed"
                              
                              className="stretched-link btn-link no-undrln full-width"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Quebec self-employed persons
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/immigrate-canada/quebec-skilled-workers/apply"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Immigrate_QSW"
                              
                              className="stretched-link btn-link no-undrln full-width"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Quebec-selected skilled workers
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>

                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/immigrate-canada/rural-franco-pilots/rural-immigration/permanent-residence"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Immigrate_RCIP"
                              
                              className="stretched-link btn-link no-undrln full-width"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Rural Community Immigration Pilots
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>

                          {/*  <div className="panel panel-default panel-body position-relative"> <a href="/content/canadasite/en/immigration-refugees-citizenship/services/application/application-forms-guides/application-rural-northern-immigration"  className="stretched-link btn-link no-undrln full-width" data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Immigrate_RNIP">
                  <div className="row d-flex align-items-center text-left">
                    <div className="col-xs-11">Rural and Northern Immigration Pilot</div>
                    <div className="col-xs-1"><span className="fas fa-share pull-right"></span></div>
                  </div>
                  </a> </div>
                <div className="panel panel-default panel-body position-relative"> <a href="/content/canadasite/en/immigration-refugees-citizenship/services/immigrate-canada/self-employed/apply" data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Immigrate_SelfEmployed"  className="stretched-link btn-link no-undrln full-width">
                  <div className="row d-flex align-items-center text-left">
                    <div className="col-xs-11">Self-employed persons</div>
                    <div className="col-xs-1"><span className="fas fa-share pull-right"></span></div>
                  </div>
                  </a> </div> */}
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/immigrate-canada/start-visa/apply"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Immigrate_StartUp"
                              
                              className="stretched-link btn-link no-undrln full-width"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">Start-up visa</div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          <div className="position-relative mrgn-bttm-sm">
                            {" "}
                            <a
                              href="#account-chooser"
                              className="text-left btn-link no-undrln d-flex align-items-center nojs-hide"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Back:Other_Visiting"
                              data-wb-doaction='[
                        { "action": "run", "trggroup": "back" },
                        { "action": "removeClass", "class": "nojs-show", "source": ".known-program" }
                    ]'
                            >
                              <span className="fas fa-chevron-left pull-left mrgn-rght-md"></span>
                              Back
                            </a>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="family-known"
                      className="selection-options family-known nojs-show mrgn-lft-md mrgn-rght-md"
                    >
                      <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                          <h2 className="mrgn-tp-md nojs-show">
                            Create an account: Sponsoring family{" "}
                          </h2>
                          <div className="position-relative mrgn-bttm-sm">
                            {" "}
                            <a
                              href="#account-chooser"
                              className="text-left btn-link no-undrln d-flex align-items-center nojs-hide"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Back:KnowProgram_Sponsoring"
                              data-wb-doaction='[
                        { "action": "run", "trggroup": "back" },
                        { "action": "removeClass", "class": "nojs-show", "source": ".known-program" }
                    ]'
                            >
                              <span className="fas fa-chevron-left pull-left mrgn-rght-md"></span>
                              Back
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/immigrate-canada/family-sponsorship/spouse-partner-children/apply"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Sponsor_Spouse"
                              
                              className="stretched-link btn-link no-undrln full-width"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Sponsor your spouse, partner or children
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/immigrate-canada/family-sponsorship/sponsor-parents-grandparents/tell-us-you-want-sponsor-parent-grandparent"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Sponsor_PGP"
                              
                              className="stretched-link btn-link no-undrln full-width"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Sponsor your parents and grandparents
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/canadians/adopt-child-abroad/processes/choose-process/immigration/apply"
                              
                              className="stretched-link btn-link no-undrln full-width"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Sponsor_AdoptedChild"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Sponsor your adopted child
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/immigrate-canada/family-sponsorship/other-relatives/apply"
                              
                              className="stretched-link btn-link no-undrln full-width"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Sponsor_Relatives"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Sponsor your relatives
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="working-known"
                      className="selection-options working-known nojs-show mrgn-lft-md mrgn-rght-md"
                    >
                      <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                          <h2 className="mrgn-tp-md nojs-show">
                            Create an account: Working in Canada temporarily
                          </h2>
                          <div className="position-relative mrgn-bttm-sm">
                            {" "}
                            <a
                              href="#account-chooser"
                              className="text-left btn-link no-undrln d-flex align-items-center nojs-hide"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Back:KnowProgram_Working"
                              data-wb-doaction='[
                        { "action": "run", "trggroup": "back" },
                        { "action": "removeClass", "class": "nojs-show", "source": ".known-program" }
                    ]'
                            >
                              <span className="fas fa-chevron-left pull-left mrgn-rght-md"></span>
                              Back
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/work-canada/work-permit/apply"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Work_WorkPermit"
                              
                              className="stretched-link btn-link no-undrln full-width"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">Work permit</div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/work-canada/extend/apply"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Work_ExtendChangePermit"
                              
                              className="stretched-link btn-link no-undrln full-width"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Extend or change your work permit
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/work-canada/iec/become-candidate"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Work_IEC"
                              
                              className="stretched-link btn-link no-undrln full-width"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  International Experience Canada
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/study-canada/work/after-graduation/apply"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Work_PostGrad"
                              
                              className="stretched-link btn-link no-undrln full-width"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Post-graduation work permit
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/work-canada/special-instructions/francophone-mobility"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Work_FrancoMobility"
                              
                              className="stretched-link btn-link no-undrln full-width"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Francophone Mobility work permit
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/work-canada/special-instructions/spouses-dependent-children/apply"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Work_OpenWorkPermit"
                              
                              className="stretched-link btn-link no-undrln full-width"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Open work permit for family members of work
                                  permit holders
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/work-canada/special-instructions/hong-kong-graduates"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Work_OpenWorkPermitHK"
                              
                              className="stretched-link btn-link no-undrln full-width"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Open work permit for Hong Kong recent
                                  graduates
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/immigrate-canada/ukraine-measures/ukraine-open-work-permit"
                              
                              className="stretched-link btn-link no-undrln full-width"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Work_OpenWorkPermitUkraine"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Open work permit for Ukrainian nationals
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/work-canada/special-instructions/vulnerable-workers"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Work_OpenWorkPermitVulnerableFW"
                              
                              className="stretched-link btn-link no-undrln full-width"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Open work permit for vulnerable foreign
                                  workers
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/work-canada/special-instructions/camp-counsellor"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Work_Overnightcamp"
                              
                              className="stretched-link btn-link no-undrln full-width"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Overnight camp counsellor work permit
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          <div className="position-relative mrgn-bttm-sm">
                            {" "}
                            <a
                              href="#account-chooser"
                              className="text-left btn-link no-undrln d-flex align-items-center nojs-hide"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Back:Other_Visiting"
                              data-wb-doaction='[
                        { "action": "run", "trggroup": "back" },
                        { "action": "removeClass", "class": "nojs-show", "source": ".known-program" }
                    ]'
                            >
                              <span className="fas fa-chevron-left pull-left mrgn-rght-md"></span>
                              Back
                            </a>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="study-known"
                      className="selection-options study-known nojs-show mrgn-lft-md mrgn-rght-md"
                    >
                      <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                          <h2 className="mrgn-tp-md nojs-show">
                            Create an account: Studying in Canada
                          </h2>
                          <div className="position-relative mrgn-bttm-sm">
                            {" "}
                            <a
                              href="#account-chooser"
                              className="text-left btn-link no-undrln d-flex align-items-center nojs-hide"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Back:KnowProgram_Study"
                              data-wb-doaction='[
                        { "action": "run", "trggroup": "back" },
                        { "action": "removeClass", "class": "nojs-show", "source": ".known-program" }
                    ]'
                            >
                              <span className="fas fa-chevron-left pull-left mrgn-rght-md"></span>
                              Back
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/study-canada/study-permit/apply"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Study_permit"
                              
                              className="stretched-link btn-link no-undrln full-width"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">Study permit</div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/study-canada/extend-study-permit/how-to-apply"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Study_ExtendPermit"
                              
                              className="stretched-link btn-link no-undrln full-width"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Extend your study permit
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/study-canada/change-schools"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Study_ChangeScool"
                              
                              className="stretched-link btn-link no-undrln full-width"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Change your school or program
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/study-canada/study-permit/fmc-student-pilot/apply"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:FMCSP"
                              
                              className="stretched-link btn-link no-undrln full-width"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Francophone Minority Communities Student Pilot
                                  (FMCSP)
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="citizenship-known"
                      className="selection-options citizenship-known nojs-show mrgn-lft-md mrgn-rght-md"
                    >
                      <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                          <h2 className="mrgn-tp-md nojs-show">
                            Create an account: Canadian citizenship
                          </h2>
                          <div className="position-relative mrgn-bttm-sm">
                            {" "}
                            <a
                              href="#account-chooser"
                              className="text-left btn-link no-undrln d-flex align-items-center nojs-hide"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Back:KnowProgram_Citizenship"
                              data-wb-doaction='[
                        { "action": "run", "trggroup": "back" },
                        { "action": "removeClass", "class": "nojs-show", "source": ".known-program" }
                    ]'
                            >
                              <span className="fas fa-chevron-left pull-left mrgn-rght-md"></span>
                              Back
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/canadian-citizenship/become-canadian-citizen/apply"
                              
                              className="stretched-link btn-link no-undrln full-width"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Citizenship"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Canadian citizenship
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/canadian-citizenship/proof-citizenship/apply"
                              
                              className="stretched-link btn-link no-undrln full-width"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Citizenship_Proof"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Proof of citizenship (citizenship certificate)
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/canadian-citizenship/proof-citizenship/search-records/how-to-apply"
                              
                              className="stretched-link btn-link no-undrln full-width"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Citizenship_Records"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Search citizenship records
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="refugees-known"
                      className="selection-options refugees-known nojs-show mrgn-lft-md mrgn-rght-md"
                    >
                      <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                          <h2 className="mrgn-tp-md nojs-show">
                            Create an account: Refugees and asylum
                          </h2>
                          <div className="position-relative mrgn-bttm-sm">
                            {" "}
                            <a
                              href="#account-chooser"
                              className="text-left btn-link no-undrln d-flex align-items-center nojs-hide"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Back:KnowProgram_Refugees"
                              data-wb-doaction='[
                        { "action": "run", "trggroup": "back" },
                        { "action": "removeClass", "class": "nojs-show", "source": ".known-program" }
                    ]'
                            >
                              <span className="fas fa-chevron-left pull-left mrgn-rght-md"></span>
                              Back
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/refugees/protection"
                              
                              className="stretched-link btn-link no-undrln full-width"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Refugee_Asylum"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Claim refugee protection (asylum) from inside
                                  Canada
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          {/*   <div className="panel panel-default panel-body position-relative"> <a href="/content/canadasite/en/immigration-refugees-citizenship/services/refugees/economic-mobility-pathways-pilot/immigrate/apply"  className="stretched-link btn-link no-undrln full-width" data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Refugee_EMPP">
                  <div className="row d-flex align-items-center text-left">
                    <div className="col-xs-11">Economic Mobility Pathways Pilot</div>
                    <div className="col-xs-1"><span className="fas fa-share pull-right"></span></div>
                  </div>
                  </a> </div>  */}
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/refugees/sponsor-refugee/private-sponsorship-program/agreement-holders/sponsor"
                              
                              className="stretched-link btn-link no-undrln full-width"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Refugee_SAH"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Sponsor a refugee as a sponsorship agreement
                                  holder (SAH)
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/refugees/sponsor-refugee/private-sponsorship-program/groups-five/apply"
                              
                              className="stretched-link btn-link no-undrln full-width"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Refugee_G5"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Sponsor a refugee as a group of five (G5)
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              href="/immigration-refugees-citizenship/services/refugees/sponsor-refugee/private-sponsorship-program/community-sponsors/apply"
                              
                              className="stretched-link btn-link no-undrln full-width"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Refugee_CommunitySponsor"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Sponsor a refugee as a community sponsor
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="pr-known"
                      className="selection-options pr-known nojs-show mrgn-lft-md mrgn-rght-md"
                    >
                      <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                          <h2 className="mrgn-tp-md nojs-show">
                            Create an account: Permanent resident cards and
                            travel documents
                          </h2>
                          <div className="position-relative mrgn-bttm-sm">
                            {" "}
                            <a
                              href="#account-chooser"
                              className="text-left btn-link no-undrln d-flex align-items-center nojs-hide"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Back:KnowProgram_PR"
                              data-wb-doaction='[
                        { "action": "run", "trggroup": "back" },
                        { "action": "removeClass", "class": "nojs-show", "source": ".known-program" }
                    ]'
                            >
                              <span className="fas fa-chevron-left pull-left mrgn-rght-md"></span>
                              Back
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              
                              href="/immigration-refugees-citizenship/services/permanent-residents/card/apply"
                              className="stretched-link btn-link no-undrln full-width"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Refugee_PRCard"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Permanent resident card
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                          <div className="panel panel-default panel-body position-relative">
                            {" "}
                            <a
                              
                              href="/immigration-refugees-citizenship/services/permanent-residents/travel-document/apply"
                              className="stretched-link btn-link no-undrln full-width"
                              data-gc-analytics-customclick="IRCC:AccountWizard_Q4:KnownProgram:Refugee_PRTD"
                            >
                              <div className="row d-flex align-items-center text-left">
                                <div className="col-xs-11">
                                  Permanent resident travel document
                                </div>
                                <div className="col-xs-1">
                                  
                                  <span className="fas fa-share pull-right"></span>
                                </div>
                              </div>
                            </a>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mwsgeneric-base-html parbase section">
          <div className="container">
            <h2 className="h3">
              Are you an authorized representative or IRCC partner?
            </h2>
            <p>
              <a
                
                href="/immigration-refugees-citizenship/corporate/partners-service-providers"
              >
                View accounts for authorized representatives and partners
                <span className="fas fa-share mrgn-lft-sm">
                  
                </span>
              </a>
            </p>

            <section
              id="hints-2"
              className="mfp-hide modal-dialog modal-content overlay-def"
            >
              <header className="modal-header">
                <h2 className="modal-title">
                  Not sure which account you used?{" "}
                  <span className="wb-inv">
                    IRCC secure account, IRCC portal or IRCC portal – New
                    version
                  </span>
                </h2>
              </header>
              <div className="modal-body">
                <p>
                  If you used a{" "}
                  <strong>
                    GCKey username and password or Sign-in Partner
                  </strong>{" "}
                  to sign in, you used the IRCC secure account (GCKey or Sign-In
                  Partner).
                </p>
                <p>
                  If you used an <strong>email address</strong> to sign in, you
                  used either the IRCC portal or the IRCC portal&nbsp;– New
                  version.
                </p>
                <p>
                  If you’re <strong>still not sure</strong> which account you
                  used, try signing in to each or check your email.
                </p>
              </div>
            </section>

            <section
              id="hints-3"
              className="mfp-hide modal-dialog modal-content overlay-def"
            >
              <header className="modal-header">
                <h2 className="modal-title">
                  Not sure which account you used?{" "}
                  <span className="wb-inv">
                    IRCC secure account, IRCC portal or IRCC portal&nbsp;– New
                    version
                  </span>
                </h2>
              </header>
              <div className="modal-body">
                <p>
                  You used the{" "}
                  <strong>
                    IRCC secure account (GCKey or Sign-In Partner)
                  </strong>{" "}
                  if you:
                </p>
                <ul>
                  <li>
                    signed in with a GCKey username and password{" "}
                    <strong>or</strong>
                  </li>
                  <li>signed in with Sign-In Partner</li>
                </ul>
                <p>
                  You used the <strong>IRCC portal</strong> if you:
                </p>
                <ul>
                  <li>
                    signed in with an email address <strong>and</strong>
                  </li>
                  <li>applied for a visitor visa or a study permit</li>
                </ul>
                <p>
                  You used the <strong>Permanent residence portal</strong> if
                  you:
                </p>
                <ul>
                  <li>
                    signed in with an email address <strong>and</strong>
                  </li>
                  <li>
                    applied for permanent residence, a permanent resident (PR)
                    card or a permanent resident travel document (PRTD)
                  </li>
                </ul>
                <p>
                  If you’re <strong>still not sure</strong> which account you
                  used, try signing in to each or check your email.
                </p>
              </div>
            </section>
          </div>
        </div>
        <div className="mwsgeneric-base-html parbase section">
          {/*  Top-Right Query Suggestions  */}
          <div
            data-gc-search='{
     "organizationId": "employmentandsocialdevelopmentcanadaproduction3vn562uw",
     "endpoint": "https://apps.canada.ca/search",
     "accessToken": "xx27395007-5c98-43c0-bef0-553131a34e90"
}'
          ></div>
        </div>
        <div className="mwsmediaplayer section"></div>

        <section className="pagedetails container">
          <h2 className="wb-inv">Page details</h2>

          <div className="row">
            <div className="col-sm-8 col-md-9 col-lg-9">
              <div
                className="wb-disable-allow wb-init wb-data-ajax-replace-inited"
                data-ajax-replace="/etc/designs/canada/wet-boew/assets/feedback/page-feedback-en.html"
                id="wb-auto-13"
              >
                <div
                  id="gc-pft"
                  className="row wb-disable-allow wb-init wb-jsonmanager-inited"
                  data-wb-jsonmanager='{
	"name": "gc-pft",
	"extractor": [
		{ "selector": "title", "path": "pageData/pageTitle" },
		{ "selector": "html", "attr": "lang", "path": "pageData/language" },
		{ "interface": "locationHref", "path": "pageData/submissionPage" },
		{ "selector": "#wb-lng ul li:first-child a[lang]", "attr": "href", "path": "pageData/oppositelang" },
		{ "selector": "[data-feedback-theme]", "attr": "data-feedback-theme", "path": "pageData/themeopt" },
		{ "selector": "[data-feedback-section]", "attr": "data-feedback-section", "path": "pageData/sectionopt" },
		{ "selector": "meta[name=\"dcterms.creator\"]", "attr": "content", "path": "pageData/institutionopt" },
		{ "selector": "[data-feedback-link]", "attr": "data-feedback-link", "path": "contact/link" },
		{ "selector": "[data-feedback-url]", "attr": "data-feedback-url", "path": "contact/url" }
	]
}'
                >
                  <div className="col-sm-10 col-md-9 col-lg-8">
                    <section className="well mrgn-bttm-0">
                      <h3 className="wb-inv">Give feedback about this page</h3>
                      <form
                        action="https://feedback-retroaction.canada.ca/api/QueueProblemForm"
                        method="post"
                        className="wb-postback wb-disable-allow wb-pii-scrub wb-init wb-postback-inited wb-pii-scrub-inited"
                        data-wb-postback='{"success":".gc-pft-thnk"}'
                        data-wb-pii-scrub='{"modalTemplate": "[data-pft-scrub-modal]", "scrubChar": "########"}'
                        id="wb-auto-16"
                        data-wb-pii-blocked="true"
                      >
                        <template
                          data-pft-scrub-modal=""
                          className="wb-init wb-template-inited"
                          id="wb-auto-17"
                        >
                          <header className="modal-header">
                            <h2 className="modal-title">
                              Personal information detected in your comment
                            </h2>
                          </header>
                          <div className="modal-body">
                            <p>
                              Comments are only used to improve our website. You
                              will not receive a response.
                            </p>
                            <p>
                              <strong>
                                To protect your privacy, remove personal
                                information before submitting your comment:
                              </strong>
                            </p>
                            <div data-scrub-modal-fields=""></div>
                            <details className="mrgn-tp-md">
                              <summary>
                                What is considered personal information?
                              </summary>
                              <p>
                                Certain types of information{" "}
                                <strong>can’t</strong> be included in this
                                comment form, such as your:
                              </p>
                              <ul>
                                <li>email address</li>
                                <li>telephone number</li>
                                <li>postal code</li>
                                <li>passport number</li>
                                <li>business number</li>
                                <li>social insurance number (SIN)</li>
                                <li>street address</li>
                              </ul>
                            </details>
                          </div>
                          <div className="modal-footer">
                            <div className="row">
                              <div className="col-xs-12 col-sm-6 mrgn-tp-sm">
                                <button
                                  type="button"
                                  className="btn btn-primary btn-block popup-modal-dismiss"
                                >
                                  Go back and edit comment
                                </button>
                              </div>
                            </div>
                          </div>
                        </template>
                        <div
                          className="wb-disable-allow wb-init wb-data-json-inited"
                          data-wb-json='{
					"url": "#[gc-pft]/pageData",
					"mapping": [
						{ "selector": "input", "attr": "name", "value": "/@id" },
						{ "selector": "input", "attr": "value", "value": "/@value" }
					]
				}'
                          id="wb-auto-18"
                        >
                          <template
                            className="wb-init wb-template-inited"
                            id="wb-auto-19"
                          >
                            <input type="hidden" name="" value="" />
                          </template>

                          <input
                            type="hidden"
                            name="pageTitle"
                            value="Sign in to your IRCC account - Canada.ca"
                          />

                          <input type="hidden" name="language" value="en" />

                          <input
                            type="hidden"
                            name="submissionPage"
                            value="https://www.canada.ca/en/immigration-refugees-citizenship/services/application/ircc-accounts.html"
                          />

                          <input
                            type="hidden"
                            name="oppositelang"
                            value="/fr/immigration-refugies-citoyennete/services/demande/comptes-ircc.html"
                          />

                          <input type="hidden" name="themeopt" value="" />

                          <input type="hidden" name="sectionopt" value="" />

                          <input
                            type="hidden"
                            name="institutionopt"
                            value="Immigration, Refugees and Citizenship Canada"
                          />
                        </div>
                        <fieldset className="gc-pft-btns chkbxrdio-grp row row-no-gutters d-sm-flex flex-sm-wrap align-items-sm-center">
                          <legend className="col-xs-12 col-sm-7 nojs-col-sm-12 col-md-9 col-lg-8 text-center text-sm-left nojs-text-left mrgn-tp-sm pr-sm-3">
                            <span className="field-name">
                              Did you find what you were looking for?
                            </span>
                          </legend>
                          <div className="col-xs-12 nojs-show">
                            <button
                              name="helpful"
                              value="Yes-Oui"
                              className="btn btn-primary"
                              aria-describedby="gc-pft-why"
                            >
                              Yes
                            </button>
                          </div>
                          <div className="col-xs-12 col-sm-5 col-md-3 col-lg-4 text-center text-sm-right nojs-hide">
                            <button
                              name="helpful"
                              value="Yes-Oui"
                              className="btn btn-primary"
                            >
                              Yes
                            </button>
                            <button
                              className="btn btn-primary mrgn-lft-sm"
                              data-wb-doaction='[
							{"action":"removeClass","source":".gc-pft-no","class":"nojs-show"},
							{"action":"addClass","source":".gc-pft-btns","class":"hide"}
						]'
                            >
                              No
                            </button>
                          </div>
                        </fieldset>
                        <div className="gc-pft-no nojs-show">
                          <p
                            id="gc-pft-why"
                            className="nojs-show mrgn-tp-lg mrgn-bttm-md"
                          >
                            If not, tell us why below:
                          </p>
                          <p className="nojs-hide wb-inv" role="status">
                            Tell us why below:
                          </p>
                          <div
                            className="wb-disable-allow wb-init wb-data-json-inited"
                            data-wb-json='{
						"url": "#[gc-pft]/contact",
						"streamline": "true",
						"mapping": [
							{
								"template": "[data-contact-template]",
								"test": "fn:isLiteral",
								"assess": "/url",
								"mapping": [
									{ "selector": "a", "type": "attr", "attr": "href", "value": "/url"  },
									{ "selector": "a", "value": "/link"  }
								]
							}
						]
					}'
                            id="wb-auto-20"
                          >
                            <template
                              data-contact-template=""
                              className="wb-init wb-template-inited"
                              id="wb-auto-21"
                            >
                              <details>
                                <summary>
                                  Need urgent help with a problem? Contact us
                                </summary>
                                <p className="mrgn-bttm-0 mrgn-tp-md fnt-nrml">
                                  <a href="#"></a>
                                </p>
                              </details>
                            </template>
                          </div>
                          <div className="form-group">
                            <label
                              id="gc-pft-prblm-label"
                              htmlFor="gc-pft-prblm"
                              className="mrgn-bttm-0"
                            >
                              <span className="field-name">
                                Please provide more details
                              </span>
                            </label>
                            <p id="gc-pft-prblm-note" className="mrgn-bttm-sm">
                              <small>
                                You will not receive a reply. Don't include
                                personal information (telephone, email, SIN,
                                financial, medical, or work details).
                              </small>
                            </p>
                            <p
                              id="gc-pft-prblm-instruction"
                              className="fnt-nrml small"
                            >
                              Maximum 300 characters
                            </p>
                            <textarea
                              id="gc-pft-prblm"
                              aria-describedby="gc-pft-prblm-note gc-pft-prblm-instruction"
                              name="details"
                              className="form-control full-width"
                              maxlength="300"
                              data-scrub-field=""
                            ></textarea>
                          </div>
                          <button
                            name="helpful"
                            value="No-Non"
                            className="btn btn-primary"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                      <div className="gc-pft-thnk hide">
                        <p className="mrgn-tp-sm mrgn-bttm-0" role="status">
                          <span
                            className="glyphicon glyphicon-ok text-success mrgn-rght-sm"
                            aria-hidden="true"
                          ></span>{" "}
                          Thank you for your feedback.
                        </p>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <gcds-date-modified className="hydrated">
            2026-08-10
          </gcds-date-modified>
        </section>
      </main>
    </>
  );
};

export default IRCCAccount;
