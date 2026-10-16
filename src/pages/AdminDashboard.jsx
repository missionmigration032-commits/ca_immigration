// src/pages/AdminDashboard.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useAuth } from '../context/AuthContext';
import '../components/dashboard/dashboard.css';

import {
  LayoutDashboard,
  FileText,
  CreditCard,
  Handshake,
  Award,
  Users,
  LogOut,
  Bell
} from 'lucide-react';

import {
  getInitialVisaFormData,
  getInitialPaymentFormData,
  getInitialSponsorshipFormData,
  getInitialNominationFormData,
  getInitialAccountFormData
} from '../components/dashboard/dashboardUtils';

// Modals
import EditUserModal from '../components/dashboard/modals/EditUserModal';
import EditVisaModal from '../components/dashboard/modals/EditVisaModal';
import EditSponsorshipModal from '../components/dashboard/modals/EditSponsorshipModal';
import EditNominationModal from '../components/dashboard/modals/EditNominationModal';
import VisaPreviewModal from '../components/dashboard/modals/VisaPreviewModal';

// Tabs
import OverviewTab from '../components/dashboard/tabs/OverviewTab';
import VisasTab from '../components/dashboard/tabs/VisasTab';
import PaymentsTab from '../components/dashboard/tabs/PaymentsTab';
import SponsorshipsTab from '../components/dashboard/tabs/SponsorshipsTab';
import NominationsTab from '../components/dashboard/tabs/NominationsTab';
import AccountsTab from '../components/dashboard/tabs/AccountsTab';

export default function AdminDashboard() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect if not admin
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/j/eng/l');
    }
  }, [user, navigate]);

  const [activeTab, setActiveTab] = useState('overview');
  const [alert, setAlert] = useState(null);

  // Collections state
  const [visasList, setVisasList] = useState([]);
  const [paymentsList, setPaymentsList] = useState([]);
  const [sponsorshipsList, setSponsorshipsList] = useState([]);
  const [nominationsList, setNominationsList] = useState([]);
  const [usersList, setUsersList] = useState([]);

  // Search states
  const [visaSearch, setVisaSearch] = useState('');
  const [paymentSearch, setPaymentSearch] = useState('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('all');
  const [paymentTypeFilter, setPaymentTypeFilter] = useState('all');
  const [sponsorshipSearch, setSponsorshipSearch] = useState('');
  const [nominationSearch, setNominationSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');

  // Active Modals
  const [editingUser, setEditingUser] = useState(null);
  const [editingVisa, setEditingVisa] = useState(null);
  const [editingSponsorship, setEditingSponsorship] = useState(null);
  const [editingNomination, setEditingNomination] = useState(null);
  const [previewItem, setPreviewItem] = useState(null);
  const [previewType, setPreviewType] = useState('visa');

  // Form states
  const [visaFormData, setVisaFormData] = useState(getInitialVisaFormData);
  const [visaDocs, setVisaDocs] = useState([]);
  const [visaDocName, setVisaDocName] = useState('');
  const [visaDocBase64, setVisaDocBase64] = useState('');
  const [isVisaSubmitting, setIsVisaSubmitting] = useState(false);

  const [paymentFormData, setPaymentFormData] = useState(getInitialPaymentFormData);
  const [isPaymentSubmitting, setIsPaymentSubmitting] = useState(false);

  const [sponsorshipFormData, setSponsorshipFormData] = useState(getInitialSponsorshipFormData);
  const [sponsorshipDocs, setSponsorshipDocs] = useState([]);
  const [sponsorshipDocName, setSponsorshipDocName] = useState('');
  const [sponsorshipDocBase64, setSponsorshipDocBase64] = useState('');
  const [isSponsorshipSubmitting, setIsSponsorshipSubmitting] = useState(false);

  const [nominationFormData, setNominationFormData] = useState(getInitialNominationFormData);
  const [nominationDocs, setNominationDocs] = useState([]);
  const [nominationDocName, setNominationDocName] = useState('');
  const [nominationDocBase64, setNominationDocBase64] = useState('');
  const [isNominationSubmitting, setIsNominationSubmitting] = useState(false);

  const [accountFormData, setAccountFormData] = useState(getInitialAccountFormData);
  const [isAccountSubmitting, setIsAccountSubmitting] = useState(false);

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setAlert(null);
    }, 6000);
  };

  // API Fetchers
  const fetchUsers = useCallback(async () => {
    if (!token) return;
    try {
      let res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/users?origin=ca`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) {
        res = await fetch(`${import.meta.env.VITE_API_URL}/api/users?origin=ca`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
      }
      if (res.ok) {
        const data = await res.json();
        setUsersList(Array.isArray(data) ? data : (data.users || []));
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  }, [token]);

  const fetchVisas = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/visas?origin=ca`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setVisasList(Array.isArray(data) ? data : (data.visas || []));
      }
    } catch (err) {
      console.error('Failed to fetch visas:', err);
    }
  }, [token]);

  const fetchPayments = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/payments?origin=ca`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setPaymentsList(Array.isArray(data) ? data : (data.payments || []));
      }
    } catch (err) {
      console.error('Failed to fetch payments:', err);
    }
  }, [token]);

  const fetchSponsorships = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/sponsorships?origin=ca`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSponsorshipsList(Array.isArray(data) ? data : (data.sponsorships || []));
      }
    } catch (err) {
      console.error('Failed to fetch sponsorships:', err);
    }
  }, [token]);

  const fetchNominations = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/nominations?origin=ca`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setNominationsList(Array.isArray(data) ? data : (data.nominations || []));
      }
    } catch (err) {
      console.error('Failed to fetch nominations:', err);
    }
  }, [token]);

  // Load all on mount
  useEffect(() => {
    if (token) {
      fetchUsers();
      fetchVisas();
      fetchPayments();
      fetchSponsorships();
      fetchNominations();
    }
  }, [token, fetchUsers, fetchVisas, fetchPayments, fetchSponsorships, fetchNominations]);

  // Document Helpers for Visa
  const handleVisaFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVisaDocBase64(reader.result);
        if (!visaDocName) setVisaDocName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const addVisaDocToList = () => {
    if (!visaDocBase64) {
      alert('Please select a file first.');
      return;
    }
    const name = visaDocName.trim() || 'Attached Document';
    setVisaDocs(prev => [...prev, { document: visaDocBase64, documentName: name }]);
    setVisaDocBase64('');
    setVisaDocName('');
    const input = document.getElementById('visa-doc-file-input');
    if (input) input.value = '';
  };

  const removeVisaDocFromList = (idx) => {
    setVisaDocs(prev => prev.filter((_, i) => i !== idx));
  };

  // Visa Submit
  const handleVisaSubmit = async (e) => {
    e.preventDefault();
    if (visaDocBase64 || visaDocName.trim()) {
      alert("You have a document selected but not added. Please click 'Add to List' or clear it.");
      return;
    }

    setIsVisaSubmitting(true);
    const payload = {
      ...visaFormData,
      visaApplicant: `${visaFormData.givenNames || ''} ${visaFormData.familyName || ''}`.trim(),
      visaorigin: 'ca',
      origin: 'ca',
      latestUpdate: {
        date: visaFormData.latestUpdateDate,
        status: visaFormData.latestUpdateStatus,
        content: visaFormData.latestUpdateContent
      },
      document: visaDocs
    };

    delete payload.latestUpdateDate;
    delete payload.latestUpdateStatus;
    delete payload.latestUpdateContent;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/visas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        showAlert(data.message || 'Visa application created successfully!', 'success');
        setVisaFormData(getInitialVisaFormData());
        setVisaDocs([]);
        fetchVisas();
      } else {
        showAlert(data.message || 'Failed to create visa application.', 'danger');
      }
    } catch (err) {
      console.error('Create visa error:', err);
      showAlert('Network error while creating visa.', 'danger');
    } finally {
      setIsVisaSubmitting(false);
    }
  };

  const handleDeleteVisa = async (id) => {
    if (!window.confirm('Are you sure you want to delete this visa record?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/visas/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        showAlert(data.message || 'Visa record deleted successfully.', 'success');
        fetchVisas();
      } else {
        showAlert(data.message || 'Failed to delete visa.', 'danger');
      }
    } catch (err) {
      console.error('Delete visa error:', err);
      showAlert('Network error deleting visa.', 'danger');
    }
  };

  // Payments Submit
  const handleCreatePayment = async (e) => {
    e.preventDefault();
    setIsPaymentSubmitting(true);

    const payload = {
      paymentType: paymentFormData.paymentType,
      referenceNumber: paymentFormData.referenceNumber,
      amount: Number(paymentFormData.amount),
      currency: 'CAD',
      status: paymentFormData.status,
      issuingOffice: paymentFormData.issuingOffice,
      internalRef: paymentFormData.internalRef,
      transactionDate: paymentFormData.transactionDate,
      origin: 'ca',
      userId: paymentFormData.userId || null
    };

    if (paymentFormData.paymentType === 'visa') {
      payload.visaId = paymentFormData.selectedVisaId;
      payload.visaType = paymentFormData.visaType;
    } else if (paymentFormData.paymentType === 'sponsorship') {
      payload.sponsorshipId = paymentFormData.selectedSponsorshipId;
      payload.visaType = paymentFormData.visaType;
    } else if (paymentFormData.paymentType === 'nomination') {
      payload.nominationId = paymentFormData.selectedNominationId;
      payload.visaType = paymentFormData.visaType;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        showAlert('Payment record created successfully!', 'success');
        setPaymentFormData(getInitialPaymentFormData());
        fetchPayments();
      } else {
        showAlert(data.message || 'Failed to create payment.', 'danger');
      }
    } catch (err) {
      console.error('Create payment error:', err);
      showAlert('Network error creating payment.', 'danger');
    } finally {
      setIsPaymentSubmitting(false);
    }
  };

  const handleTogglePaymentStatus = async (payment) => {
    const newStatus = (payment.status || '').toLowerCase() === 'paid' ? 'pending' : 'paid';
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/${payment._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: newStatus,
          transactionDate: newStatus === 'paid' ? new Date().toISOString() : null
        })
      });
      if (res.ok) {
        showAlert(`Payment status updated to ${newStatus.toUpperCase()}`, 'success');
        fetchPayments();
      } else {
        showAlert('Failed to update payment status.', 'danger');
      }
    } catch (err) {
      console.error('Toggle payment status error:', err);
      showAlert('Network error updating payment status.', 'danger');
    }
  };

  const handleDeletePayment = async (id) => {
    if (!window.confirm('Are you sure you want to delete this payment record?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        showAlert('Payment record deleted.', 'success');
        fetchPayments();
      } else {
        showAlert('Failed to delete payment.', 'danger');
      }
    } catch (err) {
      console.error('Delete payment error:', err);
      showAlert('Network error deleting payment.', 'danger');
    }
  };

  // Sponsorships Handlers
  const handleSponsorshipFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSponsorshipDocBase64(reader.result);
        if (!sponsorshipDocName) setSponsorshipDocName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const addSponsorshipDocToList = () => {
    if (!sponsorshipDocBase64) {
      alert('Please select a file first.');
      return;
    }
    const name = sponsorshipDocName.trim() || 'Attached Document';
    setSponsorshipDocs(prev => [...prev, { document: sponsorshipDocBase64, documentName: name }]);
    setSponsorshipDocBase64('');
    setSponsorshipDocName('');
    const input = document.getElementById('spon-doc-file-input');
    if (input) input.value = '';
  };

  const removeSponsorshipDocFromList = (idx) => {
    setSponsorshipDocs(prev => prev.filter((_, i) => i !== idx));
  };

  const handleCreateSponsorship = async (e) => {
    e.preventDefault();
    setIsSponsorshipSubmitting(true);

    const payload = {
      ...sponsorshipFormData,
      origin: 'ca',
      document: sponsorshipDocs
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/sponsorships`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        showAlert('Sponsorship record created successfully!', 'success');
        setSponsorshipFormData(getInitialSponsorshipFormData());
        setSponsorshipDocs([]);
        fetchSponsorships();
      } else {
        showAlert(data.message || 'Failed to create sponsorship.', 'danger');
      }
    } catch (err) {
      console.error('Create sponsorship error:', err);
      showAlert('Network error creating sponsorship.', 'danger');
    } finally {
      setIsSponsorshipSubmitting(false);
    }
  };

  const handleDeleteSponsorship = async (id) => {
    if (!window.confirm('Are you sure you want to delete this sponsorship record?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/sponsorships/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        showAlert('Sponsorship record deleted.', 'success');
        fetchSponsorships();
      } else {
        showAlert('Failed to delete sponsorship.', 'danger');
      }
    } catch (err) {
      console.error('Delete sponsorship error:', err);
      showAlert('Network error deleting sponsorship.', 'danger');
    }
  };

  // Nominations Handlers
  const handleNominationFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNominationDocBase64(reader.result);
        if (!nominationDocName) setNominationDocName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const addNominationDocToList = () => {
    if (!nominationDocBase64) {
      alert('Please select a file first.');
      return;
    }
    const name = nominationDocName.trim() || 'Attached Document';
    setNominationDocs(prev => [...prev, { document: nominationDocBase64, documentName: name }]);
    setNominationDocBase64('');
    setNominationDocName('');
    const input = document.getElementById('nom-doc-file-input');
    if (input) input.value = '';
  };

  const removeNominationDocFromList = (idx) => {
    setNominationDocs(prev => prev.filter((_, i) => i !== idx));
  };

  const handleCreateNomination = async (e) => {
    e.preventDefault();
    setIsNominationSubmitting(true);

    const payload = {
      ...nominationFormData,
      origin: 'ca',
      document: nominationDocs
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/nominations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        showAlert('Nomination record created successfully!', 'success');
        setNominationFormData(getInitialNominationFormData());
        setNominationDocs([]);
        fetchNominations();
      } else {
        showAlert(data.message || 'Failed to create nomination.', 'danger');
      }
    } catch (err) {
      console.error('Create nomination error:', err);
      showAlert('Network error creating nomination.', 'danger');
    } finally {
      setIsNominationSubmitting(false);
    }
  };

  const handleDeleteNomination = async (id) => {
    if (!window.confirm('Are you sure you want to delete this nomination record?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/nominations/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        showAlert('Nomination record deleted.', 'success');
        fetchNominations();
      } else {
        showAlert('Failed to delete nomination.', 'danger');
      }
    } catch (err) {
      console.error('Delete nomination error:', err);
      showAlert('Network error deleting nomination.', 'danger');
    }
  };

  // Accounts Handlers
  const handleCreateAccount = async (targetRole = 'user') => {
    if (!accountFormData.username || !accountFormData.password) {
      alert('Username and password are required.');
      return;
    }

    setIsAccountSubmitting(true);
    const endpoint = targetRole === 'employe'
      ? `${import.meta.env.VITE_API_URL}/api/auth/employe`
      : `${import.meta.env.VITE_API_URL}/api/auth/user`;

    const payload = {
      username: accountFormData.username.trim(),
      password: accountFormData.password,
      role: targetRole,
      origin: 'ca'
    };

    if (accountFormData.email) payload.email = accountFormData.email.trim();
    if (accountFormData.givenName) payload.givenName = accountFormData.givenName.trim();
    if (accountFormData.familyName) payload.familyName = accountFormData.familyName.trim();
    if (accountFormData.passport) payload.passport = accountFormData.passport.trim();
    if (accountFormData.dob) payload.dob = accountFormData.dob.trim();

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        showAlert(`${targetRole === 'employe' ? 'Employee' : 'User'} account created successfully!`, 'success');
        setAccountFormData(getInitialAccountFormData());
        fetchUsers();
      } else {
        showAlert(data.message || 'Failed to create account.', 'danger');
      }
    } catch (err) {
      console.error('Create account error:', err);
      showAlert('Network error while creating account.', 'danger');
    } finally {
      setIsAccountSubmitting(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user? All associated visas will also be removed.')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        showAlert('User account and associated records deleted.', 'success');
        fetchUsers();
        fetchVisas();
      } else {
        showAlert(data.message || 'Failed to delete user.', 'danger');
      }
    } catch (err) {
      console.error('Delete user error:', err);
      showAlert('Network error deleting user.', 'danger');
    }
  };

  return (
    <div className="ca-dashboard-wrapper">
      <SEO
        title="Admin Portal - Immigration, Refugees and Citizenship Canada"
        description="Comprehensive administration dashboard for IRCC Canada visas, payments, sponsorships, nominations and user management."
        keywords="admin dashboard, IRCC manage visas, Canada sponsorships, Canada nominations, GCKey accounts"
      />

      <div className="container" style={{ paddingTop: '20px', paddingBottom: '60px' }}>
        {/* Top Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--ca-navy)', margin: '0 0 4px 0' }}>
              IRCC Administration Control Center
            </h1>
            <p style={{ margin: 0, color: 'var(--ca-text-muted)', fontSize: '14px' }}>
              Logged in as Administrator (<strong>{user?.username}</strong>) &bull; Origin: <strong>CA</strong>
            </p>
          </div>
          <div>
            <button
              type="button"
              className="ca-btn ca-btn-secondary"
              onClick={() => {
                logout();
                navigate('/j/eng/l');
              }}
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>

        {/* Alert Notifications */}
        {alert && (
          <div
            className={`alert alert-${alert.type}`}
            style={{
              padding: '12px 18px',
              borderRadius: '4px',
              marginBottom: '20px',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            {alert.message}
          </div>
        )}

        {/* Dashboard Navigation Tabs */}
        <div className="ca-nav-tabs">
          <button
            type="button"
            className={`ca-nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <LayoutDashboard size={16} /> Overview
          </button>
          <button
            type="button"
            className={`ca-nav-tab ${activeTab === 'visas' ? 'active' : ''}`}
            onClick={() => setActiveTab('visas')}
          >
            <FileText size={16} /> Visas ({visasList.length})
          </button>
          <button
            type="button"
            className={`ca-nav-tab ${activeTab === 'payments' ? 'active' : ''}`}
            onClick={() => setActiveTab('payments')}
          >
            <CreditCard size={16} /> Payments & Fees ({paymentsList.length})
          </button>
          <button
            type="button"
            className={`ca-nav-tab ${activeTab === 'sponsorships' ? 'active' : ''}`}
            onClick={() => setActiveTab('sponsorships')}
          >
            <Handshake size={16} /> Sponsorships ({sponsorshipsList.length})
          </button>
          <button
            type="button"
            className={`ca-nav-tab ${activeTab === 'nominations' ? 'active' : ''}`}
            onClick={() => setActiveTab('nominations')}
          >
            <Award size={16} /> Nominations ({nominationsList.length})
          </button>
          <button
            type="button"
            className={`ca-nav-tab ${activeTab === 'accounts' ? 'active' : ''}`}
            onClick={() => setActiveTab('accounts')}
          >
            <Users size={16} /> Accounts ({usersList.length})
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === 'overview' && (
          <OverviewTab
            visasList={visasList}
            visaSearch={visaSearch}
            setVisaSearch={setVisaSearch}
            fetchVisas={fetchVisas}
            setEditingVisa={setEditingVisa}
            setPreviewVisa={(v) => { setPreviewItem(v); setPreviewType('visa'); }}
            handleDeleteVisa={handleDeleteVisa}

            paymentsList={paymentsList}
            usersList={usersList}
            sponsorshipsList={sponsorshipsList}
            nominationsList={nominationsList}
            fetchPayments={fetchPayments}
            paymentSearch={paymentSearch}
            setPaymentSearch={setPaymentSearch}
            paymentStatusFilter={paymentStatusFilter}
            setPaymentStatusFilter={setPaymentStatusFilter}
            paymentTypeFilter={paymentTypeFilter}
            setPaymentTypeFilter={setPaymentTypeFilter}
            handleTogglePaymentStatus={handleTogglePaymentStatus}
            handleDeletePayment={handleDeletePayment}

            sponsorshipSearch={sponsorshipSearch}
            setSponsorshipSearch={setSponsorshipSearch}
            fetchSponsorships={fetchSponsorships}
            setEditingSponsorship={setEditingSponsorship}
            setPreviewSponsorship={(s) => { setPreviewItem(s); setPreviewType('sponsorship'); }}
            handleDeleteSponsorship={handleDeleteSponsorship}

            nominationSearch={nominationSearch}
            setNominationSearch={setNominationSearch}
            fetchNominations={fetchNominations}
            setEditingNomination={setEditingNomination}
            setPreviewNomination={(n) => { setPreviewItem(n); setPreviewType('nomination'); }}
            handleDeleteNomination={handleDeleteNomination}

            userSearch={userSearch}
            setUserSearch={setUserSearch}
            fetchUsers={fetchUsers}
            setEditingUser={setEditingUser}
            handleDeleteUser={handleDeleteUser}
            role="admin"
          />
        )}

        {activeTab === 'visas' && (
          <VisasTab
            visaFormData={visaFormData}
            setVisaFormData={setVisaFormData}
            uploadedDocs={visaDocs}
            setUploadedDocs={setVisaDocs}
            currentDocName={visaDocName}
            setCurrentDocName={setVisaDocName}
            currentDocBase64={visaDocBase64}
            setCurrentDocBase64={setVisaDocBase64}
            handleFileChange={handleVisaFileChange}
            addDocumentToList={addVisaDocToList}
            removeDocumentFromList={removeVisaDocFromList}
            handleVisaSubmit={handleVisaSubmit}
            isVisaSubmitting={isVisaSubmitting}
            usersList={usersList}
            visasList={visasList}
            visaSearch={visaSearch}
            setVisaSearch={setVisaSearch}
            fetchVisas={fetchVisas}
            setEditingVisa={setEditingVisa}
            setPreviewVisa={(v) => { setPreviewItem(v); setPreviewType('visa'); }}
            handleDeleteVisa={handleDeleteVisa}
          />
        )}

        {activeTab === 'payments' && (
          <PaymentsTab
            paymentFormData={paymentFormData}
            setPaymentFormData={setPaymentFormData}
            handleCreatePayment={handleCreatePayment}
            isPaymentSubmitting={isPaymentSubmitting}
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
        )}

        {activeTab === 'sponsorships' && (
          <SponsorshipsTab
            sponsorshipFormData={sponsorshipFormData}
            setSponsorshipFormData={setSponsorshipFormData}
            uploadedDocs={sponsorshipDocs}
            setUploadedDocs={setSponsorshipDocs}
            currentDocName={sponsorshipDocName}
            setCurrentDocName={setSponsorshipDocName}
            currentDocBase64={sponsorshipDocBase64}
            setCurrentDocBase64={setSponsorshipDocBase64}
            handleFileChange={handleSponsorshipFileChange}
            addDocumentToList={addSponsorshipDocToList}
            removeDocumentFromList={removeSponsorshipDocFromList}
            handleCreateSponsorship={handleCreateSponsorship}
            isSponsorshipSubmitting={isSponsorshipSubmitting}
            usersList={usersList}
            sponsorshipsList={sponsorshipsList}
            sponsorshipSearch={sponsorshipSearch}
            setSponsorshipSearch={setSponsorshipSearch}
            fetchSponsorships={fetchSponsorships}
            setEditingSponsorship={setEditingSponsorship}
            setPreviewSponsorship={(s) => { setPreviewItem(s); setPreviewType('sponsorship'); }}
            handleDeleteSponsorship={handleDeleteSponsorship}
          />
        )}

        {activeTab === 'nominations' && (
          <NominationsTab
            nominationFormData={nominationFormData}
            setNominationFormData={setNominationFormData}
            uploadedDocs={nominationDocs}
            setUploadedDocs={setNominationDocs}
            currentDocName={nominationDocName}
            setCurrentDocName={setNominationDocName}
            currentDocBase64={nominationDocBase64}
            setCurrentDocBase64={setNominationDocBase64}
            handleFileChange={handleNominationFileChange}
            addDocumentToList={addNominationDocToList}
            removeDocumentFromList={removeNominationDocFromList}
            handleCreateNomination={handleCreateNomination}
            isNominationSubmitting={isNominationSubmitting}
            usersList={usersList}
            nominationsList={nominationsList}
            nominationSearch={nominationSearch}
            setNominationSearch={setNominationSearch}
            fetchNominations={fetchNominations}
            setEditingNomination={setEditingNomination}
            setPreviewNomination={(n) => { setPreviewItem(n); setPreviewType('nomination'); }}
            handleDeleteNomination={handleDeleteNomination}
          />
        )}

        {activeTab === 'accounts' && (
          <AccountsTab
            accountFormData={accountFormData}
            setAccountFormData={setAccountFormData}
            isAccountSubmitting={isAccountSubmitting}
            handleCreateAccount={handleCreateAccount}
            role="admin"
            usersList={usersList}
            fetchUsers={fetchUsers}
            userSearch={userSearch}
            setUserSearch={setUserSearch}
            setEditingUser={setEditingUser}
            handleDeleteUser={handleDeleteUser}
          />
        )}
      </div>

      {/* Modals */}
      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={() => {
            fetchUsers();
            showAlert('User account updated successfully.', 'success');
          }}
          token={token}
        />
      )}

      {editingVisa && (
        <EditVisaModal
          visa={editingVisa}
          users={usersList}
          onClose={() => setEditingVisa(null)}
          onSave={() => {
            fetchVisas();
            showAlert('Visa application updated successfully.', 'success');
          }}
          token={token}
        />
      )}

      {editingSponsorship && (
        <EditSponsorshipModal
          sponsorship={editingSponsorship}
          users={usersList}
          onClose={() => setEditingSponsorship(null)}
          onSave={() => {
            fetchSponsorships();
            showAlert('Sponsorship record updated successfully.', 'success');
          }}
          token={token}
        />
      )}

      {editingNomination && (
        <EditNominationModal
          nomination={editingNomination}
          users={usersList}
          onClose={() => setEditingNomination(null)}
          onSave={() => {
            fetchNominations();
            showAlert('Nomination record updated successfully.', 'success');
          }}
          token={token}
        />
      )}

      {previewItem && (
        <VisaPreviewModal
          item={previewItem}
          type={previewType}
          onClose={() => setPreviewItem(null)}
        />
      )}
    </div>
  );
}
