import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { 
  ArrowRightCircle, 
  ChevronRight, 
  Hourglass, 
  Clock, 
  ArrowRight, 
  FolderOpen, 
  FileSignature, 
  Map, 
  FileInput,
  Check
} from 'lucide-react';

export default function Application() {
  return (
    <main property="mainContentOfPage" resource="#wb-main" typeof="WebPageElement">
      <SEO
        title="Your IRCC application"
        description="Manage your current IRCC application, pay fees, check processing times, update contact details, or withdraw an application."
        keywords="IRCC application, pay fees Canada visa, check status, biometrics Canada, application forms"
      />
      <div className="mwsgeneric-base-html parbase section">
        <div className="mrgn-tp-md mrgn-bttm-md">
          <div className="container mrgn-tp-md mrgn-bttm-md py-2 wb-eqht-grd">
            <div className="row d-flex align-items-center">
              <div className="col-md-9">
                <h1 property="name" id="wb-cont" dir="ltr">Your IRCC application</h1>
                <p className="mrgn-tp-md lead">Manage your current application or get the information you need to apply. </p>
              </div>
              <div className="col-md-3 hidden-xs">
                {/* Normally we would use an img tag here, but let's use a placeholder if the original is broken or just link it */}
                <img src="https://www.canada.ca/content/dam/ircc/images/topic-pages/ircc-application-banner.png" className="full-width" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mwsgeneric-base-html parbase section">
        <div className="bg-color brdr-0 brdr-rds-0 banded-topic">
          <div className="container py-4">
            <h2 className="mrgn-tp-0">Manage your application</h2>
            
            <div className="row d-sm-flex">
              <div className="col-md-4 col-sm-4 mrgn-tp-md">
                <div className="pill d-flex align-items-center h-100">
                  <ArrowRightCircle size={24} className="mrgn-rght-md" aria-hidden="true" />
                  <Link to="/immigration-refugees-citizenship/services/application/ircc-accounts" className="stretched-link full-width small list-group-item-text">
                    <strong>Sign in to your account</strong>
                  </Link>
                  <ChevronRight size={16} className="mrgn-lft-md text-right" aria-hidden="true" />
                </div>
              </div>
              <div className="col-md-4 col-sm-4 mrgn-tp-md">
                <div className="pill d-flex align-items-center h-100">
                  <Hourglass size={24} className="mrgn-rght-md" aria-hidden="true" />
                  <Link to="/immigration-refugees-citizenship/services/application/check-status" className="stretched-link full-width small list-group-item-text">
                    <strong>Check your application status</strong>
                  </Link>
                  <ChevronRight size={16} className="mrgn-lft-md text-right" aria-hidden="true" />
                </div>
              </div>
              <div className="col-md-4 col-sm-4 mrgn-tp-md">
                <div className="pill d-flex align-items-center h-100">
                  <Clock size={24} className="mrgn-rght-md" aria-hidden="true" />
                  <Link to="/immigration-refugees-citizenship/services/application/check-processing-times" className="stretched-link full-width small list-group-item-text">
                    <strong>Check application processing times</strong>
                  </Link>
                  <ChevronRight size={16} className="mrgn-lft-md text-right" aria-hidden="true" />
                </div>
              </div>
            </div>

            <div className="row d-sm-flex">
              <div className="col-md-4 col-sm-4 mrgn-tp-md">
                <div className="pill-block d-flex align-items-center h-100">
                  <a href="https://ircc.canada.ca/english/information/fees/how-to-pay.asp" className="stretched-link full-width small list-group-item-text">
                    <strong>Pay fees</strong>
                  </a>
                  <ChevronRight size={16} className="mrgn-lft-md text-right" aria-hidden="true" />
                </div>
              </div>
              <div className="col-md-4 col-sm-4 mrgn-tp-md">
                <div className="pill-block d-flex align-items-center h-100">
                  <Link to="/immigration-refugees-citizenship/services/application/update-contact-information" className="stretched-link full-width small list-group-item-text">
                    <strong>Update your contact information</strong>
                  </Link>
                  <ChevronRight size={16} className="mrgn-lft-md text-right" aria-hidden="true" />
                </div>
              </div>
              <div className="col-md-4 col-sm-4 mrgn-tp-md">
                <div className="pill-block d-flex align-items-center h-100">
                  <Link to="/immigration-refugees-citizenship/services/application/withdraw-cancel" className="stretched-link full-width small list-group-item-text">
                    <strong>Withdraw (cancel) an application</strong>
                  </Link>
                  <ChevronRight size={16} className="mrgn-lft-md text-right" aria-hidden="true" />
                </div>
              </div>
            </div>
            
            <h3>Not sure where to start?</h3>
            <div className="d-flex align-items-center">
              <p className="mrgn-bttm-0"><a href="https://ircc.canada.ca/explore-programs/index.asp?reset">Explore immigration programs</a></p>
              <ArrowRight size={16} className="mrgn-lft-md" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      <div className="mwsgeneric-base-html parbase section">
        <div className="banded-topic mrgn-bttm-lg">
          <div className="container">
            <h2>Applying at IRCC</h2>
            <p className="mrgn-bttm-lg">The application process can be hard, from figuring out what you need to waiting for a decision. Get to know the whole process and what you may need to do along the way.</p>

            <div className="panel panel-default p-4 no-box-shadow">
              <div className="d-flex align-items-center">
                <FolderOpen size={32} className="p-0 mrgn-rght-md blue-icon" aria-hidden="true" />
                <h3 className="mrgn-tp-0 mrgn-bttm-0">Get ready to apply</h3>
              </div>
              <div className="d-flex brdr-bttm mrgn-tp-md position-relative">
                <p className="mrgn-tp-0 mrgn-bttm-0 full-width"><Link to="/immigration-refugees-citizenship/services/immigrate-canada/inadmissibility" className="no-undrln stretched-link full-width">Check if you’re allowed to enter Canada</Link></p>
                <ChevronRight size={16} className="align-self-center mrgn-lft-sm" aria-hidden="true" />
              </div>
              <div className="d-flex brdr-bttm mrgn-tp-md position-relative">
                <p className="mrgn-tp-0 mrgn-bttm-0 full-width"><Link to="/immigration-refugees-citizenship/services/application/application-forms-guides" className="no-undrln stretched-link full-width">Forms you may need to apply</Link></p>
                <ChevronRight size={16} className="align-self-center mrgn-lft-sm" aria-hidden="true" />
              </div>
              <div className="d-flex brdr-bttm mrgn-tp-md position-relative">
                <p className="mrgn-tp-0 mrgn-bttm-0 full-width"><Link to="/immigration-refugees-citizenship/services/application/common-supporting-documents" className="no-undrln stretched-link full-width">Documents and proof you may need to apply</Link></p>
                <ChevronRight size={16} className="align-self-center mrgn-lft-sm" aria-hidden="true" />
              </div>
              <div className="d-flex brdr-bttm mrgn-tp-md position-relative">
                <p className="mrgn-tp-0 mrgn-bttm-0 full-width"><Link to="/immigration-refugees-citizenship/services/application/medical-police/medical-exams" className="no-undrln stretched-link full-width">Get a medical exam (you may only need this after you apply)</Link></p>
                <ChevronRight size={16} className="align-self-center mrgn-lft-sm" aria-hidden="true" />
              </div>
              <div className="d-flex brdr-bttm mrgn-tp-md position-relative">
                <p className="mrgn-tp-0 mrgn-bttm-0 full-width"><Link to="/immigration-refugees-citizenship/services/application/medical-police/police-certificates" className="no-undrln stretched-link full-width">Get a police certificate (you may only need this after you apply)</Link></p>
                <ChevronRight size={16} className="align-self-center mrgn-lft-sm" aria-hidden="true" />
              </div>
              <div className="d-flex brdr-bttm mrgn-tp-md position-relative">
                <p className="mrgn-tp-0 mrgn-bttm-0 full-width"><Link to="/immigration-refugees-citizenship/services/protect-fraud" className="no-undrln stretched-link full-width">Protect yourself from fraud and scams</Link></p>
                <ChevronRight size={16} className="align-self-center mrgn-lft-sm" aria-hidden="true" />
              </div>
            </div>

            <div className="panel panel-default p-4 no-box-shadow">
              <div className="d-flex align-items-center">
                <FileSignature size={32} className="p-0 mrgn-rght-md blue-icon" aria-hidden="true" />
                <h3 className="mrgn-tp-0 mrgn-bttm-0">Complete your application</h3>
              </div>
              <div className="d-flex brdr-bttm mrgn-tp-md position-relative">
                <p className="mrgn-tp-0 mrgn-bttm-0 full-width"><Link to="/immigration-refugees-citizenship/services/application/ircc-accounts" className="no-undrln stretched-link full-width">Sign in to your IRCC account</Link></p>
                <ChevronRight size={16} className="align-self-center mrgn-lft-sm" aria-hidden="true" />
              </div>
              <div className="d-flex brdr-bttm mrgn-tp-md position-relative">
                <p className="mrgn-tp-0 mrgn-bttm-0 full-width"><a href="https://ircc.canada.ca/english/information/fees/how-to-pay.asp" className="no-undrln stretched-link full-width">Pay fees</a></p>
                <ChevronRight size={16} className="align-self-center mrgn-lft-sm" aria-hidden="true" />
              </div>
              <div className="d-flex brdr-bttm mrgn-tp-md position-relative">
                <p className="mrgn-tp-0 mrgn-bttm-0 full-width"><Link to="/immigration-refugees-citizenship/services/biometrics" className="no-undrln stretched-link full-width">Get your biometrics (fingerprints and photo)</Link></p>
                <ChevronRight size={16} className="align-self-center mrgn-lft-sm" aria-hidden="true" />
              </div>
              <div className="d-flex brdr-bttm mrgn-tp-md position-relative">
                <p className="mrgn-tp-0 mrgn-bttm-0 full-width"><Link to="/immigration-refugees-citizenship/immigration-citizenship-representative" className="no-undrln stretched-link full-width">Apply with the help of a representative</Link></p>
                <ChevronRight size={16} className="align-self-center mrgn-lft-sm" aria-hidden="true" />
              </div>
            </div>

            <div className="panel panel-default p-4 no-box-shadow">
              <div className="d-flex align-items-center">
                <Map size={32} className="p-0 mrgn-rght-md blue-icon" aria-hidden="true" />
                <h3 className="mrgn-tp-0 mrgn-bttm-0">Track your application</h3>
              </div>
              <div className="d-flex brdr-bttm mrgn-tp-md position-relative">
                <p className="mrgn-tp-0 mrgn-bttm-0 full-width"><Link to="/immigration-refugees-citizenship/services/application/check-status" className="no-undrln stretched-link full-width">Check your application status</Link></p>
                <ChevronRight size={16} className="align-self-center mrgn-lft-sm" aria-hidden="true" />
              </div>
              <div className="d-flex brdr-bttm mrgn-tp-md position-relative">
                <p className="mrgn-tp-0 mrgn-bttm-0 full-width"><Link to="/immigration-refugees-citizenship/services/application/account/link-paper-online" className="no-undrln stretched-link full-width">Link the application you submitted to an IRCC secure account</Link></p>
                <ChevronRight size={16} className="align-self-center mrgn-lft-sm" aria-hidden="true" />
              </div>
              <div className="d-flex brdr-bttm mrgn-tp-md position-relative">
                <p className="mrgn-tp-0 mrgn-bttm-0 full-width"><Link to="/immigration-refugees-citizenship/services/application/check-processing-times" className="no-undrln stretched-link full-width">Check current processing times</Link></p>
                <ChevronRight size={16} className="align-self-center mrgn-lft-sm" aria-hidden="true" />
              </div>
            </div>

            <div className="panel panel-default p-4 no-box-shadow">
              <div className="d-flex align-items-center">
                <FileInput size={32} className="p-0 mrgn-rght-md blue-icon" aria-hidden="true" />
                <h3 className="mrgn-tp-0 mrgn-bttm-0">Update or withdraw your application</h3>
              </div>
              <div className="d-flex brdr-bttm mrgn-tp-md position-relative">
                <p className="mrgn-tp-0 mrgn-bttm-0 full-width"><Link to="/immigration-refugees-citizenship/services/application/update-your-application" className="no-undrln stretched-link full-width">Update your application (submit new information we didn’t request)</Link></p>
                <ChevronRight size={16} className="align-self-center mrgn-lft-sm" aria-hidden="true" />
              </div>
              <div className="d-flex brdr-bttm mrgn-tp-md position-relative">
                <p className="mrgn-tp-0 mrgn-bttm-0 full-width"><Link to="/immigration-refugees-citizenship/services/application/update-contact-information" className="no-undrln stretched-link full-width">Update your contact information</Link></p>
                <ChevronRight size={16} className="align-self-center mrgn-lft-sm" aria-hidden="true" />
              </div>
              <div className="d-flex brdr-bttm mrgn-tp-md position-relative">
                <p className="mrgn-tp-0 mrgn-bttm-0 full-width"><Link to="/immigration-refugees-citizenship/services/application/submit-requested-information-documents" className="no-undrln stretched-link full-width">Submit new documents or information we requested</Link></p>
                <ChevronRight size={16} className="align-self-center mrgn-lft-sm" aria-hidden="true" />
              </div>
              <div className="d-flex brdr-bttm mrgn-tp-md position-relative">
                <p className="mrgn-tp-0 mrgn-bttm-0 full-width"><Link to="/immigration-refugees-citizenship/services/application/withdraw-cancel" className="no-undrln stretched-link full-width">Withdrawing an application</Link></p>
                <ChevronRight size={16} className="align-self-center mrgn-lft-sm" aria-hidden="true" />
              </div>
              <div className="d-flex brdr-bttm mrgn-tp-md position-relative">
                <p className="mrgn-tp-0 mrgn-bttm-0 full-width"><a href="https://ircc.canada.ca/english/information/fees/refund.asp" className="no-undrln stretched-link full-width">Ask for a refund </a></p>
                <ChevronRight size={16} className="align-self-center mrgn-lft-sm" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mwsgeneric-base-html parbase section">
        <div className="bg-color brdr-0 brdr-rds-0 banded-topic">
          <div className="container pb-4">
            <h2>Get help with your application</h2>
            <div className="d-flex brdr-bttm mrgn-tp-md position-relative">
              <p className="mrgn-tp-0 mrgn-bttm-0 full-width"><a href="https://ircc.canada.ca/english/helpcentre/index-featured-can.asp" className="no-undrln stretched-link full-width">Help Centre</a></p>
              <ChevronRight size={16} className="align-self-center mrgn-lft-sm" aria-hidden="true" />
            </div>
            <div className="d-flex brdr-bttm mrgn-tp-md position-relative">
              <p className="mrgn-tp-0 mrgn-bttm-0 full-width"><Link to="/immigration-refugees-citizenship/corporate/contact-ircc" className="no-undrln stretched-link full-width">Contact IRCC</Link></p>
              <ChevronRight size={16} className="align-self-center mrgn-lft-sm" aria-hidden="true" />
            </div>
            <div className="d-flex brdr-bttm mrgn-tp-md position-relative">
              <p className="mrgn-tp-0 mrgn-bttm-0 full-width"><Link to="/immigration-refugees-citizenship/corporate/contact-ircc/offices/find-visa-application-centre" className="no-undrln stretched-link full-width">Find a visa application centre</Link></p>
              <ChevronRight size={16} className="align-self-center mrgn-lft-sm" aria-hidden="true" />
            </div>
          </div>
        </div>
        
        <div className="banded-topic">
          <div className="container mrgn-bttm-lg">
            <h2>If we approve your application</h2>
            <div className="d-flex brdr-bttm mrgn-tp-md position-relative">
              <p className="mrgn-tp-0 mrgn-bttm-0 full-width"><Link to="/immigration-refugees-citizenship/services/settle-canada" className="no-undrln stretched-link full-width">Moving to Canada</Link></p>
              <ChevronRight size={16} className="align-self-center mrgn-lft-sm" aria-hidden="true" />
            </div>
            <div className="d-flex brdr-bttm mrgn-tp-md position-relative">
              <p className="mrgn-tp-0 mrgn-bttm-0 full-width"><a href="https://www.cbsa-asfc.gc.ca/travel-voyage/menu-eng" className="no-undrln stretched-link full-width">Crossing the border into Canada</a></p>
              <ChevronRight size={16} className="align-self-center mrgn-lft-sm" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      <section className="pagedetails container">
        <h2 className="wb-inv">Page details</h2>
        <div className="row">
          <div className="col-sm-8 col-md-9 col-lg-9">
            <div className="wb-disable-allow wb-init wb-data-ajax-replace-inited" data-ajax-replace="/etc/designs/canada/wet-boew/assets/feedback/page-feedback-en.html" id="wb-auto-4">
              <div id="gc-pft" className="row wb-disable-allow wb-init wb-jsonmanager-inited">
                <div className="col-sm-10 col-md-9 col-lg-8">
                  <section className="well mrgn-bttm-0">
                    <h3 className="wb-inv">Give feedback about this page</h3>
                    <form action="https://feedback-retroaction.canada.ca/api/QueueProblemForm" method="post" className="wb-postback wb-disable-allow wb-pii-scrub wb-init wb-postback-inited wb-pii-scrub-inited" id="wb-auto-7" data-wb-pii-blocked="true">
                      <fieldset className="gc-pft-btns chkbxrdio-grp row row-no-gutters d-sm-flex flex-sm-wrap align-items-sm-center">
                        <legend className="col-xs-12 col-sm-7 nojs-col-sm-12 col-md-9 col-lg-8 text-center text-sm-left nojs-text-left mrgn-tp-sm pr-sm-3"><span className="field-name">Did you find what you were looking for?</span></legend>
                        <div className="col-xs-12 nojs-show">
                          <button name="helpful" value="Yes-Oui" className="btn btn-primary" aria-describedby="gc-pft-why">Yes</button>
                        </div>
                        <div className="col-xs-12 col-sm-5 col-md-3 col-lg-4 text-center text-sm-right nojs-hide">
                          <button name="helpful" value="Yes-Oui" className="btn btn-primary">Yes</button>
                          <button type="button" className="btn btn-primary mrgn-lft-sm">No</button>
                        </div>
                      </fieldset>
                      <div className="gc-pft-thnk hide">
                        <p className="mrgn-tp-sm mrgn-bttm-0" role="status"><Check size={16} className="text-success mrgn-rght-sm" aria-hidden="true" /> Thank you for your feedback.</p>
                      </div>
                    </form>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
        <gcds-date-modified class="hydrated">
          2026-08-07
        </gcds-date-modified>
      </section>
    </main>
  );
}
