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

function setBarWidth(element, width) {
  if (!element) return;
  element.style.width = width;
}

function updateSelectionLabels() {
  const cars = Number(getCheckedValue("cars"));
  const months = Number(getCheckedValue("months"));
  const selectedClass = vehicleClasses[getCheckedValue("vehicleClass")];

  carsValue.textContent = `${formatNumber.format(cars)} cars`;
  monthsValue.textContent = formatMonthText(months);
  classValue.textContent = selectedClass.label;

  if (mapScenarioTitle) {
    mapScenarioTitle.textContent = "Abidjan fleet coverage";
  }

  if (mapDensityLabel) {
    mapDensityLabel.textContent = `${formatNumber.format(cars)}-car visual density.`;
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
  const classLabel = wrapPreviewClassLabels[classKey] || wrapPreviewClassLabels.econom;
  const imageClassKey = classKey === "comfort" ? "comfort" : "econom";
  const angles = packagePreview.classImages[imageClassKey] || packagePreview.classImages.econom;
  const primaryAngle = angles[0];
  const secondaryAngle = angles[1];
  const primaryImageSrc = `./assets/branding-options/${primaryAngle.file}`;
  const secondaryImageSrc = secondaryAngle
    ? `./assets/branding-options/${secondaryAngle.file}`
    : primaryImageSrc;

  wrapPreviewImage.src = primaryImageSrc;
  wrapPreviewImage.alt = `${classLabel} ${packagePreview.alt}, ${primaryAngle.description}`;
  wrapPreviewTitle.textContent = `${classLabel} - ${packagePreview.label}`;
  wrapPreviewNote.textContent = packagePreview.note;

  if (wrapPreviewImageAlt) {
    wrapPreviewImageAlt.src = secondaryImageSrc;
    wrapPreviewImageAlt.alt = `${classLabel} ${packagePreview.alt}, ${
      secondaryAngle?.description || primaryAngle.description
    }`;
  }

  const hasMultipleAngles = angles.length > 1;

  if (wrapPreviewSlider) {
    wrapPreviewSlider.classList.toggle("has-single-angle", !hasMultipleAngles);
  }

  wrapPreviewSlideButtons.forEach((button, index) => {
    const angle = angles[index];
    button.hidden = !angle;
    button.textContent = angle ? angle.label : "";
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

  summaryTitle.textContent = isCompactPage
    ? `${formatNumber.format(cars)} cars - ${compactPackageTitles[getCheckedValue("package")]}`
    : `${selectedPackage.label} on ${formatNumber.format(cars)} ${selectedClass.summaryLabel}`;
  summaryCopy.textContent = isCompactPage
    ? `${compactPackageNotes[getCheckedValue("package")]} ${formatMonthText(
        months,
      )} city presence.`
    : `${selectedPackage.note} ${selectedClass.note} ${formatMonthText(
        months,
      )} keeps the campaign visible long enough to build recognition, not just a one-off hit.`;

  budgetOutput.textContent = formatUsd(budgetUsd);
  impressionsOutput.textContent = formatImpressions(projectedImpressions);
  cpmOutput.textContent = formatUsdCpm(cpm);
  savingsOutput.textContent = formatUsd(savingsVsBillboard);

  setBarWidth(barYango, `${(minCpm / cpm) * 100}%`);
  setBarWidth(barSocial, `${(minCpm / benchmarks.social) * 100}%`);
  setBarWidth(barBillboard, `${(minCpm / benchmarks.billboard) * 100}%`);

  barYangoLabel.textContent = `${formatUsdCpm(cpm)} CPM`;
  barSocialLabel.textContent = `${formatUsdCpm(benchmarks.social)} CPM`;
  barBillboardLabel.textContent = `${formatUsdCpm(benchmarks.billboard)} CPM`;
  setBarWidth(impYango, `${(projectedImpressions / maxImpressions) * 100}%`);
  setBarWidth(impSocial, `${(socialImpressionsSameBudget / maxImpressions) * 100}%`);
  setBarWidth(impBillboard, `${(billboardImpressionsSameBudget / maxImpressions) * 100}%`);

  impYangoLabel.textContent = formatImpressions(projectedImpressions);
  impSocialLabel.textContent = formatImpressions(socialImpressionsSameBudget);
  impBillboardLabel.textContent = formatImpressions(billboardImpressionsSameBudget);

  briefOutput.textContent = isCompactPage
    ? `${formatImpressions(projectedImpressions)} impressions, ${formatUsd(
        budgetUsd,
      )} budget, ${formatUsd(savingsVsBillboard)} saved.`
    : `${formatMonthText(months)} on ${formatNumber.format(
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
  updateWrapPreview();
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

["input", "change"].forEach((eventName) => {
  form.addEventListener(eventName, handlePlannerInput);
});

updateSelectionLabels();
updatePlanner();
updateWrapPreview();
