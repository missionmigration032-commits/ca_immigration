import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import SEO from '../components/SEO';

export default function Business() {
  return (
    <main property="mainContentOfPage" resource="#wb-main" typeof="WebPageElement">
      <SEO
        title="Business and industry"
        description="Starting a business, business taxes, grants, loans, permits, intellectual property, and international trade."
        keywords="Canada business, starting a business Canada, business tax CRA, grants and loans Canada, permits and licences"
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
                            <li><Link to="/business" className="wb-navcurr" aria-current="page">Business</Link></li>
                            <li><Link to="/benefits">Benefits</Link></li>
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
                  <h1 property="name" id="wb-cont">Business and industry</h1>
                </div>
              </div>

              <div className="most-requested list-advanced list">
                <section className="gc-most-requested">
                  <div className="container">
                    <h2>Most requested</h2>
                    <ul>
                      <li><Link to="/us-canada">Canada-United States: Overview and federal supports</Link></li>
                      <li><Link to="/find-corporation">Find a corporation</Link></li>
                      <li><Link to="/annual-return">File Corporations Canada annual return</Link></li>
                      <li><Link to="/my-business-account">My Business Account (Canada Revenue Agency)</Link></li>
                      <li><Link to="/small-business-loans">Helping small businesses get loans</Link></li>
                      <li><Link to="/bdc-loans">Loans to improve cash flow and increase sales</Link></li>
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
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '176px' }}>
                          <h3><Link to="/start">Starting a business</Link></h3>
                          <p>Business planning, naming a business, registering with the government, getting support and financing</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '176px' }}>
                          <h3><Link to="/taxes">Business taxes</Link></h3>
                          <p>Income tax, GST/HST, payroll and T4 information returns, business numbers, customs duties and tariffs</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '176px' }}>
                          <h3><Link to="/financing">Business financing and support</Link></h3>
                          <p>Grants and contributions, loans, tax credits, wage subsidies and other business support</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '176px' }}>
                          <h3><Link to="/federal-corporations">Federal corporations</Link></h3>
                          <p>Incorporating or making changes to a business corporation, not-for-profit, cooperative or board of trade</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '176px' }}>
                          <h3><Link to="/maintaining">Maintaining your business</Link></h3>
                          <p>Managing your business operations, strategic and financial planning, marketing, social responsibility</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '176px' }}>
                          <h3><Link to="/permits">Permits, licences and regulations</Link></h3>
                          <p>Search permits and licences, find regulations for your industry and business activities</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '176px' }}>
                          <h3><Link to="/hire">Hiring and managing employees</Link></h3>
                          <p>Payroll, wages and other resources for recruiting, training and managing employees</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '176px' }}>
                          <h3><Link to="/trade">International trade and investment</Link></h3>
                          <p>Exporting, importing and investing in Canada and foreign markets</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '203px' }}>
                          <h3><Link to="/ip">Intellectual property and copyright</Link></h3>
                          <p>Trademarks, patents, copyright, industrial designs and protecting your intellectual property</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '203px' }}>
                          <h3><Link to="/research">Research and business intelligence</Link></h3>
                          <p>Industry sector data, financial benchmarks, labour trends and business statistics</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '203px' }}>
                          <h3><Link to="/doing-business">Doing business with the government</Link></h3>
                          <p>Selling to the federal government, buying from the government, selling to other governments</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '203px' }}>
                          <h3><Link to="/innovation">R&amp;D and innovation</Link></h3>
                          <p>Funding, collaboration, commercialization and licensing resources to help fuel innovation</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '176px' }}>
                          <h3><Link to="/protecting">Protecting your business</Link></h3>
                          <p>Emergency planning, risk management, insurance, legal issues, security and privacy, fraud</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '176px' }}>
                          <h3><Link to="/insolvency">Insolvency for business</Link></h3>
                          <p>Options for dealing with debt, making a proposal to creditors, filing for bankruptcy</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '257px' }}>
                          <h3><Link to="/defence-industry">Strengthening Canada's defence industry</Link></h3>
                          <p>Connecting Canadian businesses to the programs, partnerships and opportunities shaping Canada's defence and dual-use goods and services sectors</p>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div id="theme-features" className="cmp-container container">
            <div className="image-featured-container panelcontainer">
              <section className="gc-features">
                <h2>Features</h2>
                <div className="row wb-eqht-grd">
                  <div className="container-component col-lg-4 col-sm-6 hght-inhrt">
                    <div className="well well-sm eqht-trgt wb-init wb-eqht-grd-inited hght-inhrt" id="image-featured-fbcb311b08">
                      <img src="/assets/ai-initiatives.png" alt="" />
                      <h3><Link className="stretched-link" to="/ai-strategy">Discover Canada’s new AI strategy</Link></h3>
                      <p>Canada reveals its national artificial intelligence strategy: AI for All</p>
                    </div>
                  </div>
                  <div className="container-component col-lg-4 col-sm-6 hght-inhrt">
                    <div className="well well-sm eqht-trgt wb-init wb-eqht-grd-inited hght-inhrt" id="image-featured-69f89c0278">
                      <img src="/assets/affected-tariffs.png" alt="" />
                      <h3><Link className="stretched-link" to="/tariffs">Help for those affected by tariffs</Link></h3>
                      <p>Learn about financial supports and more.</p>
                    </div>
                  </div>
                  <div className="container-component col-lg-4 col-sm-6 hght-inhrt">
                    <div className="well well-sm eqht-trgt wb-init wb-eqht-grd-inited hght-inhrt" id="image-featured-190897d2c0">
                      <img src="/assets/supportforbusiness.png" alt="" />
                      <h3><Link className="stretched-link" to="/supports-for-business">Supports for business</Link></h3>
                      <p>Solutions to your business challenges right at your fingertip.</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className="page-details">
          <section className="pagedetails container">
            <h2 className="wb-inv">Page details</h2>
            <gcds-date-modified class="hydrated">
              2026-08-10
            </gcds-date-modified>
          </section>
        </div>
      </div>
    </main>
  );
}
