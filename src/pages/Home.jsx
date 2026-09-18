import { Link } from 'react-router-dom';
import { ChevronDown, Check } from 'lucide-react';
import SEO from '../components/SEO';

export default function Home() {
  return (
    <main property="mainContentOfPage" resource="#wb-main" typeof="WebPageElement">
      <SEO
        title="Immigration and citizenship"
        description="Official Government of Canada portal for visas, work permits, study permits, Canadian citizenship, Express Entry, and application tracking."
        keywords="Canada immigration, IRCC, Express Entry, study permit, work permit, visitor visa, check status"
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
                            <li><Link to="/immigration-citizenship" className="wb-navcurr" aria-current="page">Immigration and citizenship</Link></li>
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
                  <h1 property="name" id="wb-cont">Immigration and citizenship</h1>
                </div>
              </div>
              <div className="most-requested list-advanced list">
                <section className="gc-most-requested">
                  <div className="container">
                    <h2>Special measures</h2>
                    <div className="highlight most-requested-highlight list-advanced list">
                      <ul id="most-requested-highlight-32e032cc71" className="cmp-list">
                        <li className="cmp-list__item">
                          <Link className="cmp-list__item-link" to="/special-measures/gaza-west-bank">
                            <span className="cmp-list__item-title">Gaza and the West Bank</span>
                          </Link>
                        </li>
                        <li className="cmp-list__item">
                          <Link className="cmp-list__item-link" to="/special-measures/haiti">
                            <span className="cmp-list__item-title">Haiti</span>
                          </Link>
                        </li>
                        <li className="cmp-list__item">
                          <Link className="cmp-list__item-link" to="/special-measures/iran">
                            <span className="cmp-list__item-title">Iran</span>
                          </Link>
                        </li>
                        <li className="cmp-list__item">
                          <Link className="cmp-list__item-link" to="/special-measures/sudan">
                            <span className="cmp-list__item-title">Sudan</span>
                          </Link>
                        </li>
                        <li className="cmp-list__item">
                          <Link className="cmp-list__item-link" to="/special-measures/ukraine">
                            <span className="cmp-list__item-title">Ukraine</span>
                          </Link>
                        </li>
                        <li className="cmp-list__item">
                          <Link className="cmp-list__item-link" to="/special-measures/ebola">
                            <span className="cmp-list__item-title">Ebola disease</span>
                          </Link>
                        </li>
                        <li className="cmp-list__item">
                          <Link className="cmp-list__item-link" to="/special-measures/all">
                            <span className="cmp-list__item-title">All special measures</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
                <section className="gc-most-requested">
                  <div className="container">
                    <h2>Most requested</h2>
                    <ul>
                      <li><Link to="/application/check-status">Application status</Link></li>
                      <li><Link to="/application/check-processing-times">Processing times</Link></li>
                    </ul>
                  </div>
                </section>
              </div>

              <div>
                <div className="cmp-container container">
                  <div className="doormat-link-set panelcontainer">
                    <section className="gc-srvinfo">
                      <h2>IRCC applications</h2>
                      <div className="row wb-eqht wb-init wb-eqht-inited" id="wb-auto-3">
                        <div className="col-md-12" style={{ verticalAlign: 'top', minHeight: '122px' }}>
                          <h3><Link to="/application">Your IRCC application</Link></h3>
                          <p>Accounts (including GCKey), pay fees, update your application or contact information, forms, documents and proof</p>
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
                      <h2>Visas, permits and immigration</h2>
                      <div className="row wb-eqht wb-init">
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '149px' }}>
                          <h3><Link to="/visit">Visit Canada</Link></h3>
                          <p>Electronic travel authorization (eTA), visitor visa, extend your visit</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '149px' }}>
                          <h3><Link to="/immigrate">Live in Canada permanently</Link></h3>
                          <p>Express Entry, sponsorship, permanent residence (PR)</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '149px' }}>
                          <h3><Link to="/work">Temporary work permits</Link></h3>
                          <p>Post-graduation work permit (PGWP), International Experience Canada (IEC)</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '149px' }}>
                          <h3><Link to="/study">Study permits</Link></h3>
                          <p>Designated learning institutions (DLI), work while you study, extensions</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '122px' }}>
                          <h3><Link to="/refugees">Refugees and asylum</Link></h3>
                          <p>Claim asylum, resettle as a refugee</p>
                        </div>
                      </div>
                      <div className="well">
                        <h3>Not sure where to start?</h3>
                        <p><Link to="/explore-programs">Answer a few questions and explore all immigration programs</Link></p>
                      </div>
                    </section>
                  </div>
                </div>
              </div>

              <div>
                <div className="cmp-container container">
                  <div className="doormat-link-set panelcontainer">
                    <section className="gc-srvinfo">
                      <h2>Citizenship and settling in Canada</h2>
                      <div className="row wb-eqht wb-init">
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '122px' }}>
                          <h3><Link to="/citizenship">Canadian citizenship</Link></h3>
                          <p>Citizenship test, ceremony, proof of citizenship</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '122px' }}>
                          <h3><Link to="/pr-card">Permanent resident (PR) card</Link></h3>
                          <p>Renew or replace a lost or expired card, get your first card</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '122px' }}>
                          <h3><Link to="/passports">Passports</Link></h3>
                          <p>Adult and child passports, photos, other travel documents</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '122px' }}>
                          <h3><Link to="/settle">Settling in Canada</Link></h3>
                          <p>Free services, find a job, benefits and taxes for newcomers</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '122px' }}>
                          <h3><Link to="/adoption">International adoption</Link></h3>
                          <p>Citizenship or permanent residence for your adopted child</p>
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
                      <h2>Fraud and inadmissibility</h2>
                      <div className="row wb-eqht wb-init">
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '149px' }}>
                          <h3><Link to="/fraud">Fraud and scams</Link></h3>
                          <p>Check if your representative is authorized, report fraud or abuse</p>
                        </div>
                        <div className="col-md-6" style={{ verticalAlign: 'top', minHeight: '149px' }}>
                          <h3><Link to="/enforcement">Inadmissibility, enforcement and appeals</Link></h3>
                          <p>Check if you’re inadmissible, overcoming criminal convictions</p>
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
                    <div className="well well-sm eqht-trgt wb-init wb-eqht-grd-inited hght-inhrt" id="image-featured-5c8410b053">
                      <img src="/assets/ee.jpeg" alt="" />
                      <h3><Link className="stretched-link" to="/express-entry">Express Entry</Link></h3>
                      <p>Express Entry provides a faster way for skilled workers to settle in Canada</p>
                    </div>
                  </div>
                  <div className="container-component col-lg-4 col-sm-6 hght-inhrt">
                    <div className="well well-sm eqht-trgt wb-init wb-eqht-grd-inited hght-inhrt" id="image-featured-8817e2d468">
                      <img src="/assets/hc1.jpeg" alt="" />
                      <h3><Link className="stretched-link" to="/help-centre">Help Centre</Link></h3>
                      <p>Find quick answers to your questions on immigration and citizenship</p>
                    </div>
                  </div>
                  <div className="container-component col-lg-4 col-sm-6 hght-inhrt">
                    <div className="well well-sm eqht-trgt wb-init wb-eqht-grd-inited hght-inhrt" id="image-featured-758e705975">
                      <img src="/assets/levels-feature.jpeg" alt="" />
                      <h3><Link className="stretched-link" to="/levels">Canada’s immigration levels</Link></h3>
                      <p>Supporting our economy by restoring balance and control to our immigration system</p>
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
              2026-07-29
            </gcds-date-modified>
          </section>
        </div>
      </div>
    </main>
  );
}
