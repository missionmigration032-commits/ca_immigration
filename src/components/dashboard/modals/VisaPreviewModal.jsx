import { X, ExternalLink, FileText } from 'lucide-react';

export default function VisaPreviewModal({ item, type = 'visa', onClose }) {
  if (!item) return null;

  const isVisa = type === 'visa';
  const title = isVisa
    ? `Visa Details: ${item.applicationNumber || item.uci || item._id}`
    : `${type === 'sponsorship' ? 'Sponsorship' : 'Nomination'} Details: ${item.applicationId || item.fileNumber || item._id}`;

  const applicantName = isVisa
    ? (item.visaApplicant || `${item.givenNames || ''} ${item.familyName || ''}`.trim() || 'N/A')
    : `${item.givenName || ''} ${item.familyName || ''}`.trim() || 'N/A';

  const documents = Array.isArray(item.document) ? item.document : [];

  return (
    <div className="ca-modal-overlay">
      <div className="ca-modal-dialog ca-modal-dialog-large">
        <div className="ca-modal-header">
          <h3>{title}</h3>
          <button type="button" className="ca-modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="ca-modal-body">
          {/* Summary Banner */}
          <div style={{ backgroundColor: '#f1f4f7', padding: '16px', borderRadius: '4px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <div style={{ fontSize: '12px', textTransform: 'uppercase', color: '#666', fontWeight: 'bold' }}>Principal Applicant</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--ca-navy)' }}>{applicantName}</div>
            </div>
            <div>
              <span className={`ca-badge ca-badge-${(item.visaStatus || item.status || 'Active').toLowerCase() === 'approved' || (item.visaStatus || '').toLowerCase() === 'in effect' ? 'success' : 'info'}`}>
                {item.visaStatus || item.status || 'Active'}
              </span>
            </div>
          </div>

          <div className="ca-form-grid">
            <div>
              <strong>Application Type / Program:</strong>
              <div>{item.visaType || item.visaProgram || item.applicationType || 'Visa'}</div>
            </div>
            <div>
              <strong>Application Number:</strong>
              <div>{item.applicationNumber || item.applicationId || '—'}</div>
            </div>
            <div>
              <strong>UCI Number:</strong>
              <div>{item.uci || '—'}</div>
            </div>
            <div>
              <strong>Reference / TRN:</strong>
              <div>{item.trn || item.sponsorshipTrn || item.nominationTrn || '—'}</div>
            </div>
          </div>

          {isVisa && (
            <>
              <h4 style={{ color: 'var(--ca-navy)', borderBottom: '1px solid #ddd', paddingBottom: '6px', marginTop: '15px' }}>
                Biometrics & Exam Details
              </h4>
              <div className="ca-form-grid">
                <div>
                  <strong>Passport Number:</strong>
                  <div>{item.documentNumber || '—'}</div>
                </div>
                <div>
                  <strong>Biometrics Number:</strong>
                  <div>{item.biometricsNumber || '—'}</div>
                </div>
                <div>
                  <strong>Biometrics Enrolment Date:</strong>
                  <div>{item.dateOfBiometricsEnrolment || '—'}</div>
                </div>
                <div>
                  <strong>Biometrics Expiry Date:</strong>
                  <div>{item.biometricsExpiryDate || '—'}</div>
                </div>
                <div>
                  <strong>Medical Exam Pass Date:</strong>
                  <div>{item.medicalExaminationPassDate || '—'}</div>
                </div>
                <div>
                  <strong>Document Review Date:</strong>
                  <div>{item.documentReviewDate || '—'}</div>
                </div>
              </div>

              {item.latestUpdate && (
                <div style={{ marginTop: '15px', padding: '14px', backgroundColor: '#fafbfc', border: '1px solid #e1e7ee', borderRadius: '4px' }}>
                  <h4 style={{ margin: '0 0 6px 0', fontSize: '14px', color: 'var(--ca-navy)' }}>
                    Latest Application Status Update
                  </h4>
                  <div style={{ fontSize: '13px' }}>
                    <strong>{item.latestUpdate.status || 'Update'} - {item.latestUpdate.date || 'Recent'}:</strong> {item.latestUpdate.content || 'Application under standard processing.'}
                  </div>
                </div>
              )}
            </>
          )}

          <h4 style={{ color: 'var(--ca-navy)', borderBottom: '1px solid #ddd', paddingBottom: '6px', marginTop: '20px' }}>
            Attached Documents ({documents.length})
          </h4>
          {documents.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
              {documents.map((doc, i) => (
                <div key={i} className="ca-doc-item">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileText size={16} color="#335075" />
                    <strong>{doc.name || 'Official IRCC Document'}</strong>
                  </span>
                  {doc.url ? (
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ca-btn ca-btn-secondary ca-btn-sm"
                    >
                      <ExternalLink size={14} /> View / Download
                    </a>
                  ) : (
                    <span style={{ color: '#999', fontSize: '12px' }}>File preview unavailable</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontStyle: 'italic', color: '#666', fontSize: '13px' }}>No documents attached to this record.</p>
          )}
        </div>
        <div className="ca-modal-footer">
          <button type="button" className="ca-btn ca-btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
