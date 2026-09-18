import { Link } from 'react-router-dom';
import { ChevronDown, Check } from 'lucide-react';
import SEO from '../components/SEO';

export default function Jobs() {
  return (
    <main property="mainContentOfPage" resource="#wb-main" typeof="WebPageElement">
      <SEO
        title="Jobs and employment"
        description="Find jobs in Canada, search Job Bank, explore work permits, training programs, and hiring foreign workers."
        keywords="Canada jobs, Job Bank, work permit Canada, federal government jobs, Employment Insurance"
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
                            <li><Link to="/jobs" className="wb-navcurr" aria-current="page">Jobs</Link></li>
                            <li><Link to="/immigration-citizenship">Immigration and citizenship</Link></li>
                            <li><Link to="/travel">Travel and tourism</Link></li>
                            <li><Link to="/business">Business</Link></li>
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
                  <h1 property="name" id="wb-cont">Jobs</h1>
                </div>
              </div>

              <div className="featured-link">
                <section className="gc-featured-link wb-init gc-featured-link-inited" id="wb-auto-3">
                  <div className="container">
                    <h2 className="wb-inv">Spotlight on</h2>
                    <p><Link className="stretched-link" to="/job-bank">Over 80 000 jobs posted – how to search Job Bank</Link></p>
                  </div>
                </section>
              </div>

              <div className="most-requested list-advanced list">
                <section className="gc-most-requested">
                  <div className="container">
                    <h2>Most requested</h2>
                    <ul>
                      <li><Link to="/work-canada">Work in Canada - work permits</Link></li>
                      <li><Link to="/immigrate/express-entry">Immigrate as a skilled worker</Link></li>
                      <li><Link to="/hire-temporary-foreign">Hire a temporary foreign worker</Link></li>
                      <li><Link to="/federal-skilled-workers">Federal Skilled Worker Program</Link></li>
                      <li><Link to="/my-account">View your records of employment</Link></li>
                      <li><Link to="/roe-employers">Submit a record of employment - employers</Link></li>
                      <li><Link to="/fswep">Federal Student Work Experience Program (FSWEP)</Link></li>
                      <li><Link to="/sin">Apply for a Social Insurance Number (SIN)</Link></li>
                    </ul>
                  </div>
                </section>
              </div>

              <div>
                <div className="cmp-container container">
                  <div className="doormat-link-set panelcontainer">
                    <section className="gc-srvinfo">
                      <h2>Find a job</h2>
                      <div className="row wb-eqht wb-init wb-eqht-inited" id="wb-auto-4">
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '149px' }}>
                          <h3><Link to="/job-bank">Job Bank</Link></h3>
                          <p>Search jobs and apprenticeships from employers across Canada, get matched with a job.</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '149px' }}>
                          <h3><Link to="/government-jobs">Government of Canada jobs</Link></h3>
                          <p>Search federal government jobs and hiring programs.</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '203px' }}>
                          <h3><Link to="/youth-employment">Youth and student employment</Link></h3>
                          <p>Government work experience, youth jobs and internships, volunteering opportunities.</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '203px' }}>
                          <h3><Link to="/defence-jobs">Jobs in national security and defence</Link></h3>
                          <p>Jobs with the Canadian Armed Forces, RCMP, Security Intelligence, Border services, Defence and Public Safety.</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '149px' }}>
                          <h3><Link to="/parks-jobs">Jobs at Parks Canada</Link></h3>
                          <p>Apply for jobs in science, management, skilled trades, and a wide range of occupations.</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '149px' }}>
                          <h3><Link to="/labour-mobility">Moving within Canada to work</Link></h3>
                          <p>Learn about labour mobility between provinces and territories.</p>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>

              <div className="bg-light">
                <div className="cmp-container container">
                  <div className="doormat-link-set panelcontainer">
                    <section className="gc-srvinfo">
                      <h2>Training and the workplace</h2>
                      <div className="row wb-eqht wb-init">
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '203px' }}>
                          <h3><Link to="/training">Get training</Link></h3>
                          <p>Find training programs, apply for student aid, support for skilled trade apprenticeships. Explore career options. Validate your foreign credentials.</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '203px' }}>
                          <h3><Link to="/funding">Funding for jobs and training</Link></h3>
                          <p>Find grants and contributions that help you support jobs, training, and social development.</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '203px' }}>
                          <h3><Link to="/ei-benefits">Employment Insurance (EI) benefits and leave</Link></h3>
                          <p>Apply for EI, temporary benefits for workers, caregivers, sickness, fishing, maternity and parental EI. Submit your EI report.</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '203px' }}>
                          <h3><Link to="/hire-employees">Hiring and managing employees</Link></h3>
                          <p>Payroll, wages, and resources on recruiting, training and managing employees.</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '203px' }}>
                          <h3><Link to="/start-business">Start a business</Link></h3>
                          <p>Plan your business, name and register your business, apply for permits and licences, get support and financing, free tax help.</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '203px' }}>
                          <h3><Link to="/workplace-standards">Workplace standards</Link></h3>
                          <p>Federal and provincial labour laws, workplace standards, federal health and safety standards and labour relations programs.</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '203px' }}>
                          <h3><Link to="/pensions">Pensions and retirement</Link></h3>
                          <p>Retirement planning, public pensions, registered retirement saving plans, social security benefits, calculator for retirement income.</p>
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
                    <div className="well well-sm eqht-trgt wb-init wb-eqht-grd-inited hght-inhrt" id="image-featured-0ff95dc35d">
                      <img src="/assets/jobs-20260807-360x203.jpeg" alt="" />
                      <h3><Link className="stretched-link" to="/tariffs-help">Help for those affected by tariffs</Link></h3>
                      <p>Learn about financial supports and more.</p>
                    </div>
                  </div>
                  <div className="container-component col-lg-4 col-sm-6 hght-inhrt">
                    <div className="well well-sm eqht-trgt wb-init wb-eqht-grd-inited hght-inhrt" id="image-featured-ba28192fb7">
                      <img src="/assets/childhood-educators-feature.jpeg" alt="" />
                      <h3><Link className="stretched-link" to="/early-childhood">Early childhood educators are in demand</Link></h3>
                      <p>Learn everything you need to know about this meaningful career.</p>
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
              2026-08-10
            </gcds-date-modified>
          </section>
        </div>
      </div>
    </main>
  );
}
