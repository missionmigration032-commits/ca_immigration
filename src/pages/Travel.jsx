import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import SEO from '../components/SEO';

export default function Travel() {
  return (
    <main role="main" property="mainContentOfPage">
      <SEO
        title="Travel and tourism"
        description="Travel advisories, passport applications, border wait times, visitor visas, and assistance outside Canada."
        keywords="Canada travel, travel advice Canada, Canadian passport, eTA Canada, visitor visa Canada"
      />
      <div className="page-type-theme wb-init page-type-theme-inited" id="wb-auto-4">

        <div id="gridContainer">
          <nav id="theme-nav" aria-labelledby="themesMenu" className="wb-navcurr-inited">
            <div className="container">
              <h2 id="themesMenu" className="wb-inv">Themes menu</h2>
              <a className="wb-sl" href="#wb-cont">Skip themes menu and go to main content</a>
              <button id="menu-btn" className="btn btn-primary" aria-controls="wb-auto-5" aria-expanded="false">
                <span className="wb-inv">Toggle </span>Menu<ChevronDown className="glyphicon" size={16} />
              </button>
              <ul className="list-unstyled" id="wb-auto-5">
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/immigration-citizenship">Immigration and citizenship</Link></li>
                <li className="active"><Link className="wb-navcurr" to="/travel" aria-current="page">Travel and tourism</Link></li>
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
          <div id="theme-content">
            <div className="container">
              <h1 id="wb-cont">Travel and tourism</h1>
            </div>
            <section className="gc-most-requested">
              <div className="container">
                <h2>Most requested</h2>
                <ul>
                  <li><Link to="/assistance/emergency-assistance">Get emergency assistance outside Canada</Link></li>
                  <li><Link to="/travelling/registration">Register as a Canadian outside Canada</Link></li>
                  <li><Link to="/nexus">Apply for NEXUS</Link></li>
                  <li><Link to="/visa-eta">Check if you need a visa or eTA to travel to Canada</Link></li>
                </ul>
              </div>
            </section>
            <div className="container">
              <section className="gc-srvinfo">
                <h2 className="mrgn-tp-sm">Find travel advice and advisories</h2>
                <div className="col-md-8 row">
                  <div className="mrgn-bttm-md">
                    <div className="input-group">
                      <label htmlFor="CountryDropDown1_ddlCountries" className="wb-inv">Where do you want to go?</label>
                      <select name="CountryDropDown1$ddlCountries" id="CountryDropDown1_ddlCountries" style={{ height: '45px' }} placeholder="Type in your destination" className="form-control" title="Where do you want to go?" defaultValue="">
                        <option value="">Select a destination</option>
                        <option value="afghanistan">Afghanistan</option>
                        <option value="albania">Albania</option>
                        <option value="algeria">Algeria</option>
                        <option value="argentina">Argentina</option>
                        <option value="australia">Australia</option>
                        <option value="austria">Austria</option>
                        <option value="bahamas">Bahamas</option>
                        <option value="barbados">Barbados</option>
                        <option value="belgium">Belgium</option>
                        <option value="brazil">Brazil</option>
                        <option value="chile">Chile</option>
                        <option value="china">China</option>
                        <option value="colombia">Colombia</option>
                        <option value="costa-rica">Costa Rica</option>
                        <option value="croatia">Croatia</option>
                        <option value="cuba">Cuba</option>
                        <option value="czechia">Czechia</option>
                        <option value="denmark">Denmark</option>
                        <option value="dominican-republic">Dominican Republic</option>
                        <option value="egypt">Egypt</option>
                        <option value="finland">Finland</option>
                        <option value="france">France</option>
                        <option value="germany">Germany</option>
                        <option value="greece">Greece</option>
                        <option value="hong-kong">Hong Kong</option>
                        <option value="hungary">Hungary</option>
                        <option value="iceland">Iceland</option>
                        <option value="india">India</option>
                        <option value="indonesia">Indonesia</option>
                        <option value="ireland">Ireland</option>
                        <option value="israel-and-palestine">Israel and Palestine</option>
                        <option value="italy">Italy</option>
                        <option value="jamaica">Jamaica</option>
                        <option value="japan">Japan</option>
                        <option value="jordan">Jordan</option>
                        <option value="malaysia">Malaysia</option>
                        <option value="mexico">Mexico</option>
                        <option value="morocco">Morocco</option>
                        <option value="netherlands">Netherlands</option>
                        <option value="new-zealand">New Zealand</option>
                        <option value="norway">Norway</option>
                        <option value="peru">Peru</option>
                        <option value="philippines">Philippines</option>
                        <option value="poland">Poland</option>
                        <option value="portugal">Portugal</option>
                        <option value="russia">Russia</option>
                        <option value="saudi-arabia">Saudi Arabia</option>
                        <option value="singapore">Singapore</option>
                        <option value="south-africa">South Africa</option>
                        <option value="south-korea">South Korea</option>
                        <option value="spain">Spain</option>
                        <option value="sweden">Sweden</option>
                        <option value="switzerland">Switzerland</option>
                        <option value="taiwan">Taiwan</option>
                        <option value="thailand">Thailand</option>
                        <option value="turkiye">Türkiye</option>
                        <option value="united-arab-emirates">United Arab Emirates</option>
                        <option value="united-kingdom">United Kingdom</option>
                        <option value="united-states">United States</option>
                        <option value="vietnam">Vietnam</option>
                      </select>
                      <span className="input-group-btn">
                        <button className="btn btn-default" id="btnGoToCountry" type="button">Go!</button>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="clearfix"></div>
                <p className="mrgn-bttm-lg"><Link to="/travelling/advisories"><strong>All advice and advisories</strong></Link></p>
              </section>
            </div>
            <div className="container">
              <section className="gc-srvinfo">
                <h2 className="wb-inv">Services and information</h2>
                <div className="wb-eqht-grd row">
                  <div className="col-md-6">
                    <h3><Link to="/assistance">Assistance outside Canada</Link></h3>
                    <p>How to get help if there is a problem when you are travelling outside Canada</p>
                  </div>
                  <div className="col-md-6">
                    <h3><Link to="/travelling">Travel outside Canada</Link></h3>
                    <p>Travel documents, travel health and safety, border wait times and more</p>
                  </div>
                  <div className="col-md-6">
                    <h3><Link to="/air">Air travel</Link></h3>
                    <p>Prepare for a flight, airport security, health concerns and more</p>
                  </div>
                  <div className="col-md-6">
                    <h3><Link to="/passports">Canadian passports and travel documents</Link></h3>
                    <p>How to apply for passports and other travel documents</p>
                  </div>
                  <div className="col-md-6">
                    <h3><Link to="/visit">Visit Canada</Link></h3>
                    <p>Electronic travel authorization (eTA), visitor visa, extend your visit</p>
                  </div>
                  <div className="col-md-6">
                    <h3><Link to="/canadian-tourism">Canadian attractions, events and experiences</Link></h3>
                    <p>Discover Canada's museums, national parks and historic sites, and enjoy unforgettable experiences</p>
                  </div>
                  <div className="col-md-6">
                    <h3><Link to="/returning">Return or travel to Canada</Link></h3>
                    <p>Border wait times, customs and immigration</p>
                  </div>
                  <div className="col-md-6">
                    <h3><Link to="/stay-connected">Stay connected</Link></h3>
                    <p>Keep in touch with Canada wherever you are through our smart travel tools</p>
                  </div>
                </div>
              </section>
            </div>
            <div className="bg-light">
              <div className="container">
                <section className="gc-srvinfo">
                  <h2 className="mrgn-tp-lg">Focus on safe travel</h2>
                  <p>Articles on a variety of travel-related topics and resources to help you plan your trip.</p>
                  <p className="mrgn-bttm-lg"><Link to="/assistance/safe-travel"><strong>Plan your trip and stay safe outside Canada</strong></Link></p>
                </section>
              </div>
            </div>
          </div>
        </div>
        <div id="theme-features" className="container">
          <section className="gc-features">
            <h2>Features</h2>
            <div className="row wb-eqht-grd">
              <div className="col-lg-4 col-sm-6 hght-inhrt">
                <div className="well well-sm eqht-trgt wb-init wb-eqht-grd-inited hght-inhrt" id="wb-auto-6">
                  <img src="/assets/border.jpg" alt="" />
                  <h3><Link className="stretched-link" to="/ebola-border">Ebola disease border measures</Link></h3>
                  <p>Learn about the temporary border measures for travellers entering Canada.</p>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 hght-inhrt">
                <div className="well well-sm eqht-trgt wb-init wb-eqht-grd-inited hght-inhrt" id="wb-auto-7">
                  <img src="/assets/cfia_whatcantitake.jpg" alt="" />
                  <h3><Link className="stretched-link" to="/plan-before-you-pack">Plan before you pack</Link></h3>
                  <p>Some food, plant and animal products are not allowed in Canada. Before travelling, check what you can bring back.</p>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 hght-inhrt">
                <div className="well well-sm eqht-trgt wb-init wb-eqht-grd-inited hght-inhrt" id="wb-auto-8">
                  <img src="/assets/consent-letter-baby.jpg" alt="" />
                  <h3><Link className="stretched-link" to="/consent-letter">Consent letter</Link></h3>
                  <p>Use our recommended consent letter for Canadian children traveling abroad.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
