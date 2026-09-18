import React, { useState } from 'react';
import SEO from '../components/SEO';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function EmployeeDashboard() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect if not employee
  React.useEffect(() => {
    if (!user || (user.role !== 'employe' && user.role !== 'employee')) {
      navigate("/j/eng/l");
    }
  }, [user, navigate]);

  const [activeView, setActiveView] = useState('menu');
  const [visaLoading, setVisaLoading] = useState(false);
  const [accountLoading, setAccountLoading] = useState(false);
  const [visaMessage, setVisaMessage] = useState(null);
  const [accountMessage, setAccountMessage] = useState(null);

  // Visa Form State
  const [visaData, setVisaData] = useState({
    userId: '',
    applicationType: 'visa',
    familyName: '',
    givenNames: '',
    origin: 'ca',
    document: '',
    documentName: '',
    visaType: '',
    biometricsNumber: '',
    dateOfBiometricsEnrolment: '',
    biometricsExpiryDate: '',
    uci: '',
    applicationNumber: '',
    receiveDate: '',
    medicalExaminationPassDate: '',
    documentReviewDate: '',
    latestUpdateDate: '',
    latestUpdateStatus: 'draft',
    latestUpdateContent: ''
  });

  const [users, setUsers] = useState([]);
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [currentDocName, setCurrentDocName] = useState('');
  const [currentDocBase64, setCurrentDocBase64] = useState('');

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        let response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/users`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
        }
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setUsers(data);
          } else if (data && Array.isArray(data.users)) {
            setUsers(data.users);
          }
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    if (token) {
      fetchUsers();
    }
  }, [token]);

  // Account Form State (fixed to role: 'user')
  const [accountData, setAccountData] = useState({
    username: '',
    password: ''
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentDocBase64(reader.result);
        setCurrentDocName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const addDocumentToList = () => {
    if (!currentDocBase64) {
      alert("Please select a file first");
      return;
    }
    if (!currentDocName.trim()) {
      alert("Please enter a document name");
      return;
    }
    setUploadedDocs(prev => [
      ...prev,
      { document: currentDocBase64, documentName: currentDocName }
    ]);
    // Reset file inputs
    setCurrentDocBase64('');
    setCurrentDocName('');
    const fileInput = document.getElementById('document-input');
    if (fileInput) fileInput.value = '';
  };

  const removeDocumentFromList = (index) => {
    setUploadedDocs(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleVisaSubmit = async (e) => {
    e.preventDefault();

    if (currentDocBase64 || currentDocName.trim()) {
      alert("You have a document selected but not added. Please click 'Add Document' first or clear the input.");
      return;
    }

    setVisaLoading(true);
    setVisaMessage(null);

    const payload = {
      ...visaData,
      userId: visaData.userId,
      user: visaData.userId,
      latestUpdate: {
        date: visaData.latestUpdateDate,
        status: visaData.latestUpdateStatus,
        content: visaData.latestUpdateContent
      },
      document: uploadedDocs
    };
    delete payload.latestUpdateDate;
    delete payload.latestUpdateStatus;
    delete payload.latestUpdateContent;
    delete payload.documentName;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/visas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        setVisaMessage({ type: 'success', text: data.message || 'Visa created successfully!' });
        setUploadedDocs([]);
        setVisaData({
          userId: '',
          applicationType: 'visa',
          familyName: '',
          givenNames: '',
          origin: 'ca',
          document: '',
          documentName: '',
          visaType: '',
          biometricsNumber: '',
          dateOfBiometricsEnrolment: '',
          biometricsExpiryDate: '',
          uci: '',
          applicationNumber: '',
          receiveDate: '',
          medicalExaminationPassDate: '',
          documentReviewDate: '',
          latestUpdateDate: '',
          latestUpdateStatus: 'draft',
          latestUpdateContent: ''
        });
      } else {
        setVisaMessage({ type: 'error', text: data.message || 'Failed to create visa.' });
      }
    } catch (err) {
      console.error("Create visa error:", err);
      setVisaMessage({ type: 'error', text: 'Network error. Failed to connect to server.' });
    } finally {
      setVisaLoading(false);
    }
  };

  const handleAccountSubmit = async (e) => {
    e.preventDefault();
    setAccountLoading(true);
    setAccountMessage(null);

    const endpoint = `${import.meta.env.VITE_API_URL}/api/auth/user`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          username: accountData.username,
          password: accountData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setAccountMessage({ type: 'success', text: data.message || 'User account created successfully!' });
        setAccountData({
          username: '',
          password: ''
        });
      } else {
        setAccountMessage({ type: 'error', text: data.message || 'Failed to create user account.' });
      }
    } catch (err) {
      console.error("Create user account error:", err);
      setAccountMessage({ type: 'error', text: 'Network error. Failed to connect to server.' });
    } finally {
      setAccountLoading(false);
    }
  };

  return (
    <div className="gckey-page" style={{ backgroundColor: '#fff', minHeight: '100vh', fontFamily: 'Noto Sans, sans-serif' }}>
      <SEO
        title="Employee Dashboard - Immigration, Refugees and Citizenship Canada"
        description="Employee dashboard for managing visas and user accounts."
        keywords="employee dashboard, manage visas, create user account"
      />

      <div className="container" style={{ paddingTop: '10px', paddingBottom: '50px' }}>
        <main role="main" property="mainContentOfPage" id="wb-cont">
          <div className="row" style={{ marginBottom: '15px' }}>
            <div className="col-xs-12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
              <div>
                <h1
                  style={{
                    fontSize: '32px',
                    fontWeight: '700',
                    color: '#26374a',
                    marginTop: '10px',
                    marginBottom: '10px',
                    lineHeight: '1.2',
                  }}
                >
                  Employee Dashboard
                </h1>
                <p style={{ fontSize: '15px', color: '#333333', marginBottom: '0' }}>
                  Manage visa applications and user accounts below.
                </p>
              </div>
              <div>
                <button
                  className="btn btn-default"
                  onClick={() => {
                    logout();
                    navigate("/j/eng/l");
                  }}
                  style={{
                    fontWeight: 'bold',
                    color: '#26374a',
                    border: '1px solid #ccc',
                    padding: '8px 16px',
                  }}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          <div className="row row-flex" style={{ marginBottom: '35px', justifyContent: 'center' }}>
            
            {activeView === 'menu' && (
              <>
                <div className="col-md-6 col-sm-12" style={{ marginBottom: '20px', display: 'flex' }}>
                  <div
                    onClick={() => setActiveView('manage_visas')}
                    style={{
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      backgroundColor: '#ffffff',
                      flex: 1,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                      cursor: 'pointer',
                      padding: '40px 20px',
                      textAlign: 'center',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
                  >
                    <h2 style={{ color: '#26374a', marginTop: 0 }}>Manage Visas</h2>
                    <p style={{ color: '#333', fontSize: '16px' }}>Create and update visa applications.</p>
                  </div>
                </div>

                <div className="col-md-6 col-sm-12" style={{ marginBottom: '20px', display: 'flex' }}>
                  <div
                    onClick={() => setActiveView('account_management')}
                    style={{
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      backgroundColor: '#ffffff',
                      flex: 1,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                      cursor: 'pointer',
                      padding: '40px 20px',
                      textAlign: 'center',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
                  >
                    <h2 style={{ color: '#26374a', marginTop: 0 }}>Account Management</h2>
                    <p style={{ color: '#333', fontSize: '16px' }}>Create new user accounts.</p>
                  </div>
                </div>
              </>
            )}

            {activeView === 'manage_visas' && (
              <div className="col-md-8 col-sm-12" style={{ marginBottom: '25px', marginLeft: 'auto', marginRight: 'auto', float: 'none' }}>
                <button
                  className="btn btn-default"
                  style={{ marginBottom: '15px' }}
                  onClick={() => setActiveView('menu')}
                >
                  &larr; Back to Dashboard
                </button>
                <div
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  }}
                >
                  <div
                    style={{
                      backgroundColor: '#f5f5f5',
                      borderBottom: '1px solid #ccc',
                      padding: '12px 18px',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      color: '#26374a',
                    }}
                  >
                    Manage Visas - Create Visa
                  </div>
                  <div style={{ padding: '18px', fontSize: '15px', lineHeight: '1.5', color: '#333' }}>
                    {visaMessage && (
                      <div className={`alert ${visaMessage.type === 'success' ? 'alert-success' : 'alert-danger'}`} style={{ marginBottom: '15px', padding: '10px 15px', borderRadius: '4px' }}>
                        {visaMessage.text}
                      </div>
                    )}
                    <form onSubmit={handleVisaSubmit} autoComplete="off">
                      <div className="form-group">
                        <label htmlFor="userId"><span className="field-name">User ID (or Select User):</span></label>
                        {users.length > 0 ? (
                          <select
                            className="form-control"
                            id="userId"
                            value={visaData.userId}
                            onChange={(e) => setVisaData({ ...visaData, userId: e.target.value })}
                            required
                          >
                            <option value="">-- Select User --</option>
                            {users.map(u => (
                              <option key={u._id} value={u._id}>
                                {u.username} ({u._id})
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            id="userId"
                            value={visaData.userId}
                            onChange={(e) => setVisaData({ ...visaData, userId: e.target.value })}
                            placeholder="Enter MongoDB User ID"
                            required
                          />
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="applicationType"><span className="field-name">Application Type:</span></label>
                        <select
                          className="form-control"
                          id="applicationType"
                          value={visaData.applicationType}
                          onChange={(e) => setVisaData({ ...visaData, applicationType: e.target.value })}
                        >
                          <option value="visa">visa</option>
                          <option value="sponsorship">sponsorship</option>
                          <option value="aewv">aewv</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="visaType"><span className="field-name">Visa Type:</span></label>
                        <input
                          type="text"
                          className="form-control"
                          id="visaType"
                          value={visaData.visaType || ''}
                          onChange={(e) => setVisaData({ ...visaData, visaType: e.target.value })}
                          placeholder="e.g. Student, Visitor, Work"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="givenNames"><span className="field-name">Given Names:</span></label>
                        <input type="text" className="form-control" id="givenNames" value={visaData.givenNames} onChange={(e) => setVisaData({ ...visaData, givenNames: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="familyName"><span className="field-name">Family Name:</span></label>
                        <input type="text" className="form-control" id="familyName" value={visaData.familyName} onChange={(e) => setVisaData({ ...visaData, familyName: e.target.value })} />
                      </div>
                      <div className="form-group" style={{ border: '1px dashed #ccc', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
                        <label style={{ fontWeight: 'bold', color: '#26374a', marginBottom: '10px', display: 'block' }}>Documents List</label>
                        
                        {uploadedDocs.length > 0 ? (
                          <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                            {uploadedDocs.map((doc, index) => (
                              <li key={index} style={{ marginBottom: '5px', fontSize: '14px' }}>
                                <strong>{doc.documentName}</strong> ({doc.document.startsWith('data:') ? 'New Upload' : 'Existing File'})
                                <button
                                  type="button"
                                  onClick={() => removeDocumentFromList(index)}
                                  style={{
                                    marginLeft: '10px',
                                    backgroundColor: '#d9534f',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '2px 8px',
                                    borderRadius: '3px',
                                    fontSize: '12px',
                                    cursor: 'pointer'
                                  }}
                                >
                                  Remove
                                </button>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p style={{ fontSize: '14px', color: '#666', fontStyle: 'italic', marginBottom: '15px' }}>No documents added yet.</p>
                        )}

                        <div className="row-no-gutters" style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                          <div style={{ flex: 1, minWidth: '200px' }}>
                            <label htmlFor="document-input" style={{ fontSize: '13px', fontWeight: 'normal', marginBottom: '4px', display: 'block' }}>Choose File:</label>
                            <input
                              type="file"
                              className="form-control"
                              id="document-input"
                              onChange={handleFileChange}
                              style={{ height: '38px', padding: '6px 12px' }}
                            />
                          </div>
                          <div style={{ flex: 1, minWidth: '200px' }}>
                            <label htmlFor="document-name-input" style={{ fontSize: '13px', fontWeight: 'normal', marginBottom: '4px', display: 'block' }}>Document Name:</label>
                            <input
                              type="text"
                              className="form-control"
                              id="document-name-input"
                              value={currentDocName}
                              onChange={(e) => setCurrentDocName(e.target.value)}
                              placeholder="e.g. Passport, Visa letter"
                              style={{ height: '38px' }}
                            />
                          </div>
                          <div>
                            <button
                              type="button"
                              onClick={addDocumentToList}
                              className="btn btn-default"
                              style={{
                                fontWeight: 'bold',
                                color: '#26374a',
                                border: '1px solid #ccc',
                                height: '38px',
                                padding: '0 15px',
                                display: 'inline-flex',
                                alignItems: 'center'
                              }}
                            >
                              + Add Document
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="biometricsNumber"><span className="field-name">Biometrics Number:</span></label>
                        <input type="text" className="form-control" id="biometricsNumber" value={visaData.biometricsNumber} onChange={(e) => setVisaData({ ...visaData, biometricsNumber: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="dateOfBiometricsEnrolment"><span className="field-name">Date of Biometrics Enrolment:</span></label>
                        <input type="date" className="form-control" id="dateOfBiometricsEnrolment" value={visaData.dateOfBiometricsEnrolment} onChange={(e) => setVisaData({ ...visaData, dateOfBiometricsEnrolment: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="biometricsExpiryDate"><span className="field-name">Biometrics Expiry Date:</span></label>
                        <input type="date" className="form-control" id="biometricsExpiryDate" value={visaData.biometricsExpiryDate} onChange={(e) => setVisaData({ ...visaData, biometricsExpiryDate: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="uci"><span className="field-name">UCI:</span></label>
                        <input type="text" className="form-control" id="uci" value={visaData.uci} onChange={(e) => setVisaData({ ...visaData, uci: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="applicationNumber"><span className="field-name">Application Number:</span></label>
                        <input type="text" className="form-control" id="applicationNumber" value={visaData.applicationNumber} onChange={(e) => setVisaData({ ...visaData, applicationNumber: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="receiveDate"><span className="field-name">Receive Date:</span></label>
                        <input type="date" className="form-control" id="receiveDate" value={visaData.receiveDate} onChange={(e) => setVisaData({ ...visaData, receiveDate: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="medicalExaminationPassDate"><span className="field-name">Medical Examination Pass Date:</span></label>
                        <input type="date" className="form-control" id="medicalExaminationPassDate" value={visaData.medicalExaminationPassDate} onChange={(e) => setVisaData({ ...visaData, medicalExaminationPassDate: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="documentReviewDate"><span className="field-name">Document Review Date:</span></label>
                        <input type="date" className="form-control" id="documentReviewDate" value={visaData.documentReviewDate} onChange={(e) => setVisaData({ ...visaData, documentReviewDate: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="latestUpdateDate"><span className="field-name">Latest Update Date:</span></label>
                        <input type="date" className="form-control" id="latestUpdateDate" value={visaData.latestUpdateDate} onChange={(e) => setVisaData({ ...visaData, latestUpdateDate: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="latestUpdateStatus"><span className="field-name">Latest Update Status:</span></label>
                        <input type="text" className="form-control" id="latestUpdateStatus" value={visaData.latestUpdateStatus} onChange={(e) => setVisaData({ ...visaData, latestUpdateStatus: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="latestUpdateContent"><span className="field-name">Latest Update Content:</span></label>
                        <textarea
                          className="form-control"
                          id="latestUpdateContent"
                          rows="3"
                          style={{ minHeight: '80px', resize: 'vertical' }}
                          value={visaData.latestUpdateContent}
                          onChange={(e) => setVisaData({ ...visaData, latestUpdateContent: e.target.value })}
                        />
                      </div>

                      <div className="form-group form-buttons">
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '15px' }} disabled={visaLoading}>
                          {visaLoading ? 'Creating Visa...' : 'Create Visa'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {activeView === 'account_management' && (
              <div className="col-md-8 col-sm-12" style={{ marginBottom: '25px', marginLeft: 'auto', marginRight: 'auto', float: 'none' }}>
                <button
                  className="btn btn-default"
                  style={{ marginBottom: '15px' }}
                  onClick={() => setActiveView('menu')}
                >
                  &larr; Back to Dashboard
                </button>
                <div
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  }}
                >
                  <div
                    style={{
                      backgroundColor: '#f5f5f5',
                      borderBottom: '1px solid #ccc',
                      padding: '12px 18px',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      color: '#26374a',
                    }}
                  >
                    Account Management - Create Account
                  </div>
                  <div style={{ padding: '18px', fontSize: '15px', lineHeight: '1.5', color: '#333' }}>
                    {accountMessage && (
                      <div className={`alert ${accountMessage.type === 'success' ? 'alert-success' : 'alert-danger'}`} style={{ marginBottom: '15px', padding: '10px 15px', borderRadius: '4px' }}>
                        {accountMessage.text}
                      </div>
                    )}
                    <form onSubmit={handleAccountSubmit} autoComplete="off">
                      <div className="form-group">
                        <label htmlFor="username">
                          <span className="field-name">Username:</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          value={accountData.username}
                          onChange={(e) => setAccountData({ ...accountData, username: e.target.value })}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="password">
                          <span className="field-name">Password:</span>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          value={accountData.password}
                          onChange={(e) => setAccountData({ ...accountData, password: e.target.value })}
                          required
                        />
                      </div>

                      <div className="form-group form-buttons">
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '15px' }} disabled={accountLoading}>
                          {accountLoading ? 'Creating User...' : 'Create User'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
