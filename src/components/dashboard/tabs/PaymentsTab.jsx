// src/components/dashboard/tabs/PaymentsTab.jsx
import { Search, RotateCw, Plus, Trash2, ArrowUpDown } from 'lucide-react';
import {
  generate8CharRef,
  getPaymentApplicantDisplayName,
  getPaymentCategory
} from '../dashboardUtils';

export function PaymentsTable({
  paymentsList = [],
  visasList = [],
  sponsorshipsList = [],
  nominationsList = [],
  usersList = [],
  fetchPayments,
  paymentSearch = '',
  setPaymentSearch,
  paymentStatusFilter = 'all',
  setPaymentStatusFilter,
  paymentTypeFilter = 'all',
  setPaymentTypeFilter,
  handleTogglePaymentStatus,
  handleDeletePayment
}) {
  const filteredPayments = paymentsList.filter(p => {
    const category = getPaymentCategory(p);

    const matchesStatus =
      paymentStatusFilter === 'all'
        ? true
        : (p.status || '').toLowerCase() === paymentStatusFilter.toLowerCase();

    const matchesCategory =
      paymentTypeFilter === 'all'
        ? true
        : category === paymentTypeFilter.toLowerCase();

    const q = (paymentSearch || '').toLowerCase().trim();
    if (!q) return matchesStatus && matchesCategory;

    const pRef = (p.referenceNumber || '').toLowerCase();
    const pName = getPaymentApplicantDisplayName(p, visasList, usersList, sponsorshipsList, nominationsList).toLowerCase();
    const pType = (p.visaType || '').toLowerCase();
    const pOffice = (p.issuingOffice || '').toLowerCase();
    const pAmount = p.amount !== undefined ? p.amount.toString() : '';

    const matchesSearch = pRef.includes(q) || pName.includes(q) || pType.includes(q) || pOffice.includes(q) || pAmount.includes(q) || category.includes(q);

    return matchesStatus && matchesCategory && matchesSearch;
  });

  const totalPaid = paymentsList.filter(p => (p.status || '').toLowerCase() === 'paid').length;
  const totalPending = paymentsList.filter(p => (p.status || '').toLowerCase() === 'pending').length;
  const totalRevenue = paymentsList
    .filter(p => (p.status || '').toLowerCase() === 'paid')
    .reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);

  return (
    <div>
      {/* Stats Cards */}
      <div className="ca-stats-grid">
        <div className="ca-stat-card">
          <div className="ca-stat-title">Total Paid Fees</div>
          <div className="ca-stat-value" style={{ color: '#137333' }}>{totalPaid}</div>
        </div>
        <div className="ca-stat-card" style={{ borderLeftColor: '#f9ab00' }}>
          <div className="ca-stat-title">Pending Payment Fees</div>
          <div className="ca-stat-value" style={{ color: '#b06000' }}>{totalPending}</div>
        </div>
        <div className="ca-stat-card" style={{ borderLeftColor: 'var(--ca-red)' }}>
          <div className="ca-stat-title">Total Revenue (CAD)</div>
          <div className="ca-stat-value">${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>
      </div>

      <div className="ca-card">
        <div className="ca-card-header">
          <h2>Payment Records ({filteredPayments.length})</h2>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Search */}
            <div style={{ position: 'relative', width: '200px' }}>
              <input
                type="text"
                className="ca-form-control"
                placeholder="Search payments..."
                value={paymentSearch}
                onChange={(e) => setPaymentSearch(e.target.value)}
                style={{ paddingLeft: '30px' }}
              />
              <Search size={16} color="#777" style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>

            {/* Filter Status */}
            <select
              className="ca-form-control"
              style={{ width: 'auto' }}
              value={paymentStatusFilter}
              onChange={(e) => setPaymentStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>

            {/* Filter Category */}
            <select
              className="ca-form-control"
              style={{ width: 'auto' }}
              value={paymentTypeFilter}
              onChange={(e) => setPaymentTypeFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="visa">Visas</option>
              <option value="sponsorship">Sponsorships</option>
              <option value="nomination">Nominations</option>
            </select>

            <button type="button" className="ca-btn ca-btn-secondary ca-btn-sm" onClick={fetchPayments} title="Refresh Payments">
              <RotateCw size={14} /> Refresh
            </button>
          </div>
        </div>
        <div className="ca-table-responsive">
          <table className="ca-table">
            <thead>
              <tr>
                <th>Reference #</th>
                <th>Category</th>
                <th>Applicant / User</th>
                <th>Description / Visa Type</th>
                <th>Amount (CAD)</th>
                <th>Status</th>
                <th>Issuing Office</th>
                <th>Transaction Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map(p => {
                  const applicantName = getPaymentApplicantDisplayName(p, visasList, usersList, sponsorshipsList, nominationsList);
                  const isPaid = (p.status || '').toLowerCase() === 'paid';
                  const dateStr = p.transactionDate
                    ? new Date(p.transactionDate).toLocaleDateString()
                    : (p.createdAt ? new Date(p.createdAt).toLocaleDateString() : '—');

                  return (
                    <tr key={p._id}>
                      <td>
                        <strong>{p.referenceNumber || '—'}</strong>
                      </td>
                      <td>
                        <span className="ca-badge ca-badge-navy">
                          {(p.paymentType || getPaymentCategory(p)).toUpperCase()}
                        </span>
                      </td>
                      <td>{applicantName}</td>
                      <td>{p.visaType || 'Embassy / Processing Fee'}</td>
                      <td>
                        <strong style={{ color: isPaid ? '#137333' : '#b06000' }}>
                          ${Number(p.amount || 0).toFixed(2)} {p.currency || 'CAD'}
                        </strong>
                      </td>
                      <td>
                        <span className={`ca-badge ca-badge-${isPaid ? 'paid' : 'pending'}`}>
                          {isPaid ? 'Paid' : 'Pending'}
                        </span>
                      </td>
                      <td>{p.issuingOffice || '—'}</td>
                      <td>{dateStr}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            type="button"
                            className={`ca-btn ca-btn-sm ${isPaid ? 'ca-btn-secondary' : 'ca-btn-primary'}`}
                            onClick={() => handleTogglePaymentStatus(p)}
                            title={isPaid ? 'Mark as Pending' : 'Mark as Paid'}
                          >
                            <ArrowUpDown size={13} /> {isPaid ? 'Set Pending' : 'Mark Paid'}
                          </button>
                          <button
                            type="button"
                            className="ca-btn ca-btn-danger ca-btn-sm"
                            onClick={() => handleDeletePayment(p._id)}
                            title="Delete Payment"
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
                    No payment records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function PaymentsTab({
  paymentFormData,
  setPaymentFormData,
  handleCreatePayment,
  isPaymentSubmitting,
  paymentsList = [],
  visasList = [],
  sponsorshipsList = [],
  nominationsList = [],
  usersList = [],
  fetchPayments,
  paymentSearch = '',
  setPaymentSearch,
  paymentStatusFilter = 'all',
  setPaymentStatusFilter,
  paymentTypeFilter = 'all',
  setPaymentTypeFilter,
  handleTogglePaymentStatus,
  handleDeletePayment
}) {
  return (
    <>
      <div className="ca-card">
        <div className="ca-card-header">
          <h2>Create Fee & Payment Record</h2>
        </div>
        <div className="ca-card-body">
          <form onSubmit={handleCreatePayment} autoComplete="off">
            <div className="ca-form-grid">
              <div className="ca-form-group">
                <label>Payment Association Category *</label>
                <select
                  className="ca-form-control"
                  value={paymentFormData.paymentType || 'visa'}
                  onChange={(e) => setPaymentFormData(prev => ({
                    ...prev,
                    paymentType: e.target.value,
                    selectedVisaId: '',
                    selectedSponsorshipId: '',
                    selectedNominationId: ''
                  }))}
                >
                  <option value="visa">Visa Application</option>
                  <option value="sponsorship">Sponsorship Application</option>
                  <option value="nomination">Nomination Application</option>
                </select>
              </div>

              {/* Dynamic Target Selector */}
              {paymentFormData.paymentType === 'visa' && (
                <div className="ca-form-group">
                  <label>Select Visa Record *</label>
                  <select
                    className="ca-form-control"
                    value={paymentFormData.selectedVisaId || ''}
                    onChange={(e) => {
                      const v = visasList.find(item => item._id === e.target.value);
                      setPaymentFormData(prev => ({
                        ...prev,
                        selectedVisaId: e.target.value,
                        userId: v?.userId?._id || v?.userId || prev.userId,
                        visaType: v?.visaType || prev.visaType
                      }));
                    }}
                    required
                  >
                    <option value="">-- Choose Visa Application --</option>
                    {visasList.map(v => (
                      <option key={v._id} value={v._id}>
                        {v.visaApplicant || `${v.givenNames || ''} ${v.familyName || ''}`} - App: {v.applicationNumber || v._id}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {paymentFormData.paymentType === 'sponsorship' && (
                <div className="ca-form-group">
                  <label>Select Sponsorship Record *</label>
                  <select
                    className="ca-form-control"
                    value={paymentFormData.selectedSponsorshipId || ''}
                    onChange={(e) => {
                      const s = sponsorshipsList.find(item => item._id === e.target.value);
                      setPaymentFormData(prev => ({
                        ...prev,
                        selectedSponsorshipId: e.target.value,
                        userId: s?.userId?._id || s?.userId || prev.userId,
                        visaType: s?.visaProgram || 'Sponsorship Fee'
                      }));
                    }}
                    required
                  >
                    <option value="">-- Choose Sponsorship Record --</option>
                    {sponsorshipsList.map(s => (
                      <option key={s._id} value={s._id}>
                        {s.givenName} {s.familyName} - App: {s.applicationId || s._id}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {paymentFormData.paymentType === 'nomination' && (
                <div className="ca-form-group">
                  <label>Select Nomination Record *</label>
                  <select
                    className="ca-form-control"
                    value={paymentFormData.selectedNominationId || ''}
                    onChange={(e) => {
                      const n = nominationsList.find(item => item._id === e.target.value);
                      setPaymentFormData(prev => ({
                        ...prev,
                        selectedNominationId: e.target.value,
                        userId: n?.userId?._id || n?.userId || prev.userId,
                        visaType: n?.visaProgram || 'Nomination Fee'
                      }));
                    }}
                    required
                  >
                    <option value="">-- Choose Nomination Record --</option>
                    {nominationsList.map(n => (
                      <option key={n._id} value={n._id}>
                        {n.givenName} {n.familyName} - App: {n.applicationId || n._id}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="ca-form-grid">
              <div className="ca-form-group">
                <label>Reference Number *</label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <input
                    type="text"
                    className="ca-form-control"
                    value={paymentFormData.referenceNumber || ''}
                    onChange={(e) => setPaymentFormData(prev => ({ ...prev, referenceNumber: e.target.value }))}
                    required
                  />
                  <button
                    type="button"
                    className="ca-btn ca-btn-secondary"
                    onClick={() => setPaymentFormData(prev => ({ ...prev, referenceNumber: `CA-${generate8CharRef()}` }))}
                  >
                    Generate
                  </button>
                </div>
              </div>

              <div className="ca-form-group">
                <label>Amount (CAD) *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="ca-form-control"
                  placeholder="100.00"
                  value={paymentFormData.amount || ''}
                  onChange={(e) => setPaymentFormData(prev => ({ ...prev, amount: e.target.value }))}
                  required
                />
              </div>

              <div className="ca-form-group">
                <label>Currency</label>
                <input
                  type="text"
                  className="ca-form-control"
                  value={paymentFormData.currency || 'CAD'}
                  readOnly
                />
              </div>
            </div>

            <div className="ca-form-grid">
              <div className="ca-form-group">
                <label>Payment Status</label>
                <select
                  className="ca-form-control"
                  value={paymentFormData.status || 'paid'}
                  onChange={(e) => setPaymentFormData(prev => ({ ...prev, status: e.target.value }))}
                >
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <div className="ca-form-group">
                <label>Issuing Office</label>
                <input
                  type="text"
                  className="ca-form-control"
                  placeholder="e.g. Ottawa Operations Center"
                  value={paymentFormData.issuingOffice || ''}
                  onChange={(e) => setPaymentFormData(prev => ({ ...prev, issuingOffice: e.target.value }))}
                />
              </div>

              <div className="ca-form-group">
                <label>Internal Reference</label>
                <input
                  type="text"
                  className="ca-form-control"
                  placeholder="e.g. INT-9842"
                  value={paymentFormData.internalRef || ''}
                  onChange={(e) => setPaymentFormData(prev => ({ ...prev, internalRef: e.target.value }))}
                />
              </div>

              <div className="ca-form-group">
                <label>Transaction Date</label>
                <input
                  type="date"
                  className="ca-form-control"
                  value={paymentFormData.transactionDate || ''}
                  onChange={(e) => setPaymentFormData(prev => ({ ...prev, transactionDate: e.target.value }))}
                />
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                type="submit"
                className="ca-btn ca-btn-primary"
                disabled={isPaymentSubmitting}
              >
                <Plus size={16} />
                {isPaymentSubmitting ? 'Creating Payment...' : 'Create Payment Record'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <PaymentsTable
        paymentsList={paymentsList}
        visasList={visasList}
        sponsorshipsList={sponsorshipsList}
        nominationsList={nominationsList}
        usersList={usersList}
        fetchPayments={fetchPayments}
        paymentSearch={paymentSearch}
        setPaymentSearch={setPaymentSearch}
        paymentStatusFilter={paymentStatusFilter}
        setPaymentStatusFilter={setPaymentStatusFilter}
        paymentTypeFilter={paymentTypeFilter}
        setPaymentTypeFilter={setPaymentTypeFilter}
        handleTogglePaymentStatus={handleTogglePaymentStatus}
        handleDeletePayment={handleDeletePayment}
      />
    </>
  );
}
