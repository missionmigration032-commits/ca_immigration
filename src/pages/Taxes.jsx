import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import SEO from '../components/SEO';

export default function Taxes() {
  return (
    <main property="mainContentOfPage" resource="#wb-main" typeof="WebPageElement">
      <SEO
        title="Taxes - Canada Revenue Agency"
        description="Personal income tax, business taxes, GST/HST, payroll, CRA My Account, and tax credits in Canada."
        keywords="Canada Revenue Agency, CRA My Account, income tax Canada, GST HST, business number CRA, tax credits"
      />
      <div className="cmp-container">
        <div id="gridContainer" className="cmp-container">
          <div className="experiencefragment">
            <div id="experiencefragment-cc4ea3032c" className="cmp-experiencefragment cmp-experiencefragment--left-menu">
              <div className="xf-content-height">
                <div className="cmp-container">
                  <div className="embed-html embed">
                    <div id="embed-html-9dfdd2fe80" className="cmp-embed">
                      <nav id="theme-nav" className="wb-navcurr-inited">
                        <div className="container">
                          <h2 className="wb-inv">Themes menu</h2>
                          <a className="wb-sl" href="#wb-cont">Skip to main content</a>
                          <button id="menu-btn" className="btn btn-primary" aria-controls="wb-auto-2" aria-expanded="false">
                            <span className="wb-inv">Toggle </span>Menu<ChevronDown className="glyphicon" size={16} />
                          </button>
                          <ul className="list-unstyled" id="wb-auto-2">
                            <li><Link to="/jobs">Jobs</Link></li>
                            <li><Link to="/immigration-citizenship">Immigration and citizenship</Link></li>
                            <li><Link to="/travel">Travel and tourism</Link></li>
                            <li><Link to="/business">Business</Link></li>
                            <li><Link to="/benefits">Benefits</Link></li>
                            <li><Link to="/health">Health</Link></li>
                            <li><Link to="/services/taxes" className="wb-navcurr" aria-current="page">Taxes</Link></li>
                            <li><Link to="/services/environment">Environment and natural resources</Link></li>
                            <li><Link to="/defence">National security and defence</Link></li>
                            <li><Link to="/culture">Culture, history and sport</Link></li>
                            <li><Link to="/policing">Policing, justice and emergencies</Link></li>
                            <li><Link to="/transport">Transport and infrastructure</Link></li>
                            <li><Link to="/international">Canada and the world</Link></li>
                            <li><Link to="/finance">Money and finances</Link></li>
                            <li><Link to="/science">Science and innovation</Link></li>
                            <li><Link to="/indigenous">Indigenous Peoples</Link></li>
                            <li><Link to="/veterans">Veterans and military</Link></li>
                            <li><Link to="/youth">Youth</Link></li>
                            <li><Link to="/life-events">Manage life events</Link></li>
                          </ul>
                        </div>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div id="theme-content" className="cmp-container">
              <div className="introduction-block">
                <div className="container">
                  <h1 property="name" id="wb-cont">Taxes</h1>
                </div>
              </div>

              <div className="most-requested list-advanced list">
                <section className="gc-most-requested">
                  <div className="container">
                    <h2>Most requested</h2>
                    <ul>
                      <li><Link to="/revenue-agency/services/e-services/digital-services-individuals/account-individuals">CRA My Account for individuals</Link></li>
                      <li><Link to="/revenue-agency/services/e-services/digital-services-businesses/business-account">CRA My Business Account</Link></li>
                      <li><Link to="/revenue-agency/services/tax/represent-a-client">Represent a Client</Link></li>
                      <li><Link to="/revenue-agency/services/tax/individuals/community-volunteer-income-tax-program">Free tax clinics</Link></li>
                      <li><Link to="/services/taxes/income-tax/personal-income-tax/get-proof-income">Get a proof of income statement</Link></li>
                      <li><Link to="/services/taxes/child-and-family-benefits">Child and family benefits calculator</Link></li>
                      <li><Link to="/services/taxes/gst-hst">GST/HST for businesses</Link></li>
                      <li><Link to="/revenue-agency/services/tax/businesses/topics/payroll">Payroll</Link></li>
                    </ul>
                  </div>
                </section>
              </div>

              <div>
                <div className="cmp-container container">
                  <div className="doormat-link-set panelcontainer">
                    <section className="gc-srvinfo">
                      <h2 className="wb-inv">Services and information</h2>
                      <div className="row wb-eqht">
                        <div className="col-md-6">
                          <h3><Link to="/services/taxes/income-tax">Income tax</Link></h3>
                          <p>Personal, corporation, trust, and international tax, GST/HST credit, filing tax returns, making payments, and tax rates</p>
                        </div>
                        <div className="col-md-6">
                          <h3><Link to="/services/taxes/gst-hst">GST/HST</Link></h3>
                          <p>Register for an account, calculate, collect, file, or pay the GST/HST, and GST/HST rebates</p>
                        </div>
                        <div className="col-md-6">
                          <h3><Link to="/services/taxes/payroll">Payroll</Link></h3>
                          <p>Payroll accounts, deductions, payments, reporting, and CPP/EI rulings</p>
                        </div>
                        <div className="col-md-6">
                          <h3><Link to="/services/taxes/business-number">Business number registration</Link></h3>
                          <p>When you need a number or program account, how to register, making changes</p>
                        </div>
                        <div className="col-md-6">
                          <h3><Link to="/services/taxes/savings-and-investments-plans">Savings and pension plans</Link></h3>
                          <p>TFSA, RRSP, FHSA, RIF, PRPP, and RESP plans, and pooled registered savings plans</p>
                        </div>
                        <div className="col-md-6">
                          <h3><Link to="/services/taxes/child-and-family-benefits">Child and family benefits</Link></h3>
                          <p>Canada child benefit, disability tax credit, GST/HST credit, and child care documentation</p>
                        </div>
                        <div className="col-md-6">
                          <h3><Link to="/services/taxes/excise-taxes-duties-and-levies">Excise taxes, duties, and levies</Link></h3>
                          <p>Fuel, luxury, cannabis, alcohol, tobacco, vaping, and underused housing taxes</p>
                        </div>
                        <div className="col-md-6">
                          <h3><Link to="/services/taxes/charities">Charities and giving</Link></h3>
                          <p>Charities listings, applying for registration, and operating a registered charity</p>
                        </div>
                        <div className="col-md-6">
                          <h3><Link to="/revenue-agency/programs/about-canada-revenue-agency-cra/compliance">Compliance and enforcement</Link></h3>
                          <p>Reporting obligations, debt collection, audits, tax relief, objections or appeals</p>
                        </div>
                        <div className="col-md-6">
                          <h3><Link to="/revenue-agency/services/make-a-service-complaint">CRA Service feedback</Link></h3>
                          <p>Send feedback to the CRA about a service experience</p>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>

                <div id="theme-features" className="container">
                  <section className="gc-features">
                    <h2>Features</h2>
                    <div className="row wb-eqht-grd">
                      <div className="col-lg-4 col-sm-6 hght-inhrt">
                        <div className="well well-sm eqht-trgt wb-init wb-eqht-grd-inited hght-inhrt" id="image-featured-62fd2b3a13">
                          <img src="/assets/bnnr-bnfts-credits-2026-360x203.jpeg" alt="" />
                          <h3><Link className="stretched-link" to="/revenue-agency/campaigns/every-dollar-counts">Sometimes life can feel off balance</Link></h3>
                          <p>Benefits, credits, and housing programs can help. Find out what you may qualify for.</p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-sm-6 hght-inhrt">
                        <div className="well well-sm eqht-trgt wb-init wb-eqht-grd-inited hght-inhrt" id="image-featured-e8edf3d623">
                          <img src="/assets/cvtp-bnnr-360x203.jpeg" alt="" />
                          <h3><Link className="stretched-link" to="/revenue-agency/services/tax/individuals/community-volunteer-income-tax-program">Volunteer at a free tax clinic!</Link></h3>
                          <p>Help people do their taxes so they can get important benefits and credits.</p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-sm-6 hght-inhrt">
                        <div className="well well-sm eqht-trgt wb-init wb-eqht-grd-inited hght-inhrt" id="image-featured-d5a3e7d162">
                          <img src="/assets/ft-20260810-360x203.jpeg" alt="" />
                          <h3><Link className="stretched-link" to="/services/taxes/income-tax/personal-income-tax/after-you-file">After filing a tax return</Link></h3>
                          <p>What you need to know after filing your tax return.</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                <div className="page-details">
                  <section className="pagedetails container">
                    <h2 className="wb-inv">Page details</h2>
                    <div className="row">
                      <div className="col-sm-8 col-md-9 col-lg-9">
                        <div className="wb-disable-allow" data-ajax-replace="/etc/designs/canada/wet-boew/assets/feedback/page-feedback-en.html">
                        </div>
                      </div>
                    </div>
                    <dl id="wb-dtmd">
                      <dt>Date modified:</dt>
                      <dd><time property="dateModified">2026-08-10</time></dd>
                    </dl>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
