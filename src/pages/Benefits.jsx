import { Link } from 'react-router-dom';
import { ChevronDown, Check } from 'lucide-react';
import SEO from '../components/SEO';

export default function Benefits() {
  return (
    <main property="mainContentOfPage" resource="#wb-main" typeof="WebPageElement">
      <SEO
        title="Government of Canada Benefits"
        description="Employment Insurance, Canada Child Benefit, pensions, housing benefits, student aid, and dental care."
        keywords="Canada benefits, Employment Insurance EI, Canada Child Benefit CCB, CPP OAS pension, dental care plan"
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
                            <li><Link to="/benefits" className="wb-navcurr" aria-current="page">Benefits</Link></li>
                            <li><Link to="/health">Health</Link></li>
                            <li><Link to="/taxes">Taxes</Link></li>
                            <li><Link to="/environment">Environment and natural resources</Link></li>
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
                  <h1 property="name" id="wb-cont">Benefits</h1>
                </div>
              </div>

              <div>
                <div className="cmp-container container">
                  <div className="mwsalert">
                    <section className="alert alert-warning">
                      <h2>Beware of false information online</h2>
                      <p>For accurate information, always check official government websites.</p>
                      <p>Check the <Link to="/scam-alerts">latest scams alerts</Link> related to benefits and taxes.</p>
                    </section>
                  </div>
                </div>
              </div>

              <div className="most-requested list-advanced list">
                <section className="gc-most-requested">
                  <div className="container">
                    <h2>Most requested</h2>
                    <ul>
                      <li><Link to="/apply-ei">Apply for Employment Insurance (EI)</Link></li>
                      <li><Link to="/payment-dates">Benefit payment dates</Link></li>
                      <li><Link to="/benefits-calculator">Child and family benefits calculators</Link></li>
                      <li><Link to="/sign-in">Sign in to an account</Link></li>
                      <li><Link to="/direct-deposit">Set up or change direct deposit</Link></li>
                      <li><Link to="/ei-report">Submit your EI report</Link></li>
                      <li><Link to="/income-tax-deductions">Personal income tax – claim deductions, credits and expenses</Link></li>
                    </ul>
                  </div>
                </section>
              </div>

              <div>
                <div className="cmp-container container">
                  <div className="doormat-link-set panelcontainer">
                    <section className="gc-srvinfo">
                      <h2 className="wb-inv">Services and information</h2>
                      <div className="row wb-eqht wb-init wb-eqht-inited" id="wb-auto-3">
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '203px' }}>
                          <h3><Link to="/ei-benefits">Employment Insurance benefits and leave</Link></h3>
                          <p>Temporary benefits for workers, sickness, fishing and family-related benefits. How to apply online and submit a report.</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '203px' }}>
                          <h3><Link to="/cgeb">Canada Groceries and Essentials Benefit (CGEB)</Link></h3>
                          <p>Benefit for people with low and modest incomes, quarterly payment amounts and dates</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '203px' }}>
                          <h3><Link to="/cdcp">Canadian Dental Care Plan (CDCP)</Link></h3>
                          <p>Apply for the dental plan. Check your application status.</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '203px' }}>
                          <h3><Link to="/disability-benefits">Disability benefits</Link></h3>
                          <p>Canada Disability Benefit, disability pensions and children's benefits, education funding, savings plans, gasoline tax refund program.</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '203px' }}>
                          <h3><Link to="/family-benefits">Family and caregiving benefits</Link></h3>
                          <p>Child benefit, dental benefit and GST/HST credit. Maternity, parental and caregiving benefits and leave. Help for the costs of raising people with disabilities.</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '203px' }}>
                          <h3><Link to="/public-pensions">Public pensions</Link></h3>
                          <p>Apply for Canada Pension Plan (CPP), Old Age Security (OAS), Guaranteed Income Supplement (GIS), Retirement planning.</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '203px' }}>
                          <h3><Link to="/grants">Grants and funding opportunities</Link></h3>
                          <p>Find government funding programs that help support social development, jobs, and training.</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '203px' }}>
                          <h3><Link to="/student-aid">Student aid and education planning</Link></h3>
                          <p>Apply for student aid loans and grants, estimate how much you could receive, plan for your education.</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '230px' }}>
                          <h3><Link to="/housing-benefits">Housing benefits</Link></h3>
                          <p>Housing tax credits for home renovations, accessibility upgrades, and first-time home buyers. GST/HST new housing rebate. Financing for greener homes.</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '230px' }}>
                          <h3><Link to="/financial-support">Find benefits and financial support</Link></h3>
                          <p>Find the support you need to help with everyday expenses, funding for your business or organization, or personal tax deductions.</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '230px' }}>
                          <h3><Link to="/benefits-by-audience">Benefits by audience</Link></h3>
                          <p>Benefits and programs, including eligibility.</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '230px' }}>
                          <h3><Link to="/someone-dies">What to do when someone dies</Link></h3>
                          <p>What to do following the loss of a loved one. Documents you need, who to notify, how to cancel benefits and avoid overpayment.</p>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="page-details">
          <section className="pagedetails container">
            <h2 className="wb-inv">Page details</h2>
            <div className="row">
              <div className="col-sm-8 col-md-9 col-lg-9">
                <div className="wb-disable-allow wb-init wb-data-ajax-replace-inited">
                  <div id="gc-pft" className="row wb-disable-allow wb-init wb-jsonmanager-inited">
                    <div className="col-sm-10 col-md-9 col-lg-8">
                      <section className="well mrgn-bttm-0">
                        <h3 className="wb-inv">Give feedback about this page</h3>
                        <div className="gc-pft-thnk hide">
                          <p className="mrgn-tp-sm mrgn-bttm-0" role="status">
                            <Check className="glyphicon text-success mrgn-rght-sm" aria-hidden="true" size={16} /> Thank you for your feedback.
                          </p>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <gcds-date-modified class="hydrated">
              2026-07-29
            </gcds-date-modified>
          </section>
        </div>
      </div>
    </main>
  );
}
