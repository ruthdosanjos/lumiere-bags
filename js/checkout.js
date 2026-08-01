(function initializeCheckoutScope() {

/* ==========================================================
   Checkout Configuration
========================================================== */

const CHECKOUT_DRAFT_KEY = "lumiereCheckoutDraft";

const TOTAL_STEPS = 4;

const LAST_NAVIGABLE_STEP = TOTAL_STEPS - 1;

const STEP_NAMES = [
    "Dados e entrega",
    "Pagamento",
    "Revisão",
    "Confirmação"
];

const DRAFT_FIELDS = [
    "fullName",
    "email",
    "phone",
    "postalCode",
    "address",
    "addressNumber",
    "addressComplement",
    "neighborhood",
    "city",
    "state",
    "paymentMethod"
];

const SELECTORS = {
    form: "#checkout-form",
    steps: "[data-checkout-step]",
    progressItems: "[data-checkout-progress-step]",
    progressNumber: ".checkout-progress-number",
    progressState: ".checkout-progress-state",
    liveRegion: ".checkout-live-region",
    reviewSubmit: "[data-review-submit]",
    nextButtons: "[data-checkout-next]",
    previousButtons: "[data-checkout-previous]",
    exitLinks: "[data-checkout-exit]"
};

/* ==========================================================
   Checkout State
========================================================== */

const checkoutState = {
    currentStep: 1,
    personal: {
        fullName: "",
        email: "",
        phone: ""
    },
    delivery: {
        postalCode: "",
        address: "",
        addressNumber: "",
        addressComplement: "",
        neighborhood: "",
        city: "",
        state: ""
    },
    paymentMethod: "",
    isSubmitting: false
};

/* ==========================================================
   DOM Elements
========================================================== */

const checkoutForm = document.querySelector(
    SELECTORS.form
);

const checkoutSteps = Array.from(
    document.querySelectorAll(SELECTORS.steps)
);

const progressItems = Array.from(
    document.querySelectorAll(SELECTORS.progressItems)
);

const liveRegion = document.querySelector(
    SELECTORS.liveRegion
);

const reviewSubmit = document.querySelector(
    SELECTORS.reviewSubmit
);

/* ==========================================================
   Draft Helpers
========================================================== */

function sanitizeCheckoutDraft(draft) {

    if (
        !draft
        || typeof draft !== "object"
        || Array.isArray(draft)
    ) return null;

    const currentStep = draft.currentStep ?? 1;

    if (
        !Number.isInteger(currentStep)
        || currentStep < 1
        || currentStep > LAST_NAVIGABLE_STEP
    ) return null;

    const sanitizedDraft = {
        currentStep
    };

    for (const fieldName of DRAFT_FIELDS) {

        const fieldValue = draft[fieldName];

        if (
            fieldValue !== undefined
            && typeof fieldValue !== "string"
        ) return null;

        sanitizedDraft[fieldName] = fieldValue?.trim() ?? "";

    }

    return sanitizedDraft;

}

function clearCheckoutDraft() {

    try {

        sessionStorage.removeItem(
            CHECKOUT_DRAFT_KEY
        );

    } catch (error) {

        return;

    }

}

function loadCheckoutDraft() {

    let storedDraft;

    try {

        storedDraft = sessionStorage.getItem(
            CHECKOUT_DRAFT_KEY
        );

    } catch (error) {

        return null;

    }

    if (!storedDraft) return null;

    try {

        const parsedDraft = JSON.parse(
            storedDraft
        );

        const sanitizedDraft = sanitizeCheckoutDraft(
            parsedDraft
        );

        if (!sanitizedDraft) {

            clearCheckoutDraft();

            return null;

        }

        return sanitizedDraft;

    } catch (error) {

        clearCheckoutDraft();

        return null;

    }

}

function createCheckoutDraft() {

    return {
        currentStep: checkoutState.currentStep,
        fullName: checkoutState.personal.fullName,
        email: checkoutState.personal.email,
        phone: checkoutState.personal.phone,
        postalCode: checkoutState.delivery.postalCode,
        address: checkoutState.delivery.address,
        addressNumber: checkoutState.delivery.addressNumber,
        addressComplement: checkoutState.delivery.addressComplement,
        neighborhood: checkoutState.delivery.neighborhood,
        city: checkoutState.delivery.city,
        state: checkoutState.delivery.state,
        paymentMethod: checkoutState.paymentMethod
    };

}

function saveCheckoutDraft() {

    const checkoutDraft = createCheckoutDraft();

    try {

        sessionStorage.setItem(
            CHECKOUT_DRAFT_KEY,
            JSON.stringify(checkoutDraft)
        );

    } catch (error) {

        return;

    }

}

/* ==========================================================
   Form State
========================================================== */

function getFieldValue(fieldName) {

    const field = checkoutForm?.elements.namedItem(
        fieldName
    );

    if (!field || typeof field.value !== "string") {
        return "";
    }

    return field.value.trim();

}

function captureFormState() {

    if (!checkoutForm) return;

    checkoutState.personal.fullName = getFieldValue(
        "fullName"
    );

    checkoutState.personal.email = getFieldValue(
        "email"
    );

    checkoutState.personal.phone = getFieldValue(
        "phone"
    );

    checkoutState.delivery.postalCode = getFieldValue(
        "postalCode"
    );

    checkoutState.delivery.address = getFieldValue(
        "address"
    );

    checkoutState.delivery.addressNumber = getFieldValue(
        "addressNumber"
    );

    checkoutState.delivery.addressComplement = getFieldValue(
        "addressComplement"
    );

    checkoutState.delivery.neighborhood = getFieldValue(
        "neighborhood"
    );

    checkoutState.delivery.city = getFieldValue(
        "city"
    );

    checkoutState.delivery.state = getFieldValue(
        "state"
    );

    const selectedPayment = checkoutForm.querySelector(
        'input[name="paymentMethod"]:checked'
    );

    checkoutState.paymentMethod = selectedPayment?.value ?? "";

}

function updateCheckoutState(draft) {

    checkoutState.currentStep = draft.currentStep;

    checkoutState.personal.fullName = draft.fullName;
    checkoutState.personal.email = draft.email;
    checkoutState.personal.phone = draft.phone;

    checkoutState.delivery.postalCode = draft.postalCode;
    checkoutState.delivery.address = draft.address;
    checkoutState.delivery.addressNumber = draft.addressNumber;
    checkoutState.delivery.addressComplement = draft.addressComplement;
    checkoutState.delivery.neighborhood = draft.neighborhood;
    checkoutState.delivery.city = draft.city;
    checkoutState.delivery.state = draft.state;

    checkoutState.paymentMethod = draft.paymentMethod;

}

function restoreFieldValue(fieldName, fieldValue) {

    const field = checkoutForm?.elements.namedItem(
        fieldName
    );

    if (!field || typeof field.value !== "string") return;

    field.value = fieldValue;

}

function restoreFormState() {

    if (!checkoutForm) return;

    restoreFieldValue(
        "fullName",
        checkoutState.personal.fullName
    );

    restoreFieldValue(
        "email",
        checkoutState.personal.email
    );

    restoreFieldValue(
        "phone",
        checkoutState.personal.phone
    );

    restoreFieldValue(
        "postalCode",
        checkoutState.delivery.postalCode
    );

    restoreFieldValue(
        "address",
        checkoutState.delivery.address
    );

    restoreFieldValue(
        "addressNumber",
        checkoutState.delivery.addressNumber
    );

    restoreFieldValue(
        "addressComplement",
        checkoutState.delivery.addressComplement
    );

    restoreFieldValue(
        "neighborhood",
        checkoutState.delivery.neighborhood
    );

    restoreFieldValue(
        "city",
        checkoutState.delivery.city
    );

    restoreFieldValue(
        "state",
        checkoutState.delivery.state
    );

    const paymentOptions = checkoutForm.querySelectorAll(
        'input[name="paymentMethod"]'
    );

    paymentOptions.forEach(option => {

        option.checked = (
            option.value === checkoutState.paymentMethod
        );

    });

}

/* ==========================================================
   Step Rendering
========================================================== */

function updateStepIndicator() {

    progressItems.forEach(item => {

        const step = Number(
            item.dataset.checkoutProgressStep
        );

        const isCurrent = (
            step === checkoutState.currentStep
        );

        const isCompleted = (
            step < checkoutState.currentStep
        );

        item.classList.toggle(
            "completed",
            isCompleted
        );

        if (isCurrent) {

            item.setAttribute(
                "aria-current",
                "step"
            );

        } else {

            item.removeAttribute(
                "aria-current"
            );

        }

        const progressNumber = item.querySelector(
            SELECTORS.progressNumber
        );

        if (progressNumber) {

            progressNumber.textContent = isCompleted
                ? "✓"
                : String(step);

        }

        const progressState = item.querySelector(
            SELECTORS.progressState
        );

        if (progressState) {

            progressState.textContent = isCurrent
                ? "Etapa atual"
                : isCompleted
                    ? "Etapa concluída"
                    : "";

        }

    });

}

function renderCurrentStep(focusHeading = false) {

    checkoutSteps.forEach(stepPanel => {

        const step = Number(
            stepPanel.dataset.checkoutStep
        );

        stepPanel.hidden = (
            step !== checkoutState.currentStep
        );

    });

    if (reviewSubmit) {

        reviewSubmit.hidden = (
            checkoutState.currentStep !== 3
        );

    }

    updateStepIndicator();

    const stepName = STEP_NAMES[
        checkoutState.currentStep - 1
    ];

    if (liveRegion) {

        liveRegion.textContent = (
            `Etapa ${checkoutState.currentStep} de ${TOTAL_STEPS}: ${stepName}.`
        );

    }

    if (!focusHeading) return;

    const currentPanel = checkoutSteps.find(stepPanel => {

        return Number(stepPanel.dataset.checkoutStep)
            === checkoutState.currentStep;

    });

    const heading = currentPanel?.querySelector(
        "h2[tabindex]"
    );

    heading?.focus({
        preventScroll: true
    });

}

function goToStep(step) {

    const safeStep = Math.min(
        LAST_NAVIGABLE_STEP,
        Math.max(1, step)
    );

    if (safeStep === checkoutState.currentStep) return;

    checkoutState.currentStep = safeStep;

    renderCurrentStep(true);

}

/* ==========================================================
   Navigation Events
========================================================== */

function handleNextStep() {

    captureFormState();

    goToStep(
        checkoutState.currentStep + 1
    );

    saveCheckoutDraft();

}

function handlePreviousStep() {

    captureFormState();

    goToStep(
        checkoutState.currentStep - 1
    );

    saveCheckoutDraft();

}

function handleCheckoutExit() {

    clearCheckoutDraft();

}

function registerCheckoutEvents() {

    document
        .querySelectorAll(SELECTORS.nextButtons)
        .forEach(button => {

            button.addEventListener(
                "click",
                handleNextStep
            );

        });

    document
        .querySelectorAll(SELECTORS.previousButtons)
        .forEach(button => {

            button.addEventListener(
                "click",
                handlePreviousStep
            );

        });

    document
        .querySelectorAll(SELECTORS.exitLinks)
        .forEach(link => {

            link.addEventListener(
                "click",
                handleCheckoutExit
            );

        });

    checkoutForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

        }
    );

}

/* ==========================================================
   Initialization
========================================================== */

function redirectToCartIfEmpty() {

    const hasValidProducts = (
        typeof getCartProducts === "function"
        && getCartProducts().length > 0
    );

    if (hasValidProducts) return false;

    clearCheckoutDraft();

    window.location.replace(
        "./cart.html#cart-content"
    );

    return true;

}

function initializeCheckout() {

    const hasEssentialElements = (
        checkoutForm
        && checkoutSteps.length === TOTAL_STEPS
        && progressItems.length === TOTAL_STEPS
        && liveRegion
        && reviewSubmit
    );

    if (!hasEssentialElements) return;

    if (redirectToCartIfEmpty()) return;

    const checkoutDraft = loadCheckoutDraft();

    if (checkoutDraft) {

        updateCheckoutState(
            checkoutDraft
        );

        restoreFormState();

    }

    renderCurrentStep();

    registerCheckoutEvents();

}

initializeCheckout();

})();
