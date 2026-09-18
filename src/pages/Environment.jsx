import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import SEO from '../components/SEO';

export default function Environment() {
  return (
    <main property="mainContentOfPage" resource="#wb-main" typeof="WebPageElement">
      <SEO
        title="Environment and natural resources"
        description="Weather forecasts, climate change action, energy efficiency, wildlife protection, and environmental conservation in Canada."
        keywords="Canada weather, climate change Canada, natural resources, energy efficiency, wildlife conservation"
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
                            <li><Link to="/services/taxes">Taxes</Link></li>
                            <li><Link to="/services/environment" className="wb-navcurr" aria-current="page">Environment and natural resources</Link></li>
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
                  <h1 property="name" id="wb-cont">Environment and natural resources</h1>
                </div>
              </div>

              <div className="featured-link">
                <section className="gc-featured-link">
                  <div className="container">
                    <h2 className="wb-inv">Spotlight on</h2>
                    <p><Link className="stretched-link" to="/public-safety-canada/campaigns/wildfires">Wildfire updates: Get the latest information</Link></p>
                  </div>
                </section>
              </div>

              <div className="most-requested list-advanced list">
                <section className="gc-most-requested">
                  <div className="container">
                    <h2>Most requested</h2>
                    <ul>
                      <li><a href="https://weather.gc.ca/canada_e" target="_blank" rel="noopener noreferrer">Local weather forecast</a></li>
                      <li><a href="https://www.nrcan.gc.ca/energy-efficiency/transportation-alternative-fuels/fuel-consumption-guide/most-fuel-efficient-vehicles/21004" target="_blank" rel="noopener noreferrer">Fuel-efficient vehicles</a></li>
                      <li><a href="https://www.nrcan.gc.ca/homes" target="_blank" rel="noopener noreferrer">Home energy efficiency</a></li>
                      <li><Link to="/environment-climate-change/services/seasonal-weather-hazards">Prepare for severe weather</Link></li>
                      <li><Link to="/environment-climate-change/services/weather-general-tools-resources/weathercan">Download WeatherCAN</Link></li>
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
                          <h3><Link to="/services/environment/weather">Weather and hazards</Link></h3>
                          <p>Current conditions, forecasts, historical data, alerts, natural hazards.</p>
                        </div>
                        <div className="col-md-6">
                          <h3><Link to="/services/environment/climatechange">Climate change</Link></h3>
                          <p>Canada’s action, climate future, partnerships, adaptation, health, science, emissions reporting.</p>
                        </div>
                        <div className="col-md-6">
                          <h3><Link to="/services/environment/nature">Nature</Link></h3>
                          <p>Nature strategy and plan, Wildlife, plants and species, Environmental conservation and protection, Nature and science at Parks Canada.</p>
                        </div>
                        <div className="col-md-6">
                          <h3><Link to="/services/environment/energy">Energy</Link></h3>
                          <p>Energy-efficient homes and vehicles, green energy, fuel prices in your area.</p>
                        </div>
                        <div className="col-md-6">
                          <h3><Link to="/services/environment/natural-resources">Natural resources</Link></h3>
                          <p>Canada’s natural resources, water, forests and mining industry.</p>
                        </div>
                        <div className="col-md-6">
                          <h3><a href="https://agriculture.canada.ca/agricultural-production" target="_blank" rel="noopener noreferrer">Agricultural production tools and data</a></h3>
                          <p>Interactive maps, tools, practices and technologies relevant to production in agriculture. Weather, drought, land and water, geospatial products.</p>
                        </div>
                        <div className="col-md-6">
                          <h3><a href="https://agriculture.canada.ca/environment" target="_blank" rel="noopener noreferrer">Environment and sustainability in agriculture</a></h3>
                          <p>Climate change mitigation, farming practices, environmental impacts and indicators.</p>
                        </div>
                        <div className="col-md-6">
                          <h3><Link to="/services/environment/fisheries">Fisheries</Link></h3>
                          <p>Licences, permits and funding programs related to fishing, aquaculture and marine mammal harvest.</p>
                        </div>
                        <div className="col-md-6">
                          <h3><Link to="/services/environment/pollution-waste-management">Pollution and waste management</Link></h3>
                          <p>Find out about ways to track and reduce pollution and waste.</p>
                        </div>
                        <div className="col-md-6">
                          <h3><a href="https://www.statcan.gc.ca/subjects-start/environment" target="_blank" rel="noopener noreferrer">Environment statistics</a></h3>
                          <p>Data, tools and reports providing the latest information on the environment in Canada.</p>
                        </div>
                        <div className="col-md-6">
                          <h3><Link to="/environment-climate-change/services/water-overview">Water and the environment</Link></h3>
                          <p>Water quantity, freshwater quality, cleaning up our lakes and rivers, water science, sustainability indicators, marine water quality, protecting water.</p>
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
                        <div className="well well-sm eqht-trgt wb-init wb-eqht-grd-inited hght-inhrt" id="image-featured-fcade27293">
                          <img src="/assets/20260330.jpeg" alt="" />
                          <h3><Link className="stretched-link" to="/services/environment/nature/nature-strategy">A Force of Nature: Canada's Strategy to Protect Nature</Link></h3>
                          <p>Canada’s plan to protect and value nature - a foundation of our economy, sovereignty, and well-being.</p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-sm-6 hght-inhrt">
                        <div className="well well-sm eqht-trgt wb-init wb-eqht-grd-inited hght-inhrt" id="image-featured-44a68fbee3">
                          <img src="/assets/our-environment-feature-tile-03-e.jpeg" alt="" />
                          <h3><Link className="stretched-link" to="/services/environment/our-environment">Funds and resources to help the environment</Link></h3>
                          <p>Programs and incentives to help you take climate action.</p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-sm-6 hght-inhrt">
                        <div className="well well-sm eqht-trgt wb-init wb-eqht-grd-inited hght-inhrt" id="image-featured-54a885930b">
                          <img src="/assets/23076-08-supr---feature-360x203.jpeg" alt="" />
                          <h3><Link className="stretched-link" to="/environment-climate-change/campaigns/beat-plastic-pollution-challenge">#BeatPlasticPollution challenge</Link></h3>
                          <p>Take the #BeatPlasticPollution challenge and be part of the solution to end plastic pollution. Big or small, every action counts!</p>
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
                      <dd><time property="dateModified">2026-07-31</time></dd>
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
