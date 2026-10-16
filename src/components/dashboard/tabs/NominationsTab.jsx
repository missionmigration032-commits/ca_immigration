// src/components/dashboard/tabs/NominationsTab.jsx
import { Search, RotateCw, Plus, Trash2, Edit2, Eye } from 'lucide-react';
import { getInitialNominationFormData } from '../dashboardUtils';

export function NominationsTable({
  nominationsList = [],
  nominationSearch = '',
  setNominationSearch,
  fetchNominations,
  setEditingNomination,
  setPreviewNomination,
  handleDeleteNomination
}) {
  const filtered = nominationsList.filter(n => {
    const q = (nominationSearch || '').toLowerCase().trim();
    if (!q) return true;
    const appId = (n.applicationId || '').toLowerCase();
    const trn = (n.nominationTrn || '').toLowerCase();
    const prog = (n.visaProgram || '').toLowerCase();
    const fileNum = (n.fileNumber || '').toLowerCase();
    const name = `${n.givenName || ''} ${n.familyName || ''}`.toLowerCase();
    return appId.includes(q) || trn.includes(q) || prog.includes(q) || fileNum.includes(q) || name.includes(q);
  });

  return (
    <div className="ca-card">
      <div className="ca-card-header">
        <h2>Nomination Records ({filtered.length})</h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', width: '220px' }}>
            <input
              type="text"
              className="ca-form-control"
              placeholder="Search nominations..."
              value={nominationSearch}
              onChange={(e) => setNominationSearch(e.target.value)}
              style={{ paddingLeft: '30px' }}
            />
            <Search size={16} color="#777" style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
          <button type="button" className="ca-btn ca-btn-secondary ca-btn-sm" onClick={fetchNominations} title="Refresh Nominations">
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
              <th>Nomination TRN</th>
              <th>File Number</th>
              <th>Date Approved</th>
              <th>Assigned User</th>
              <th>Documents</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map(n => {
                const docCount = Array.isArray(n.document) ? n.document.length : 0;
                const assignedUsername = n.userId && typeof n.userId === 'object' ? n.userId.username : (n.userId || '—');

                return (
                  <tr key={n._id}>
                    <td>
                      <strong>{n.givenName} {n.familyName}</strong>
                    </td>
                    <td>{n.visaProgram || 'Provincial Nominee Program'}</td>
                    <td>{n.applicationId || '—'}</td>
                    <td>{n.nominationTrn || '—'}</td>
                    <td>{n.fileNumber || '—'}</td>
                    <td>{n.approvedDate || '—'}</td>
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
                          onClick={() => setPreviewNomination(n)}
                          title="View Details"
                        >
                          <Eye size={13} /> View
                        </button>
                        <button
                          type="button"
                          className="ca-btn ca-btn-secondary ca-btn-sm"
                          onClick={() => setEditingNomination(n)}
                          title="Edit Nomination"
                        >
                          <Edit2 size={13} /> Edit
                        </button>
                        <button
                          type="button"
                          className="ca-btn ca-btn-danger ca-btn-sm"
                          onClick={() => handleDeleteNomination(n._id)}
                          title="Delete Nomination"
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
                  No nomination records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function NominationsTab({
  nominationFormData,
  setNominationFormData,
  uploadedDocs = [],
  setUploadedDocs,
  currentDocName,
  setCurrentDocName,
  handleFileChange,
  addDocumentToList,
  removeDocumentFromList,
  handleCreateNomination,
  isNominationSubmitting,
  usersList = [],
  nominationsList = [],
  nominationSearch = '',
  setNominationSearch,
  fetchNominations,
  setEditingNomination,
  setPreviewNomination,
  handleDeleteNomination
}) {
  return (
    <>
      <div className="ca-card">
        <div className="ca-card-header">
          <h2>Create Canadian Nomination Record</h2>
        </div>
        <div className="ca-card-body">
          <form onSubmit={handleCreateNomination} autoComplete="off">
            <div className="ca-form-grid">
              <div className="ca-form-group">
                <label>Assigned User Account *</label>
                <select
                  className="ca-form-control"
                  value={nominationFormData.userId || ''}
                  onChange={(e) => setNominationFormData(prev => ({ ...prev, userId: e.target.value }))}
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
                <label>Visa / Nomination Program</label>
                <input
                  type="text"
                  className="ca-form-control"
                  placeholder="e.g. Provincial Nominee Program (PNP)"
                  value={nominationFormData.visaProgram || ''}
                  onChange={(e) => setNominationFormData(prev => ({ ...prev, visaProgram: e.target.value }))}
                />
              </div>
            </div>

            <div className="ca-form-grid">
              <div className="ca-form-group">
                <label>Given Name *</label>
                <input
                  type="text"
                  className="ca-form-control"
                  placeholder="e.g. Liam"
                  value={nominationFormData.givenName || ''}
                  onChange={(e) => setNominationFormData(prev => ({ ...prev, givenName: e.target.value }))}
                  required
                />
              </div>
              <div className="ca-form-group">
                <label>Family Name</label>
                <input
                  type="text"
                  className="ca-form-control"
                  placeholder="e.g. Roy"
                  value={nominationFormData.familyName || ''}
                  onChange={(e) => setNominationFormData(prev => ({ ...prev, familyName: e.target.value }))}
                />
              </div>
            </div>

            <div className="ca-form-grid">
              <div className="ca-form-group">
                <label>Application ID *</label>
                <input
                  type="text"
                  className="ca-form-control"
                  value={nominationFormData.applicationId || ''}
                  onChange={(e) => setNominationFormData(prev => ({ ...prev, applicationId: e.target.value }))}
                  required
                />
              </div>
              <div className="ca-form-group">
                <label>Nomination TRN</label>
                <input
                  type="text"
                  className="ca-form-control"
                  value={nominationFormData.nominationTrn || ''}
                  onChange={(e) => setNominationFormData(prev => ({ ...prev, nominationTrn: e.target.value }))}
                />
              </div>
              <div className="ca-form-group">
                <label>File Number</label>
                <input
                  type="text"
                  className="ca-form-control"
                  value={nominationFormData.fileNumber || ''}
                  onChange={(e) => setNominationFormData(prev => ({ ...prev, fileNumber: e.target.value }))}
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
                  value={nominationFormData.approvedDate || ''}
                  onChange={(e) => setNominationFormData(prev => ({ ...prev, approvedDate: e.target.value }))}
                />
              </div>
            </div>

            {/* Document Uploads */}
            <div className="ca-doc-box">
              <label style={{ fontWeight: '700', color: 'var(--ca-navy)', marginBottom: '8px', display: 'block' }}>
                Attach Official Nomination Documents ({uploadedDocs.length})
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
                    id="nom-doc-file-input"
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
                    placeholder="e.g. Nomination Approval Certificate"
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
                disabled={isNominationSubmitting}
              >
                <Plus size={16} />
                {isNominationSubmitting ? 'Creating Nomination...' : 'Create Nomination'}
              </button>
              <button
                type="button"
                className="ca-btn ca-btn-secondary"
                onClick={() => {
                  setNominationFormData(getInitialNominationFormData());
                  setUploadedDocs([]);
                }}
              >
                Reset Form
              </button>
            </div>
          </form>
        </div>
      </div>

      <NominationsTable
        nominationsList={nominationsList}
        nominationSearch={nominationSearch}
        setNominationSearch={setNominationSearch}
        fetchNominations={fetchNominations}
        setEditingNomination={setEditingNomination}
        setPreviewNomination={setPreviewNomination}
        handleDeleteNomination={handleDeleteNomination}
      />
    </>
  );
}
