import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import GlobalMenu from './GlobalMenu';
import Breadcrumb from './Breadcrumb';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../context/LanguageContext';

export default function Header() {
  const { language, toggleLanguage, t } = useTranslation();
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/j/eng/l');
  };
  
  return (
    <div className="root">
      <div className="cmp-container">
        <div>
          <div>
            <div
              id="experiencefragment-5e7d87bbaa"
              className="cmp-experiencefragment cmp-experiencefragment--header"
            >
              <div className="xf-content-height">
                <div className="cmp-container">
                  <div className="global-header">
                    <nav>
                      <ul id="wb-tphp" className="wb-init wb-disable-inited">
                        <li className="wb-slc">
                          <a className="wb-sl" href="#wb-cont">
                            Skip to main content
                          </a>
                        </li>
                        <li className="wb-slc">
                          <a className="wb-sl" href="#wb-info">
                            Skip to "About government"
                          </a>
                        </li>
                        <li className="wb-slc">
                          <a
                            className="wb-sl"
                            href="?wbdisable=true"
                            rel="alternate"
                          >
                            Switch to basic HTML version
                          </a>
                        </li>
                      </ul>
                    </nav>

                    <header>
                      <div id="wb-bnr" className="container">
                        <div className="row">
                          <section
                            id="wb-lng"
                            className="col-xs-3 col-sm-12 pull-right text-right"
                          >
                            <h2 className="wb-inv">Language selection</h2>
                            <div className="row">
                              <div className="col-md-12">
                                <ul className="list-inline mrgn-bttm-0" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                  {user && (
                                    <li style={{ display: 'inline-flex', alignItems: 'center' }}>
                                      <button
                                        onClick={handleLogout}
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
                                        <span className="hidden-xs">{t('signOut')}</span>
                                        <span className="visible-xs text-uppercase" style={{ fontSize: '12px' }}>{t('signOut')}</span>
                                      </button>
                                    </li>
                                  )}
                                  {user && <li style={{ color: '#ccc', margin: '0 8px' }}> | </li>}
                                  <li style={{ display: 'inline-flex', alignItems: 'center' }}>
                                    <a
                                      href="#"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        toggleLanguage();
                                      }}
                                      style={{ cursor: 'pointer', color: '#284162' }}
                                    >
                                      <span className="hidden-xs">{t('frLinkText')}</span>
                                      <abbr
                                        title={t('frLinkText')}
                                        className="visible-xs h3 mrgn-tp-sm mrgn-bttm-0 text-uppercase"
                                      >
                                        {language === 'en' ? 'fr' : 'en'}
                                      </abbr>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </section>
                          <div
                            className="brand col-xs-9 col-sm-5 col-md-4"
                            property="publisher"
                            resource="#wb-publisher"
                            typeof="GovernmentOrganization"
                          >
                            <Link to="/" property="url">
                              <img
                                src="/assets/sig-blk-en.svg"
                                alt={t('govOfCanada')}
                                property="logo"
                              />
                              <span className="wb-inv">
                                <span lang="fr">Gouvernement du Canada</span>
                              </span>
                            </Link>
                            <meta
                              property="name"
                              content="Government of Canada"
                            />
                            <meta
                              property="areaServed"
                              typeof="Country"
                              content="Canada"
                            />
                            <link
                              property="logo"
                              href="/assets/wmms-blk.svg"
                            />
                          </div>
                          <section
                            id="wb-srch"
                            className="col-lg-offset-4 col-md-offset-4 col-sm-offset-2 col-xs-12 col-sm-5 col-md-4"
                          >
                            <h2>Search</h2>
                            <form
                              action="/search"
                              method="get"
                              name="cse-search-box"
                              role="search"
                            >
                              <div className="form-group wb-srch-qry">
                                <label htmlFor="wb-srch-q" className="wb-inv">
                                  Search IRCC
                                </label>
                                <input
                                  id="wb-srch-q"
                                  list="wb-srch-q-ac"
                                  className="wb-srch-q form-control"
                                  name="q"
                                  type="search"
                                  defaultValue=""
                                  size="34"
                                  maxLength="170"
                                  placeholder="Search IRCC"
                                />
                                <datalist id="wb-srch-q-ac"></datalist>
                              </div>
                              <div className="form-group submit">
                                <button
                                  type="submit"
                                  id="wb-srch-sub"
                                  className="btn btn-primary btn-small"
                                  name="wb-srch-sub"
                                >
                                  <Search className="glyphicon" size={16} />
                                  <span className="wb-inv">Search</span>
                                </button>
                              </div>
                            </form>
                          </section>
                        </div>
                      </div>
                      <hr />

                      {pathname.includes('/services') || pathname.includes('/immigration-citizenship') ? (
                        <div className="container">
                          <div className="row">
                            <div className="col-md-8">
                              <GlobalMenu />
                            </div>
                            <div className="col-xs-offset-6 col-xs-6 col-md-offset-0 col-md-4">
                              <section id="wb-so">
                                <h2 className="wb-inv">Sign in</h2>
                                <Link
                                  className="btn btn-primary"
                                  to="/immigration-refugees-citizenship/services/application/ircc-accounts"
                                >
                                  <span className="visible-xs">IRCC sign in</span>
                                  <span className="hidden-xs">IRCC sign in</span>
                                </Link>
                              </section>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="container">
                          <div className="row">
                            <div className="col-xs-12">
                              <section id="wb-so">
                                <h2 className="wb-inv">Sign in</h2>
                                <Link
                                  className="btn btn-primary"
                                  to="/immigration-refugees-citizenship/services/application/ircc-accounts"
                                >
                                  <span className="visible-xs">IRCC sign in</span>
                                  <span className="hidden-xs">IRCC sign in</span>
                                </Link>
                              </section>
                            </div>
                          </div>
                        </div>
                      )}

                      {pathname.includes('/services') || pathname.includes('/immigration-citizenship') ? (
                        <Breadcrumb />
                      ) : (
                        <nav id="wb-bc" property="breadcrumb">
                          <h2 className="wb-inv">You are here:</h2>
                          <div className="container">
                            <ol className="breadcrumb">
                              <li>
                                <Link to="/">Canada.ca</Link>
                              </li>
                            </ol>
                          </div>
                        </nav>
                      )}
                    </header>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
