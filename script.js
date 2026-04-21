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

const formatNumber = new Intl.NumberFormat("en-US");
const formatUsdWhole = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});
const formatUsdPrecise = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const form = document.getElementById("planner-form");
const proposalForm = document.getElementById("proposal-form");

const carsValue = document.getElementById("cars-value");
const monthsValue = document.getElementById("months-value");
const classValue = document.getElementById("class-value");

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

const responseOutput = document.getElementById("form-response");

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
  return `${months} ${months === 1 ? "month" : "months"}`;
}

function formatImpressions(value) {
  return formatNumber.format(Math.round(value));
}

function updateSelectionLabels() {
  const cars = Number(getCheckedValue("cars"));
  const months = Number(getCheckedValue("months"));
  const selectedClass = vehicleClasses[getCheckedValue("vehicleClass")];

  carsValue.textContent = `${formatNumber.format(cars)} cars`;
  monthsValue.textContent = formatMonthText(months);
  classValue.textContent = selectedClass.label;
}

function updatePlanner() {
  const selectedPackage = packages[getCheckedValue("package")];
  const months = Number(getCheckedValue("months"));
  const selectedDuration = durations[months];
  const selectedClass = vehicleClasses[getCheckedValue("vehicleClass")];
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

  summaryTitle.textContent = `${selectedPackage.label} on ${formatNumber.format(cars)} ${selectedClass.summaryLabel}`;
  summaryCopy.textContent = `${selectedPackage.note} ${selectedClass.note} ${formatMonthText(
    months,
  )} keeps the campaign visible long enough to build recognition, not just a one-off hit.`;

  budgetOutput.textContent = formatUsd(budgetUsd);
  impressionsOutput.textContent = formatImpressions(projectedImpressions);
  cpmOutput.textContent = formatUsdCpm(cpm);
  savingsOutput.textContent = formatUsd(savingsVsBillboard);

  barYango.style.width = `${(minCpm / cpm) * 100}%`;
  barSocial.style.width = `${(minCpm / benchmarks.social) * 100}%`;
  barBillboard.style.width = `${(minCpm / benchmarks.billboard) * 100}%`;

  barYangoLabel.textContent = `${formatUsdCpm(cpm)} CPM`;
  barSocialLabel.textContent = `${formatUsdCpm(benchmarks.social)} CPM`;
  barBillboardLabel.textContent = `${formatUsdCpm(benchmarks.billboard)} CPM`;
  impYango.style.width = `${(projectedImpressions / maxImpressions) * 100}%`;
  impSocial.style.width = `${(socialImpressionsSameBudget / maxImpressions) * 100}%`;
  impBillboard.style.width = `${(billboardImpressionsSameBudget / maxImpressions) * 100}%`;

  impYangoLabel.textContent = formatImpressions(projectedImpressions);
  impSocialLabel.textContent = formatImpressions(socialImpressionsSameBudget);
  impBillboardLabel.textContent = formatImpressions(billboardImpressionsSameBudget);

  briefOutput.textContent = `${formatMonthText(months)} on ${formatNumber.format(
    cars,
  )} ${selectedClass.label.toLowerCase()} with ${selectedPackage.label.toLowerCase()} gives your brand ${formatImpressions(
    projectedImpressions,
  )} impressions on a ${formatUsd(
    budgetUsd,
  )} budget and keeps ${formatUsd(
    savingsVsBillboard,
  )} in hand versus billboard CPM for the same level of exposure.`;
}

function handlePlannerInput() {
  updateSelectionLabels();
  updatePlanner();
}

["input", "change"].forEach((eventName) => {
  form.addEventListener(eventName, handlePlannerInput);
});

proposalForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("client-name").value.trim() || "Your team";
  const company = document.getElementById("company-name").value.trim() || "your brand";

  responseOutput.textContent = `${name}, your brief for ${company} is ready for the Yango team to shape into a launch proposal.`;
});

updateSelectionLabels();
updatePlanner();
