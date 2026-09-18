import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div>
      <div id="experiencefragment-512f4cdd6c" className="cmp-experiencefragment cmp-experiencefragment--footer">
        <div className="xf-content-height">
          <div className="cmp-container">
            <div>
              <div className="global-footer">
                <footer id="wb-info">
                  <h2 className="wb-inv">About this site</h2>
                  <div className="gc-contextual">
                    <div className="container">
                      <nav>
                        <h3>Immigration and citizenship</h3>
                        <ul className="list-col-xs-1 list-col-sm-2 list-col-md-3">
                          <li>
                            <Link to="/help-centre">Help Centre</Link>
                          </li>
                          <li>
                            <Link to="/contact">Contact IRCC</Link>
                          </li>
                          <li>
                            <Link to="/contact/web-form">IRCC web form</Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                  <div className="gc-main-footer">
                    <div className="container">
                      <nav>
                        <h3>Government of Canada</h3>
                        <ul className="list-col-xs-1 list-col-sm-2 list-col-md-3">
                          <li>
                            <Link to="/all-contacts">All contacts</Link>
                          </li>
                          <li>
                            <Link to="/departments">Departments and agencies</Link>
                          </li>
                          <li>
                            <Link to="/about">About government</Link>
                          </li>
                        </ul>
                        <h4>
                          <span className="wb-inv">Themes and topics</span>
                        </h4>
                        <ul className="list-unstyled colcount-sm-2 colcount-md-3">
                          <li>
                            <Link to="/jobs">Jobs</Link>
                          </li>
                          <li>
                            <Link to="/immigration-citizenship">Immigration and citizenship</Link>
                          </li>
                          <li>
                            <Link to="/travel">Travel and tourism</Link>
                          </li>
                          <li>
                            <Link to="/business">Business</Link>
                          </li>
                          <li>
                            <Link to="/benefits">Benefits</Link>
                          </li>
                          <li>
                            <Link to="/health">Health</Link>
                          </li>
                          <li>
                            <Link to="/taxes">Taxes</Link>
                          </li>
                          <li>
                            <Link to="/environment">Environment and natural resources</Link>
                          </li>
                          <li>
                            <Link to="/defence">National security and defence</Link>
                          </li>
                          <li>
                            <Link to="/culture">Culture, history and sport</Link>
                          </li>
                          <li>
                            <Link to="/policing">Policing, justice and emergencies</Link>
                          </li>
                          <li>
                            <Link to="/transport">Transport and infrastructure</Link>
                          </li>
                          <li>
                            <Link to="/international">Canada and the world</Link>
                          </li>
                          <li>
                            <Link to="/finance">Money and finances</Link>
                          </li>
                          <li>
                            <Link to="/science">Science and innovation</Link>
                          </li>
                          <li>
                            <Link to="/indigenous">Indigenous Peoples</Link>
                          </li>
                          <li>
                            <Link to="/veterans">Veterans and military</Link>
                          </li>
                          <li>
                            <Link to="/youth">Youth</Link>
                          </li>
                          <li>
                            <Link to="/life-events">Manage life events</Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                  <div className="gc-sub-footer">
                    <div className="container d-flex align-items-center">
                      <nav>
                        <h3 className="wb-inv">Government of Canada Corporate</h3>
                        <ul>
                          <li>
                            <Link to="/social">Social media</Link>
                          </li>
                          <li>
                            <Link to="/mobile">Mobile applications</Link>
                          </li>
                          <li>
                            <Link to="/about-canada-ca">About Canada.ca</Link>
                          </li>
                          <li>
                            <Link to="/terms">Terms and conditions</Link>
                          </li>
                          <li>
                            <Link to="/privacy">Privacy</Link>
                          </li>
                        </ul>
                      </nav>
                      <div className="wtrmrk align-self-end">
                        <img
                          src="/assets/wmms-blk.svg"
                          alt="Symbol of the Government of Canada"
                        />
                      </div>
                    </div>
                  </div>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
