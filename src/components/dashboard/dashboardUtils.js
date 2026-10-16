// src/components/dashboard/dashboardUtils.js

export const getFormattedTodayDate = () => {
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return new Date().toLocaleDateString("en-CA", options);
};

export const getFormattedExpiryDate = (months = 6) => {
  const d = new Date();
  d.setMonth(d.getMonth() + months);
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return d.toLocaleDateString("en-CA", options);
};

export const generateNumericString = (length) => {
  let res = "";
  for (let i = 0; i < length; i++) {
    res += Math.floor(Math.random() * 10).toString();
  }
  return res;
};

export const generate8CharRef = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const generateCanadianUCI = () => {
  const p1 = generateNumericString(2);
  const p2 = generateNumericString(4);
  const p3 = generateNumericString(4);
  return `${p1}-${p2}-${p3}`;
};

export const generateCanadianAppNumber = (prefix = "V") => {
  return `${prefix}${generateNumericString(9)}`;
};

export const formatApplicantFullName = (given, family) => {
  const g = (given || "").trim();
  const f = (family || "").trim();
  if (g && f) return `${g} ${f}`;
  return g || f || "";
};

export const getInitialVisaFormData = () => ({
  userId: "",
  applicationType: "visa",
  familyName: "",
  givenNames: "",
  documentNumber: "",
  visaType: "Visitor Visa (Temporary Resident)",
  visaStatus: "Submitted",
  visaGrantNumber: "",
  trn: `TRN${generate8CharRef()}`,
  biometricsNumber: `10000${generateNumericString(8)}`,
  dateOfBiometricsEnrolment: getFormattedTodayDate(),
  biometricsExpiryDate: getFormattedExpiryDate(120), // 10 years
  uci: generateCanadianUCI(),
  applicationNumber: generateCanadianAppNumber("V"),
  receiveDate: getFormattedTodayDate(),
  medicalExaminationPassDate: "",
  documentReviewDate: "",
  latestUpdateDate: getFormattedTodayDate(),
  latestUpdateStatus: "In Progress",
  latestUpdateContent: "We are processing your application. We will let you know when the next update is ready.",
  employer: "",
  jobTitle: "",
  origin: "ca"
});

export const getInitialPaymentFormData = () => ({
  paymentType: "visa", // "visa" | "sponsorship" | "nomination"
  selectedVisaId: "",
  selectedSponsorshipId: "",
  selectedNominationId: "",
  userId: "",
  visaType: "Visitor Visa (Temporary Resident)",
  referenceNumber: `CA-${generate8CharRef()}`,
  transactionDate: new Date().toISOString().split("T")[0],
  issuingOffice: "Ottawa Operations Center",
  internalRef: `INT-${generate8CharRef().slice(0, 5)}`,
  currency: "CAD",
  amount: "100",
  status: "paid",
  origin: "ca"
});

export const getInitialSponsorshipFormData = () => ({
  userId: "",
  applicationId: generateCanadianAppNumber("SP"),
  sponsorshipTrn: `SP-TRN-${generate8CharRef()}`,
  visaProgram: "Provincial Sponsorship Program",
  fileNumber: `CA-SP-${generateNumericString(6)}`,
  givenName: "",
  familyName: "",
  approvedDate: getFormattedTodayDate(),
  origin: "ca"
});

export const getInitialNominationFormData = () => ({
  userId: "",
  applicationId: generateCanadianAppNumber("NOM"),
  nominationTrn: `NOM-TRN-${generate8CharRef()}`,
  visaProgram: "Provincial Nominee Program (PNP)",
  fileNumber: `CA-NOM-${generateNumericString(6)}`,
  givenName: "",
  familyName: "",
  approvedDate: getFormattedTodayDate(),
  origin: "ca"
});

export const getInitialAccountFormData = () => ({
  username: "",
  password: "",
  email: "",
  givenName: "",
  familyName: "",
  passport: "",
  dob: "",
  role: "user",
  origin: "ca"
});

export const getPaymentCategory = (payment) => {
  if (payment.paymentType) return payment.paymentType.toLowerCase();
  if (payment.sponsorshipId) return "sponsorship";
  if (payment.nominationId) return "nomination";
  return "visa";
};

export const getPaymentApplicantDisplayName = (
  payment,
  visasList = [],
  usersList = [],
  sponsorshipsList = [],
  nominationsList = []
) => {
  // If payment populates user object
  if (payment.userId && typeof payment.userId === "object") {
    const fn = formatApplicantFullName(payment.userId.givenName, payment.userId.familyName);
    if (fn) return fn;
    if (payment.userId.username) return payment.userId.username;
  }

  // If payment populates visa object
  if (payment.visaId && typeof payment.visaId === "object") {
    if (payment.visaId.visaApplicant) return payment.visaId.visaApplicant;
    const fn = formatApplicantFullName(payment.visaId.givenNames, payment.visaId.familyName);
    if (fn) return fn;
  }

  // If payment populates sponsorship object
  if (payment.sponsorshipId && typeof payment.sponsorshipId === "object") {
    const fn = formatApplicantFullName(payment.sponsorshipId.givenName, payment.sponsorshipId.familyName);
    if (fn) return fn;
  }

  // If payment populates nomination object
  if (payment.nominationId && typeof payment.nominationId === "object") {
    const fn = formatApplicantFullName(payment.nominationId.givenName, payment.nominationId.familyName);
    if (fn) return fn;
  }

  // Fallback check against local lists
  if (payment.visaId) {
    const targetId = typeof payment.visaId === "object" ? payment.visaId._id : payment.visaId;
    const v = visasList.find((item) => item._id === targetId);
    if (v) {
      if (v.visaApplicant) return v.visaApplicant;
      const fn = formatApplicantFullName(v.givenNames, v.familyName);
      if (fn) return fn;
    }
  }

  if (payment.sponsorshipId) {
    const targetId = typeof payment.sponsorshipId === "object" ? payment.sponsorshipId._id : payment.sponsorshipId;
    const s = sponsorshipsList.find((item) => item._id === targetId);
    if (s) {
      const fn = formatApplicantFullName(s.givenName, s.familyName);
      if (fn) return fn;
    }
  }

  if (payment.nominationId) {
    const targetId = typeof payment.nominationId === "object" ? payment.nominationId._id : payment.nominationId;
    const n = nominationsList.find((item) => item._id === targetId);
    if (n) {
      const fn = formatApplicantFullName(n.givenName, n.familyName);
      if (fn) return fn;
    }
  }

  if (payment.userId) {
    const targetId = typeof payment.userId === "object" ? payment.userId._id : payment.userId;
    const u = usersList.find((item) => item._id === targetId);
    if (u) {
      const fn = formatApplicantFullName(u.givenName, u.familyName);
      if (fn) return fn;
      if (u.username) return u.username;
    }
  }

  return "Applicant";
};
