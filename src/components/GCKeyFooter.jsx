import React from "react";
import wmmsBlk from "../assets/wmms-blk.svg";

export default function GCKeyFooter() {
  return (
    <footer role="contentinfo" id="wb-info">
      <nav
        role="navigation"
        className="container visible-lg visible-md wb-navcurr"
      >
        <h2 className="wb-inv">Site Information</h2>
        <div className="row">
          <section className="col-sm-3 col-lg-3">
            <h3>About</h3>
            <ul className="list-unstyled">
              <li>
                <a
                  id="aboutFooterLink"
                  href="/AB-01"
                  target="_blank"
                  rel="noreferrer"
                >
                  About GCKey
                </a>
              </li>
              <li>
                <a
                  id="enabledServicesFooterLink"
                  href="/ES-01"
                  target="_blank"
                  rel="noreferrer"
                >
                  Enabled Services
                </a>
              </li>
              <li>
                <a
                  id="siteMapFooterLink"
                  href="/SM-01"
                  target="_blank"
                  rel="noreferrer"
                >
                  Site Map
                </a>
              </li>
            </ul>
          </section>
          <section className="col-sm-3 col-lg-3">
            <h3>Transparency</h3>
            <ul className="list-unstyled">
              <li>
                <a
                  id="disclosureFooterLink"
                  href="/pd-dp/gr-rg/index-eng"
                  target="_blank"
                  rel="noreferrer"
                >
                  Proactive Disclosure
                </a>
              </li>
              <li>
                <a
                  id="termsFooterLink"
                  href="/IN-01"
                  rel="license"
                  target="_blank"
                >
                  Terms and Conditions
                </a>
              </li>
            </ul>
          </section>
          <div className="col-sm-3 col-lg-3">
            <section>
              <h3>Contact Us</h3>
              <ul className="list-unstyled">
                <li>
                  <a
                    id="contactFooterLink"
                    href="/CU-01"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Phone Numbers
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </nav>
      <div className="brand">
        <div className="container">
          <div className="row ">
            <div className="col-xs-6 col-sm-6 visible-sm visible-xs tofpg">
              <a id="topOfPageFooterLink" href="#wb-cont">
                Top of Page{" "}
                <span className="glyphicon glyphicon-chevron-up"></span>
              </a>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-12 text-right">
              <object id="wmms" type="image/svg+xml" tabIndex="-1" role="img" data={wmmsBlk} aria-label="Symbol of the Government of Canada"></object>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
