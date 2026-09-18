import { useState } from 'react';
import DelayedLink from '../components/DelayedLink';
import SEO from '../components/SEO';
import { useTranslation } from '../context/LanguageContext';
import {
  ClipboardList,
  FilePlus,
  Files,
  Users,
  Fingerprint,
  Search as SearchIcon,
  Scale,
  Download
} from 'lucide-react';

export default function MyCICDashboard() {
  const { t } = useTranslation();
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Messages table states
  const [msgSearch, setMsgSearch] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Load selected visa from localStorage if available
  const [visa] = useState(() => {
    const saved = localStorage.getItem('selectedVisa');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        console.error("Failed to parse selected visa");
      }
    }
    return null;
  });

  const applicantName = visa ? `${visa.givenNames || ''} ${visa.familyName || ''}`.trim() : "";
  const appNumber = visa?.applicationNumber || "";
  const dateSentStr = visa?.latestUpdate?.date || "";

  const messagesList = [];
  if (visa?.document) {
    if (Array.isArray(visa.document)) {
      visa.document.forEach((doc, idx) => {
        messagesList.push({
          id: doc._id || `MSG-${idx}`,
          subject: doc.name || visa.documentName || t('originalPassportRequest'),
          dateSent: dateSentStr,
          dateRead: dateSentStr,
          sender: t('senderIRCC'),
          content: t('messageContentText', { name: applicantName, appNum: appNumber }),
          pdfUrl: doc.url
        });
      });
    } else if (typeof visa.document === 'string') {
      messagesList.push({
        id: 'MSG-legacy',
        subject: visa.documentName || t('originalPassportRequest'),
        dateSent: dateSentStr,
        dateRead: dateSentStr,
        sender: t('senderIRCC'),
        content: t('messageContentText', { name: applicantName, appNum: appNumber }),
        pdfUrl: visa.document
      });
    }
  }

  // Filtering messages
  const filteredMessages = messagesList.filter((msg) =>
    msg.subject.toLowerCase().includes(msgSearch.toLowerCase()) ||
    msg.dateSent.toLowerCase().includes(msgSearch.toLowerCase()) ||
    msg.dateRead.toLowerCase().includes(msgSearch.toLowerCase())
  );
  const displayedMessages = filteredMessages.slice(0, entriesPerPage);

  const openPdfInNewTab = (pdfUrl) => {
    if (!pdfUrl) return;
    if (pdfUrl.startsWith('data:')) {
      try {
        const parts = pdfUrl.split(',');
        const mime = parts[0].match(/:(.*?);/)[1];
        const bstr = atob(parts[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        const blob = new Blob([u8arr], { type: mime });
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, '_blank');
      } catch (err) {
        console.error("Failed to parse base64 PDF", err);
        const newWindow = window.open();
        if (newWindow) {
          newWindow.document.write(`<iframe src="${pdfUrl}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
        }
      }
    } else {
      window.open(pdfUrl, '_blank');
    }
  };

  return (
    <div className="gckey-page" style={{ backgroundColor: '#fff', minHeight: '100vh', fontFamily: 'Noto Sans, sans-serif' }}>
      <SEO
        title="Application/profile details - Immigration, Refugees and Citizenship Canada"
        description="View status, messages, biometrics information and detailed application updates on your MyCIC account dashboard."
        keywords="MyCIC dashboard, IRCC application status, biometrics Canada visa, UCI number, application status and messages"
      />

      <div className="container" style={{ paddingTop: '10px', paddingBottom: '50px' }}>
        <main role="main" property="mainContentOfPage" id="wb-cont">
          
          {/* Main Title & Subtitle */}
          <div className="row" style={{ marginBottom: '15px' }}>
            <div className="col-xs-12">
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
                {t('appStatusMessages')}
              </h1>
              <p style={{ fontSize: '15px', color: '#333333', marginBottom: '20px' }}>
                {t('appStatusMessagesDesc')}
              </p>
            </div>
          </div>

          {/* TWO SIDE-BY-SIDE CARDS: Application Status (Left) & Applicant Information (Right) */}
          <div className="row row-flex" style={{ marginBottom: '35px' }}>
            {/* Left Box: Application status */}
            <div className="col-md-6 col-sm-12" style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  backgroundColor: '#ffffff',
                  flex: 1,
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
                  {t('appStatusBox')}
                </div>
                <div style={{ padding: '18px', fontSize: '15px', lineHeight: '1.5', color: '#333' }}>
                  <p style={{ marginBottom: '16px' }}>
                    {t('processingDesc')}
                  </p>
                  <p style={{ fontWeight: 'bold', marginBottom: '6px', color: '#26374a' }}>
                    {t('latestUpdateLabel')}
                  </p>
                  <p style={{ margin: 0 }}>
                    {visa?.latestUpdate ? (
                      <>
                        <strong>{visa.latestUpdate.status} - {visa.latestUpdate.date}:</strong> {visa.latestUpdate.content}
                      </>
                    ) : (
                      <>
                        <strong>Final decision - August 14, 2026:</strong> Your application has been approved. We sent you a message to request your passport.
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Box: Applicant Information */}
            <div className="col-md-6 col-sm-12" style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  backgroundColor: '#ffffff',
                  flex: 1,
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
                  {t('appInfoBox')}
                </div>
                <div style={{ padding: '18px', fontSize: '14px', lineHeight: '1.7', color: '#333' }}>
                  <div>
                    <strong>{t('principalApplicant')}:</strong> {applicantName}
                  </div>
                  <div>
                    <strong>{t('uci')}:</strong> {visa?.uci || "11-4897-0335"}
                  </div>
                  <div>
                    <strong>{t('appNumber')}:</strong> {appNumber}
                  </div>
                  <div>
                    <strong>{t('dateReceived')}:</strong> {visa?.receiveDate || "August, 14, 2026"}
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <strong>{t('biometrics')}:</strong>
                    <ul style={{ margin: '4px 0 0 0', paddingLeft: '22px', color: '#333' }}>
                      <li>
                        <strong>{t('biometricsNum')}:</strong> {visa?.biometricsNumber || "1000025187767"}
                      </li>
                      <li>
                        <strong>{t('biometricsEnrolDate')}:</strong> {visa?.dateOfBiometricsEnrolment || "March 24, 2026"}
                      </li>
                      <li>
                        <strong>{t('expiryDate')}:</strong> {visa?.biometricsExpiryDate || "TBD"}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 1: DETAILS ABOUT YOUR APPLICATION STATUS */}
          <section style={{ marginBottom: '35px' }}>
            <div className="row">
              <div className="col-xs-12">
                <h2
                  style={{
                    fontSize: '26px',
                    fontWeight: '700',
                    color: '#26374a',
                    marginTop: '5px',
                    marginBottom: '12px',
                  }}
                >
                  {t('detailsStatusTitle')}
                </h2>
                <p style={{ fontSize: '15px', color: '#333333', marginBottom: '25px', lineHeight: '1.5' }}>
                  {t('stepsExplanation')}
                </p>
              </div>
            </div>

            {/* Status List Matching Screenshot Exactly */}
            <div style={{ paddingLeft: '5px' }}>

              {/* 1. Review of eligibility */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ClipboardList size={22} style={{ color: '#26374a' }} />
                  <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 'bold', color: '#26374a' }}>
                    {t('reviewEligibility')}
                  </h3>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#26374a',
                      color: '#fff',
                      borderRadius: '50%',
                      width: '18px',
                      height: '18px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                    title="Help on Review of eligibility"
                  >
                    ?
                  </span>
                </div>
                <ul style={{ margin: '4px 0 0 0', paddingLeft: '32px', color: '#333', fontSize: '15px' }}>
                  <li>{t('eligibilityText')}</li>
                </ul>
              </div>

              {/* 2. Review of medical results */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FilePlus size={22} style={{ color: '#26374a' }} />
                  <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 'bold', color: '#26374a' }}>
                    {t('reviewMedical')}
                  </h3>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#26374a',
                      color: '#fff',
                      borderRadius: '50%',
                      width: '18px',
                      height: '18px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                    title="Help on Review of medical results"
                  >
                    ?
                  </span>
                </div>
                <ul style={{ margin: '4px 0 0 0', paddingLeft: '32px', color: '#333', fontSize: '15px' }}>
                  <li>{visa?.medicalExaminationPassDate || "March 24, 2026"} {t('medicalPassText')}</li>
                </ul>
              </div>

              {/* 3. Review of additional documents */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Files size={22} style={{ color: '#26374a' }} />
                  <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 'bold', color: '#26374a' }}>
                    {t('reviewDocs')}
                  </h3>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#26374a',
                      color: '#fff',
                      borderRadius: '50%',
                      width: '18px',
                      height: '18px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                    title="Help on Review of additional documents"
                  >
                    ?
                  </span>
                </div>
                <ul style={{ margin: '4px 0 0 0', paddingLeft: '32px', color: '#333', fontSize: '15px' }}>
                  <li>{visa?.documentReviewDate || "March 24, 2026"} {t('docsReviewText')}</li>
                </ul>
              </div>

              {/* 4. Interview */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Users size={22} style={{ color: '#26374a' }} />
                  <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 'bold', color: '#26374a' }}>
                    {t('interview')}
                  </h3>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#26374a',
                      color: '#fff',
                      borderRadius: '50%',
                      width: '18px',
                      height: '18px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                    title="Help on Interview"
                  >
                    ?
                  </span>
                </div>
                <ul style={{ margin: '4px 0 0 0', paddingLeft: '32px', color: '#333', fontSize: '15px' }}>
                  <li>{t('noInterviewText')}</li>
                </ul>
              </div>

              {/* 5. Biometrics */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Fingerprint size={22} style={{ color: '#26374a' }} />
                  <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 'bold', color: '#26374a' }}>
                    {t('biometrics')}
                  </h3>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#26374a',
                      color: '#fff',
                      borderRadius: '50%',
                      width: '18px',
                      height: '18px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                    title="Help on Biometrics"
                  >
                    ?
                  </span>
                </div>
                <ul style={{ margin: '4px 0 0 0', paddingLeft: '32px', color: '#333', fontSize: '15px' }}>
                  {visa?.dateOfBiometricsEnrolment ? (
                    <li>{visa.dateOfBiometricsEnrolment} {t('receivedFingerprintsText')}</li>
                  ) : (
                    <li>{t('noFingerprintsText')}</li>
                  )}
                </ul>
              </div>

              {/* 6. Background check */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <SearchIcon size={22} style={{ color: '#26374a' }} />
                  <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 'bold', color: '#26374a' }}>
                    {t('backgroundCheck')}
                  </h3>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#26374a',
                      color: '#fff',
                      borderRadius: '50%',
                      width: '18px',
                      height: '18px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                    title="Help on Background check"
                  >
                    ?
                  </span>
                </div>
                <ul style={{ margin: '4px 0 0 0', paddingLeft: '32px', color: '#333', fontSize: '15px' }}>
                  <li>{t('backgroundText')}</li>
                </ul>
              </div>

              {/* 7. Final decision */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Scale size={22} style={{ color: '#26374a' }} />
                  <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 'bold', color: '#26374a' }}>
                    {t('finalDecision')}
                  </h3>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#26374a',
                      color: '#fff',
                      borderRadius: '50%',
                      width: '18px',
                      height: '18px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                    title="Help on Final decision"
                  >
                    ?
                  </span>
                </div>
                <ul style={{ margin: '4px 0 0 0', paddingLeft: '32px', color: '#333', fontSize: '15px' }}>
                  <li>{visa?.latestUpdate?.date || "August 14, 2026"} {t('finalDecisionText')}</li>
                </ul>
              </div>

            </div>
          </section>

          {/* SECTION 2: MESSAGES ABOUT YOUR APPLICATION (Matches Screenshot Exactly) */}
          <section style={{ marginBottom: '40px', marginTop: '40px' }}>
            <div className="row">
              <div className="col-xs-12">
                <h2
                  style={{
                    fontSize: '26px',
                    fontWeight: '700',
                    color: '#26374a',
                    marginTop: '10px',
                    marginBottom: '12px',
                  }}
                >
                  {t('messagesTitle')}
                </h2>

                {/* Notice Banner */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '18px',
                    fontSize: '15px',
                    color: '#333',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#31708f',
                      color: '#ffffff',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      fontSize: '13px',
                      fontWeight: 'bold',
                      flexShrink: 0,
                    }}
                  >
                    i
                  </span>
                  <span>
                    {t('messagesNotice')}
                  </span>
                </div>
              </div>
            </div>

            {/* Table Control Bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px',
                marginBottom: '10px',
                fontSize: '14px',
                color: '#333',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <label htmlFor="msg-search-input" style={{ fontWeight: 'normal', marginBottom: 0 }}>
                  {t('searchLabel')}
                </label>
                <input
                  id="msg-search-input"
                  type="text"
                  value={msgSearch}
                  onChange={(e) => setMsgSearch(e.target.value)}
                  style={{
                    border: '1px solid #aaa',
                    padding: '3px 8px',
                    fontSize: '14px',
                    width: '180px',
                    height: '30px',
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>
                  {t('showingEntries', {
                    start: filteredMessages.length === 0 ? 0 : 1,
                    end: Math.min(filteredMessages.length, entriesPerPage),
                    total: filteredMessages.length
                  })}
                </span>
                <span style={{ margin: '0 4px', color: '#888' }}>|</span>
                <label htmlFor="msg-entries-select" style={{ fontWeight: 'normal', marginBottom: 0 }}>
                  {t('showLabel')}
                </label>
                <select
                  id="msg-entries-select"
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                  style={{
                    border: '1px solid #aaa',
                    padding: '2px 6px',
                    fontSize: '14px',
                    height: '30px',
                    backgroundColor: '#fff',
                  }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                </select>
                <span>{t('entriesLabel')}</span>
              </div>
            </div>

            {/* Messages Data Table */}
            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  border: '1px solid #ccc',
                  fontSize: '14px',
                  backgroundColor: '#fff',
                }}
              >
                <thead>
                  <tr style={{ borderBottom: '2px solid #ccc', color: '#222', backgroundColor: '#f5f5f5' }}>
                    <th
                      style={{
                        padding: '10px 12px',
                        borderRight: '1px solid #ccc',
                        fontWeight: 'bold',
                        textAlign: 'left',
                        verticalAlign: 'middle',
                        width: '55%',
                      }}
                    >
                      {t('subject')} <span style={{ marginLeft: '4px', color: '#666', fontSize: '12px' }}>↓↑</span>
                    </th>
                    <th
                      style={{
                        padding: '10px 12px',
                        borderRight: '1px solid #ccc',
                        fontWeight: 'bold',
                        textAlign: 'left',
                        verticalAlign: 'middle',
                        width: '22%',
                        backgroundColor: '#e5e5e5',
                      }}
                    >
                      {t('dateSentLabel')} <span style={{ marginLeft: '4px', color: '#000', fontSize: '13px' }}>↓</span>
                    </th>
                    <th
                      style={{
                        padding: '10px 12px',
                        fontWeight: 'bold',
                        textAlign: 'left',
                        verticalAlign: 'middle',
                        width: '23%',
                      }}
                    >
                      {t('dateReadLabel')} <span style={{ marginLeft: '4px', color: '#666', fontSize: '12px' }}>↓↑</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {displayedMessages.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        style={{
                          padding: '14px 12px',
                          textAlign: 'center',
                          color: '#555',
                          verticalAlign: 'middle',
                          borderBottom: '1px solid #ccc',
                        }}
                      >
                        {t('noDataText')}
                      </td>
                    </tr>
                  ) : (
                    displayedMessages.map((row, idx) => (
                      <tr
                        key={row.id}
                        style={{
                          borderBottom: '1px solid #eee',
                          backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f9f9f9',
                        }}
                      >
                        <td style={{ padding: '10px 12px', borderRight: '1px solid #eee', verticalAlign: 'middle' }}>
                          {row.pdfUrl ? (
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                openPdfInNewTab(row.pdfUrl);
                              }}
                              style={{
                                color: '#284162',
                                textDecoration: 'underline',
                                fontSize: '14px',
                              }}
                            >
                              {row.subject}
                            </a>
                          ) : (
                            <button
                              onClick={() => setSelectedMessage(row)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#284162',
                                textDecoration: 'underline',
                                padding: 0,
                                fontSize: '14px',
                                textAlign: 'left',
                                cursor: 'pointer',
                                fontWeight: 'normal',
                              }}
                            >
                              {row.subject}
                            </button>
                          )}
                        </td>
                        <td style={{ padding: '10px 12px', borderRight: '1px solid #eee', color: '#333', verticalAlign: 'middle' }}>
                          {row.dateSent}
                        </td>
                        <td style={{ padding: '10px 12px', color: '#333', verticalAlign: 'middle' }}>
                          {row.dateRead}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Button */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
              <button
                style={{
                  backgroundColor: '#284162',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '3px',
                  padding: '6px 14px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'default',
                }}
              >
                1
              </button>
            </div>

          </section>

          {/* Message Document Viewer Modal */}
          {selectedMessage && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999,
                padding: '20px',
              }}
            >
              <div
                style={{
                  backgroundColor: '#fff',
                  width: '100%',
                  maxWidth: '650px',
                  borderRadius: '6px',
                  boxShadow: '0 5px 25px rgba(0,0,0,0.3)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#26374a',
                    color: '#fff',
                    padding: '16px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>
                    {selectedMessage.subject}
                  </h3>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#fff',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                  >
                    ×
                  </button>
                </div>
                
                <div style={{ padding: '20px', maxHeight: '400px', overflowY: 'auto', fontSize: '14px', lineHeight: '1.6', color: '#222' }}>
                  <div style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px', color: '#555', fontSize: '13px' }}>
                    <div><strong>{t('from')}:</strong> {selectedMessage.sender}</div>
                    <div><strong>{t('dateSentLabel')}:</strong> {selectedMessage.dateSent}</div>
                    <div><strong>{t('appNumber')}:</strong> {appNumber}</div>
                  </div>
                  
                  <pre style={{ fontFamily: 'Noto Sans, sans-serif', whiteSpace: 'pre-wrap', margin: 0, backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '4px', border: '1px solid #e0e0e0' }}>
                    {selectedMessage.content}
                  </pre>
                </div>

                <div
                  style={{
                    backgroundColor: '#f5f5f5',
                    padding: '12px 20px',
                    borderTop: '1px solid #ddd',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <button
                    onClick={() => {
                      if (selectedMessage.pdfUrl) {
                        openPdfInNewTab(selectedMessage.pdfUrl);
                      } else {
                        alert(`Opening ${selectedMessage.subject} in a new tab...`);
                      }
                    }}
                    style={{
                      backgroundColor: '#e1e4e7',
                      color: '#26374a',
                      border: '1px solid #bbb',
                      padding: '6px 14px',
                      borderRadius: '4px',
                      fontSize: '13px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Download size={14} /> {t('downloadPdf')}
                  </button>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    style={{
                      backgroundColor: '#284162',
                      color: '#fff',
                      border: 'none',
                      padding: '6px 16px',
                      borderRadius: '4px',
                      fontSize: '13px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                  >
                    {t('close')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Page Feedback Action Box */}
          <div className="row" style={{ marginTop: '30px', marginBottom: '20px' }}>
            <div className="col-xs-12">
              <button
                style={{
                  backgroundColor: '#eaebed',
                  color: '#284162',
                  border: '1px solid #ccc',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: 'normal',
                  cursor: 'pointer',
                }}
                onClick={() => alert('Feedback form triggered')}
              >
                {t('reportProblem')}
              </button>
            </div>
          </div>

          {/* Bottom Action Link */}
          <div className="row" style={{ marginTop: '10px', borderTop: '1px solid #ddd', paddingTop: '15px' }}>
            <div className="col-xs-12">
              <DelayedLink to="/mycic/home" style={{ color: '#284162', textDecoration: 'underline', fontWeight: 'bold', fontSize: '15px' }}>
                {t('returnHome')}
              </DelayedLink>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
