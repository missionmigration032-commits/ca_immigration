import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Check, Globe, FileText, Clock, AlertTriangle } from 'lucide-react';
import { checkStatusData } from './CheckStatusData';
import SEO from '../components/SEO';

export default function CheckStatus() {
  const [path, setPath] = useState([checkStatusData]);
  const [values, setValues] = useState({});
  const [resultId, setResultId] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [errorNode, setErrorNode] = useState(null);

  const handleChange = (levelIndex, selectedValue) => {
    const node = path[levelIndex];
    const option = node.options.find(o => o.value === selectedValue);
    
    const newValues = { ...values };
    newValues[node.id] = selectedValue;
    
    // Clear downstream values
    for (let i = levelIndex + 1; i < path.length; i++) {
      delete newValues[path[i].id];
    }
    
    const newPath = path.slice(0, levelIndex + 1);
    
    if (option && option.next) {
      newPath.push(option.next);
      setResultId(null);
    } else if (option && option.result) {
      setResultId(option.result);
    } else {
      setResultId(null);
    }
    
    setValues(newValues);
    setPath(newPath);
    setShowResult(false);
    setErrorNode(null); // Clear error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nodeWithoutValue = path.find(n => !values[n.id]);
    if (nodeWithoutValue) {
      setErrorNode(nodeWithoutValue);
      setShowResult(false);
    } else {
      setErrorNode(null);
      setShowResult(true);
    }
  };

  return (
    <main property="mainContentOfPage" resource="#wb-main" typeof="WebPageElement" className="container">
      <SEO
        title="How to check your application status"
        description="Find out how to check the status of your IRCC application online, including visitor visas, study permits, work permits, and Express Entry."
        keywords="check application status Canada, IRCC status tool, visa application status, PR application status tracking"
      />
      <div className="mwstitle section">
        <h1 property="name" id="wb-cont" dir="ltr">How to check your application status</h1>
      </div>
      <div className="mwsgeneric-base-html parbase section">
        <p>Select your application type to find out how to get your application status.</p>
      </div>

      <div className="mwsgeneric-base-html parbase section">
        <div className="wb-frmvld wb-init wb-frmvld-inited wb-fieldflow-form" data-gc-analytics-formname="IRCC: Check your application status" id="wb-auto-4">
          <form noValidate onSubmit={handleSubmit}>
            {errorNode && (
              <section id="errors-default" className="alert alert-danger" tabIndex="-1">
                <h2>The form could not be submitted because 1 error was found.</h2>
                <ul>
                  <li>
                    <a href={`#${errorNode.id}`}>
                      <span className="prefix"><AlertTriangle size={16} className="mrgn-rght-sm" style={{ display: 'inline', marginBottom: '2px' }} />Error&nbsp;1: </span>
                      {errorNode.label} - This field is required.
                    </a>
                  </li>
                </ul>
              </section>
            )}
            <div className="mrgn-tp-md">
              <div id="wb-auto-6">
                
                {path.map((node, index) => {
                  const isError = errorNode && errorNode.id === node.id;
                  
                  return (
                    <div key={node.id}>
                      {node.helpText && (
                        <div className="wb-fieldflow-header">
                          <p className="wb-fieldflow-label">
                            <label htmlFor={node.id} className="required">
                              <span className="field-name">{node.label}</span> <strong className="required">(required)</strong>
                              {isError && (
                                <strong id={`${node.id}-error`} className="error">
                                  <span className="label label-danger">
                                    <span className="prefix"><AlertTriangle size={16} className="mrgn-rght-sm" style={{ display: 'inline', marginBottom: '2px' }} />Error&nbsp;1: </span>This field is required.
                                  </span>
                                </strong>
                              )}
                            </label>
                          </p>
                          {node.helpText.split('\n').map((line, i) => (
                            <p key={i} dangerouslySetInnerHTML={{__html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}}></p>
                          ))}
                        </div>
                      )}
                      
                      {!node.helpText && (
                        <label htmlFor={node.id} className="required">
                          <span className="field-name">{node.label}</span> <strong className="required" aria-hidden="true">(required)</strong>
                          {isError && (
                            <strong id={`${node.id}-error`} className="error">
                              <span className="label label-danger">
                                <span className="prefix"><AlertTriangle size={16} className="mrgn-rght-sm" style={{ display: 'inline', marginBottom: '2px' }} />Error&nbsp;1: </span>This field is required.
                              </span>
                            </strong>
                          )}
                        </label>
                      )}
                      
                      <select 
                        id={node.id} 
                        className={`full-width form-control mrgn-bttm-md ${isError ? 'error' : ''}`} 
                        required 
                        aria-invalid={isError ? 'true' : 'false'}
                        value={values[node.id] || ''} 
                        onChange={(e) => handleChange(index, e.target.value)}
                      >
                        <option value="">Make your selection...</option>
                        {node.options.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  );
                })}
                
              </div>
            </div>
            
            <input className="btn btn-primary mrgn-bttm-lg" id="contButton" type="submit" value="Continue" />
          </form>

          {showResult && resultId && (
             <div className="mwscolumns section">
               <div className="row">
                 <div className="col-xs-12">
                   <div className="alert alert-info">
                     <p>You reached a result state!</p>
                     <p>Result ID: <strong>{resultId}</strong></p>
                     <p><em>(The corresponding HTML result block will be rendered here)</em></p>
                   </div>
                 </div>
               </div>
             </div>
          )}
          
          <div className="arialive wb-inv" aria-live="polite" aria-relevant="all"></div>
        </div>
      </div>

      <div className="page-details">
        <section className="pagedetails container">
          <h2 className="wb-inv">Page details</h2>
          <div className="row">
            <div className="col-sm-8 col-md-9 col-lg-9">
              <div className="wb-disable-allow wb-init wb-data-ajax-replace-inited" data-ajax-replace="/etc/designs/canada/wet-boew/assets/feedback/page-feedback-en.html" id="wb-auto-27">
                <div id="gc-pft" className="row wb-disable-allow wb-init wb-jsonmanager-inited" data-wb-jsonmanager='{
                  "name": "gc-pft",
                  "extractor": [
                    { "selector": "title", "path": "pageData/pageTitle" },
                    { "selector": "html", "attr": "lang", "path": "pageData/language" },
                    { "interface": "locationHref", "path": "pageData/submissionPage" },
                    { "selector": "#wb-lng ul li:first-child a[lang]", "attr": "href", "path": "pageData/oppositelang" },
                    { "selector": "[data-feedback-theme]", "attr": "data-feedback-theme", "path": "pageData/themeopt" },
                    { "selector": "[data-feedback-section]", "attr": "data-feedback-section", "path": "pageData/sectionopt" },
                    { "selector": "meta[name=\"dcterms.creator\"]", "attr": "content", "path": "pageData/institutionopt" },
                    { "selector": "[data-feedback-link]", "attr": "data-feedback-link", "path": "contact/link" },
                    { "selector": "[data-feedback-url]", "attr": "data-feedback-url", "path": "contact/url" }
                  ]
                }'>
                  <div className="col-sm-10 col-md-9 col-lg-8">
                    <section className="well mrgn-bttm-0">
                      <h3 className="wb-inv">Give feedback about this page</h3>
                      <form action="https://feedback-retroaction.canada.ca/api/QueueProblemForm" method="post" className="wb-postback wb-disable-allow wb-pii-scrub wb-init wb-postback-inited wb-pii-scrub-inited" data-wb-postback='{"success":".gc-pft-thnk"}' data-wb-pii-scrub='{"modalTemplate": "[data-pft-scrub-modal]", "scrubChar": "########"}' id="wb-auto-30" data-wb-pii-blocked="true">
                        <template data-pft-scrub-modal="" className="wb-init wb-template-inited" id="wb-auto-31">
                          <header className="modal-header">
                            <h2 className="modal-title">Personal information detected in your comment</h2>
                          </header>
                          <div className="modal-body">
                            <p>Comments are only used to improve our website. You will not receive a response.</p>
                            <p><strong>To protect your privacy, remove personal information before submitting your comment:</strong></p>
                            <div data-scrub-modal-fields=""></div>
                            <details className="mrgn-tp-md">
                              <summary>What is considered personal information?</summary>
                              <p>Certain types of information <strong>can’t</strong> be included in this comment form, such as your:</p>
                              <ul>
                                <li>email address</li>
                                <li>telephone number</li>
                                <li>postal code</li>
                                <li>passport number</li>
                                <li>business number</li>
                                <li>social insurance number (SIN)</li>
                                <li>street address</li>
                              </ul>
                            </details>
                          </div>
                          <div className="modal-footer">
                            <div className="row">
                              <div className="col-xs-12 col-sm-6 mrgn-tp-sm"><button type="button" className="btn btn-primary btn-block popup-modal-dismiss">Go back and edit comment</button></div>
                            </div>
                          </div>
                        </template>
                        <div className="wb-disable-allow wb-init wb-data-json-inited" data-wb-json='{
                          "url": "#[gc-pft]/pageData",
                          "mapping": [
                            { "selector": "input", "attr": "name", "value": "/@id" },
                            { "selector": "input", "attr": "value", "value": "/@value" }
                          ]
                        }' id="wb-auto-32">
                          <template className="wb-init wb-template-inited" id="wb-auto-33">
                            <input type="hidden" name="" value="" />
                          </template>
                        
                          <input type="hidden" name="pageTitle" value="How to check the status of your IRCC application  - Canada.ca" />
                          <input type="hidden" name="language" value="en" />
                          <input type="hidden" name="submissionPage" value="https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-status.html" />
                          <input type="hidden" name="oppositelang" value="/fr/immigration-refugies-citoyennete/services/demande/verifier-etat.html" />
                          <input type="hidden" name="themeopt" value="" />
                          <input type="hidden" name="sectionopt" value="" />
                          <input type="hidden" name="institutionopt" value="Immigration, Refugees and Citizenship Canada" />
                        </div>
                        <fieldset className="gc-pft-btns chkbxrdio-grp row row-no-gutters d-sm-flex flex-sm-wrap align-items-sm-center">
                          <legend className="col-xs-12 col-sm-7 nojs-col-sm-12 col-md-9 col-lg-8 text-center text-sm-left nojs-text-left mrgn-tp-sm pr-sm-3"><span className="field-name">Did you find what you were looking for?</span></legend>
                          <div className="col-xs-12 nojs-show">
                            <button name="helpful" value="Yes-Oui" className="btn btn-primary" aria-describedby="gc-pft-why">Yes</button>
                          </div>
                          <div className="col-xs-12 col-sm-5 col-md-3 col-lg-4 text-center text-sm-right nojs-hide">
                            <button name="helpful" value="Yes-Oui" className="btn btn-primary">Yes</button>
                            <button className="btn btn-primary mrgn-lft-sm" data-wb-doaction='[
                              {"action":"removeClass","source":".gc-pft-no","class":"nojs-show"},
                              {"action":"addClass","source":".gc-pft-btns","class":"hide"}
                            ]'>No</button>
                          </div>
                        </fieldset>
                        <div className="gc-pft-no nojs-show">
                          <p id="gc-pft-why" className="nojs-show mrgn-tp-lg mrgn-bttm-md">If not, tell us why below:</p>
                          <p className="nojs-hide wb-inv" role="status">Tell us why below:</p>
                          <div className="wb-disable-allow wb-init wb-data-json-inited" data-wb-json='{
                            "url": "#[gc-pft]/contact",
                            "streamline": "true",
                            "mapping": [
                              {
                                "template": "[data-contact-template]",
                                "test": "fn:isLiteral",
                                "assess": "/url",
                                "mapping": [
                                  { "selector": "a", "type": "attr", "attr": "href", "value": "/url"  },
                                  { "selector": "a", "value": "/link"  }
                                ]
                              }
                            ]
                          }' id="wb-auto-34">
                            <template data-contact-template="" className="wb-init wb-template-inited" id="wb-auto-35">
                              <details>
                                <summary>Need urgent help with a problem? Contact us</summary>
                                <p className="mrgn-bttm-0 mrgn-tp-md fnt-nrml">
                                  <a href="#"></a>
                                </p>
                              </details>
                            </template>
                          </div>
                          <div className="form-group">
                            <label id="gc-pft-prblm-label" htmlFor="gc-pft-prblm" className="mrgn-bttm-0"><span className="field-name">Please provide more details</span></label>
                            <p id="gc-pft-prblm-note" className="mrgn-bttm-sm"><small>You will not receive a reply. Don't include personal information (telephone, email, SIN, financial, medical, or work details).</small></p>
                            <p id="gc-pft-prblm-instruction" className="fnt-nrml small">Maximum 300 characters</p>
                            <textarea id="gc-pft-prblm" aria-describedby="gc-pft-prblm-note gc-pft-prblm-instruction" name="details" className="form-control full-width" maxLength="300" data-scrub-field=""></textarea>
                          </div>
                          <button name="helpful" value="No-Non" className="btn btn-primary">Submit</button>
                        </div>
                      </form>
                      <div className="gc-pft-thnk hide">
                        <p className="mrgn-tp-sm mrgn-bttm-0" role="status"><Check className="text-success mrgn-rght-sm" size={16} aria-hidden="true" /> Thank you for your feedback.</p>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <gcds-date-modified class="hydrated">
            2026-08-18
          </gcds-date-modified>
        </section>
      </div>
    </main>
  );
}
