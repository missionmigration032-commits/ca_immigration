import { Search, RotateCw, Plus, Eye, Edit2, Trash2 } from 'lucide-react';
import { getInitialVisaFormData } from '../dashboardUtils';

export function VisasTable({
  visasList = [],
  visaSearch = '',
  setVisaSearch,
  fetchVisas,
  setEditingVisa,
  setPreviewVisa,
  handleDeleteVisa
}) {
  const filteredVisas = visasList.filter(v => {
    const q = (visaSearch || '').toLowerCase().trim();
    if (!q) return true;
    const appNum = (v.applicationNumber || '').toLowerCase();
    const uci = (v.uci || '').toLowerCase();
    const trn = (v.trn || '').toLowerCase();
    const name = `${v.givenNames || ''} ${v.familyName || ''} ${v.visaApplicant || ''}`.toLowerCase();
    const type = (v.visaType || '').toLowerCase();
    const passport = (v.documentNumber || '').toLowerCase();
    const status = (v.visaStatus || v.latestUpdate?.status || '').toLowerCase();
    return appNum.includes(q) || uci.includes(q) || trn.includes(q) || name.includes(q) || type.includes(q) || passport.includes(q) || status.includes(q);
  });

  return (
    <div className="ca-card">
      <div className="ca-card-header">
        <h2>Visa Applications ({filteredVisas.length})</h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', width: '220px' }}>
            <input
              type="text"
              className="ca-form-control"
              placeholder="Search visas..."
              value={visaSearch}
              onChange={(e) => setVisaSearch(e.target.value)}
              style={{ paddingLeft: '30px' }}
            />
            <Search size={16} color="#777" style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
          <button type="button" className="ca-btn ca-btn-secondary ca-btn-sm" onClick={fetchVisas} title="Refresh Visas">
            <RotateCw size={14} /> Refresh
          </button>
        </div>
      </div>
      <div className="ca-table-responsive">
        <table className="ca-table">
          <thead>
            <tr>
              <th>Applicant Name</th>
              <th>Visa Type</th>
              <th>UCI Number</th>
              <th>Application #</th>
              <th>Passport</th>
              <th>Status</th>
              <th>Assigned User</th>
              <th>Documents</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVisas.length > 0 ? (
              filteredVisas.map(v => {
                const applicantName = (v.visaApplicant || `${v.givenNames || ''} ${v.familyName || ''}`.trim()) || '—';
                const docCount = Array.isArray(v.document) ? v.document.length : (v.document ? 1 : 0);
                const assignedUsername = v.userId && typeof v.userId === 'object' ? v.userId.username : (v.userId || '—');

                return (
                  <tr key={v._id}>
                    <td>
                      <strong>{applicantName}</strong>
                    </td>
                    <td>{v.visaType || v.applicationType || 'Visa'}</td>
                    <td>{v.uci || '—'}</td>
                    <td>{v.applicationNumber || '—'}</td>
                    <td>{v.documentNumber || '—'}</td>
                    <td>
                      <span className={`ca-badge ca-badge-${(v.visaStatus || '').toLowerCase() === 'approved' ? 'success' : 'info'}`}>
                        {v.visaStatus || v.latestUpdate?.status || 'Submitted'}
                      </span>
                    </td>
                    <td>{assignedUsername}</td>
                    <td>
                      <span className="ca-badge ca-badge-navy">
                        {docCount} File{docCount !== 1 ? 's' : ''}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          type="button"
                          className="ca-btn ca-btn-secondary ca-btn-sm"
                          onClick={() => setPreviewVisa(v)}
                          title="Preview Application"
                        >
                          <Eye size={13} /> View
                        </button>
                        <button
                          type="button"
                          className="ca-btn ca-btn-secondary ca-btn-sm"
                          onClick={() => setEditingVisa(v)}
                          title="Edit Visa"
                        >
                          <Edit2 size={13} /> Edit
                        </button>
                        <button
                          type="button"
                          className="ca-btn ca-btn-danger ca-btn-sm"
                          onClick={() => handleDeleteVisa(v._id)}
                          title="Delete Visa"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '24px', color: '#666', fontStyle: 'italic' }}>
                  No visa records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function VisasTab({
  visaFormData,
  setVisaFormData,
  uploadedDocs = [],
  setUploadedDocs,
  currentDocName,
  setCurrentDocName,
  handleFileChange,
  addDocumentToList,
  removeDocumentFromList,
  handleVisaSubmit,
  isVisaSubmitting,
  usersList = [],
  visasList = [],
  visaSearch = '',
  setVisaSearch,
  fetchVisas,
  setEditingVisa,
  setPreviewVisa,
  handleDeleteVisa
}) {
  return (
    <>
      <div className="ca-card">
        <div className="ca-card-header">
          <h2>Create Canadian Visa Record</h2>
        </div>
        <div className="ca-card-body">
          <form onSubmit={handleVisaSubmit} autoComplete="off">
            <div className="ca-form-grid">
              <div className="ca-form-group">
                <label>Assigned User Account *</label>
                <select
                  className="ca-form-control"
                  value={visaFormData.userId || ''}
                  onChange={(e) => setVisaFormData(prev => ({ ...prev, userId: e.target.value }))}
                  required
                >
                  <option value="">-- Select Registered User --</option>
                  {usersList.map(u => (
                    <option key={u._id} value={u._id}>
                      {u.username} {u.givenName ? `(${u.givenName} ${u.familyName || ''})` : ''} - {u._id}
                    </option>
                  ))}
                </select>
              </div>
              <div className="ca-form-group">
                <label>Visa Type *</label>
                <input
                  type="text"
                  className="ca-form-control"
                  placeholder="e.g. Visitor Visa, Study Permit, Work Permit"
                  value={visaFormData.visaType || ''}
                  onChange={(e) => setVisaFormData(prev => ({ ...prev, visaType: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="ca-form-grid">
              <div className="ca-form-group">
                <label>Given Names *</label>
                <input
                  type="text"
                  className="ca-form-control"
                  placeholder="e.g. John Alexander"
                  value={visaFormData.givenNames || ''}
                  onChange={(e) => setVisaFormData(prev => ({ ...prev, givenNames: e.target.value }))}
                  required
                />
              </div>
              <div className="ca-form-group">
                <label>Family Name</label>
                <input
                  type="text"
                  className="ca-form-control"
                  placeholder="e.g. Doe"
                  value={visaFormData.familyName || ''}
                  onChange={(e) => setVisaFormData(prev => ({ ...prev, familyName: e.target.value }))}
                />
              </div>
              <div className="ca-form-group">
                <label>Passport Number</label>
                <input
                  type="text"
                  className="ca-form-control"
                  placeholder="e.g. CA9876543"
                  value={visaFormData.documentNumber || ''}
                  onChange={(e) => setVisaFormData(prev => ({ ...prev, documentNumber: e.target.value }))}
                />
              </div>
            </div>

            <div className="ca-form-grid">
              <div className="ca-form-group">
                <label>UCI Number *</label>
                <input
                  type="text"
                  className="ca-form-control"
                  placeholder="11-4897-0335"
                  value={visaFormData.uci || ''}
                  onChange={(e) => setVisaFormData(prev => ({ ...prev, uci: e.target.value }))}
                  required
                />
              </div>
              <div className="ca-form-group">
                <label>Application Number *</label>
                <input
                  type="text"
                  className="ca-form-control"
                  placeholder="V315890214"
                  value={visaFormData.applicationNumber || ''}
                  onChange={(e) => setVisaFormData(prev => ({ ...prev, applicationNumber: e.target.value }))}
                  required
                />
              </div>
              <div className="ca-form-group">
                <label>Application Status</label>
                <input
                  type="text"
                  className="ca-form-control"
                  value={visaFormData.visaStatus || 'Submitted'}
                  onChange={(e) => setVisaFormData(prev => ({ ...prev, visaStatus: e.target.value }))}
                />
              </div>
            </div>

            <div className="ca-form-grid">
              <div className="ca-form-group">
                <label>Date Received</label>
                <input
                  type="date"
                  className="ca-form-control"
                  value={visaFormData.receiveDate || ''}
                  onChange={(e) => setVisaFormData(prev => ({ ...prev, receiveDate: e.target.value }))}
                />
              </div>
              <div className="ca-form-group">
                <label>Medical Exam Pass Date</label>
                <input
                  type="date"
                  className="ca-form-control"
                  value={visaFormData.medicalExaminationPassDate || ''}
                  onChange={(e) => setVisaFormData(prev => ({ ...prev, medicalExaminationPassDate: e.target.value }))}
                />
              </div>
              <div className="ca-form-group">
                <label>Document Review Date</label>
                <input
                  type="date"
                  className="ca-form-control"
                  value={visaFormData.documentReviewDate || ''}
                  onChange={(e) => setVisaFormData(prev => ({ ...prev, documentReviewDate: e.target.value }))}
                />
              </div>
            </div>

            <div className="ca-form-grid">
              <div className="ca-form-group">
                <label>Biometrics Number</label>
                <input
                  type="text"
                  className="ca-form-control"
                  placeholder="1000025187767"
                  value={visaFormData.biometricsNumber || ''}
                  onChange={(e) => setVisaFormData(prev => ({ ...prev, biometricsNumber: e.target.value }))}
                />
              </div>
              <div className="ca-form-group">
                <label>Date of Biometrics Enrolment</label>
                <input
                  type="date"
                  className="ca-form-control"
                  value={visaFormData.dateOfBiometricsEnrolment || ''}
                  onChange={(e) => setVisaFormData(prev => ({ ...prev, dateOfBiometricsEnrolment: e.target.value }))}
                />
              </div>
              <div className="ca-form-group">
                <label>Biometrics Expiry Date</label>
                <input
                  type="date"
                  className="ca-form-control"
                  value={visaFormData.biometricsExpiryDate || ''}
                  onChange={(e) => setVisaFormData(prev => ({ ...prev, biometricsExpiryDate: e.target.value }))}
                />
              </div>
            </div>

            {/* Latest Update Box */}
            <div style={{ backgroundColor: '#f9fbfd', border: '1px solid #dcdcdc', padding: '14px 18px', borderRadius: '4px', marginBottom: '16px' }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: 'var(--ca-navy)' }}>
                Latest Status Notification (Displayed to Applicant)
              </h4>
              <div className="ca-form-grid">
                <div className="ca-form-group">
                  <label>Update Date</label>
                  <input
                    type="date"
                    className="ca-form-control"
                    value={visaFormData.latestUpdateDate || ''}
                    onChange={(e) => setVisaFormData(prev => ({ ...prev, latestUpdateDate: e.target.value }))}
                  />
                </div>
                <div className="ca-form-group">
                  <label>Update Status</label>
                  <input
                    type="text"
                    className="ca-form-control"
                    placeholder="e.g. In progress, Approved, Action required"
                    value={visaFormData.latestUpdateStatus || ''}
                    onChange={(e) => setVisaFormData(prev => ({ ...prev, latestUpdateStatus: e.target.value }))}
                  />
                </div>
              </div>
              <div className="ca-form-group">
                <label>Update Content / Message</label>
                <textarea
                  className="ca-form-control"
                  rows="2"
                  placeholder="Detailed update message for the user"
                  value={visaFormData.latestUpdateContent || ''}
                  onChange={(e) => setVisaFormData(prev => ({ ...prev, latestUpdateContent: e.target.value }))}
                />
              </div>
            </div>

            {/* Document Uploads */}
            <div className="ca-doc-box">
              <label style={{ fontWeight: '700', color: 'var(--ca-navy)', marginBottom: '8px', display: 'block' }}>
                Attach Official Documents ({uploadedDocs.length})
              </label>

              {uploadedDocs.length > 0 ? (
                <div style={{ marginBottom: '12px' }}>
                  {uploadedDocs.map((doc, idx) => (
                    <div key={idx} className="ca-doc-item">
                      <div>
                        <strong>{doc.documentName}</strong> ({doc.document.startsWith('data:') ? 'New Upload' : 'Existing'})
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDocumentFromList(idx)}
                        className="ca-btn ca-btn-danger ca-btn-sm"
                        style={{ padding: '2px 8px' }}
                      >
                        <Trash2 size={13} /> Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontStyle: 'italic', color: '#666', fontSize: '13px', margin: '4px 0 12px 0' }}>
                  No documents attached yet.
                </p>
              )}

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                <div style={{ flex: 1, minWidth: '180px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600' }}>Choose File (PDF/Image):</label>
                  <input
                    type="file"
                    id="visa-doc-file-input"
                    className="ca-form-control"
                    style={{ height: '38px' }}
                    onChange={handleFileChange}
                  />
                </div>
                <div style={{ flex: 1, minWidth: '180px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600' }}>Document Name:</label>
                  <input
                    type="text"
                    className="ca-form-control"
                    placeholder="e.g. Biometrics Request, Passport Letter"
                    value={currentDocName}
                    onChange={(e) => setCurrentDocName(e.target.value)}
                    style={{ height: '38px' }}
                  />
                </div>
                <button
                  type="button"
                  className="ca-btn ca-btn-secondary"
                  onClick={addDocumentToList}
                  style={{ height: '38px' }}
                >
                  <Plus size={16} /> Add to List
                </button>
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                type="submit"
                className="ca-btn ca-btn-primary"
                disabled={isVisaSubmitting}
              >
                <Plus size={16} />
                {isVisaSubmitting ? 'Creating Visa Record...' : 'Create Visa Application'}
              </button>
              <button
                type="button"
                className="ca-btn ca-btn-secondary"
                onClick={() => {
                  setVisaFormData(getInitialVisaFormData());
                  setUploadedDocs([]);
                }}
              >
                Reset Form
              </button>
            </div>
          </form>
        </div>
      </div>

      <VisasTable
        visasList={visasList}
        visaSearch={visaSearch}
        setVisaSearch={setVisaSearch}
        fetchVisas={fetchVisas}
        setEditingVisa={setEditingVisa}
        setPreviewVisa={setPreviewVisa}
        handleDeleteVisa={handleDeleteVisa}
      />
    </>
  );
}
