import { useState, useEffect } from "react";
import DelayedLink from "../components/DelayedLink";
import SEO from "../components/SEO";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "../context/LanguageContext";

export default function MyCICHome() {
  const { user, token } = useAuth();
  const { language, t } = useTranslation();

  // Submitted Applications State
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [submittedEntriesPerPage, setSubmittedEntriesPerPage] = useState(5);
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

  useEffect(() => {
    const fetchUserVisas = async () => {
      const userId = user?._id || user?.id;
      if (!userId || !token) return;

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/visas/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          const visasArray = Array.isArray(data) ? data : (data?.visas || []);
          
          const mappedSubmitted = visasArray.map(visa => ({
            appType: visa.visaType || visa.applicationType || 'Visa',
            appNumber: visa.applicationNumber || visa.uci || '',
            applicantName: `${visa.givenNames || ''} ${visa.familyName || ''}`.trim() || '',
            dateSubmitted: visa.receiveDate || (visa.createdAt ? new Date(visa.createdAt).toLocaleDateString() : ''),
            status: visa.latestUpdate?.status || 'Submitted',
            messages: '0 message',
            rawVisa: visa
          }));
          setSubmittedData(mappedSubmitted);
        }
      } catch (err) {
        console.error("Error fetching visas for user:", err);
      }
    };

    fetchUserVisas();
  }, [user, token]);

  const ownerName = submittedData.length > 0
    ? submittedData[0].applicantName
    : (user ? user.username : "");

  const accountTitle = language === 'en' ? `${ownerName}'s account` : `Compte de ${ownerName}`;

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
        title="MyCIC Account Dashboard"
        description="Manage your IRCC applications, continue saved draft forms, apply for Canadian visas, and view status history in your secure MyCIC account."
        keywords="MyCIC account, IRCC dashboard, GCKey portal, Canada visa application, check status, continue application"
      />

      <div
        className="container"
        style={{
          minHeight: "600px",
          paddingTop: "10px",
          paddingBottom: "40px",
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
                  marginTop: "15px",
                  marginBottom: "10px",
                }}
              >
                {accountTitle}
              </h1>
              <div
                style={{
                  borderBottom: "2px solid #af3c43",
                  marginBottom: "25px",
                  width: "100%",
                }}
              ></div>
            </div>
          </div>

          {/* SECTION 1: View the applications you submitted */}
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
                          {row.appType}
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
                          {row.status}
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
                              localStorage.setItem('selectedVisa', JSON.stringify(row.rawVisa));
                            }}
                            style={{
                              color: "#284162",
                              textDecoration: "underline",
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
