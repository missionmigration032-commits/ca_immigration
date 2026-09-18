import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import gcKeyCss from '../pages/GCKeyLogin.css?inline';
import sigBlkEn from '../assets/sig-blk-en.svg';
import wmmsBlk from '../assets/wmms-blk.svg';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../context/LanguageContext';

export default function GCKeyLayout() {
  const { language, toggleLanguage, t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogoutClick = () => {
    logout();
    navigate("/j/eng/l");
  };

  const getBreadcrumbs = () => {
    const path = location.pathname;
    const homeLabel = t('home') || "Home";

    if (path.includes('/fu')) {
      return [
        { label: homeLabel, href: "/j/eng/l" },
        { label: t('recoverUsernameStep1') || "Recover Username Step 1 of 2" }
      ];
    }

    if (path.includes('/mycic/dashboard')) {
      return [
        { label: homeLabel, href: "/" },
        { label: t('myAccount') || "My Account", href: "/mycic/home" },
        { label: t('appStatusMessages') || "Application status and messages" }
      ];
    }

    if (path.includes('/mycic/home')) {
      return [
        { label: homeLabel, href: "/" },
        { label: t('myAccount') || "My Account" }
      ];
    }

    if (path.includes('/admin')) {
      return [
        { label: homeLabel, href: "/" },
        { label: t('adminDashboard') || "Admin Dashboard" }
      ];
    }

    if (path.includes('/employee')) {
      return [
        { label: homeLabel, href: "/" },
        { label: t('employeeDashboard') || "Employee Dashboard" }
      ];
    }

    return [
      { label: homeLabel, href: "/" },
      { label: t('signInSignUp') || "Sign In / Sign Up" }
    ];
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: gcKeyCss }} />
      <div className="gckey-page">
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
          <a className="wb-sl" href="?execution=e2s1&wbdisable=true">
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
                <ul className="list-inline margin-bottom-none" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  {user && (
                    <li style={{ display: 'inline-flex', alignItems: 'center' }}>
                      <button
                        onClick={handleLogoutClick}
                        className="btn btn-link"
                        style={{
                          color: '#284162',
                          textDecoration: 'underline',
                          padding: 0,
                          border: 'none',
                          background: 'none',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          lineHeight: 'inherit',
                          cursor: 'pointer',
                        }}
                      >
                        {t('signOut')}
                      </button>
                    </li>
                  )}
                  {user && <li style={{ color: '#ccc', margin: '0 8px' }}> | </li>}
                  <li style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <a
                      href="#"
                      lang={language === 'en' ? 'fr' : 'en'}
                      id="languageLink"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleLanguage();
                      }}
                      style={{ cursor: 'pointer', fontWeight: 'bold' }}
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
                target="_blank"
                title="Welcome to Canada.ca (opens in a new window)"
              >
                <object id="gcwu-sig" type="image/svg+xml" tabIndex="-1" role="img" data={sigBlkEn} aria-label={t('govOfCanada')}></object>
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
              <div
                id="mb-pnl"
                className=" wb-overlay modal-content overlay-def wb-panel-r wb-overlay-inited"
                aria-hidden="true"
              >
                <header className="modal-header">
                  <div className="modal-title">Menu</div>
                </header>
                <div className="modal-body">
                  <section className="lng-ofr">
                    <h3>{t('help')}</h3>
                    <ul className="list-inline" style={{ display: 'inline-flex', alignItems: 'center' }}>
                      {user && (
                        <li>
                          <button
                            onClick={handleLogoutClick}
                            className="btn btn-link"
                            style={{
                              color: '#284162',
                              textDecoration: 'underline',
                              padding: 0,
                              border: 'none',
                              background: 'none',
                              fontSize: '16px',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                            }}
                          >
                            {t('signOut')}
                          </button>
                        </li>
                      )}
                      {user && <li style={{ color: '#ccc', margin: '0 8px' }}> | </li>}
                      <li>
                        <a
                          href="#"
                          lang={language === 'en' ? 'fr' : 'en'}
                          id="languageLinkMobile"
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
                  </section>
                  <nav
                    role="navigation"
                    typeof="SiteNavigationElement"
                    id="sm-pnl"
                    className="sm-pnl wb-menu wb-menu-inited wb-init wb-navcurr-inited"
                  >
                    <h3>Site menu</h3>
                    <ul className="list-unstyled mb-menu" role="menu">
                      <li className="no-sect">
                        <Link
                          className="mb-item"
                          role="menuitem"
                          aria-setsize="3"
                          aria-posinset="1"
                          tabIndex="0"
                          id="definitionsHeaderLink"
                          to="/DE-01"
                          target="_blank"
                          title="Definitions (opens in a new window)"
                        >
                          Definitions
                        </Link>
                      </li>
                      <li className="no-sect">
                        <Link
                          className="mb-item"
                          role="menuitem"
                          aria-setsize="3"
                          aria-posinset="2"
                          tabIndex="-1"
                          id="faqHeaderLink"
                          to="/FQ-01"
                          target="_blank"
                          title="Frequently Asked Questions (FAQs) (opens in a new window)"
                        >
                          Frequently Asked Questions (FAQ)
                        </Link>
                      </li>
                      <li className="no-sect">
                        <Link
                          className="mb-item"
                          role="menuitem"
                          aria-setsize="3"
                          aria-posinset="3"
                          tabIndex="-1"
                          id="helpHeaderLink"
                          to="/HP-01#forgot-username"
                          target="_blank"
                          title="Help (opens in a new window)"
                        >
                          Help
                        </Link>
                      </li>
                    </ul>
                  </nav>
                  <nav
                    role="navigation"
                    typeof="SiteNavigationElement"
                    id="info-pnl"
                    className="info-pnl wb-menu wb-menu-inited wb-init"
                  >
                    <h3>Site Information</h3>
                    <ul className="list-unstyled mb-menu" role="menu">
                      <li>
                        <details>
                          <summary
                            className="mb-item"
                            role="menuitem"
                            aria-setsize="4"
                            aria-posinset="1"
                            aria-haspopup="true"
                            tabIndex="0"
                          >
                            About
                          </summary>
                          <ul
                            className="list-unstyled mb-sm"
                            role="menu"
                            aria-expanded="false"
                            aria-hidden="true"
                          >
                            <li>
                              <Link
                                role="menuitem"
                                aria-setsize="3"
                                aria-posinset="1"
                                tabIndex="-1"
                                id="aboutFooterLink"
                                to="/AB-01"
                                target="_blank"
                              >
                                About GCKey
                              </Link>
                            </li>
                            <li>
                              <Link
                                role="menuitem"
                                aria-setsize="3"
                                aria-posinset="2"
                                tabIndex="-1"
                                id="enabledServicesFooterLink"
                                to="/ES-01"
                                target="_blank"
                              >
                                Enabled Services
                              </Link>
                            </li>
                            <li>
                              <Link
                                role="menuitem"
                                aria-setsize="3"
                                aria-posinset="3"
                                tabIndex="-1"
                                id="siteMapFooterLink"
                                to="/SM-01"
                                target="_blank"
                              >
                                Site Map
                              </Link>
                            </li>
                          </ul>
                        </details>
                      </li>
                      <li>
                        <details>
                          <summary
                            className="mb-item"
                            role="menuitem"
                            aria-setsize="4"
                            aria-posinset="2"
                            aria-haspopup="true"
                            tabIndex="-1"
                          >
                            Transparency
                          </summary>
                          <ul
                            className="list-unstyled mb-sm"
                            role="menu"
                            aria-expanded="false"
                            aria-hidden="true"
                          >
                            <li>
                              <Link
                                role="menuitem"
                                aria-setsize="2"
                                aria-posinset="1"
                                tabIndex="-1"
                                id="disclosureFooterLink"
                                to="/pd-dp/gr-rg/index-eng"
                                target="_blank"
                              >
                                Proactive Disclosure
                              </Link>
                            </li>
                            <li>
                              <Link
                                role="menuitem"
                                aria-setsize="2"
                                aria-posinset="2"
                                tabIndex="-1"
                                id="termsFooterLink"
                                to="/IN-01"
                                rel="license"
                                target="_blank"
                              >
                                Terms and Conditions
                              </Link>
                            </li>
                          </ul>
                        </details>
                      </li>
                      <li>
                        <details>
                          <summary
                            className="mb-item"
                            role="menuitem"
                            aria-setsize="4"
                            aria-posinset="3"
                            aria-haspopup="true"
                            tabIndex="-1"
                          >
                            Contact Us
                          </summary>
                          <ul
                            className="list-unstyled mb-sm"
                            role="menu"
                            aria-expanded="false"
                            aria-hidden="true"
                          >
                            <li>
                              <Link
                                role="menuitem"
                                aria-setsize="1"
                                aria-posinset="1"
                                tabIndex="-1"
                                id="contactFooterLink"
                                to="/CU-01"
                                target="_blank"
                              >
                                Phone Numbers
                              </Link>
                            </li>
                          </ul>
                        </details>
                      </li>
                      <li className="no-sect">
                        <a
                          className="mb-item"
                          role="menuitem"
                          aria-setsize="4"
                          aria-posinset="4"
                          tabIndex="-1"
                          href="#wb-cont"
                        >
                          Top of Page{" "}
                          <span className="glyphicon glyphicon-chevron-up"></span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
                <button
                  className="mfp-close overlay-close"
                  title="Close: Menu (escape key)"
                >
                  ×<span className="wb-inv"> Close: Menu (escape key)</span>
                </button>
              </div>
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
                  <Link
                    id="definitionsHeaderLink"
                    to="/DE-01"
                    target="_blank"
                    title="Definitions (opens in a new window)"
                    tabIndex="0"
                    aria-posinset="1"
                    aria-setsize="3"
                    role="menuitem"
                  >
                    Definitions
                  </Link>
                </li>
                <li>
                  <Link
                    id="faqHeaderLink"
                    to="/FQ-01"
                    target="_blank"
                    title="Frequently Asked Questions (FAQs) (opens in a new window)"
                    tabIndex="-1"
                    aria-posinset="2"
                    aria-setsize="3"
                    role="menuitem"
                  >
                    Frequently Asked Questions (FAQ)
                  </Link>
                </li>
                <li className="last">
                  <Link
                    id="helpHeaderLink"
                    to="/HP-01#forgot-username"
                    target="_blank"
                    title="Help (opens in a new window)"
                    tabIndex="-1"
                    aria-posinset="3"
                    aria-setsize="3"
                    role="menuitem"
                  >
                    Help
                  </Link>
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
                      <Link to={item.href} id={idx === 0 ? "home" : undefined}>
                        {item.label}
                      </Link>
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

      <div className="container">
        <Outlet />
      </div>

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
                  <Link
                    id="aboutFooterLink"
                    to="/AB-01"
                    target="_blank"
                  >
                    About GCKey
                  </Link>
                </li>
                <li>
                  <Link
                    id="enabledServicesFooterLink"
                    to="/ES-01"
                    target="_blank"
                  >
                    Enabled Services
                  </Link>
                </li>
                <li>
                  <Link
                    id="siteMapFooterLink"
                    to="/SM-01"
                    target="_blank"
                  >
                    Site Map
                  </Link>
                </li>
              </ul>
            </section>
            <section className="col-sm-3 col-lg-3">
              <h3>Transparency</h3>
              <ul className="list-unstyled">
                <li>
                  <Link
                    id="disclosureFooterLink"
                    to="/pd-dp/gr-rg/index-eng"
                    target="_blank"
                  >
                    Proactive Disclosure
                  </Link>
                </li>
                <li>
                  <Link
                    id="termsFooterLink"
                    to="/IN-01"
                    rel="license"
                    target="_blank"
                  >
                    Terms and Conditions
                  </Link>
                </li>
              </ul>
            </section>
            <div className="col-sm-3 col-lg-3">
              <section>
                <h3>Contact Us</h3>
                <ul className="list-unstyled">
                  <li>
                    <Link
                      id="contactFooterLink"
                      to="/CU-01"
                      target="_blank"
                    >
                      Phone Numbers
                    </Link>
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
                <object
                  id="wmms"
                  type="image/svg+xml"
                  tabIndex="-1"
                  role="img"
                  data={wmmsBlk}
                  aria-label="Symbol of the Government of Canada"
                ></object>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}