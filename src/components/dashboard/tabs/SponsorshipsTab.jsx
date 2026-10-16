// src/components/dashboard/tabs/SponsorshipsTab.jsx
import { Search, RotateCw, Plus, Trash2, Edit2, Eye } from 'lucide-react';
import { getInitialSponsorshipFormData } from '../dashboardUtils';

export function SponsorshipsTable({
  sponsorshipsList = [],
  sponsorshipSearch = '',
  setSponsorshipSearch,
  fetchSponsorships,
  setEditingSponsorship,
  setPreviewSponsorship,
  handleDeleteSponsorship
}) {
  const filtered = sponsorshipsList.filter(s => {
    const q = (sponsorshipSearch || '').toLowerCase().trim();
    if (!q) return true;
    const appId = (s.applicationId || '').toLowerCase();
    const trn = (s.sponsorshipTrn || '').toLowerCase();
    const prog = (s.visaProgram || '').toLowerCase();
    const fileNum = (s.fileNumber || '').toLowerCase();
    const name = `${s.givenName || ''} ${s.familyName || ''}`.toLowerCase();
    return appId.includes(q) || trn.includes(q) || prog.includes(q) || fileNum.includes(q) || name.includes(q);
  });

  return (
    <div className="ca-card">
      <div className="ca-card-header">
        <h2>Sponsorship Records ({filtered.length})</h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', width: '220px' }}>
            <input
              type="text"
              className="ca-form-control"
              placeholder="Search sponsorships..."
              value={sponsorshipSearch}
              onChange={(e) => setSponsorshipSearch(e.target.value)}
              style={{ paddingLeft: '30px' }}
            />
            <Search size={16} color="#777" style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
          <button type="button" className="ca-btn ca-btn-secondary ca-btn-sm" onClick={fetchSponsorships} title="Refresh Sponsorships">
            <RotateCw size={14} /> Refresh
          </button>
        </div>
      </div>
      <div className="ca-table-responsive">
        <table className="ca-table">
          <thead>
            <tr>
              <th>Applicant Name</th>
              <th>Program</th>
              <th>Application ID</th>
              <th>Sponsorship TRN</th>
              <th>File Number</th>
              <th>Date Approved</th>
              <th>Assigned User</th>
              <th>Documents</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map(s => {
                const docCount = Array.isArray(s.document) ? s.document.length : 0;
                const assignedUsername = s.userId && typeof s.userId === 'object' ? s.userId.username : (s.userId || '—');

                return (
                  <tr key={s._id}>
                    <td>
                      <strong>{s.givenName} {s.familyName}</strong>
                    </td>
                    <td>{s.visaProgram || 'Provincial Sponsorship'}</td>
                    <td>{s.applicationId || '—'}</td>
                    <td>{s.sponsorshipTrn || '—'}</td>
                    <td>{s.fileNumber || '—'}</td>
                    <td>{s.approvedDate || '—'}</td>
                    <td>{assignedUsername}</td>
                    <td>
                      <span className="ca-badge ca-badge-navy">
                        {docCount} Document{docCount !== 1 ? 's' : ''}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          type="button"
                          className="ca-btn ca-btn-secondary ca-btn-sm"
                          onClick={() => setPreviewSponsorship(s)}
                          title="View Details"
                        >
                          <Eye size={13} /> View
                        </button>
                        <button
                          type="button"
                          className="ca-btn ca-btn-secondary ca-btn-sm"
                          onClick={() => setEditingSponsorship(s)}
                          title="Edit Sponsorship"
                        >
                          <Edit2 size={13} /> Edit
                        </button>
                        <button
                          type="button"
                          className="ca-btn ca-btn-danger ca-btn-sm"
                          onClick={() => handleDeleteSponsorship(s._id)}
                          title="Delete Sponsorship"
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
                  No sponsorship records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function SponsorshipsTab({
  sponsorshipFormData,
  setSponsorshipFormData,
  uploadedDocs = [],
  setUploadedDocs,
  currentDocName,
  setCurrentDocName,
  handleFileChange,
  addDocumentToList,
  removeDocumentFromList,
  handleCreateSponsorship,
  isSponsorshipSubmitting,
  usersList = [],
  sponsorshipsList = [],
  sponsorshipSearch = '',
  setSponsorshipSearch,
  fetchSponsorships,
  setEditingSponsorship,
  setPreviewSponsorship,
  handleDeleteSponsorship
}) {
  return (
    <>
      <div className="ca-card">
        <div className="ca-card-header">
          <h2>Create Canadian Sponsorship Record</h2>
        </div>
        <div className="ca-card-body">
          <form onSubmit={handleCreateSponsorship} autoComplete="off">
            <div className="ca-form-grid">
              <div className="ca-form-group">
                <label>Assigned User Account *</label>
                <select
                  className="ca-form-control"
                  value={sponsorshipFormData.userId || ''}
                  onChange={(e) => setSponsorshipFormData(prev => ({ ...prev, userId: e.target.value }))}
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
                <label>Visa / Sponsorship Program</label>
                <input
                  type="text"
                  className="ca-form-control"
                  placeholder="e.g. Provincial Sponsorship Program"
                  value={sponsorshipFormData.visaProgram || ''}
                  onChange={(e) => setSponsorshipFormData(prev => ({ ...prev, visaProgram: e.target.value }))}
                />
              </div>
            </div>

            <div className="ca-form-grid">
              <div className="ca-form-group">
                <label>Given Name *</label>
                <input
                  type="text"
                  className="ca-form-control"
                  placeholder="e.g. Marie"
                  value={sponsorshipFormData.givenName || ''}
                  onChange={(e) => setSponsorshipFormData(prev => ({ ...prev, givenName: e.target.value }))}
                  required
                />
              </div>
              <div className="ca-form-group">
                <label>Family Name</label>
                <input
                  type="text"
                  className="ca-form-control"
                  placeholder="e.g. Tremblay"
                  value={sponsorshipFormData.familyName || ''}
                  onChange={(e) => setSponsorshipFormData(prev => ({ ...prev, familyName: e.target.value }))}
                />
              </div>
            </div>

            <div className="ca-form-grid">
              <div className="ca-form-group">
                <label>Application ID *</label>
                <input
                  type="text"
                  className="ca-form-control"
                  value={sponsorshipFormData.applicationId || ''}
                  onChange={(e) => setSponsorshipFormData(prev => ({ ...prev, applicationId: e.target.value }))}
                  required
                />
              </div>
              <div className="ca-form-group">
                <label>Sponsorship TRN</label>
                <input
                  type="text"
                  className="ca-form-control"
                  value={sponsorshipFormData.sponsorshipTrn || ''}
                  onChange={(e) => setSponsorshipFormData(prev => ({ ...prev, sponsorshipTrn: e.target.value }))}
                />
              </div>
              <div className="ca-form-group">
                <label>File Number</label>
                <input
                  type="text"
                  className="ca-form-control"
                  value={sponsorshipFormData.fileNumber || ''}
                  onChange={(e) => setSponsorshipFormData(prev => ({ ...prev, fileNumber: e.target.value }))}
                />
              </div>
            </div>

            <div className="ca-form-grid">
              <div className="ca-form-group">
                <label>Date Approved</label>
                <input
                  type="text"
                  className="ca-form-control"
                  placeholder="e.g. 15 October 2026"
                  value={sponsorshipFormData.approvedDate || ''}
                  onChange={(e) => setSponsorshipFormData(prev => ({ ...prev, approvedDate: e.target.value }))}
                />
              </div>
            </div>

            {/* Document Uploads */}
            <div className="ca-doc-box">
              <label style={{ fontWeight: '700', color: 'var(--ca-navy)', marginBottom: '8px', display: 'block' }}>
                Attach Official Sponsorship Documents ({uploadedDocs.length})
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
                    id="spon-doc-file-input"
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
                    placeholder="e.g. Sponsorship Approval Letter"
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
                disabled={isSponsorshipSubmitting}
              >
                <Plus size={16} />
                {isSponsorshipSubmitting ? 'Creating Sponsorship...' : 'Create Sponsorship'}
              </button>
              <button
                type="button"
                className="ca-btn ca-btn-secondary"
                onClick={() => {
                  setSponsorshipFormData(getInitialSponsorshipFormData());
                  setUploadedDocs([]);
                }}
              >
                Reset Form
              </button>
            </div>
          </form>
        </div>
      </div>

      <SponsorshipsTable
        sponsorshipsList={sponsorshipsList}
        sponsorshipSearch={sponsorshipSearch}
        setSponsorshipSearch={setSponsorshipSearch}
        fetchSponsorships={fetchSponsorships}
        setEditingSponsorship={setEditingSponsorship}
        setPreviewSponsorship={setPreviewSponsorship}
        handleDeleteSponsorship={handleDeleteSponsorship}
      />
    </>
  );
}
