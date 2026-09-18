import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const countries = [
  { code: 'AF', name: 'Afghanistan' },
  { code: 'AL', name: 'Albania' },
  { code: 'DZ', name: 'Algeria' },
  { code: 'CN', name: 'China (People’s Republic of)' },
  { code: 'IN', name: 'India' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'US', name: 'United States of America' },
  // Adding a few for illustration since the full list is very long
];

const CheckProcessingTimes = () => {
  const [appType, setAppType] = useState('');
  const [tempType, setTempType] = useState('');
  const [country, setCountry] = useState('');

  const handleAppTypeChange = (e) => {
    setAppType(e.target.value);
    setTempType('');
    setCountry('');
  };

  const handleTempTypeChange = (e) => {
    setTempType(e.target.value);
    setCountry('');
  };

  const showCountryDropdown = 
    tempType === 'visitor-outside' || 
    tempType === 'super-visa' || 
    tempType === 'study-permit-outside';

  const showResults = 
    tempType === 'visitor-inside' || 
    tempType === 'visitor-extension' || 
    (showCountryDropdown && country !== '');

  return (
    <>
      <SEO
        title="Check our current processing times"
        description="Check official IRCC processing times for visitor visas, study permits, work permits, permanent residence, and super visas."
        keywords="IRCC processing times, Canada visa processing time, study permit processing time, work permit turnaround time"
      />
      <div className="mwsgeneric-base-html parbase section">
        <div className="container">
          <h1 property="name" id="wb-cont">Check our current processing times</h1>
        </div>
      </div>
      <div className="mwsgeneric-base-html parbase section">
        <div className="container">
          <div className="alert alert-danger">
            <p>
              <strong>
                Foreign nationals living in the Democratic Republic of the Congo, South Sudan and Uganda are temporarily not permitted to travel to Canada
              </strong>
            </p>
            <p>
              We aren’t finalizing applications from the Democratic Republic of the Congo, Uganda or South Sudan at this time. Because of this, your processing time may be longer than the times shown below if the last country of residence on your application was one of these countries.
            </p>
            <p>
              <Link to="/immigration-refugees-citizenship/services/special-measures/ebola-2026">
                Learn more about these special measures
              </Link>.
            </p>
          </div>

          <p>Select your application type to get an idea of how long it’ll take us to process your application.</p>
          <p>
            <strong>Your</strong> application may take longer than the times shown here. They’re <strong>not</strong> a maximum or a guarantee.
          </p>

          <div id="main">
            <div id="dropdown">
              <div className="wb-frmvld wb-init wb-frmvld-inited wb-fieldflow-form">
                <form id="ptt-form">
                  <div className="wb-fieldflow-sub">
                    <label htmlFor="application-type">
                      <span className="field-name">Select an application type.</span>
                    </label>
                    <select 
                      className="form-control" 
                      id="application-type" 
                      value={appType} 
                      onChange={handleAppTypeChange}
                    >
                      <option value="" disabled>Select...</option>
                      <option value="temporary-residence">Temporary residence (visiting, studying, working)</option>
                    </select>
                  </div>

                  {appType === 'temporary-residence' && (
                    <div className="wb-fieldflow-sub mt-3">
                      <label htmlFor="temporary-type">
                        <span className="field-name">Which temporary residence application?</span>
                      </label>
                      <select 
                        className="form-control" 
                        id="temporary-type" 
                        value={tempType} 
                        onChange={handleTempTypeChange}
                      >
                        <option value="" disabled>Select...</option>
                        <option value="visitor-outside">Visitor visa (from outside Canada)</option>
                        <option value="visitor-inside">Visitor visa (from inside Canada)</option>
                        <option value="visitor-extension">Visitor extension (Visitor record)</option>
                        <option value="super-visa">Super visa (parents or grandparents)</option>
                        <option value="study-permit-outside">Study permit (from outside Canada)</option>
                      </select>
                    </div>
                  )}

                  {showCountryDropdown && (
                    <div className="wb-fieldflow-sub mt-3">
                      <label htmlFor="country-select">
                        <span className="field-name">
                          {tempType === 'super-visa' 
                            ? 'Where do your parents or grandparents live?' 
                            : 'Where are you applying from?'}
                        </span>
                      </label>
                      <select 
                        className="form-control" 
                        id="country-select" 
                        value={country} 
                        onChange={(e) => setCountry(e.target.value)}
                      >
                        <option value="" disabled>Select...</option>
                        {countries.map(c => (
                          <option key={c.code} value={c.code}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {showResults && (
              <div id="result" className="mt-5 p-4 bg-light border rounded">
                <h3>Processing Time</h3>
                <p className="fs-1 fw-bold text-primary">
                  {/* Mock data based on selection */}
                  {tempType === 'visitor-inside' ? '14 days' : 
                   tempType === 'visitor-extension' ? '80 days' : 
                   '45 days'}
                </p>
                <p id="last-updated" className="text-muted mb-0">Last updated: Today</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckProcessingTimes;
