/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Navigation / Header
    govOfCanada: "Government of Canada",
    gouvernementDuCanada: "Gouvernement du Canada",
    frLinkText: "Français",
    enLinkText: "English",
    signIn: "Sign in",
    signOut: "Sign out",
    logout: "Sign out",
    menu: "Menu",
    search: "Search",
    searchWebsite: "Search website",
    home: "Home",
    myAccount: "My Account",
    adminDashboard: "Admin Dashboard",
    employeeDashboard: "Employee Dashboard",
    signInSignUp: "Sign In / Sign Up",
    recoverUsernameStep1: "Recover Username Step 1 of 2",
    departments: "Departments",
    localDirectory: "Local directory",
    about: "About",
    contactUs: "Contact us",
    terms: "Terms and conditions",
    privacy: "Privacy",
    help: "Help",

    // GCKey Login
    welcomeGCKey: "Welcome to GCKey",
    username: "Username",
    password: "Password",
    signInBtn: "Sign In",
    clearBtn: "Clear",
    simpleSecureAccess: "Simple Secure Access",
    register: "Register",
    signUp: "Sign Up",

    // MyCIC Home
    accountOf: "'s account",
    submittedAppsTitle: "View the applications you submitted",
    submittedAppsDesc: "Review, check the status or read messages about your submitted application.",
    appType: "Application type",
    appNumber: "Application number",
    applicantName: "Applicant name",
    dateSubmitted: "Date submitted",
    currentStatus: "Current status",
    messages: "Messages",
    action: "Action",
    viewFullStatus: "View full application status",
    unsubmittedAppsTitle: "Continue an application you haven't submitted",
    unsubmittedAppsDesc: "Continue working on an application or profile you haven't submitted or delete it from your account.",
    dateCreated: "Date Created",
    daysLeft: "Days left to submit",
    dateLastSaved: "Date last saved",
    continue: "Continue",
    delete: "Delete",
    startAppTitle: "Start an application",
    applyToCome: "Apply to come to Canada",
    applyToComeDesc: "Includes applications for visitor visas, work and study permits, Express Entry and International Experience Canada. You will need your personal reference code if you have one.",
    refugeesTitle: "Refugees: Apply for temporary health care benefits",
    refugeesDesc: "Use this application if you are a protected person or refugee claimant who wants to apply for the Interim Federal Health Program.",
    citizenshipTitle: "Citizenship: Apply for a search or proof of citizenship",
    citizenshipDesc: "Use this application to apply for proof of citizenship (citizenship certificate) or to search citizenship records.",

    // MyCIC Dashboard Details
    appStatusMessages: "Application status and messages",
    appStatusMessagesDesc: "Check the status, review the details and read messages regarding your application.",
    appStatusBox: "Application status",
    appInfoBox: "Applicant Information",
    principalApplicant: "Principal Applicant",
    uci: "Unique Client Identifier (UCI)",
    dateReceived: "Date Received",
    biometrics: "Biometrics",
    biometricsNum: "Biometrics Number",
    biometricsEnrolDate: "Date of Biometrics Enrolment",
    expiryDate: "Expiry Date",
    detailsStatusTitle: "Details about your application status",
    reviewEligibility: "Review of eligibility",
    reviewMedical: "Review of medical results",
    reviewDocs: "Review of additional documents",
    interview: "Interview",
    backgroundCheck: "Background check",
    finalDecision: "Final decision",
    processingDesc: "We are processing your application. We will send you a message when there is an update or if we need more information from you.",
    latestUpdateLabel: "Latest update:",
    noFingerprintsText: "We do not need your fingerprints. We will send you a message if this changes.",
    receivedFingerprintsText: "We received your fingerprints.",
    noInterviewText: "You do not need an interview. We will send you a message if this changes.",
    eligibilityText: "We are reviewing whether you meet the eligibility requirements.",
    medicalPassText: "You passed the medical exam.",
    docsReviewText: "We are reviewing the additional documents you provided.",
    noDataText: "No data available in table",
    entriesLabel: "entries",
    showLabel: "Show",
    searchLabel: "Search:",
    showingEntries: "Showing {start} to {end} of {total} entries",
    didYouApplyPaper: "Did you apply on paper or don't see your online application in your account?",
    addLinkApp: "Add (link) your application to your account",
    toAccessIt: "to access it and check your status online.",
    originalPassportRequest: "Original Passport Request",
    senderIRCC: "Immigration, Refugees and Citizenship Canada",
    subjectLabel: "Subject",
    dateSentLabel: "Date Sent",
    dateReadLabel: "Date Read",
    messageContentText: "Dear {name},\n\nThis is an Information Letter regarding your ongoing application ({appNum}).\n\nPlease note that your application is currently under final administrative processing. No further action is required from you at this time.\n\nThank you,\nImmigration, Refugees and Citizenship Canada",
    informationLetter: "Information Letter",
    stepsExplanation: "When we get your application, there are a series of steps it may go through before we make a decision. Use the following table to find out the current status of each application step.",
    backgroundText: "We are processing your background check. We will send you a message if we need more information.",
    finalDecisionText: "Your application was approved. We sent you a message to request your passport.",
    messagesTitle: "Messages about your application",
    messagesNotice: "Links and document titles are shown in the language you chose for your portal account when they were generated.",
    from: "From",
    subject: "Subject",
    downloadPdf: "Download PDF",
    close: "Close",
    reportProblem: "Report a problem or mistake on this page",
    returnHome: "← Return to account home",
  },
  fr: {
    // Navigation / Header
    govOfCanada: "Gouvernement du Canada",
    gouvernementDuCanada: "Gouvernement du Canada",
    frLinkText: "English",
    enLinkText: "Français",
    signIn: "Se connecter",
    signOut: "Se déconnecter",
    logout: "Se déconnecter",
    menu: "Menu",
    search: "Rechercher",
    searchWebsite: "Rechercher sur le site Web",
    home: "Accueil",
    myAccount: "Mon dossier",
    adminDashboard: "Tableau de bord de l'administrateur",
    employeeDashboard: "Tableau de bord de l'employé",
    signInSignUp: "Ouvrir une session / S'inscrire",
    recoverUsernameStep1: "Récupérer le nom d'utilisateur étape 1 sur 2",
    departments: "Ministères",
    localDirectory: "Annuaire local",
    about: "À propos",
    contactUs: "Contactez-nous",
    terms: "Conditions d'utilisation",
    privacy: "Confidentialité",
    help: "Aide",

    // GCKey Login
    welcomeGCKey: "Bienvenue à CléGC",
    username: "Nom d'utilisateur",
    password: "Mot de passe",
    signInBtn: "Se connecter",
    clearBtn: "Effacer",
    simpleSecureAccess: "Accès simple et sécurisé",
    register: "S'enregistrer",
    signUp: "S'inscrire",

    // MyCIC Home
    accountOf: " - Compte",
    submittedAppsTitle: "Voir les demandes que vous avez soumises",
    submittedAppsDesc: "Examinez, vérifiez l'état ou lisez les messages concernant votre demande soumise.",
    appType: "Type de demande",
    appNumber: "Numéro de demande",
    applicantName: "Nom du demandeur",
    dateSubmitted: "Date de soumission",
    currentStatus: "État actuel",
    messages: "Messages",
    action: "Action",
    viewFullStatus: "Voir l'état complet de la demande",
    unsubmittedAppsTitle: "Continuer une demande que vous n'avez pas soumise",
    unsubmittedAppsDesc: "Continuez à travailler sur une demande ou un profil que vous n'avez pas soumis ou supprimez-le de votre compte.",
    dateCreated: "Date de création",
    daysLeft: "Jours restants pour soumettre",
    dateLastSaved: "Date de la dernière sauvegarde",
    continue: "Continuer",
    delete: "Supprimer",
    startAppTitle: "Commencer une demande",
    applyToCome: "Demander pour venir au Canada",
    applyToComeDesc: "Comprend les demandes de visa de visiteur, de permis de travail et d'études, d'Entrée express et d'Expérience internationale Canada. Vous aurez besoin de votre code de référence personnel si vous en avez un.",
    refugeesTitle: "Réfugiés : Demander des prestations temporaires de soins de santé",
    refugeesDesc: "Utilisez cette demande si vous êtes une personne protégée ou un demandeur d'asile qui souhaite demander le Programme fédéral de santé intérimaire.",
    citizenshipTitle: "Citoyenneté : Demander une recherche ou une preuve de citoyenneté",
    citizenshipDesc: "Utilisez cette demande pour demander une preuve de citoyenneté (certificat de citoyenneté) ou pour faire une recherche dans les dossiers de citoyenneté.",

    // MyCIC Dashboard Details
    appStatusMessages: "État de la demande et messages",
    appStatusMessagesDesc: "Vérifiez l'état, examinez les détails et lisez les messages concernant votre demande.",
    appStatusBox: "État de la demande",
    appInfoBox: "Renseignements sur le demandeur",
    principalApplicant: "Demandeur principal",
    uci: "Identificateur unique de client (IUC)",
    dateReceived: "Date de réception",
    biometrics: "Biométrie",
    biometricsNum: "Numéro de biométrie",
    biometricsEnrolDate: "Date d'enrôlement biométrique",
    expiryDate: "Date d'expiration",
    detailsStatusTitle: "Détails sur l'état de votre demande",
    reviewEligibility: "Examen de l'admissibilité",
    reviewMedical: "Examen des résultats médicaux",
    reviewDocs: "Examen des documents supplémentaires",
    interview: "Entrevue",
    backgroundCheck: "Vérification des antécédents",
    finalDecision: "Décision finale",
    processingDesc: "Nous traitons votre demande. Nous vous enverrons un message lorsqu'il y aura une mise à jour ou si nous avons besoin de plus amples renseignements de votre part.",
    latestUpdateLabel: "Dernière mise à jour :",
    noFingerprintsText: "Nous n'avons pas besoin de vos empreintes digitales. Nous vous enverrons un message si cela change.",
    receivedFingerprintsText: "Nous avons reçu vos empreintes digitales.",
    noInterviewText: "Vous n'avez pas besoin d'entrevue. Nous vous enverrons un message si cela change.",
    eligibilityText: "Nous examinons si vous répondez aux critères d'admissibilité.",
    medicalPassText: "Vous avez réussi l'examen médical.",
    docsReviewText: "Nous examinons les documents supplémentaires que vous avez fournis.",
    noDataText: "Aucune donnée disponible dans le tableau",
    entriesLabel: "entrées",
    showLabel: "Afficher",
    searchLabel: "Rechercher :",
    showingEntries: "Affichage de {start} à {end} sur {total} entrées",
    didYouApplyPaper: "Avez-vous postulé sur papier ou ne voyez-vous pas votre demande en ligne dans votre compte ?",
    addLinkApp: "Ajouter (lier) votre demande à votre compte",
    toAccessIt: "pour y accéder et vérifier votre statut en ligne.",
    originalPassportRequest: "Demande de passeport originale",
    senderIRCC: "Immigration, Réfugiés et Citoyenneté Canada",
    subjectLabel: "Objet",
    dateSentLabel: "Date d'envoi",
    dateReadLabel: "Date de lecture",
    messageContentText: "Cher {name},\n\nIl s'agit d'une lettre d'information concernant votre demande en cours ({appNum}).\n\nVeuillez noter que votre demande est actuellement en cours de traitement administratif final. Aucune autre action n'est requise de votre part pour le moment.\n\nMerci,\nImmigration, Réfugiés et Citoyenneté Canada",
    informationLetter: "Lettre d'information",
    stepsExplanation: "Lorsque nous recevons votre demande, elle peut passer par une série d'étapes avant que nous prenions une décision. Utilisez le tableau suivant pour connaître l'état actuel de chaque étape de la demande.",
    backgroundText: "Nous traitons votre vérification des antécédents. Nous vous enverrons un message si nous avons besoin de plus amples renseignements.",
    finalDecisionText: "Votre demande a été approuvée. Nous vous avons envoyé un message pour vous demander votre passeport.",
    messagesTitle: "Messages concernant votre demande",
    messagesNotice: "Les liens et les titres des documents sont affichés dans la langue que vous avez choisie pour votre compte de portail lorsqu'ils ont été générés.",
    from: "De",
    subject: "Objet",
    downloadPdf: "Télécharger le PDF",
    close: "Fermer",
    reportProblem: "Signaler un problème ou une erreur sur cette page",
    returnHome: "← Retour à l'accueil du compte",
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('app_language') || 'en';
  });

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'fr' : 'en';
    setLanguage(nextLang);
    localStorage.setItem('app_language', nextLang);
  };

  const t = (key, params = {}) => {
    let text = translations[language][key] || translations['en'][key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
