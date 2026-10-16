// src/pages/MyCICHome.jsx
import { useState, useEffect, useCallback } from "react";
import DelayedLink from "../components/DelayedLink";
import SEO from "../components/SEO";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "../context/LanguageContext";
import { redirectToStripeCheckout } from "../services/stripeService";
import { CreditCard, CheckCircle } from "lucide-react";

export default function MyCICHome() {
  const { user, token } = useAuth();
  const { language, t } = useTranslation();

  const [activeCategory, setActiveCategory] = useState("all"); // 'all', 'visas', 'sponsorships', 'nominations', 'payments'

  // Collections
  const [visas, setVisas] = useState([]);
  const [sponsorships, setSponsorships] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [payments, setPayments] = useState([]);
  const [payingPaymentId, setPayingPaymentId] = useState(null);

  // Submitted Applications Table State
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [submittedEntriesPerPage, setSubmittedEntriesPerPage] = useState(10);
  const [submittedSort, setSubmittedSort] = useState({
    column: "dateSubmitted",
    direction: "desc",
  });
  const [submittedData, setSubmittedData] = useState([]);

  // Unsubmitted Applications State
  const [unsubmittedSearch, setUnsubmittedSearch] = useState("");
  const [unsubmittedEntriesPerPage, setUnsubmittedEntriesPerPage] = useState(5);
  const [unsubmittedSort, setUnsubmittedSort] = useState({
    column: "dateCreated",
    direction: "desc",
  });
  const [unsubmittedData] = useState([]);

  const fetchUserData = useCallback(async () => {
    const userId = user?._id || user?.id;
    if (!userId || !token) return;

    try {
      // 1. Fetch Visas
      const visaRes = await fetch(`${import.meta.env.VITE_API_URL}/api/visas/user/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      let loadedVisas = [];
      if (visaRes.ok) {
        const vData = await visaRes.json();
        loadedVisas = Array.isArray(vData) ? vData : (vData?.visas || []);
        setVisas(loadedVisas);
      }

      // 2. Fetch Sponsorships
      const sponRes = await fetch(`${import.meta.env.VITE_API_URL}/api/sponsorships/user/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      let loadedSpon = [];
      if (sponRes.ok) {
        const sData = await sponRes.json();
        loadedSpon = Array.isArray(sData) ? sData : (sData?.sponsorships || []);
        setSponsorships(loadedSpon);
      }

      // 3. Fetch Nominations
      const nomRes = await fetch(`${import.meta.env.VITE_API_URL}/api/nominations/user/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      let loadedNom = [];
      if (nomRes.ok) {
        const nData = await nomRes.json();
        loadedNom = Array.isArray(nData) ? nData : (nData?.nominations || []);
        setNominations(loadedNom);
      }

      // 4. Fetch Payments
      const payRes = await fetch(`${import.meta.env.VITE_API_URL}/api/payments?origin=ca`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (payRes.ok) {
        const pData = await payRes.json();
        const allPayments = Array.isArray(pData) ? pData : (pData?.payments || []);

        // Filter payments belonging to this user or their visas/sponsorships/nominations
        const userVisaIds = new Set(loadedVisas.map(v => v._id));
        const userSponIds = new Set(loadedSpon.map(s => s._id));
        const userNomIds = new Set(loadedNom.map(n => n._id));

        const userPayments = allPayments.filter(p => {
          const pUserId = p.userId?._id || p.userId;
          const pVisaId = p.visaId?._id || p.visaId;
          const pSponId = p.sponsorshipId?._id || p.sponsorshipId;
          const pNomId = p.nominationId?._id || p.nominationId;

          return (
            (pUserId && String(pUserId) === String(userId)) ||
            (pVisaId && userVisaIds.has(pVisaId)) ||
            (pSponId && userSponIds.has(pSponId)) ||
            (pNomId && userNomIds.has(pNomId))
          );
        });

        setPayments(userPayments);
      }
    } catch (err) {
      console.error("Error fetching user immigration data:", err);
    }
  }, [user, token]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Combine loaded records into submitted applications table based on active category
  useEffect(() => {
    let combined = [];

    if (activeCategory === "all" || activeCategory === "visas") {
      const mappedVisas = visas.map(visa => ({
        id: visa._id,
        category: 'Visa',
        appType: visa.visaType || visa.applicationType || 'Visa',
        appNumber: visa.applicationNumber || visa.uci || '',
        applicantName: `${visa.givenNames || ''} ${visa.familyName || ''}`.trim() || visa.visaApplicant || '',
        dateSubmitted: visa.receiveDate || (visa.createdAt ? new Date(visa.createdAt).toLocaleDateString() : ''),
        status: visa.latestUpdate?.status || visa.visaStatus || 'Submitted',
        messages: Array.isArray(visa.document) ? `${visa.document.length} message(s)` : '0 message',
        rawRecord: visa,
        type: 'visa'
      }));
      combined = [...combined, ...mappedVisas];
    }

    if (activeCategory === "all" || activeCategory === "sponsorships") {
      const mappedSpon = sponsorships.map(spon => ({
        id: spon._id,
        category: 'Sponsorship',
        appType: spon.visaProgram || 'Sponsorship Application',
        appNumber: spon.applicationId || spon.fileNumber || '',
        applicantName: `${spon.givenName || ''} ${spon.familyName || ''}`.trim() || '',
        dateSubmitted: spon.approvedDate || (spon.createdAt ? new Date(spon.createdAt).toLocaleDateString() : ''),
        status: 'Approved',
        messages: Array.isArray(spon.document) ? `${spon.document.length} message(s)` : '0 message',
        rawRecord: spon,
        type: 'sponsorship'
      }));
      combined = [...combined, ...mappedSpon];
    }

    if (activeCategory === "all" || activeCategory === "nominations") {
      const mappedNom = nominations.map(nom => ({
        id: nom._id,
        category: 'Nomination',
        appType: nom.visaProgram || 'Nomination Application',
        appNumber: nom.applicationId || nom.fileNumber || '',
        applicantName: `${nom.givenName || ''} ${nom.familyName || ''}`.trim() || '',
        dateSubmitted: nom.approvedDate || (nom.createdAt ? new Date(nom.createdAt).toLocaleDateString() : ''),
        status: 'Approved',
        messages: Array.isArray(nom.document) ? `${nom.document.length} message(s)` : '0 message',
        rawRecord: nom,
        type: 'nomination'
      }));
      combined = [...combined, ...mappedNom];
    }

    setSubmittedData(combined);
  }, [visas, sponsorships, nominations, activeCategory]);

  const ownerName = submittedData.length > 0
    ? submittedData[0].applicantName
    : (user ? (user.givenName ? `${user.givenName} ${user.familyName || ''}`.trim() : user.username) : "");

  const accountTitle = language === 'en' ? `${ownerName}'s account` : `Compte de ${ownerName}`;

  // Stripe Checkout Action
  const handlePayFee = async (payment) => {
    setPayingPaymentId(payment._id);
    try {
      await redirectToStripeCheckout({
        paymentId: payment._id,
        amount: payment.amount,
        currency: payment.currency || 'CAD',
        origin: 'ca'
      }, token);
    } catch (err) {
      console.error("Failed to redirect to checkout:", err);
      alert(err.message || "Failed to initialize payment gateway.");
    } finally {
      setPayingPaymentId(null);
    }
  };

  // Helper to render sort arrows
  const renderSortIndicator = (currentSort, colKey) => {
    const isActive = currentSort.column === colKey;
    if (isActive) {
      return (
        <span style={{ marginLeft: "4px", fontWeight: "bold", color: "#000" }}>
          {currentSort.direction === "asc" ? "▲" : "▼"}
        </span>
      );
    }
    return (
      <span style={{ marginLeft: "4px", fontWeight: "normal", color: "#666" }}>
        ↓↑
      </span>
    );
  };

  const handleSubmittedSort = (colKey) => {
    if (submittedSort.column === colKey) {
      setSubmittedSort({
        column: colKey,
        direction: submittedSort.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSubmittedSort({ column: colKey, direction: "desc" });
    }
  };

  const handleUnsubmittedSort = (colKey) => {
    if (unsubmittedSort.column === colKey) {
      setUnsubmittedSort({
        column: colKey,
        direction: unsubmittedSort.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setUnsubmittedSort({ column: colKey, direction: "desc" });
    }
  };

  // Filtered data
  const filteredSubmitted = submittedData.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(submittedSearch.toLowerCase()),
    ),
  );
  const displayedSubmitted = filteredSubmitted.slice(0, submittedEntriesPerPage);

  const filteredUnsubmitted = unsubmittedData.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(unsubmittedSearch.toLowerCase()),
    ),
  );
  const displayedUnsubmitted = filteredUnsubmitted.slice(0, unsubmittedEntriesPerPage);

  return (
    <div className="gckey-page">
      <SEO
        title="MyCIC Account Dashboard - Government of Canada"
        description="Manage your IRCC applications, continue saved draft forms, track visa status, review sponsorships, nominations, and pay processing fees."
        keywords="MyCIC account, IRCC dashboard, GCKey portal, Canada visa application, Canada sponsorship, Canada nomination, pay visa fee"
      />

      <div
        className="container"
        style={{
          minHeight: "650px",
          paddingTop: "15px",
          paddingBottom: "50px",
        }}
      >
        <main role="main" property="mainContentOfPage">
          {/* Account Title */}
          <div className="row">
            <div className="col-xs-12">
              <h1
                id="wb-cont"
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  color: "#26374a",
                  marginTop: "10px",
                  marginBottom: "8px",
                }}
              >
                {accountTitle}
              </h1>
              <div
                style={{
                  borderBottom: "2px solid #af3c43",
                  marginBottom: "20px",
                  width: "100%",
                }}
              ></div>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div style={{ marginBottom: "20px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button
              type="button"
              className={`btn ${activeCategory === "all" ? "btn-primary" : "btn-default"}`}
              style={{ fontWeight: "600", fontSize: "13px" }}
              onClick={() => setActiveCategory("all")}
            >
              All Applications ({visas.length + sponsorships.length + nominations.length})
            </button>
            <button
              type="button"
              className={`btn ${activeCategory === "visas" ? "btn-primary" : "btn-default"}`}
              style={{ fontWeight: "600", fontSize: "13px" }}
              onClick={() => setActiveCategory("visas")}
            >
              Visas & Permits ({visas.length})
            </button>
            <button
              type="button"
              className={`btn ${activeCategory === "sponsorships" ? "btn-primary" : "btn-default"}`}
              style={{ fontWeight: "600", fontSize: "13px" }}
              onClick={() => setActiveCategory("sponsorships")}
            >
              Sponsorships ({sponsorships.length})
            </button>
            <button
              type="button"
              className={`btn ${activeCategory === "nominations" ? "btn-primary" : "btn-default"}`}
              style={{ fontWeight: "600", fontSize: "13px" }}
              onClick={() => setActiveCategory("nominations")}
            >
              Nominations ({nominations.length})
            </button>
            <button
              type="button"
              className={`btn ${activeCategory === "payments" ? "btn-primary" : "btn-default"}`}
              style={{ fontWeight: "600", fontSize: "13px" }}
              onClick={() => setActiveCategory("payments")}
            >
              Fees & Payments ({payments.length})
            </button>
          </div>

          {/* If Payments tab is chosen, display Fees & Payments section */}
          {activeCategory === "payments" ? (
            <section style={{ marginBottom: "35px" }}>
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                  color: "#26374a",
                  marginTop: "0",
                  marginBottom: "12px",
                }}
              >
                Government of Canada Fees & Official Receipts
              </h2>
              <p style={{ fontSize: "14px", color: "#333", marginBottom: "16px" }}>
                Review immigration processing fees, pending balances, and verified receipts for your application.
              </p>

              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    border: "1px solid #ccc",
                    fontSize: "14px",
                    backgroundColor: "#fff",
                  }}
                >
                  <thead>
                    <tr style={{ borderBottom: "2px solid #ccc", backgroundColor: "#f5f5f5", color: "#222" }}>
                      <th style={{ padding: "10px", fontWeight: "bold", borderRight: "1px solid #ccc" }}>Reference Number</th>
                      <th style={{ padding: "10px", fontWeight: "bold", borderRight: "1px solid #ccc" }}>Description</th>
                      <th style={{ padding: "10px", fontWeight: "bold", borderRight: "1px solid #ccc" }}>Amount</th>
                      <th style={{ padding: "10px", fontWeight: "bold", borderRight: "1px solid #ccc" }}>Status</th>
                      <th style={{ padding: "10px", fontWeight: "bold", borderRight: "1px solid #ccc" }}>Transaction Date</th>
                      <th style={{ padding: "10px", fontWeight: "bold" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ padding: "20px", textAlign: "center", color: "#666", fontStyle: "italic" }}>
                          No fee records found for your account.
                        </td>
                      </tr>
                    ) : (
                      payments.map((p) => {
                        const isPaid = (p.status || "").toLowerCase() === "paid";
                        const dateStr = p.transactionDate
                          ? new Date(p.transactionDate).toLocaleDateString()
                          : (p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "—");

                        return (
                          <tr key={p._id} style={{ borderBottom: "1px solid #eee" }}>
                            <td style={{ padding: "10px", borderRight: "1px solid #eee" }}>
                              <strong>{p.referenceNumber}</strong>
                            </td>
                            <td style={{ padding: "10px", borderRight: "1px solid #eee" }}>
                              {p.visaType || "Immigration Processing Fee"}
                            </td>
                            <td style={{ padding: "10px", borderRight: "1px solid #eee" }}>
                              <strong>${Number(p.amount || 0).toFixed(2)} {p.currency || 'CAD'}</strong>
                            </td>
                            <td style={{ padding: "10px", borderRight: "1px solid #eee" }}>
                              <span
                                style={{
                                  display: "inline-block",
                                  padding: "3px 8px",
                                  borderRadius: "4px",
                                  fontSize: "12px",
                                  fontWeight: "bold",
                                  backgroundColor: isPaid ? "#e6f4ea" : "#fef7e0",
                                  color: isPaid ? "#137333" : "#b06000",
                                  border: `1px solid ${isPaid ? "#ceead6" : "#fce8b2"}`
                                }}
                              >
                                {isPaid ? "PAID" : "PENDING"}
                              </span>
                            </td>
                            <td style={{ padding: "10px", borderRight: "1px solid #eee" }}>{dateStr}</td>
                            <td style={{ padding: "10px" }}>
                              {isPaid ? (
                                <span style={{ color: "#137333", fontSize: "13px", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                  <CheckCircle size={15} /> Receipt Verified
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  className="btn btn-primary btn-sm"
                                  style={{ fontWeight: "bold", display: "inline-flex", alignItems: "center", gap: "6px" }}
                                  disabled={payingPaymentId === p._id}
                                  onClick={() => handlePayFee(p)}
                                >
                                  <CreditCard size={14} />
                                  {payingPaymentId === p._id ? "Connecting..." : "Pay Fee (Card)"}
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          ) : (
            /* SECTION 1: View the applications you submitted */
            <section style={{ marginBottom: "35px" }}>
              <div className="row">
                <div className="col-xs-12">
                  <h2
                    style={{
                      fontSize: "22px",
                      fontWeight: "bold",
                      color: "#26374a",
                      marginTop: "0",
                      marginBottom: "6px",
                    }}
                  >
                    {t('submittedAppsTitle')}
                  </h2>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#333333",
                      marginBottom: "15px",
                    }}
                  >
                    {t('submittedAppsDesc')}
                  </p>
                </div>
              </div>

              {/* Controls Bar */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginBottom: "8px",
                  fontSize: "14px",
                  color: "#333",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <label
                    htmlFor="submitted-search"
                    style={{ fontWeight: "bold", marginBottom: "0" }}
                  >
                    {t('searchLabel')}
                  </label>
                  <input
                    id="submitted-search"
                    type="text"
                    value={submittedSearch}
                    onChange={(e) => setSubmittedSearch(e.target.value)}
                    style={{
                      border: "1px solid #aaa",
                      padding: "3px 8px",
                      fontSize: "14px",
                      width: "180px",
                      height: "30px",
                      borderRadius: "0",
                    }}
                  />
                </div>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <span>
                    {t('showingEntries', {
                      start: filteredSubmitted.length === 0 ? 0 : 1,
                      end: Math.min(filteredSubmitted.length, submittedEntriesPerPage),
                      total: filteredSubmitted.length
                    })}
                  </span>
                  <span style={{ margin: "0 4px", color: "#888" }}>|</span>
                  <label
                    htmlFor="submitted-entries"
                    style={{ fontWeight: "bold", marginBottom: "0" }}
                  >
                    {t('showLabel')}
                  </label>
                  <select
                    id="submitted-entries"
                    value={submittedEntriesPerPage}
                    onChange={(e) =>
                      setSubmittedEntriesPerPage(Number(e.target.value))
                    }
                    style={{
                      border: "1px solid #aaa",
                      padding: "2px 6px",
                      fontSize: "14px",
                      height: "30px",
                      backgroundColor: "#fff",
                      borderRadius: "0",
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                  <span>{t('entriesLabel')}</span>
                </div>
              </div>

              {/* Table 1 */}
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    border: "1px solid #ccc",
                    fontSize: "14px",
                    backgroundColor: "#fff",
                  }}
                >
                  <thead>
                    <tr style={{ borderBottom: "2px solid #ccc", color: "#222" }}>
                      <th
                        onClick={() => handleSubmittedSort("appType")}
                        style={{
                          padding: "8px 10px",
                          borderRight: "1px solid #ccc",
                          cursor: "pointer",
                          userSelect: "none",
                          backgroundColor:
                            submittedSort.column === "appType"
                              ? "#d9d9d9"
                              : "#fff",
                          fontWeight: "bold",
                          textAlign: "left",
                          verticalAlign: "middle",
                        }}
                      >
                        {t('appType')}{" "}
                        {renderSortIndicator(submittedSort, "appType")}
                      </th>
                      <th
                        onClick={() => handleSubmittedSort("appNumber")}
                        style={{
                          padding: "8px 10px",
                          borderRight: "1px solid #ccc",
                          cursor: "pointer",
                          userSelect: "none",
                          backgroundColor:
                            submittedSort.column === "appNumber"
                              ? "#d9d9d9"
                              : "#fff",
                          fontWeight: "bold",
                          textAlign: "left",
                          verticalAlign: "middle",
                        }}
                      >
                        {t('appNumber')}{" "}
                        {renderSortIndicator(submittedSort, "appNumber")}
                      </th>
                      <th
                        onClick={() => handleSubmittedSort("applicantName")}
                        style={{
                          padding: "8px 10px",
                          borderRight: "1px solid #ccc",
                          cursor: "pointer",
                          userSelect: "none",
                          backgroundColor:
                            submittedSort.column === "applicantName"
                              ? "#d9d9d9"
                              : "#fff",
                          fontWeight: "bold",
                          textAlign: "left",
                          verticalAlign: "middle",
                        }}
                      >
                        {t('applicantName')}{" "}
                        {renderSortIndicator(submittedSort, "applicantName")}
                      </th>
                      <th
                        onClick={() => handleSubmittedSort("dateSubmitted")}
                        style={{
                          padding: "8px 10px",
                          borderRight: "1px solid #ccc",
                          cursor: "pointer",
                          userSelect: "none",
                          backgroundColor:
                            submittedSort.column === "dateSubmitted"
                              ? "#d9d9d9"
                              : "#fff",
                          fontWeight: "bold",
                          textAlign: "left",
                          verticalAlign: "middle",
                        }}
                      >
                        {t('dateSubmitted')}{" "}
                        {renderSortIndicator(submittedSort, "dateSubmitted")}
                      </th>
                      <th
                        onClick={() => handleSubmittedSort("status")}
                        style={{
                          padding: "8px 10px",
                          borderRight: "1px solid #ccc",
                          cursor: "pointer",
                          userSelect: "none",
                          backgroundColor:
                            submittedSort.column === "status"
                              ? "#d9d9d9"
                              : "#fff",
                          fontWeight: "bold",
                          textAlign: "left",
                          verticalAlign: "middle",
                        }}
                      >
                        {t('currentStatus')}{" "}
                        {renderSortIndicator(submittedSort, "status")}
                      </th>
                      <th
                        onClick={() => handleSubmittedSort("messages")}
                        style={{
                          padding: "8px 10px",
                          borderRight: "1px solid #ccc",
                          cursor: "pointer",
                          userSelect: "none",
                          backgroundColor:
                            submittedSort.column === "messages"
                              ? "#d9d9d9"
                              : "#fff",
                          fontWeight: "bold",
                          textAlign: "left",
                          verticalAlign: "middle",
                        }}
                      >
                        {t('messages')} {renderSortIndicator(submittedSort, "messages")}
                      </th>
                      <th
                        style={{
                          padding: "8px 10px",
                          fontWeight: "bold",
                          textAlign: "left",
                          verticalAlign: "middle",
                        }}
                      >
                        {t('action')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedSubmitted.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          style={{
                            padding: "12px",
                            textAlign: "center",
                            color: "#555",
                            borderBottom: "1px solid #ccc",
                            verticalAlign: "middle",
                          }}
                        >
                          {t('noDataText')}
                        </td>
                      </tr>
                    ) : (
                      displayedSubmitted.map((row, idx) => (
                        <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                          <td
                            style={{
                              padding: "8px 10px",
                              borderRight: "1px solid #eee",
                              verticalAlign: "middle",
                            }}
                          >
                            <span style={{ fontWeight: "600", color: "#26374a" }}>{row.appType}</span>
                            {row.category && (
                              <span style={{ display: "block", fontSize: "11px", color: "#777" }}>
                                {row.category}
                              </span>
                            )}
                          </td>
                          <td
                            style={{
                              padding: "8px 10px",
                              borderRight: "1px solid #eee",
                              verticalAlign: "middle",
                            }}
                          >
                            {row.appNumber}
                          </td>
                          <td
                            style={{
                              padding: "8px 10px",
                              borderRight: "1px solid #eee",
                              verticalAlign: "middle",
                            }}
                          >
                            {row.applicantName}
                          </td>
                          <td
                            style={{
                              padding: "8px 10px",
                              borderRight: "1px solid #eee",
                              verticalAlign: "middle",
                            }}
                          >
                            {row.dateSubmitted}
                          </td>
                          <td
                            style={{
                              padding: "8px 10px",
                              borderRight: "1px solid #eee",
                              verticalAlign: "middle",
                            }}
                          >
                            <span style={{ fontWeight: "bold", color: "#284162" }}>
                              {row.status}
                            </span>
                          </td>
                          <td
                            style={{
                              padding: "8px 10px",
                              borderRight: "1px solid #eee",
                              verticalAlign: "middle",
                            }}
                          >
                            {row.messages}
                          </td>
                          <td style={{ padding: "8px 10px", verticalAlign: "middle" }}>
                            <DelayedLink
                              to="/mycic/dashboard"
                              onClick={() => {
                                localStorage.setItem('selectedVisa', JSON.stringify({
                                  ...row.rawRecord,
                                  _applicationTypeCategory: row.type
                                }));
                              }}
                              style={{
                                color: "#284162",
                                textDecoration: "underline",
                                fontWeight: "600"
                              }}
                            >
                              {t('viewFullStatus')}
                            </DelayedLink>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <p style={{ marginTop: "10px", fontSize: "13px", color: "#333" }}>
                {t('didYouApplyPaper')}{" "}
                <DelayedLink
                  style={{ color: "#284162", textDecoration: "underline" }}
                >
                  {t('addLinkApp')}
                </DelayedLink>{" "}
                {t('toAccessIt')}
              </p>
            </section>
          )}

          {/* SECTION 2: Continue an application you haven't submitted */}
          <section style={{ marginBottom: "40px" }}>
            <div className="row">
              <div className="col-xs-12">
                <h2
                  style={{
                    fontSize: "22px",
                    fontWeight: "bold",
                    color: "#26374a",
                    marginTop: "0",
                    marginBottom: "6px",
                  }}
                >
                  {t('unsubmittedAppsTitle')}
                </h2>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    marginBottom: "15px",
                  }}
                >
                  {t('unsubmittedAppsDesc')}
                </p>
              </div>
            </div>

            {/* Controls Bar */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px",
                marginBottom: "8px",
                fontSize: "14px",
                color: "#333",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <label
                  htmlFor="unsubmitted-search"
                  style={{ fontWeight: "bold", marginBottom: "0" }}
                >
                  {t('searchLabel')}
                </label>
                <input
                  id="unsubmitted-search"
                  type="text"
                  value={unsubmittedSearch}
                  onChange={(e) => setUnsubmittedSearch(e.target.value)}
                  style={{
                    border: "1px solid #aaa",
                    padding: "3px 8px",
                    fontSize: "14px",
                    width: "180px",
                    height: "30px",
                    borderRadius: "0",
                  }}
                />
              </div>

              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <span>
                  {t('showingEntries', {
                    start: filteredUnsubmitted.length === 0 ? 0 : 1,
                    end: Math.min(filteredUnsubmitted.length, unsubmittedEntriesPerPage),
                    total: filteredUnsubmitted.length
                  })}
                </span>
                <span style={{ margin: "0 4px", color: "#888" }}>|</span>
                <label
                  htmlFor="unsubmitted-entries"
                  style={{ fontWeight: "bold", marginBottom: "0" }}
                >
                  {t('showLabel')}
                </label>
                <select
                  id="unsubmitted-entries"
                  value={unsubmittedEntriesPerPage}
                  onChange={(e) =>
                    setUnsubmittedEntriesPerPage(Number(e.target.value))
                  }
                  style={{
                    border: "1px solid #aaa",
                    padding: "2px 6px",
                    fontSize: "14px",
                    height: "30px",
                    backgroundColor: "#fff",
                    borderRadius: "0",
                  }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span>{t('entriesLabel')}</span>
              </div>
            </div>

            {/* Table 2 */}
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                  backgroundColor: "#fff",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "2px solid #ccc", color: "#222" }}>
                    <th
                      onClick={() => handleUnsubmittedSort("appType")}
                      style={{
                        padding: "8px 10px",
                        borderRight: "1px solid #ccc",
                        cursor: "pointer",
                        userSelect: "none",
                        backgroundColor:
                          unsubmittedSort.column === "appType"
                            ? "#d9d9d9"
                            : "#fff",
                        fontWeight: "bold",
                        textAlign: "left",
                        verticalAlign: "middle",
                      }}
                    >
                      {t('appType')}{" "}
                      {renderSortIndicator(unsubmittedSort, "appType")}
                    </th>
                    <th
                      onClick={() => handleUnsubmittedSort("dateCreated")}
                      style={{
                        padding: "8px 10px",
                        borderRight: "1px solid #ccc",
                        cursor: "pointer",
                        userSelect: "none",
                        backgroundColor:
                          unsubmittedSort.column === "dateCreated"
                            ? "#d9d9d9"
                            : "#fff",
                        fontWeight: "bold",
                        textAlign: "left",
                        verticalAlign: "middle",
                      }}
                    >
                      {t('dateCreated')}{" "}
                      {renderSortIndicator(unsubmittedSort, "dateCreated")}
                    </th>
                    <th
                      onClick={() => handleUnsubmittedSort("daysLeft")}
                      style={{
                        padding: "8px 10px",
                        borderRight: "1px solid #ccc",
                        cursor: "pointer",
                        userSelect: "none",
                        backgroundColor:
                          unsubmittedSort.column === "daysLeft"
                            ? "#d9d9d9"
                            : "#fff",
                        fontWeight: "bold",
                        textAlign: "left",
                        verticalAlign: "middle",
                      }}
                    >
                      {t('daysLeft')}{" "}
                      {renderSortIndicator(unsubmittedSort, "daysLeft")}
                    </th>
                    <th
                      onClick={() => handleUnsubmittedSort("dateSaved")}
                      style={{
                        padding: "8px 10px",
                        borderRight: "1px solid #ccc",
                        cursor: "pointer",
                        userSelect: "none",
                        backgroundColor:
                          unsubmittedSort.column === "dateSaved"
                            ? "#d9d9d9"
                            : "#fff",
                        fontWeight: "bold",
                        textAlign: "left",
                        verticalAlign: "middle",
                      }}
                    >
                      {t('dateLastSaved')}{" "}
                      {renderSortIndicator(unsubmittedSort, "dateSaved")}
                    </th>
                    <th
                      style={{
                        padding: "8px 10px",
                        fontWeight: "bold",
                        textAlign: "left",
                        verticalAlign: "middle",
                      }}
                    >
                      {t('action')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {displayedUnsubmitted.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        style={{
                          padding: "12px",
                          textAlign: "center",
                          color: "#555",
                          borderBottom: "1px solid #ccc",
                          verticalAlign: "middle",
                        }}
                      >
                        {t('noDataText')}
                      </td>
                    </tr>
                  ) : (
                    displayedUnsubmitted.map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                        <td
                          style={{
                            padding: "8px 10px",
                            borderRight: "1px solid #eee",
                            verticalAlign: "middle",
                          }}
                        >
                          {row.appType}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            borderRight: "1px solid #eee",
                            verticalAlign: "middle",
                          }}
                        >
                          {row.dateCreated}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            borderRight: "1px solid #eee",
                            verticalAlign: "middle",
                          }}
                        >
                          {row.daysLeft}
                        </td>
                        <td
                          style={{
                            padding: "8px 10px",
                            borderRight: "1px solid #eee",
                            verticalAlign: "middle",
                          }}
                        >
                          {row.dateSaved}
                        </td>
                        <td style={{ padding: "8px 10px", verticalAlign: "middle" }}>
                          <button
                            style={{
                              color: "#284162",
                              textDecoration: "underline",
                              background: "none",
                              border: "none",
                              padding: 0,
                              marginRight: "10px",
                              verticalAlign: "baseline",
                            }}
                          >
                            {t('continue')}
                          </button>
                          <button
                            style={{
                              color: "#d00000",
                              textDecoration: "underline",
                              background: "none",
                              border: "none",
                              padding: 0,
                              verticalAlign: "baseline",
                            }}
                          >
                            {t('delete')}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 3: Start an application */}
          <section style={{ marginBottom: "30px" }}>
            <div className="row">
              <div className="col-xs-12">
                <h2
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#26374a",
                    marginTop: "0",
                    marginBottom: "20px",
                  }}
                >
                  {t('startAppTitle')}
                </h2>
              </div>
            </div>

            <div className="row">
              {/* Column 1: Apply to come to Canada */}
              <div
                className="col-md-4 col-sm-12"
                style={{ marginBottom: "25px" }}
              >
                <DelayedLink
                  to="/immigration-refugees-citizenship/services/application"
                  style={{
                    display: "inline-block",
                    fontSize: "17px",
                    fontWeight: "bold",
                    color: "#284162",
                    textDecoration: "underline",
                    marginBottom: "6px",
                    lineHeight: "1.3",
                  }}
                >
                  {t('applyToCome')}
                </DelayedLink>

                <p
                  style={{
                    marginTop: "0",
                    fontSize: "13px",
                    color: "#333333",
                    lineHeight: "1.45",
                  }}
                >
                  {t('applyToComeDesc')}
                </p>
              </div>

              {/* Column 2: Refugees */}
              <div
                className="col-md-4 col-sm-12"
                style={{ marginBottom: "25px" }}
              >
                <DelayedLink
                  style={{
                    display: "inline-block",
                    fontSize: "17px",
                    fontWeight: "bold",
                    color: "#284162",
                    textDecoration: "underline",
                    marginBottom: "6px",
                    lineHeight: "1.3",
                  }}
                >
                  {t('refugeesTitle')}
                </DelayedLink>
                <p
                  style={{
                    marginTop: "0",
                    fontSize: "13px",
                    color: "#333333",
                    lineHeight: "1.45",
                  }}
                >
                  {t('refugeesDesc')}
                </p>
              </div>

              {/* Column 3: Citizenship */}
              <div
                className="col-md-4 col-sm-12"
                style={{ marginBottom: "25px" }}
              >
                <DelayedLink
                  style={{
                    display: "inline-block",
                    fontSize: "17px",
                    fontWeight: "bold",
                    color: "#284162",
                    textDecoration: "underline",
                    marginBottom: "6px",
                    lineHeight: "1.3",
                  }}
                >
                  {t('citizenshipTitle')}
                </DelayedLink>
                <p
                  style={{
                    marginTop: "0",
                    fontSize: "13px",
                    color: "#333333",
                    lineHeight: "1.45",
                  }}
                >
                  {t('citizenshipDesc')}
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
