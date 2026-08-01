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

const PERSONAL_AND_DELIVERY_FIELDS = [
    "fullName",
    "email",
    "phone",
    "postalCode",
    "address",
    "addressNumber",
    "addressComplement",
    "neighborhood",
    "city",
    "state"
];

const VALID_PAYMENT_METHODS = new Set([
    "pix",
    "card",
    "boleto"
]);

const VALID_STATE_CODES = new Set([
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
    "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
    "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
]);

const SELECTORS = {
    form: "#checkout-form",
    steps: "[data-checkout-step]",
    progressItems: "[data-checkout-progress-step]",
    progressNumber: ".checkout-progress-number",
    progressState: ".checkout-progress-state",
    liveRegion: ".checkout-live-region",
    reviewSubmit: "[data-review-submit]",
    paymentFieldset: ".checkout-payment-fieldset",
    paymentError: "#checkout-payment-error",
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

const paymentFieldset = document.querySelector(
    SELECTORS.paymentFieldset
);

const paymentError = document.querySelector(
    SELECTORS.paymentError
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

    sanitizedDraft.email = sanitizedDraft.email.toLowerCase();
    sanitizedDraft.state = sanitizedDraft.state.toUpperCase();

    if (
        sanitizedDraft.state
        && !VALID_STATE_CODES.has(sanitizedDraft.state)
    ) return null;

    if (
        sanitizedDraft.paymentMethod
        && !VALID_PAYMENT_METHODS.has(sanitizedDraft.paymentMethod)
    ) return null;

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

    if (!checkoutForm) return null;

    const selectedPayment = checkoutForm.querySelector(
        'input[name="paymentMethod"]:checked'
    );

    return {
        fullName: getFieldValue("fullName"),
        email: getFieldValue("email").toLowerCase(),
        phone: getFieldValue("phone"),
        postalCode: getFieldValue("postalCode"),
        address: getFieldValue("address"),
        addressNumber: getFieldValue("addressNumber"),
        addressComplement: getFieldValue("addressComplement"),
        neighborhood: getFieldValue("neighborhood"),
        city: getFieldValue("city"),
        state: getFieldValue("state").toUpperCase(),
        paymentMethod: selectedPayment?.value ?? ""
    };

}

function applyFormState(formState) {

    if (!formState) return;

    checkoutState.personal.fullName = formState.fullName;
    checkoutState.personal.email = formState.email;
    checkoutState.personal.phone = formState.phone;

    checkoutState.delivery.postalCode = formState.postalCode;
    checkoutState.delivery.address = formState.address;
    checkoutState.delivery.addressNumber = formState.addressNumber;
    checkoutState.delivery.addressComplement = formState.addressComplement;
    checkoutState.delivery.neighborhood = formState.neighborhood;
    checkoutState.delivery.city = formState.city;
    checkoutState.delivery.state = formState.state;

    checkoutState.paymentMethod = formState.paymentMethod;

}

function applyValidatedStepState(step, formState) {

    if (!formState) return;

    if (step === 1) {

        checkoutState.personal.fullName = formState.fullName;
        checkoutState.personal.email = formState.email;
        checkoutState.personal.phone = formState.phone;

        checkoutState.delivery.postalCode = formState.postalCode;
        checkoutState.delivery.address = formState.address;
        checkoutState.delivery.addressNumber = formState.addressNumber;
        checkoutState.delivery.addressComplement = formState.addressComplement;
        checkoutState.delivery.neighborhood = formState.neighborhood;
        checkoutState.delivery.city = formState.city;
        checkoutState.delivery.state = formState.state;

    }

    if (step === 2) {
        checkoutState.paymentMethod = formState.paymentMethod;
    }

}

function applyDraftToCheckoutState(draft) {

    checkoutState.currentStep = draft.currentStep;

    applyFormState(draft);

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
   Accessible Validation
========================================================== */

function getFormField(fieldName) {

    const field = checkoutForm?.elements.namedItem(
        fieldName
    );

    return field instanceof HTMLElement
        ? field
        : null;

}

function getFieldErrorElement(field) {

    const describedBy = field
        .getAttribute("aria-describedby")
        ?.split(/\s+/)
        .filter(Boolean) ?? [];

    const errorId = describedBy.find(id => (
        id.endsWith("-error")
    ));

    return errorId
        ? document.getElementById(errorId)
        : null;

}

function showFieldError(field, message) {

    const errorElement = getFieldErrorElement(field);

    field.setAttribute(
        "aria-invalid",
        "true"
    );

    field.closest(".checkout-field")
        ?.classList.add("invalid");

    if (errorElement) {
        errorElement.textContent = message;
    }

}

function clearFieldError(field) {

    const errorElement = getFieldErrorElement(field);

    field.removeAttribute("aria-invalid");

    field.closest(".checkout-field")
        ?.classList.remove("invalid");

    if (errorElement) {
        errorElement.textContent = "";
    }

}

function getFieldValidationMessage(field) {

    const value = field.value.trim();

    switch (field.name) {

        case "fullName": {

            const nameParts = value
                .split(/\s+/)
                .filter(part => /\p{L}/u.test(part));

            return nameParts.length >= 2
                ? ""
                : "Informe seu nome completo.";

        }

        case "email":
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                ? ""
                : "Digite um e-mail válido.";

        case "phone": {

            const phoneDigits = value.replace(/\D/g, "");

            return phoneDigits.length === 10
                || phoneDigits.length === 11
                ? ""
                : "Informe um telefone com 10 ou 11 dígitos.";

        }

        case "postalCode":
            return value.replace(/\D/g, "").length === 8
                ? ""
                : "Digite um CEP com 8 dígitos.";

        case "address":
            return value
                ? ""
                : "Informe o endereço.";

        case "addressNumber":
            return /^(?:\d[\dA-Za-z\s/-]*|S\/N)$/i.test(value)
                ? ""
                : "Informe o número ou S/N.";

        case "addressComplement":
            return "";

        case "neighborhood":
            return value
                ? ""
                : "Informe o bairro.";

        case "city":
            return value
                ? ""
                : "Informe a cidade.";

        case "state":
            return VALID_STATE_CODES.has(value.toUpperCase())
                ? ""
                : "Selecione o estado.";

        default:
            return "";

    }

}

function validateField(field, showErrors = true) {

    const validationMessage = getFieldValidationMessage(
        field
    );

    const isValid = !validationMessage;

    if (!showErrors) return isValid;

    if (isValid) {

        clearFieldError(field);

    } else {

        showFieldError(
            field,
            validationMessage
        );

    }

    return isValid;

}

function validatePersonalAndDeliveryStep(showErrors = true) {

    let isStepValid = true;

    PERSONAL_AND_DELIVERY_FIELDS.forEach(fieldName => {

        const field = getFormField(fieldName);

        if (
            !field
            || !validateField(field, showErrors)
        ) {
            isStepValid = false;
        }

    });

    return isStepValid;

}

function clearPaymentError() {

    paymentFieldset?.removeAttribute(
        "aria-invalid"
    );

    paymentFieldset?.classList.remove(
        "invalid"
    );

    if (paymentError) {
        paymentError.textContent = "";
    }

}

function validatePaymentStep(showErrors = true) {

    const selectedPayment = checkoutForm?.querySelector(
        'input[name="paymentMethod"]:checked'
    );

    const isValid = VALID_PAYMENT_METHODS.has(
        selectedPayment?.value ?? ""
    );

    if (!showErrors) return isValid;

    if (isValid) {

        clearPaymentError();

    } else {

        paymentFieldset?.setAttribute(
            "aria-invalid",
            "true"
        );

        paymentFieldset?.classList.add(
            "invalid"
        );

        if (paymentError) {
            paymentError.textContent = "Escolha uma forma de pagamento.";
        }

    }

    return isValid;

}

function validateStep(step, showErrors = true) {

    if (step === 1) {
        return validatePersonalAndDeliveryStep(showErrors);
    }

    if (step === 2) {
        return validatePaymentStep(showErrors);
    }

    return true;

}

function clearStepErrors(step) {

    if (step === 1) {

        PERSONAL_AND_DELIVERY_FIELDS.forEach(fieldName => {

            const field = getFormField(fieldName);

            if (field) clearFieldError(field);

        });

    }

    if (step === 2) {
        clearPaymentError();
    }

}

function focusFirstInvalidField(step) {

    if (step === 2 && paymentFieldset?.matches('[aria-invalid="true"]')) {

        paymentFieldset
            .querySelector('input[name="paymentMethod"]')
            ?.focus();

        return;

    }

    const currentPanel = checkoutSteps.find(stepPanel => (
        Number(stepPanel.dataset.checkoutStep) === step
    ));

    currentPanel
        ?.querySelector('[aria-invalid="true"]')
        ?.focus();

}

function announceStepErrors(step) {

    if (!liveRegion) return;

    liveRegion.textContent = (
        `A etapa ${STEP_NAMES[step - 1]} possui erros. Revise os campos indicados.`
    );

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

    const currentStep = checkoutState.currentStep;

    if (!validateStep(currentStep)) {

        announceStepErrors(currentStep);
        focusFirstInvalidField(currentStep);

        return;

    }

    if (
        currentStep === 2
        && !validatePersonalAndDeliveryStep(false)
    ) {

        goToStep(1);
        validatePersonalAndDeliveryStep();
        announceStepErrors(1);
        focusFirstInvalidField(1);

        return;

    }

    const formState = captureFormState();

    applyValidatedStepState(
        currentStep,
        formState
    );
    clearStepErrors(currentStep);

    goToStep(
        currentStep + 1
    );

    saveCheckoutDraft();

}

function handlePreviousStep() {

    const currentStep = checkoutState.currentStep;
    const formState = captureFormState();

    if (validateStep(currentStep, false)) {
        applyValidatedStepState(
            currentStep,
            formState
        );
    }

    goToStep(
        currentStep - 1
    );

    saveCheckoutDraft();

}

function handleCheckoutExit() {

    clearCheckoutDraft();

}

function registerCheckoutEvents() {

    PERSONAL_AND_DELIVERY_FIELDS.forEach(fieldName => {

        const field = getFormField(fieldName);

        if (!field) return;

        const validationEvent = field.tagName === "SELECT"
            ? "change"
            : "blur";

        field.addEventListener(
            validationEvent,
            () => validateField(field)
        );

    });

    checkoutForm
        .querySelectorAll('input[name="paymentMethod"]')
        .forEach(option => {

            option.addEventListener(
                "change",
                () => validatePaymentStep()
            );

        });

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

function validateRestoredDraft(requestedStep) {

    if (!validatePersonalAndDeliveryStep(false)) {
        return {
            step: 1,
            isValid: false
        };
    }

    if (
        requestedStep >= 3
        && !validatePaymentStep(false)
    ) {
        return {
            step: 2,
            isValid: false
        };
    }

    return {
        step: requestedStep,
        isValid: true
    };

}

function initializeCheckout() {

    const hasEssentialElements = (
        checkoutForm
        && checkoutSteps.length === TOTAL_STEPS
        && progressItems.length === TOTAL_STEPS
        && liveRegion
        && reviewSubmit
        && paymentFieldset
        && paymentError
    );

    if (!hasEssentialElements) return;

    if (redirectToCartIfEmpty()) return;

    const checkoutDraft = loadCheckoutDraft();

    if (checkoutDraft) {

        applyDraftToCheckoutState(
            checkoutDraft
        );

        restoreFormState();

        const restoredDraftStatus = validateRestoredDraft(
            checkoutDraft.currentStep
        );

        if (!restoredDraftStatus.isValid) {
            clearCheckoutDraft();
        }

        checkoutState.currentStep = restoredDraftStatus.step;

    }

    renderCurrentStep();

    registerCheckoutEvents();

}

initializeCheckout();

})();
