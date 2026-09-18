export const checkStatusData = {
  id: "what-applied",
  label: "What did you apply for?",
  options: [
    {
      label: "Citizenship",
      value: "Citizenship",
      next: {
        id: "which-citizenship",
        label: "Which citizenship application?",
        options: [
          {
            label: "Becoming a Canadian citizen (grant of citizenship)",
            value: "grant",
            next: {
              id: "grant-app-type",
              label: "Select the application type:",
              options: [
                {
                  label: "Adult (18 and older)",
                  value: "adult",
                  next: {
                    id: "grant-aor-adult",
                    label: "Have you received your acknowledgement of receipt letter or email?",
                    helpText: "You’ll get this letter or email **after** we receive your application **and** check that it’s complete. It can take some time to get it.",
                    options: [
                      {
                        label: "Yes",
                        value: "yes",
                        next: {
                          id: "grant-first-time-adult",
                          label: "Is this your first time checking your citizenship application status?",
                          options: [
                            { label: "Yes", value: "yes", result: "with-aor-acc" },
                            { label: "No, I already have a citizenship tracker account.", value: "no", result: "with-aor-no-acc" }
                          ]
                        }
                      },
                      { label: "No", value: "no", result: "without-aor" }
                    ]
                  }
                },
                {
                  label: "Minor (under 18)",
                  value: "minor",
                  next: {
                    id: "grant-aor-minor",
                    label: "Have you received your acknowledgement of receipt letter or email?",
                    helpText: "You’ll get this letter or email **after** we receive your application **and** check that it’s complete. It can take some time to get it.",
                    options: [
                      {
                        label: "Yes",
                        value: "yes",
                        next: {
                          id: "grant-first-time-minor",
                          label: "Is this your first time checking the minor’s citizenship application status?",
                          options: [
                            { label: "Yes", value: "yes", result: "with-aor-acc" },
                            { label: "No, I already have a citizenship tracker account.", value: "no", result: "with-aor-no-acc" }
                          ]
                        }
                      },
                      { label: "No", value: "no", result: "without-aor-minor" }
                    ]
                  }
                },
                {
                  label: "Canadian Armed Forces member",
                  value: "caf",
                  next: {
                    id: "grant-aor-caf",
                    label: "Have you received your acknowledgement of receipt (AOR) letter or email?",
                    helpText: "You’ll get this letter or email **after** we receive your application **and** check that it’s **complete**. It can take some time before you receive it.",
                    options: [
                      { label: "Yes", value: "yes", result: "with-aor-caf" },
                      { label: "No", value: "no", result: "without-aor-caf" }
                    ]
                  }
                },
                {
                  label: "Adoption",
                  value: "adoption",
                  next: {
                    id: "grant-aor-adopt",
                    label: "Have you received your acknowledgement of receipt (AOR) letter or email?",
                    helpText: "You’ll get this letter or email **after** we receive your application **and** check that it’s **complete**. It can take some time before you receive it.",
                    options: [
                      { label: "Yes", value: "yes", result: "with-aor-adopt" },
                      { label: "No", value: "no", result: "without-aor-adopt" }
                    ]
                  }
                }
              ]
            }
          },
          {
            label: "Citizenship certificate (proof of citizenship)",
            value: "proof",
            next: {
              id: "proof-how",
              label: "How did you apply?",
              options: [
                { label: "Online (digital)", value: "online", result: "proof-online-aor" },
                {
                  label: "By mail (paper)",
                  value: "paper",
                  next: {
                    id: "proof-where",
                    label: "Where did you apply from?",
                    options: [
                      {
                        label: "Canada or the United States",
                        value: "inside",
                        next: {
                          id: "proof-aor-inside",
                          label: "Have you received your acknowledgement of receipt (AOR) letter or email?",
                          helpText: "You’ll get your AOR after we receive your application and check that it’s complete. It can take a while before you get it.",
                          options: [
                            { label: "Yes", value: "yes", result: "proof-paper-inside-aor" },
                            { label: "No", value: "no", result: "proof-paper-inside-no-aor" }
                          ]
                        }
                      },
                      {
                        label: "Outside Canada and the United States",
                        value: "outside",
                        next: {
                          id: "proof-email-outside",
                          label: "Did you provide your email in your application?",
                          options: [
                            {
                              label: "Yes",
                              value: "yes",
                              next: {
                                id: "proof-aor-outside-yes",
                                label: "Have you received your acknowledgement of receipt (AOR) letter or email?",
                                helpText: "You’ll get your AOR after we receive your application and check that it’s complete. It can take a while before you get it.",
                                options: [
                                  { label: "Yes", value: "yes", result: "proof-paper-outside-aor" },
                                  { label: "No", value: "no", result: "proof-paper-outside-no-aor" }
                                ]
                              }
                            },
                            {
                              label: "No",
                              value: "no",
                              next: {
                                id: "proof-uci-outside-no",
                                label: "Do you have your client ID number or your unique client identifier (UCI)?",
                                helpText: "If you didn’t include an email address on your application, you **won’t** automatically get your UCI and the confirmation that we received your application. Contact the office where you mailed your application to get your client ID or UCI.",
                                options: [
                                  { label: "Yes", value: "yes", result: "proof-paper-outside-uci-no-email" },
                                  { label: "No", value: "no", result: "proof-paper-outside-no-uci-no-email" }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            label: "Search of citizenship records",
            value: "search",
            next: {
              id: "search-how",
              label: "How did you apply?",
              options: [
                { label: "Online (digital)", value: "online", result: "search-online" },
                {
                  label: "By mail (paper)",
                  value: "paper",
                  next: {
                    id: "search-where",
                    label: "Where did you apply from?",
                    options: [
                      { label: "Canada or the United States", value: "inside", result: "search-paper-inside" },
                      { label: "Outside Canada and the United States", value: "outside", result: "search-paper-outside" }
                    ]
                  }
                }
              ]
            }
          },
          { label: "Resuming Canadian citizenship", value: "resuming", result: "Resumption" },
          { label: "Giving up Canadian citizenship (renunciation)", value: "giving-up", result: "Renunciation" }
        ]
      }
    },
    { label: "Passport", value: "Passport", result: "passport-redirect" },
    { label: "Visitor visa", value: "Visitor visa", result: "visit" },
    { label: "Permanent resident card (PR Card)", value: "pr-card", result: "pr" },
    {
      label: "Family sponsorship",
      value: "Family sponsorship",
      next: {
        id: "which-family",
        label: "What kind of family sponsorship?",
        options: [
          {
            label: "Spouse, partner or dependent child",
            value: "spouse",
            next: {
              id: "spouse-process",
              label: "Which application process?",
              options: [
                { label: "In Canada", value: "in-canada", result: "canada-spousal-result" },
                { label: "Outside Canada", value: "outside-canada", result: "outside-spousal-result" }
              ]
            }
          },
          {
            label: "Parent or grandparent",
            value: "parent",
            next: {
              id: "parent-who",
              label: "Are you the sponsor or the person being sponsored?",
              options: [
                { label: "The sponsor", value: "sponsor", result: "pgp-fam-result-1" },
                { label: "The person being sponsored", value: "sponsored", result: "pgp-fam-result-2" }
              ]
            }
          },
          { label: "Adoptive child or other relative", value: "other", result: "other-fam-result" }
        ]
      }
    },
    { label: "Work permit", value: "Work permit", result: "work-permit" },
    { label: "Study permit", value: "Study permit", result: "study" },
    { label: "Refugees", value: "Refugees", result: "refugees" },
    { label: "Electronic travel authorization (eTA)", value: "eta", result: "eta" },
    {
      label: "Immigration",
      value: "Immigration",
      next: {
        id: "which-immigration",
        label: "What kind of immigration application?",
        options: [
          { label: "Express Entry", value: "express-entry", result: "express-entry" },
          { label: "Other immigration programs", value: "other", result: "other-immigration-programs" }
        ]
      }
    },
    { label: "Refugee travel document or certificate of identity", value: "refugee-doc", result: "refugee_certificate" },
    { label: "Verification of status or request to amend", value: "verification", result: "verification_amend" }
  ]
};
