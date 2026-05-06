// Workbook-driven planner inputs come from Calculator logic.xlsx and the
// comparison benchmarks come from Comparison table.xlsx.

const pricingModel = {
  baseCostUsdPerCarMonth: 300,
  baseImpressionsPerCarMonth: 1700,
};

const packages = {
  full: {
    label: "4 doors + back window",
    costMultiplier: 1.1,
    impressionMultiplier: 1,
    note: "Maximum surface coverage around the vehicle with side doors plus rear-window visibility.",
  },
  double: {
    label: "2 sides only",
    costMultiplier: 1,
    impressionMultiplier: 0.95,
    note: "Strong side-door visibility with lighter production intensity than a full wrap.",
  },
  single: {
    label: "1 side only",
    costMultiplier: 0.9,
    impressionMultiplier: 0.8,
    note: "The lightest wrap entry point for a tactical one-side presence.",
  },
};

const durations = {
  1: {
    costMultiplier: 1,
    impressionMultiplier: 1,
    note: "The 1-month workbook setting keeps the full base media cost for a short burst.",
  },
  3: {
    costMultiplier: 0.4,
    impressionMultiplier: 1,
    note: "The 3-month workbook multiplier lowers unit cost while keeping full impression delivery.",
  },
  6: {
    costMultiplier: 0.25,
    impressionMultiplier: 1,
    note: "The 6-month workbook multiplier pushes cost efficiency much further for sustained visibility.",
  },
  12: {
    costMultiplier: 0.18333333333333332,
    impressionMultiplier: 1,
    note: "The 12-month workbook multiplier gives the lowest unit cost in the planning file.",
  },
};

const vehicleClasses = {
  econom: {
    label: "Econom cars",
    summaryLabel: "econom-class cars",
    costMultiplier: 1,
    impressionMultiplier: 1,
    note: "Econom inventory keeps the most efficient cost base in the workbook.",
  },
  comfort: {
    label: "Comfort cars",
    summaryLabel: "comfort-class cars",
    costMultiplier: 1.2,
    impressionMultiplier: 1.05,
    note: "Comfort inventory increases cost and slightly lifts projected delivery.",
  },
};

const benchmarks = {
  yango: 0.07,
  billboard: 0.21,
  social: 2.7,
};

const proposalFormUrls = {
  en: "https://forms.yandex.ru/surveys/13850501.cbf375e569cfdc6551eec2bd1067ad504bf5eed7",
  fr: "https://forms.yandex.ru/surveys/13850502.773d2ad7cf8db43ddcfab8829cd896a0475d82d7",
};

const supportedLanguages = ["en", "fr"];
const languageCopy = {
  en: {
    locale: "en-US",
    title: "Yango Car Branding | Abidjan Client Landing",
    description:
      "Client-facing landing page for Yango car branding in Abidjan with an interactive media planning calculator.",
    monthSingular: "month",
    monthPlural: "months",
    carSingular: "car",
    carPlural: "cars",
    cpm: "CPM",
    budget: "budget",
    saved: "saved",
    cityPresence: "city presence",
    mapTitle: "Abidjan fleet coverage",
    mapDensity: (cars) => `${cars}-car visual density.`,
    brief: (impressions, budget, savings) =>
      `${impressions} impressions, ${budget} budget, ${savings} saved.`,
    staticText: [
      [".brand-mark span:last-child", "Yango Car Branding"],
      ['.site-nav a[href="#proof"]', "Why it works"],
      ['.site-nav a[href="#planner"]', "Planner"],
      ['.site-nav a[href="#proposal"]', "Request proposal"],
      [".hero-copy .eyebrow", "Abidjan moving media"],
      [".hero-copy h1", "Own the city streets."],
      [
        ".hero-copy .lede",
        "Yango cars carry brands through Plateau, Yopougon, Cocody, Marcory, and airport routes.",
      ],
      ['.cta-row a[href="#proposal"]', "Request proposal"],
      ['.cta-row a[href="#planner"]', "Open planner"],
      [".hero-location-row span:nth-child(5)", "Airport road"],
      [".hero-panel-kicker", "Audience in Ivory Coast"],
      [".hero-kpi-card:nth-child(1) span", "Average 2025 CIV audience"],
      [".hero-kpi-card:nth-child(2) span", "Average monthly OTS"],
      [".hero-kpi-card:nth-child(3) span", "Male / female split"],
      [".hero-kpi-card:nth-child(4) span", "African ride-hailing markets"],
      [".compact-proof-header .eyebrow", "Why it works"],
      [".compact-proof-header h2", "Moving reach beats static attention."],
      [
        ".compact-proof-header p:not(.eyebrow)",
        "Yango gives brands repeat city visibility with simple media-buyer math.",
      ],
      [".compact-proof-decision span", "Decision frame"],
      [".compact-proof-decision strong", "Lead with Yango. Support with static and social."],
      [".compact-channel:nth-child(1) span", "Lead channel"],
      [".compact-channel:nth-child(1) strong", "Yango car branding"],
      [".compact-channel:nth-child(1) p", "Citywide routes, repeated street presence."],
      [".compact-channel:nth-child(2) span", "Support"],
      [".compact-channel:nth-child(2) strong", "Billboard"],
      [".compact-channel:nth-child(2) p", "Strong landmark, one fixed point."],
      [".compact-channel:nth-child(3) span", "Support"],
      [".compact-channel:nth-child(3) strong", "Social"],
      [".compact-channel:nth-child(3) p", "Fast targeting, short attention."],
      [".compact-media-table caption", "Channel comparison per $1,000 invested"],
      [".compact-media-table thead th:nth-child(1)", "Metric"],
      [".compact-media-table thead th:nth-child(3)", "Billboard"],
      [".compact-media-table tbody tr:nth-child(1) th", "Impressions"],
      [".compact-media-table tbody tr:nth-child(1) td:nth-child(2) span", "moving reach"],
      [".compact-media-table tbody tr:nth-child(1) td:nth-child(3) span", "fixed reach"],
      [".compact-media-table tbody tr:nth-child(1) td:nth-child(4) span", "feed reach"],
      [".compact-media-table tbody tr:nth-child(2) td:nth-child(2) span", "lowest cost"],
      [".compact-media-table tbody tr:nth-child(2) td:nth-child(3) span", "OOH benchmark"],
      [".compact-media-table tbody tr:nth-child(2) td:nth-child(4) span", "paid social"],
      [".compact-media-table tbody tr:nth-child(3) th", "Recall"],
      [".compact-media-table tbody tr:nth-child(3) td:nth-child(2) span", "repeat city view"],
      [".compact-media-table tbody tr:nth-child(3) td:nth-child(3) span", "landmark view"],
      [".compact-media-table tbody tr:nth-child(3) td:nth-child(4) span", "scroll view"],
      [".compact-media-table tbody tr:nth-child(4) th", "Presence"],
      [".compact-media-table tbody tr:nth-child(4) td:nth-child(2) strong", "Citywide"],
      [".compact-media-table tbody tr:nth-child(4) td:nth-child(3) strong", "Fixed"],
      [".compact-media-table tbody tr:nth-child(4) td:nth-child(4) strong", "Digital"],
      [".compact-media-table tbody tr:nth-child(4) td:nth-child(2) span", "routes"],
      [".compact-media-table tbody tr:nth-child(4) td:nth-child(3) span", "one point"],
      [".compact-media-table tbody tr:nth-child(4) td:nth-child(4) span", "feed only"],
      [".compact-planner-heading .eyebrow", "Campaign planner"],
      [".compact-planner-heading h2", "Plan the fleet. See the city."],
      [
        ".compact-planner-heading p:not(.eyebrow)",
        "Choose cars, format, and duration. The estimate updates instantly.",
      ],
      [".planner-console-kicker", "Coverage preview"],
      [".planner-fleet-block .field-label", "Branded cars"],
      [".planner-control-package .field-label", "Package"],
      ['label[for], .choice-title', null],
      [".choice-card:nth-child(1) .choice-title", "4 doors + rear"],
      [".choice-card:nth-child(1) .choice-copy", "Maximum surface"],
      [".choice-card:nth-child(2) .choice-title", "4 doors"],
      [".choice-card:nth-child(2) .choice-copy", "Side coverage"],
      [".choice-card:nth-child(3) .choice-title", "Only 2 doors"],
      [".choice-card:nth-child(3) .choice-copy", "Entry format"],
      [".planner-control-row .planner-control-block:nth-child(1) .field-label", "Duration"],
      [".planner-control-row .planner-control-block:nth-child(2) .field-label", "Car class"],
      ['label[for="class-econom"], #class-econom + .segmented-option-ui', "Econom"],
      ['label[for="class-comfort"], #class-comfort + .segmented-option-ui', "Comfort"],
      [".planner-console-results .eyebrow-dark", "Illustrative result"],
      [".wrap-preview-copy .field-label", "Selected look"],
      [".result-card:nth-child(1) span", "Total budget"],
      [".result-card:nth-child(2) span", "Projected impressions"],
      [".result-card:nth-child(3) span", "Estimated CPM"],
      [".result-card:nth-child(4) span", "Savings vs billboard"],
      [".benchmark-sheet-head strong", "Benchmark view"],
      [".benchmark-sheet-head span", "Same budget comparison"],
      [".benchmark-row-head span:nth-child(1)", "Channel"],
      [".benchmark-row-head span:nth-child(2)", "Impressions"],
      [".benchmark-sheet .benchmark-row:nth-child(4) > span", "Billboard"],
      [".proposal-copy .eyebrow", "Request proposal"],
      [".proposal-copy h2", "Launch your Abidjan campaign."],
      [".proposal-copy > p:not(.eyebrow)", "Share brief and timing. We shape the fleet, wrap, and rollout."],
      [".proposal-process-strip li:nth-child(1) strong", "Brief"],
      [".proposal-process-strip li:nth-child(1) p", "Objective, timing, city focus."],
      [".proposal-process-strip li:nth-child(2) strong", "Match"],
      [".proposal-process-strip li:nth-child(2) p", "Fleet size, wrap, duration."],
      [".proposal-process-strip li:nth-child(3) strong", "Launch"],
      [".proposal-process-strip li:nth-child(3) p", "Approve plan and roll out."],
      [".proposal-action-card-lead span", "Sales Lead"],
      [".proposal-action-card-lead strong", "Talk to Abdoulaye."],
      [
        ".proposal-action-card-lead p",
        "Share timing, brand, and city focus directly with the local commercial lead.",
      ],
      [".proposal-action-card-form span", "Request form"],
      [".proposal-action-card-form strong", "Send the planner."],
      [
        ".proposal-action-card-form p",
        "Your selected cars, package, duration, and media estimate are attached automatically.",
      ],
      [".proposal-action-card-form [data-proposal-link]", "Fill request form"],
      [".partner-wall-note > strong", "Recognized partner footprint"],
      [".partner-wall-copy", "Brands already run across Yango markets."],
      [".site-footer p", "Yango Car Branding for Abidjan advertisers"],
      [".site-footer a", "Back to top"],
    ],
    attrs: [
      [".site-nav", "aria-label", "Primary"],
      [".language-switcher", "aria-label", "Language"],
      [".hero-location-row", "aria-label", "Coverage examples"],
      [".compact-channel-row", "aria-label", "Channel roles"],
      [".planner-console-map", "aria-label", "Representative Abidjan coverage map"],
      [".benchmark-sheet", "aria-label", "Benchmark comparison for the selected plan"],
      [".wrap-preview-slider", "aria-label", "Preview angle"],
      [".proposal-process-strip", "aria-label", "Campaign rollout steps"],
      [".partner-logo-grid", "aria-label", "Featured partner logos from the current deck"],
    ],
  },
  fr: {
    locale: "fr-FR",
    title: "Yango Car Branding | Landing client Abidjan",
    description:
      "Landing page client pour le car branding Yango a Abidjan avec un planificateur media interactif.",
    monthSingular: "mois",
    monthPlural: "mois",
    carSingular: "voiture",
    carPlural: "voitures",
    cpm: "CPM",
    budget: "budget",
    saved: "economises",
    cityPresence: "de presence en ville",
    mapTitle: "Couverture de flotte a Abidjan",
    mapDensity: (cars) => `Densite visuelle de ${cars} voitures.`,
    brief: (impressions, budget, savings) =>
      `${impressions} impressions, ${budget} de budget, ${savings} economises.`,
    staticText: [
      [".brand-mark span:last-child", "Yango Car Branding"],
      ['.site-nav a[href="#proof"]', "Pourquoi ca marche"],
      ['.site-nav a[href="#planner"]', "Planificateur"],
      ['.site-nav a[href="#proposal"]', "Demander une proposition"],
      [".hero-copy .eyebrow", "Media mobile a Abidjan"],
      [".hero-copy h1", "Occupez les rues de la ville."],
      [
        ".hero-copy .lede",
        "Les voitures Yango portent les marques a travers Plateau, Yopougon, Cocody, Marcory et les routes de l'aeroport.",
      ],
      ['.cta-row a[href="#proposal"]', "Demander une proposition"],
      ['.cta-row a[href="#planner"]', "Ouvrir le planificateur"],
      [".hero-location-row span:nth-child(5)", "Route aeroport"],
      [".hero-panel-kicker", "Audience en Cote d'Ivoire"],
      [".hero-kpi-card:nth-child(1) span", "Audience CIV moyenne 2025"],
      [".hero-kpi-card:nth-child(2) span", "OTS mensuel moyen"],
      [".hero-kpi-card:nth-child(3) span", "Repartition hommes / femmes"],
      [".hero-kpi-card:nth-child(4) span", "Marches africains ride-hailing"],
      [".compact-proof-header .eyebrow", "Pourquoi ca marche"],
      [".compact-proof-header h2", "La portee mobile depasse l'attention statique."],
      [
        ".compact-proof-header p:not(.eyebrow)",
        "Yango donne aux marques une visibilite urbaine repetee avec des calculs media simples.",
      ],
      [".compact-proof-decision span", "Cadre de decision"],
      [".compact-proof-decision strong", "Miser sur Yango. Completer avec le statique et le social."],
      [".compact-channel:nth-child(1) span", "Canal principal"],
      [".compact-channel:nth-child(1) strong", "Car branding Yango"],
      [".compact-channel:nth-child(1) p", "Trajets urbains, presence repetee dans la rue."],
      [".compact-channel:nth-child(2) span", "Support"],
      [".compact-channel:nth-child(2) strong", "Panneau"],
      [".compact-channel:nth-child(2) p", "Repere fort, un point fixe."],
      [".compact-channel:nth-child(3) span", "Support"],
      [".compact-channel:nth-child(3) strong", "Social"],
      [".compact-channel:nth-child(3) p", "Ciblage rapide, attention courte."],
      [".compact-media-table caption", "Comparaison des canaux par 1 000 $ investis"],
      [".compact-media-table thead th:nth-child(1)", "Metrique"],
      [".compact-media-table thead th:nth-child(3)", "Panneau"],
      [".compact-media-table tbody tr:nth-child(1) th", "Impressions"],
      [".compact-media-table tbody tr:nth-child(1) td:nth-child(2) span", "portee mobile"],
      [".compact-media-table tbody tr:nth-child(1) td:nth-child(3) span", "portee fixe"],
      [".compact-media-table tbody tr:nth-child(1) td:nth-child(4) span", "portee feed"],
      [".compact-media-table tbody tr:nth-child(2) td:nth-child(2) span", "cout le plus bas"],
      [".compact-media-table tbody tr:nth-child(2) td:nth-child(3) span", "benchmark OOH"],
      [".compact-media-table tbody tr:nth-child(2) td:nth-child(4) span", "social payant"],
      [".compact-media-table tbody tr:nth-child(3) th", "Memorisation"],
      [".compact-media-table tbody tr:nth-child(3) td:nth-child(2) span", "vue urbaine repetee"],
      [".compact-media-table tbody tr:nth-child(3) td:nth-child(3) span", "vue repere"],
      [".compact-media-table tbody tr:nth-child(3) td:nth-child(4) span", "vue scroll"],
      [".compact-media-table tbody tr:nth-child(4) th", "Presence"],
      [".compact-media-table tbody tr:nth-child(4) td:nth-child(2) strong", "Dans toute la ville"],
      [".compact-media-table tbody tr:nth-child(4) td:nth-child(3) strong", "Fixe"],
      [".compact-media-table tbody tr:nth-child(4) td:nth-child(4) strong", "Digital"],
      [".compact-media-table tbody tr:nth-child(4) td:nth-child(2) span", "trajets"],
      [".compact-media-table tbody tr:nth-child(4) td:nth-child(3) span", "un point"],
      [".compact-media-table tbody tr:nth-child(4) td:nth-child(4) span", "feed uniquement"],
      [".compact-planner-heading .eyebrow", "Planificateur de campagne"],
      [".compact-planner-heading h2", "Planifiez la flotte. Voyez la ville."],
      [
        ".compact-planner-heading p:not(.eyebrow)",
        "Choisissez les voitures, le format et la duree. L'estimation se met a jour instantanement.",
      ],
      [".planner-console-kicker", "Apercu couverture"],
      [".planner-fleet-block .field-label", "Voitures marquees"],
      [".planner-control-package .field-label", "Package"],
      ['label[for], .choice-title', null],
      [".choice-card:nth-child(1) .choice-title", "4 portes + arriere"],
      [".choice-card:nth-child(1) .choice-copy", "Surface maximale"],
      [".choice-card:nth-child(2) .choice-title", "4 portes"],
      [".choice-card:nth-child(2) .choice-copy", "Couverture laterale"],
      [".choice-card:nth-child(3) .choice-title", "Seulement 2 portes"],
      [".choice-card:nth-child(3) .choice-copy", "Format d'entree"],
      [".planner-control-row .planner-control-block:nth-child(1) .field-label", "Duree"],
      [".planner-control-row .planner-control-block:nth-child(2) .field-label", "Classe voiture"],
      ['label[for="class-econom"], #class-econom + .segmented-option-ui', "Econom"],
      ['label[for="class-comfort"], #class-comfort + .segmented-option-ui', "Comfort"],
      [".planner-console-results .eyebrow-dark", "Resultat indicatif"],
      [".wrap-preview-copy .field-label", "Apercu choisi"],
      [".result-card:nth-child(1) span", "Budget total"],
      [".result-card:nth-child(2) span", "Impressions projetees"],
      [".result-card:nth-child(3) span", "CPM estime"],
      [".result-card:nth-child(4) span", "Economies vs panneau"],
      [".benchmark-sheet-head strong", "Vue benchmark"],
      [".benchmark-sheet-head span", "Comparaison a budget egal"],
      [".benchmark-row-head span:nth-child(1)", "Canal"],
      [".benchmark-row-head span:nth-child(2)", "Impressions"],
      [".benchmark-sheet .benchmark-row:nth-child(4) > span", "Panneau"],
      [".proposal-copy .eyebrow", "Demander une proposition"],
      [".proposal-copy h2", "Lancez votre campagne a Abidjan."],
      [".proposal-copy > p:not(.eyebrow)", "Partagez le brief et le timing. Nous cadrons la flotte, le wrap et le lancement."],
      [".proposal-process-strip li:nth-child(1) strong", "Brief"],
      [".proposal-process-strip li:nth-child(1) p", "Objectif, timing, zones prioritaires."],
      [".proposal-process-strip li:nth-child(2) strong", "Matcher"],
      [".proposal-process-strip li:nth-child(2) p", "Taille de flotte, wrap, duree."],
      [".proposal-process-strip li:nth-child(3) strong", "Lancer"],
      [".proposal-process-strip li:nth-child(3) p", "Valider le plan et lancer."],
      [".proposal-action-card-lead span", "Sales Lead"],
      [".proposal-action-card-lead strong", "Parlez a Abdoulaye."],
      [
        ".proposal-action-card-lead p",
        "Partagez le timing, la marque et les zones prioritaires directement avec le responsable commercial local.",
      ],
      [".proposal-action-card-form span", "Formulaire"],
      [".proposal-action-card-form strong", "Envoyer le plan."],
      [
        ".proposal-action-card-form p",
        "Les voitures, le package, la duree et l'estimation media selectionnes sont ajoutes automatiquement.",
      ],
      [".proposal-action-card-form [data-proposal-link]", "Remplir le formulaire"],
      [".partner-wall-note > strong", "Presence partenaires reconnue"],
      [".partner-wall-copy", "Des marques activent deja Yango sur plusieurs marches."],
      [".site-footer p", "Yango Car Branding pour les annonceurs d'Abidjan"],
      [".site-footer a", "Retour en haut"],
    ],
    attrs: [
      [".site-nav", "aria-label", "Navigation principale"],
      [".language-switcher", "aria-label", "Langue"],
      [".hero-location-row", "aria-label", "Exemples de couverture"],
      [".compact-channel-row", "aria-label", "Roles des canaux"],
      [".planner-console-map", "aria-label", "Carte representative de la couverture a Abidjan"],
      [".benchmark-sheet", "aria-label", "Comparaison benchmark du plan selectionne"],
      [".wrap-preview-slider", "aria-label", "Angle de preview"],
      [".proposal-process-strip", "aria-label", "Etapes de lancement de campagne"],
      [".partner-logo-grid", "aria-label", "Logos partenaires du deck actuel"],
    ],
  },
};

let currentLanguage = supportedLanguages.includes(localStorage.getItem("plannerLanguage"))
  ? localStorage.getItem("plannerLanguage")
  : document.documentElement.lang === "fr"
    ? "fr"
    : "en";
let formatNumber = new Intl.NumberFormat(languageCopy[currentLanguage].locale);
let formatUsdWhole = new Intl.NumberFormat(languageCopy[currentLanguage].locale, {
  maximumFractionDigits: 0,
});
let formatUsdPrecise = new Intl.NumberFormat(languageCopy[currentLanguage].locale, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const form = document.getElementById("planner-form");
const carsValue = document.getElementById("cars-value");
const monthsValue = document.getElementById("months-value");
const classValue = document.getElementById("class-value");
const mapScenarioTitle = document.getElementById("map-scenario-title");
const mapDensityLabel = document.getElementById("map-density-label");
const wrapPreviewImage = document.getElementById("wrap-preview-image");
const wrapPreviewImageAlt = document.getElementById("wrap-preview-image-alt");
const wrapPreviewTitle = document.getElementById("wrap-preview-title");
const wrapPreviewNote = document.getElementById("wrap-preview-note");
const wrapPreviewSlider = document.querySelector("[data-wrap-preview-slider]");
const wrapPreviewSlideButtons = document.querySelectorAll("[data-wrap-slide]");

const summaryTitle = document.getElementById("summary-title");
const summaryCopy = document.getElementById("summary-copy");
const budgetOutput = document.getElementById("budget-output");
const impressionsOutput = document.getElementById("impressions-output");
const cpmOutput = document.getElementById("cpm-output");
const savingsOutput = document.getElementById("savings-output");
const briefOutput = document.getElementById("brief-output");

const barYango = document.getElementById("bar-yango");
const barSocial = document.getElementById("bar-social");
const barBillboard = document.getElementById("bar-billboard");
const impYango = document.getElementById("imp-yango");
const impSocial = document.getElementById("imp-social");
const impBillboard = document.getElementById("imp-billboard");

const barYangoLabel = document.getElementById("bar-yango-label");
const barSocialLabel = document.getElementById("bar-social-label");
const barBillboardLabel = document.getElementById("bar-billboard-label");
const impYangoLabel = document.getElementById("imp-yango-label");
const impSocialLabel = document.getElementById("imp-social-label");
const impBillboardLabel = document.getElementById("imp-billboard-label");
const isCompactPage = document.body.classList.contains("compact-page");
const languageButtons = document.querySelectorAll("[data-language-option]");
const proposalLinks = document.querySelectorAll("[data-proposal-link]");

const packageText = {
  en: {
    full: {
      label: "4 doors + back window",
      compactTitle: "4 doors + rear",
      compactNote: "Maximum surface.",
      note: "Maximum surface coverage around the vehicle with side doors plus rear-window visibility.",
    },
    double: {
      label: "2 sides only",
      compactTitle: "4 doors",
      compactNote: "Strong side view.",
      note: "Strong side-door visibility with lighter production intensity than a full wrap.",
    },
    single: {
      label: "1 side only",
      compactTitle: "Only 2 doors",
      compactNote: "Focused entry.",
      note: "The lightest wrap entry point for a tactical one-side presence.",
    },
  },
  fr: {
    full: {
      label: "4 portes + vitre arriere",
      compactTitle: "4 portes + arriere",
      compactNote: "Surface maximale.",
      note: "Couverture maximale autour du vehicule avec portes laterales et visibilite arriere.",
    },
    double: {
      label: "2 cotes seulement",
      compactTitle: "4 portes",
      compactNote: "Vue laterale forte.",
      note: "Visibilite forte sur les portes laterales avec une production plus legere qu'un wrap complet.",
    },
    single: {
      label: "1 cote seulement",
      compactTitle: "Seulement 2 portes",
      compactNote: "Entree ciblee.",
      note: "Le format d'entree le plus leger pour une presence tactique sur un cote.",
    },
  },
};

const vehicleClassText = {
  en: {
    econom: {
      label: "Econom cars",
      summaryLabel: "econom-class cars",
      wrapLabel: "Econom",
      note: "Econom inventory keeps the most efficient cost base in the workbook.",
    },
    comfort: {
      label: "Comfort cars",
      summaryLabel: "comfort-class cars",
      wrapLabel: "Comfort",
      note: "Comfort inventory increases cost and slightly lifts projected delivery.",
    },
  },
  fr: {
    econom: {
      label: "Voitures econom",
      summaryLabel: "voitures econom",
      wrapLabel: "Econom",
      note: "L'inventaire econom garde la base de cout la plus efficace du fichier de calcul.",
    },
    comfort: {
      label: "Voitures comfort",
      summaryLabel: "voitures comfort",
      wrapLabel: "Comfort",
      note: "L'inventaire comfort augmente le cout et releve legerement la livraison projetee.",
    },
  },
};

const wrapPreviewText = {
  en: {
    full: {
      label: "4 doors + back window",
      note: "Maximum visible branded surface.",
      alt: "car branding preview with four doors and back window",
      angles: [
        { label: "Side A", description: "side and rear-window view" },
        { label: "Side B", description: "opposite side view" },
      ],
    },
    double: {
      label: "4 doors",
      note: "Clean side-door coverage from both viewing angles.",
      alt: "car branding preview with four branded doors",
      angles: [
        { label: "Side A", description: "first side view" },
        { label: "Side B", description: "opposite side view" },
      ],
    },
    single: {
      label: "Only 2 doors",
      note: "Focused one-side entry format for lighter campaigns.",
      alt: "car branding preview with two branded doors on one side",
      angles: [{ label: "Side view", description: "one-side view" }],
    },
  },
  fr: {
    full: {
      label: "4 portes + vitre arriere",
      note: "Surface marquee visible maximale.",
      alt: "apercu de marquage auto avec quatre portes et vitre arriere",
      angles: [
        { label: "Cote A", description: "vue cote et vitre arriere" },
        { label: "Cote B", description: "vue cote oppose" },
      ],
    },
    double: {
      label: "4 portes",
      note: "Couverture propre des portes laterales sous deux angles.",
      alt: "apercu de marquage auto avec quatre portes marquees",
      angles: [
        { label: "Cote A", description: "premiere vue laterale" },
        { label: "Cote B", description: "vue cote oppose" },
      ],
    },
    single: {
      label: "Seulement 2 portes",
      note: "Format d'entree sur un cote pour les campagnes plus legeres.",
      alt: "apercu de marquage auto avec deux portes marquees sur un cote",
      angles: [{ label: "Vue laterale", description: "vue sur un cote" }],
    },
  },
};

const compactPackageNotes = {
  full: "Maximum surface.",
  double: "Strong side view.",
  single: "Focused entry.",
};

const compactPackageTitles = {
  full: "4 doors + rear",
  double: "4 doors",
  single: "Only 2 doors",
};

const wrapPreviewPackages = {
  full: {
    label: "4 doors + back window",
    note: "Maximum visible branded surface.",
    alt: "car branding preview with four doors and back window",
    classImages: {
      econom: [
        { file: "econom-4-doors-back-window.png", label: "Side A", description: "side and rear-window view" },
        { file: "econom-2-doors-one-side.png", label: "Side B", description: "opposite side view" },
      ],
      comfort: [
        { file: "comfort-4-doors-back-window.png", label: "Side A", description: "side and rear-window view" },
        { file: "comfort-2-doors-one-side.png", label: "Side B", description: "opposite side view" },
      ],
    },
  },
  double: {
    label: "4 doors",
    note: "Clean side-door coverage from both viewing angles.",
    alt: "car branding preview with four branded doors",
    classImages: {
      econom: [
        { file: "econom-2-doors-one-side.png", label: "Side A", description: "first side view" },
        { file: "econom-4-doors.png", label: "Side B", description: "opposite side view" },
      ],
      comfort: [
        { file: "comfort-2-doors-one-side.png", label: "Side A", description: "first side view" },
        { file: "comfort-4-doors.png", label: "Side B", description: "opposite side view" },
      ],
    },
  },
  single: {
    label: "Only 2 doors",
    note: "Focused one-side entry format for lighter campaigns.",
    alt: "car branding preview with two branded doors on one side",
    classImages: {
      econom: [{ file: "econom-4-doors.png", label: "Side view", description: "one-side view" }],
      comfort: [{ file: "comfort-2-doors-one-side.png", label: "Side view", description: "one-side view" }],
    },
  },
};

const wrapPreviewClassLabels = {
  econom: "Econom",
  comfort: "Comfort",
};

function getLanguageCopy() {
  return languageCopy[currentLanguage] || languageCopy.en;
}

function getPackageText(key) {
  return (packageText[currentLanguage] || packageText.en)[key] || packageText.en.full;
}

function getVehicleClassText(key) {
  return (vehicleClassText[currentLanguage] || vehicleClassText.en)[key] || vehicleClassText.en.econom;
}

function getWrapPreviewText(key) {
  return (wrapPreviewText[currentLanguage] || wrapPreviewText.en)[key] || wrapPreviewText.en.full;
}

function syncFormatters() {
  const locale = getLanguageCopy().locale;
  formatNumber = new Intl.NumberFormat(locale);
  formatUsdWhole = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  });
  formatUsdPrecise = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function applyStaticTranslations() {
  const copy = getLanguageCopy();

  document.documentElement.lang = currentLanguage;
  window.YANGO_PLANNER_LANGUAGE = currentLanguage;
  document.title = copy.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", copy.description);

  copy.staticText.forEach(([selector, text]) => {
    if (!text) return;
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = text;
    });
  });

  copy.attrs.forEach(([selector, attr, value]) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.setAttribute(attr, value);
    });
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.languageOption === currentLanguage;
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });

  window.updatePlannerMapLanguage?.(currentLanguage);
}

function formatUsd(value) {
  const rounded = Math.round(Math.abs(value));
  const sign = value < 0 ? "-" : "";
  return `${sign}$${formatUsdWhole.format(rounded)}`;
}

function formatUsdCpm(value) {
  return `$${formatUsdPrecise.format(value)}`;
}

function getCheckedValue(name) {
  const selected = form.querySelector(`input[name="${name}"]:checked`);
  return selected ? selected.value : "";
}

function formatMonthText(months) {
  const copy = getLanguageCopy();
  return `${months} ${months === 1 ? copy.monthSingular : copy.monthPlural}`;
}

function formatImpressions(value) {
  return formatNumber.format(Math.round(value));
}

function getPlannerSnapshot() {
  const packageKey = getCheckedValue("package");
  const classKey = getCheckedValue("vehicleClass");
  const months = Number(getCheckedValue("months"));
  const cars = Number(getCheckedValue("cars"));
  const selectedPackage = packages[packageKey] || packages.full;
  const selectedDuration = durations[months] || durations[3];
  const selectedClass = vehicleClasses[classKey] || vehicleClasses.econom;

  const budgetUsd =
    pricingModel.baseCostUsdPerCarMonth *
    selectedPackage.costMultiplier *
    selectedDuration.costMultiplier *
    selectedClass.costMultiplier *
    cars *
    months;

  const projectedImpressions =
    pricingModel.baseImpressionsPerCarMonth *
    selectedPackage.impressionMultiplier *
    selectedDuration.impressionMultiplier *
    selectedClass.impressionMultiplier *
    cars *
    months;
  const cpm = budgetUsd / projectedImpressions;
  const savingsVsBillboard = projectedImpressions * benchmarks.billboard - budgetUsd;

  return {
    cars,
    package: packageKey,
    package_label: getPackageText(packageKey).label,
    duration_months: months,
    car_class: classKey,
    car_class_label: getVehicleClassText(classKey).label,
    budget_usd: Math.round(budgetUsd),
    impressions: Math.round(projectedImpressions),
    cpm: cpm.toFixed(2),
    savings_usd: Math.round(savingsVsBillboard),
    language: currentLanguage,
    page_url: window.location.href,
  };
}

function updateProposalLinks() {
  const formUrl = proposalFormUrls[currentLanguage] || proposalFormUrls.en;
  const snapshot = getPlannerSnapshot();
  const url = new URL(formUrl);

  Object.entries(snapshot).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  proposalLinks.forEach((link) => {
    link.href = url.toString();
  });
}

function setBarWidth(element, width) {
  if (!element) return;
  element.style.width = width;
}

function updateSelectionLabels() {
  const cars = Number(getCheckedValue("cars"));
  const months = Number(getCheckedValue("months"));
  const copy = getLanguageCopy();
  const selectedClassCopy = getVehicleClassText(getCheckedValue("vehicleClass"));

  carsValue.textContent = `${formatNumber.format(cars)} ${
    cars === 1 ? copy.carSingular : copy.carPlural
  }`;
  monthsValue.textContent = formatMonthText(months);
  classValue.textContent = selectedClassCopy.label;

  if (mapScenarioTitle) {
    mapScenarioTitle.textContent = copy.mapTitle;
  }

  if (mapDensityLabel) {
    mapDensityLabel.textContent = copy.mapDensity(formatNumber.format(cars));
  }

  if (window.updatePlannerMapFleet) {
    window.updatePlannerMapFleet(cars);
  }
}

function updateWrapPreview() {
  if (!wrapPreviewImage || !wrapPreviewTitle || !wrapPreviewNote) return;

  const packageKey = getCheckedValue("package");
  const classKey = getCheckedValue("vehicleClass");
  const packagePreview = wrapPreviewPackages[packageKey] || wrapPreviewPackages.full;
  const packagePreviewCopy = getWrapPreviewText(packageKey);
  const classLabel = getVehicleClassText(classKey).wrapLabel;
  const imageClassKey = classKey === "comfort" ? "comfort" : "econom";
  const angles = packagePreview.classImages[imageClassKey] || packagePreview.classImages.econom;
  const primaryAngle = angles[0];
  const secondaryAngle = angles[1];
  const primaryAngleCopy = packagePreviewCopy.angles[0];
  const secondaryAngleCopy = packagePreviewCopy.angles[1];
  const primaryImageSrc = `./assets/branding-options/${primaryAngle.file}`;
  const secondaryImageSrc = secondaryAngle
    ? `./assets/branding-options/${secondaryAngle.file}`
    : primaryImageSrc;

  wrapPreviewImage.src = primaryImageSrc;
  wrapPreviewImage.alt = `${classLabel} ${packagePreviewCopy.alt}, ${primaryAngleCopy.description}`;
  wrapPreviewTitle.textContent = `${classLabel} - ${packagePreviewCopy.label}`;
  wrapPreviewNote.textContent = packagePreviewCopy.note;

  if (wrapPreviewImageAlt) {
    wrapPreviewImageAlt.src = secondaryImageSrc;
    wrapPreviewImageAlt.alt = `${classLabel} ${packagePreviewCopy.alt}, ${
      secondaryAngleCopy?.description || primaryAngleCopy.description
    }`;
  }

  const hasMultipleAngles = angles.length > 1;

  if (wrapPreviewSlider) {
    wrapPreviewSlider.classList.toggle("has-single-angle", !hasMultipleAngles);
  }

  wrapPreviewSlideButtons.forEach((button, index) => {
    const angle = angles[index];
    const angleCopy = packagePreviewCopy.angles[index];
    button.hidden = !angle;
    button.textContent = angle && angleCopy ? angleCopy.label : "";
    if (!hasMultipleAngles && index > 0) return;
    button.classList.toggle("is-active", index === 0);
    button.setAttribute("aria-pressed", index === 0 ? "true" : "false");
  });

  setWrapPreviewSlide(0);
}

function setWrapPreviewSlide(index) {
  if (!wrapPreviewImage) return;

  const hasSecondImage = wrapPreviewImageAlt && !wrapPreviewSlideButtons[1]?.hidden;
  const activeIndex = hasSecondImage ? index : 0;

  wrapPreviewImage.classList.toggle("is-active", activeIndex === 0);

  if (wrapPreviewImageAlt) {
    wrapPreviewImageAlt.classList.toggle("is-active", activeIndex === 1);
    wrapPreviewImageAlt.setAttribute("aria-hidden", activeIndex === 1 ? "false" : "true");
  }

  wrapPreviewSlideButtons.forEach((button, buttonIndex) => {
    if (button.hidden) return;
    button.classList.toggle("is-active", buttonIndex === activeIndex);
    button.setAttribute("aria-pressed", buttonIndex === activeIndex ? "true" : "false");
  });
}

function updatePlanner() {
  const packageKey = getCheckedValue("package");
  const classKey = getCheckedValue("vehicleClass");
  const copy = getLanguageCopy();
  const selectedPackage = packages[packageKey];
  const selectedPackageCopy = getPackageText(packageKey);
  const months = Number(getCheckedValue("months"));
  const selectedDuration = durations[months];
  const selectedClass = vehicleClasses[classKey];
  const selectedClassCopy = getVehicleClassText(classKey);
  const cars = Number(getCheckedValue("cars"));

  const budgetUsd =
    pricingModel.baseCostUsdPerCarMonth *
    selectedPackage.costMultiplier *
    selectedDuration.costMultiplier *
    selectedClass.costMultiplier *
    cars *
    months;

  const projectedImpressions =
    pricingModel.baseImpressionsPerCarMonth *
    selectedPackage.impressionMultiplier *
    selectedDuration.impressionMultiplier *
    selectedClass.impressionMultiplier *
    cars *
    months;
  const cpm = budgetUsd / projectedImpressions;

  const billboardEquivalent = projectedImpressions * benchmarks.billboard;
  const savingsVsBillboard = billboardEquivalent - budgetUsd;
  const minCpm = Math.min(cpm, benchmarks.social, benchmarks.billboard);
  const socialImpressionsSameBudget = budgetUsd / benchmarks.social;
  const billboardImpressionsSameBudget = budgetUsd / benchmarks.billboard;
  const maxImpressions = Math.max(
    projectedImpressions,
    socialImpressionsSameBudget,
    billboardImpressionsSameBudget,
  );

  summaryTitle.textContent = isCompactPage
    ? `${formatNumber.format(cars)} ${
        cars === 1 ? copy.carSingular : copy.carPlural
      } - ${selectedPackageCopy.compactTitle}`
    : `${selectedPackageCopy.label} on ${formatNumber.format(cars)} ${
        selectedClassCopy.summaryLabel
      }`;
  summaryCopy.textContent = isCompactPage
    ? `${selectedPackageCopy.compactNote} ${formatMonthText(months)} ${copy.cityPresence}.`
    : `${selectedPackageCopy.note} ${selectedClassCopy.note} ${formatMonthText(
        months,
      )} keeps the campaign visible long enough to build recognition, not just a one-off hit.`;

  budgetOutput.textContent = formatUsd(budgetUsd);
  impressionsOutput.textContent = formatImpressions(projectedImpressions);
  cpmOutput.textContent = formatUsdCpm(cpm);
  savingsOutput.textContent = formatUsd(savingsVsBillboard);

  setBarWidth(barYango, `${(minCpm / cpm) * 100}%`);
  setBarWidth(barSocial, `${(minCpm / benchmarks.social) * 100}%`);
  setBarWidth(barBillboard, `${(minCpm / benchmarks.billboard) * 100}%`);

  barYangoLabel.textContent = `${formatUsdCpm(cpm)} ${copy.cpm}`;
  barSocialLabel.textContent = `${formatUsdCpm(benchmarks.social)} ${copy.cpm}`;
  barBillboardLabel.textContent = `${formatUsdCpm(benchmarks.billboard)} ${copy.cpm}`;
  setBarWidth(impYango, `${(projectedImpressions / maxImpressions) * 100}%`);
  setBarWidth(impSocial, `${(socialImpressionsSameBudget / maxImpressions) * 100}%`);
  setBarWidth(impBillboard, `${(billboardImpressionsSameBudget / maxImpressions) * 100}%`);

  impYangoLabel.textContent = formatImpressions(projectedImpressions);
  impSocialLabel.textContent = formatImpressions(socialImpressionsSameBudget);
  impBillboardLabel.textContent = formatImpressions(billboardImpressionsSameBudget);

  briefOutput.textContent = isCompactPage
    ? copy.brief(
        formatImpressions(projectedImpressions),
        formatUsd(budgetUsd),
        formatUsd(savingsVsBillboard),
      )
    : `${formatMonthText(months)} on ${formatNumber.format(
        cars,
      )} ${selectedClassCopy.label.toLowerCase()} with ${selectedPackageCopy.label.toLowerCase()} gives your brand ${formatImpressions(
        projectedImpressions,
      )} impressions on a ${formatUsd(
        budgetUsd,
      )} budget and keeps ${formatUsd(
        savingsVsBillboard,
      )} in hand versus billboard CPM for the same level of exposure.`;

  updateProposalLinks();
}

function handlePlannerInput() {
  updateSelectionLabels();
  updatePlanner();
  updateWrapPreview();
}

function setLanguage(language) {
  if (!supportedLanguages.includes(language) || language === currentLanguage) return;

  currentLanguage = language;
  localStorage.setItem("plannerLanguage", currentLanguage);
  syncFormatters();
  applyStaticTranslations();
  handlePlannerInput();
}

form.addEventListener("click", (event) => {
  const option = event.target.closest(".choice-card, .segmented-option");
  if (!option || !form.contains(option)) return;

  const input = option.querySelector("input");
  if (!input || input.checked) return;

  input.checked = true;
  handlePlannerInput();
});

wrapPreviewSlider?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-wrap-slide]");
  if (!button || button.hidden) return;

  setWrapPreviewSlide(Number(button.dataset.wrapSlide));
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.languageOption);
  });
});

["input", "change"].forEach((eventName) => {
  form.addEventListener(eventName, handlePlannerInput);
});

syncFormatters();
applyStaticTranslations();
updateSelectionLabels();
updatePlanner();
updateWrapPreview();
