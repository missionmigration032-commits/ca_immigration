import { Link } from 'react-router-dom';
import { ChevronDown, Check } from 'lucide-react';
import SEO from '../components/SEO';

export default function Health() {
  return (
    <main property="mainContentOfPage" resource="#wb-main" typeof="WebPageElement">
      <SEO
        title="Health services and information"
        description="Canadian healthcare system, food & nutrition, drug recalls, vaccines, health product safety, and mental health."
        keywords="Canada health, Canadian Dental Care Plan, health card Canada, food guide Canada, drug recalls"
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
                            <li><Link to="/health" className="wb-navcurr" aria-current="page">Health</Link></li>
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
                  <h1 property="name" id="wb-cont">Health</h1>
                </div>
              </div>

              <div className="most-requested list-advanced list">
                <section className="gc-most-requested">
                  <div className="container">
                    <h2>Most requested</h2>
                    <ul>
                      <li><Link to="/dental-care">Canadian Dental Care Plan</Link></li>
                      <li><Link to="/recalls">Recalls and safety alerts</Link></li>
                      <li><Link to="/food-guide">Canada's food guide</Link></li>
                      <li><Link to="/drugs-health-products">Drugs and health products</Link></li>
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
                          <h3><Link to="/food-nutrition">Food and nutrition</Link></h3>
                          <p>Canada's food guide, labels, nutrition research, recalls and safety standards, healthy eating, supplemented foods</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '176px' }}>
                          <h3><Link to="/drug-health-products">Drug and health products</Link></h3>
                          <p>Drugs and medication, licences, natural health products, side effects, recalls and complaints, self-care products</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '176px' }}>
                          <h3><Link to="/vaccines">Vaccines and immunization</Link></h3>
                          <p>COVID-19, infants, children, adults, pregnancy, travel, vaccine preventable disease, safety, and side effects</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '176px' }}>
                          <h3><Link to="/diseases">Diseases and conditions</Link></h3>
                          <p>Symptoms, risks, and how to prevent, treat and manage disease and illness</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '176px' }}>
                          <h3><Link to="/health-system">Health system and services</Link></h3>
                          <p>Health cards, healthcare system, funding, and training</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '176px' }}>
                          <h3><Link to="/product-safety">Product safety</Link></h3>
                          <p>Consumer products and cosmetics, recalls and alerts, chemical safety, pest control products</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '230px' }}>
                          <h3><Link to="/healthy-living">Healthy living</Link></h3>
                          <p>Mental health, being active, substance use, smoking, vaping and tobacco, health and the environment, pregnancy, infant, child and youth health, aging, dental and oral health</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '230px' }}>
                          <h3><Link to="/health-risks">Health risks and safety</Link></h3>
                          <p>Recalls and alerts, workplace health and safety, public health notices, home safety, biosafety and biosecurity, radiation, violence and abuse, emergency preparedness</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '203px' }}>
                          <h3><Link to="/health-science">Health science, research and data</Link></h3>
                          <p>Health data, science, research, statistics, determinants of health, and monitoring and surveillance</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '203px' }}>
                          <h3><Link to="/indigenous-health">Indigenous health</Link></h3>
                          <p>Health care services, non-insured health benefits (NIHB), careers, drug and substance use, environmental health, food safety, pregnancy</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '284px' }}>
                          <h3><Link to="/report-health-safety">Report a health and safety concern</Link></h3>
                          <p>Report health and safety concerns related to food, medical devices, drugs, consumer products, cannabis, natural health products, pesticides, vehicles, tires and child car seats</p>
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
                    <div className="well well-sm eqht-trgt wb-init wb-eqht-grd-inited hght-inhrt" id="image-featured-3aa5a213b5">
                      <img src="/assets/health-feature-1.jpeg" alt="" />
                      <h3><Link className="stretched-link" to="/access-medications">Improving access to medications</Link></h3>
                      <p>Learn how we are helping you get access to the medications you need.</p>
                    </div>
                  </div>
                  <div className="container-component col-lg-4 col-sm-6 hght-inhrt">
                    <div className="well well-sm eqht-trgt wb-init wb-eqht-grd-inited hght-inhrt" id="image-featured-408700bc38">
                      <img src="/assets/health-feature-2.png" alt="" />
                      <h3><Link className="stretched-link" to="/wildfire-smoke">Get prepared for wildfire smoke events</Link></h3>
                      <p>Know what to do before the wildfire smoke hits your area.</p>
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
              2026-07-28
            </gcds-date-modified>
          </section>
        </div>
      </div>
    </main>
  );
}
