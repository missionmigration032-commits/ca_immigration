import { useState } from 'react';
import { X, Trash2, Plus } from 'lucide-react';

export default function EditSponsorshipModal({ sponsorship, users = [], onClose, onSave, token }) {
  const [formData, setFormData] = useState({
    userId: sponsorship?.userId?._id || sponsorship?.userId || '',
    applicationId: sponsorship?.applicationId || '',
    sponsorshipTrn: sponsorship?.sponsorshipTrn || '',
    visaProgram: sponsorship?.visaProgram || '',
    fileNumber: sponsorship?.fileNumber || '',
    givenName: sponsorship?.givenName || '',
    familyName: sponsorship?.familyName || '',
    approvedDate: sponsorship?.approvedDate || ''
  });

  const [documents, setDocuments] = useState(() => {
    if (Array.isArray(sponsorship?.document)) {
      return sponsorship.document.map(d => ({
        name: d.name || 'Document',
        url: d.url
      }));
    }
    return [];
  });

  const [currentDocName, setCurrentDocName] = useState('');
  const [currentDocBase64, setCurrentDocBase64] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentDocBase64(reader.result);
        if (!currentDocName) setCurrentDocName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const addDocument = () => {
    if (!currentDocBase64) {
      alert('Please choose a file to add.');
      return;
    }
    const docName = currentDocName.trim() || 'Uploaded Document';
    setDocuments(prev => [...prev, { name: docName, document: currentDocBase64, documentName: docName }]);
    setCurrentDocBase64('');
    setCurrentDocName('');
    const input = document.getElementById('edit-spon-doc-file');
    if (input) input.value = '';
  };

  const removeDocument = (index) => {
    setDocuments(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      ...formData,
      document: documents
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/sponsorships/${sponsorship._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (response.ok) {
        onSave(data.sponsorship || data);
        onClose();
      } else {
        setError(data.message || 'Failed to update sponsorship.');
      }
    } catch (err) {
      console.error('Update sponsorship error:', err);
      setError('Network error updating sponsorship.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ca-modal-overlay">
      <div className="ca-modal-dialog ca-modal-dialog-large">
        <div className="ca-modal-header">
          <h3>Edit Sponsorship ({sponsorship?.applicationId || sponsorship?.sponsorshipTrn || sponsorship?._id})</h3>
          <button type="button" className="ca-modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="ca-modal-body">
            {error && (
              <div className="alert alert-danger" style={{ padding: '8px 12px', fontSize: '13px', marginBottom: '15px' }}>
                {error}
              </div>
            )}

            <div className="ca-form-grid">
              <div className="ca-form-group">
                <label>Assigned User</label>
                <select
                  className="ca-form-control"
                  value={formData.userId}
                  onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                >
                  <option value="">-- Unassigned --</option>
                  {users.map(u => (
                    <option key={u._id} value={u._id}>
                      {u.username} {u.givenName ? `(${u.givenName} ${u.familyName || ''})` : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div className="ca-form-group">
                <label>Visa / Sponsorship Program</label>
                <input
                  type="text"
                  className="ca-form-control"
                  value={formData.visaProgram}
                  onChange={(e) => setFormData({ ...formData, visaProgram: e.target.value })}
                  placeholder="e.g. Provincial Sponsorship Program"
                />
              </div>
            </div>

            <div className="ca-form-grid">
              <div className="ca-form-group">
                <label>Given Name</label>
                <input
                  type="text"
                  className="ca-form-control"
                  value={formData.givenName}
                  onChange={(e) => setFormData({ ...formData, givenName: e.target.value })}
                />
              </div>
              <div className="ca-form-group">
                <label>Family Name</label>
                <input
                  type="text"
                  className="ca-form-control"
                  value={formData.familyName}
                  onChange={(e) => setFormData({ ...formData, familyName: e.target.value })}
                />
              </div>
            </div>

            <div className="ca-form-grid">
              <div className="ca-form-group">
                <label>Application ID</label>
                <input
                  type="text"
                  className="ca-form-control"
                  value={formData.applicationId}
                  onChange={(e) => setFormData({ ...formData, applicationId: e.target.value })}
                />
              </div>
              <div className="ca-form-group">
                <label>Sponsorship TRN</label>
                <input
                  type="text"
                  className="ca-form-control"
                  value={formData.sponsorshipTrn}
                  onChange={(e) => setFormData({ ...formData, sponsorshipTrn: e.target.value })}
                />
              </div>
              <div className="ca-form-group">
                <label>File Number</label>
                <input
                  type="text"
                  className="ca-form-control"
                  value={formData.fileNumber}
                  onChange={(e) => setFormData({ ...formData, fileNumber: e.target.value })}
                />
              </div>
            </div>

            <div className="ca-form-grid">
              <div className="ca-form-group">
                <label>Date Approved</label>
                <input
                  type="text"
                  className="ca-form-control"
                  value={formData.approvedDate}
                  onChange={(e) => setFormData({ ...formData, approvedDate: e.target.value })}
                  placeholder="e.g. 15 October 2026"
                />
              </div>
            </div>

            {/* Document Management */}
            <div className="ca-doc-box">
              <label style={{ fontWeight: '700', color: 'var(--ca-navy)', marginBottom: '8px', display: 'block' }}>
                Attached Documents ({documents.length})
              </label>
              {documents.length > 0 ? (
                <div style={{ marginBottom: '12px' }}>
                  {documents.map((doc, idx) => (
                    <div key={idx} className="ca-doc-item">
                      <div>
                        <strong>{doc.name || doc.documentName || 'Document'}</strong>
                        {doc.url && (
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ marginLeft: '10px', color: '#1a73e8', textDecoration: 'underline' }}
                          >
                            View File
                          </a>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDocument(idx)}
                        className="ca-btn ca-btn-danger ca-btn-sm"
                        style={{ padding: '2px 6px' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontStyle: 'italic', color: '#666', fontSize: '13px', margin: '4px 0 12px 0' }}>
                  No documents attached.
                </p>
              )}

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                <div style={{ flex: 1, minWidth: '180px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600' }}>Choose New File:</label>
                  <input
                    type="file"
                    id="edit-spon-doc-file"
                    className="ca-form-control"
                    style={{ height: '36px' }}
                    onChange={handleFileChange}
                  />
                </div>
                <div style={{ flex: 1, minWidth: '180px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '600' }}>Document Label:</label>
                  <input
                    type="text"
                    className="ca-form-control"
                    placeholder="e.g. Sponsorship Approval Letter"
                    value={currentDocName}
                    onChange={(e) => setCurrentDocName(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="ca-btn ca-btn-secondary"
                  onClick={addDocument}
                  style={{ height: '36px' }}
                >
                  <Plus size={16} /> Add Document
                </button>
              </div>
            </div>
          </div>
          <div className="ca-modal-footer">
            <button type="button" className="ca-btn ca-btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="ca-btn ca-btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Update Sponsorship'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
