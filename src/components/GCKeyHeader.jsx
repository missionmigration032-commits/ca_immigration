import React from "react";
import { Link } from "react-router-dom";
import sigBlkEn from "../assets/sig-blk-en.svg";
import { useTranslation } from "../context/LanguageContext";

export default function GCKeyHeader({ breadcrumbs = [{ label: "Home", href: "/" }, { label: "My Account" }] }) {
  const { language, toggleLanguage, t } = useTranslation();
  return (
    <>
      <ul id="wb-tphp" className="wb-init wb-disable-inited">
        <li className="wb-slc">
          <a className="wb-sl" id="skip-main" href="#wb-cont">
            Skip to main content
          </a>
        </li>
        <li className="wb-slc visible-md visible-lg">
          <a className="wb-sl" id="skip-footer" href="#wb-info">
            Skip to footer
          </a>
        </li>
        <li className="wb-slc">
          <a className="wb-sl" href="?wbdisable=true">
            Basic HTML version
          </a>
        </li>
      </ul>
      <header role="banner">
        <div id="wb-bnr" className="container">
          <div id="wb-lng" className="visible-md visible-lg text-right">
            <h2 className="wb-inv">Language selection</h2>
            <div className="row">
              <div className="col-md-12">
                <ul className="list-inline margin-bottom-none">
                  <li>
                    <a
                      lang={language === 'en' ? 'fr' : 'en'}
                      id="languageLink"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleLanguage();
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {t('frLinkText')}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="brand col-xs-7 col-sm-9">
              <Link
                id="logo-link"
                to="/"
                title="Welcome to Canada.ca"
              >
                <object id="gcwu-sig" type="image/svg+xml" tabIndex="-1" role="img" data={sigBlkEn} aria-label="Government of Canada"></object>
              </Link>
            </div>
            <div
              className="wb-mb-links col-xs-5 col-sm-3 visible-sm visible-xs"
              id="wb-glb-mn"
            >
              <h2 className="wb-inv">Menu</h2>
              <ul className="list-inline text-right chvrn">
                <li>
                  <a
                    id="menu-button"
                    href="#mb-pnl"
                    title="Menu"
                    aria-controls="mb-pnl"
                    className="overlay-lnk"
                    role="button"
                  >
                    <span className="glyphicon glyphicon-th-list">
                      <span className="wb-inv">Menu</span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <nav
          role="navigation"
          id="wb-sm"
          className="wb-menu visible-md visible-lg wb-init wb-menu-inited wb-navcurr-inited"
          data-trgt="mb-pnl"
          typeof="SiteNavigationElement"
        >
          <h2 className="wb-inv">Site menu</h2>
          <div className="container visible-md visible-lg nvbar">
            <div className="row">
              <ul className="list-inline menu" role="menubar">
                <li>
                  <a
                    id="definitionsHeaderLink"
                    href="/DE-01"
                    target="_blank"
                    rel="noreferrer"
                    title="Definitions (opens in a new window)"
                    tabIndex="0"
                    aria-posinset="1"
                    aria-setsize="3"
                    role="menuitem"
                  >
                    Definitions
                  </a>
                </li>
                <li>
                  <a
                    id="faqHeaderLink"
                    href="/FQ-01"
                    target="_blank"
                    rel="noreferrer"
                    title="Frequently Asked Questions (FAQs) (opens in a new window)"
                    tabIndex="-1"
                    aria-posinset="2"
                    aria-setsize="3"
                    role="menuitem"
                  >
                    Frequently Asked Questions (FAQ)
                  </a>
                </li>
                <li className="last">
                  <a
                    id="helpHeaderLink"
                    href="/HP-01#logon"
                    target="_blank"
                    rel="noreferrer"
                    title="Help (opens in a new window)"
                    tabIndex="-1"
                    aria-posinset="3"
                    aria-setsize="3"
                    role="menuitem"
                  >
                    Help
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <nav role="navigation" id="wb-bc" property="breadcrumb">
          <h2 className="wb-inv">You are here:</h2>
          <div className="container">
            <div className="row">
              <ol className="breadcrumb">
                {breadcrumbs.map((item, idx) => (
                  <li key={idx}>
                    {item.href ? (
                      <Link to={item.href}>{item.label}</Link>
                    ) : (
                      item.label
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
