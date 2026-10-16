// src/components/dashboard/tabs/OverviewTab.jsx
import { VisasTable } from './VisasTab';
import { PaymentsTable } from './PaymentsTab';
import { SponsorshipsTable } from './SponsorshipsTab';
import { NominationsTable } from './NominationsTab';
import { UsersTable } from './AccountsTab';

export default function OverviewTab({
  // Visas
  visasList = [],
  visaSearch = '',
  setVisaSearch,
  fetchVisas,
  setEditingVisa,
  setPreviewVisa,
  handleDeleteVisa,

  // Payments
  paymentsList = [],
  usersList = [],
  sponsorshipsList = [],
  nominationsList = [],
  fetchPayments,
  paymentSearch = '',
  setPaymentSearch,
  paymentStatusFilter = 'all',
  setPaymentStatusFilter,
  paymentTypeFilter = 'all',
  setPaymentTypeFilter,
  handleTogglePaymentStatus,
  handleDeletePayment,

  // Sponsorships
  sponsorshipSearch = '',
  setSponsorshipSearch,
  fetchSponsorships,
  setEditingSponsorship,
  setPreviewSponsorship,
  handleDeleteSponsorship,

  // Nominations
  nominationSearch = '',
  setNominationSearch,
  fetchNominations,
  setEditingNomination,
  setPreviewNomination,
  handleDeleteNomination,

  // Users
  userSearch = '',
  setUserSearch,
  fetchUsers,
  setEditingUser,
  handleDeleteUser,
  role = 'admin'
}) {
  const totalRevenue = paymentsList
    .filter(p => (p.status || '').toLowerCase() === 'paid')
    .reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);

  return (
    <div>
      {/* High-level metrics */}
      <div className="ca-stats-grid">
        <div className="ca-stat-card">
          <div className="ca-stat-title">Active Visas</div>
          <div className="ca-stat-value">{visasList.length}</div>
        </div>
        <div className="ca-stat-card" style={{ borderLeftColor: 'var(--ca-red)' }}>
          <div className="ca-stat-title">Payments Revenue (CAD)</div>
          <div className="ca-stat-value">${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>
        <div className="ca-stat-card" style={{ borderLeftColor: '#0284c7' }}>
          <div className="ca-stat-title">Sponsorships</div>
          <div className="ca-stat-value">{sponsorshipsList.length}</div>
        </div>
        <div className="ca-stat-card" style={{ borderLeftColor: '#7c3aed' }}>
          <div className="ca-stat-title">Nominations</div>
          <div className="ca-stat-value">{nominationsList.length}</div>
        </div>
        <div className="ca-stat-card" style={{ borderLeftColor: '#10b981' }}>
          <div className="ca-stat-title">Accounts</div>
          <div className="ca-stat-value">{usersList.length}</div>
        </div>
      </div>

      {/* Visas Section */}
      <VisasTable
        visasList={visasList}
        visaSearch={visaSearch}
        setVisaSearch={setVisaSearch}
        fetchVisas={fetchVisas}
        setEditingVisa={setEditingVisa}
        setPreviewVisa={setPreviewVisa}
        handleDeleteVisa={handleDeleteVisa}
      />

      {/* Payments Section */}
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

      {/* Sponsorships Section */}
      <SponsorshipsTable
        sponsorshipsList={sponsorshipsList}
        sponsorshipSearch={sponsorshipSearch}
        setSponsorshipSearch={setSponsorshipSearch}
        fetchSponsorships={fetchSponsorships}
        setEditingSponsorship={setEditingSponsorship}
        setPreviewSponsorship={setPreviewSponsorship}
        handleDeleteSponsorship={handleDeleteSponsorship}
      />

      {/* Nominations Section */}
      <NominationsTable
        nominationsList={nominationsList}
        nominationSearch={nominationSearch}
        setNominationSearch={setNominationSearch}
        fetchNominations={fetchNominations}
        setEditingNomination={setEditingNomination}
        setPreviewNomination={setPreviewNomination}
        handleDeleteNomination={handleDeleteNomination}
      />

      {/* Accounts Section */}
      <UsersTable
        usersList={usersList}
        userSearch={userSearch}
        setUserSearch={setUserSearch}
        fetchUsers={fetchUsers}
        setEditingUser={setEditingUser}
        handleDeleteUser={handleDeleteUser}
        role={role}
      />
    </div>
  );
}
