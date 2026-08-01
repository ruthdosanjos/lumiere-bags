(function initializeCheckoutScope() {

/* ==========================================================
   Checkout Configuration
========================================================== */

const CHECKOUT_DRAFT_KEY = "lumiereCheckoutDraft";

const TOTAL_STEPS = 4;

const LAST_NAVIGABLE_STEP = TOTAL_STEPS - 1;

const PROCESSING_FEEDBACK_DELAY = 250;

const CONFIRM_BUTTON_TEXT = "Confirmar pedido simulado";

const SUBMITTING_BUTTON_TEXT = "Confirmando...";

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

const PAYMENT_DETAILS = {
    pix: {
        label: "Pix",
        description: "Confirmação simulada e instantânea. Nenhuma chave ou QR Code real será gerado."
    },
    card: {
        label: "Cartão",
        description: "Modalidade apenas demonstrativa. Nenhum dado financeiro será solicitado."
    },
    boleto: {
        label: "Boleto",
        description: "Confirmação fictícia. Nenhum boleto real será emitido."
    }
};

const SELECTORS = {
    form: "#checkout-form",
    steps: "[data-checkout-step]",
    progressItems: "[data-checkout-progress-step]",
    progressNumber: ".checkout-progress-number",
    progressState: ".checkout-progress-state",
    liveRegion: ".checkout-live-region",
    reviewSubmit: "[data-review-submit]",
    confirmButton: ".checkout-confirm-button",
    confirmationOrderNumber: "[data-confirmation-order-number]",
    confirmationTotal: "[data-confirmation-total]",
    confirmationPayment: "[data-confirmation-payment]",
    paymentFieldset: ".checkout-payment-fieldset",
    paymentError: "#checkout-payment-error",
    paymentDetails: "[data-payment-details]",
    paymentDetailsTitle: "[data-payment-details-title]",
    paymentDetailsDescription: "[data-payment-details-description]",
    orderItems: "[data-order-items]",
    orderUnavailable: "[data-order-unavailable]",
    orderSubtotal: "[data-order-subtotal]",
    orderShipping: "[data-order-shipping]",
    orderTotal: "[data-order-total]",
    reviewPersonal: "[data-review-personal]",
    reviewAddress: "[data-review-address]",
    reviewPayment: "[data-review-payment]",
    reviewOrder: "[data-review-order]",
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

let confirmedOrderSnapshot = null;

let orderNumberSequence = 0;

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

const confirmButton = document.querySelector(
    SELECTORS.confirmButton
);

const confirmationOrderNumber = document.querySelector(
    SELECTORS.confirmationOrderNumber
);

const confirmationTotal = document.querySelector(
    SELECTORS.confirmationTotal
);

const confirmationPayment = document.querySelector(
    SELECTORS.confirmationPayment
);

const paymentFieldset = document.querySelector(
    SELECTORS.paymentFieldset
);

const paymentError = document.querySelector(
    SELECTORS.paymentError
);

const paymentDetails = document.querySelector(
    SELECTORS.paymentDetails
);

const paymentDetailsTitle = document.querySelector(
    SELECTORS.paymentDetailsTitle
);

const paymentDetailsDescription = document.querySelector(
    SELECTORS.paymentDetailsDescription
);

const orderItems = document.querySelector(
    SELECTORS.orderItems
);

const orderUnavailable = document.querySelector(
    SELECTORS.orderUnavailable
);

const orderSubtotal = document.querySelector(
    SELECTORS.orderSubtotal
);

const orderShipping = document.querySelector(
    SELECTORS.orderShipping
);

const orderTotal = document.querySelector(
    SELECTORS.orderTotal
);

const reviewPersonal = document.querySelector(
    SELECTORS.reviewPersonal
);

const reviewAddress = document.querySelector(
    SELECTORS.reviewAddress
);

const reviewPayment = document.querySelector(
    SELECTORS.reviewPayment
);

const reviewOrder = document.querySelector(
    SELECTORS.reviewOrder
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
   Order Summary
========================================================== */

function hasCentralOrderHelpers() {

    return (
        typeof getCartProducts === "function"
        && typeof getCartSubtotal === "function"
        && typeof getShippingCost === "function"
        && typeof getOrderTotal === "function"
        && typeof formatPrice === "function"
    );

}

function getValidCheckoutItems() {

    if (!hasCentralOrderHelpers()) return [];

    return getCartProducts();

}

function getCheckoutOrderData() {

    const items = getValidCheckoutItems();

    if (!items.length) return null;

    const subtotal = getCartSubtotal(items);
    const shipping = getShippingCost(subtotal);
    const total = getOrderTotal(
        subtotal,
        shipping
    );

    return {
        items,
        subtotal,
        shipping,
        total
    };

}

function getUnavailableCartItemsCount(validItems) {

    if (!Array.isArray(window.cart)) return 0;

    return Math.max(
        0,
        window.cart.length - validItems.length
    );

}

function renderOrderItems(items) {

    const itemsFragment = document.createDocumentFragment();

    items.forEach(item => {

        const itemElement = document.createElement("li");
        const itemImage = document.createElement("img");
        const itemDetails = document.createElement("div");
        const itemName = document.createElement("p");
        const itemCollection = document.createElement("p");
        const itemQuantity = document.createElement("p");
        const itemPrice = document.createElement("p");

        itemElement.className = "checkout-order-item";

        itemImage.className = "checkout-order-item-image";
        itemImage.src = item.image;
        itemImage.alt = `Bolsa ${item.name} da coleção ${item.collection}`;
        itemImage.loading = "lazy";

        itemDetails.className = "checkout-order-item-details";

        itemName.className = "checkout-order-item-name";
        itemName.textContent = item.name;

        itemCollection.className = "checkout-order-item-collection";
        itemCollection.textContent = `Coleção ${item.collection}`;

        itemQuantity.className = "checkout-order-item-quantity";
        itemQuantity.textContent = `Quantidade: ${item.quantity}`;

        itemPrice.className = "checkout-order-item-price";
        itemPrice.textContent = `Preço unitário: ${formatPrice(item.price)}`;

        itemDetails.append(
            itemName,
            itemCollection,
            itemQuantity,
            itemPrice
        );

        itemElement.append(
            itemImage,
            itemDetails
        );

        itemsFragment.append(itemElement);

    });

    orderItems.replaceChildren(itemsFragment);

}

function renderOrderTotals(orderData) {

    orderSubtotal.textContent = formatPrice(
        orderData.subtotal
    );

    orderShipping.textContent = formatPrice(
        orderData.shipping
    );

    orderTotal.textContent = formatPrice(
        orderData.total
    );

}

function renderUnavailableItemsNotice(validItems) {

    const unavailableCount = getUnavailableCartItemsCount(
        validItems
    );

    orderUnavailable.hidden = unavailableCount === 0;

    if (!unavailableCount) {

        orderUnavailable.textContent = "";

        return;

    }

    orderUnavailable.textContent = unavailableCount === 1
        ? "Um item indisponível foi ignorado neste resumo."
        : `${unavailableCount} itens indisponíveis foram ignorados neste resumo.`;

}

function renderOrderSummary() {

    const orderData = getCheckoutOrderData();

    if (!orderData) {

        redirectToCartIfEmpty();

        return null;

    }

    renderOrderItems(orderData.items);
    renderOrderTotals(orderData);
    renderUnavailableItemsNotice(orderData.items);

    return orderData;

}

function createReviewDetails(entries) {

    const detailsList = document.createElement("dl");

    detailsList.className = "checkout-review-details";

    entries.forEach(([label, value]) => {

        const term = document.createElement("dt");
        const description = document.createElement("dd");

        term.textContent = label;
        description.textContent = value;

        detailsList.append(
            term,
            description
        );

    });

    return detailsList;

}

function renderPaymentDetails(paymentMethod = checkoutState.paymentMethod) {

    const selectedPayment = PAYMENT_DETAILS[paymentMethod];

    paymentDetails.hidden = !selectedPayment;

    if (!selectedPayment) {

        paymentDetailsTitle.textContent = "";
        paymentDetailsDescription.textContent = "";

        return;

    }

    paymentDetailsTitle.textContent = selectedPayment.label;
    paymentDetailsDescription.textContent = selectedPayment.description;

}

function renderReviewData(orderData = getCheckoutOrderData()) {

    if (!orderData) {

        redirectToCartIfEmpty();

        return false;

    }

    const payment = PAYMENT_DETAILS[checkoutState.paymentMethod];
    const addressComplement = checkoutState.delivery.addressComplement
        ? ` — ${checkoutState.delivery.addressComplement}`
        : "";

    reviewPersonal.replaceChildren(
        createReviewDetails([
            ["Nome", checkoutState.personal.fullName],
            ["E-mail", checkoutState.personal.email],
            ["Telefone", checkoutState.personal.phone]
        ])
    );

    reviewAddress.replaceChildren(
        createReviewDetails([
            ["Endereço", `${checkoutState.delivery.address}, ${checkoutState.delivery.addressNumber}${addressComplement}`],
            ["Bairro", checkoutState.delivery.neighborhood],
            ["Cidade e estado", `${checkoutState.delivery.city}/${checkoutState.delivery.state}`],
            ["CEP", checkoutState.delivery.postalCode]
        ])
    );

    reviewPayment.replaceChildren(
        createReviewDetails([
            ["Modalidade", payment?.label ?? "Não selecionada"],
            ["Simulação", payment?.description ?? "Escolha uma modalidade na etapa anterior."]
        ])
    );

    const reviewItems = document.createElement("ul");

    reviewItems.className = "checkout-review-order-items";

    orderData.items.forEach(item => {

        const reviewItem = document.createElement("li");

        reviewItem.textContent = `${item.quantity} × ${item.name} — ${formatPrice(item.price)} por unidade`;

        reviewItems.append(reviewItem);

    });

    reviewOrder.replaceChildren(
        reviewItems,
        createReviewDetails([
            ["Subtotal", formatPrice(orderData.subtotal)],
            ["Frete", formatPrice(orderData.shipping)],
            ["Total", formatPrice(orderData.total)]
        ])
    );

    return true;

}

/* ==========================================================
   Simulated Order Confirmation
========================================================== */

function isValidOrderData(orderData) {

    return (
        orderData
        && Array.isArray(orderData.items)
        && orderData.items.length > 0
        && orderData.items.every(item => (
            Number.isInteger(item.quantity)
            && item.quantity > 0
            && Number.isFinite(item.price)
            && item.price >= 0
        ))
        && Number.isFinite(orderData.subtotal)
        && orderData.subtotal >= 0
        && Number.isFinite(orderData.shipping)
        && orderData.shipping >= 0
        && Number.isFinite(orderData.total)
        && orderData.total >= 0
    );

}

function canSubmitCheckout(orderData = getCheckoutOrderData()) {

    return (
        checkoutState.currentStep === 3
        && !checkoutState.isSubmitting
        && validatePersonalAndDeliveryStep(false)
        && validatePaymentStep(false)
        && isValidOrderData(orderData)
        && typeof clearCart === "function"
    );

}

function updateCheckoutSubmitState() {

    if (!confirmButton) return;

    confirmButton.disabled = !canSubmitCheckout();

    if (!checkoutState.isSubmitting) {
        confirmButton.textContent = CONFIRM_BUTTON_TEXT;
    }

}

function setSubmittingState(isSubmitting) {

    checkoutState.isSubmitting = isSubmitting;

    if (isSubmitting) {

        reviewSubmit.setAttribute(
            "aria-busy",
            "true"
        );

        confirmButton.disabled = true;
        confirmButton.textContent = SUBMITTING_BUTTON_TEXT;

        return;

    }

    reviewSubmit.removeAttribute(
        "aria-busy"
    );

    updateCheckoutSubmitState();

}

function generateOrderNumber() {

    orderNumberSequence = (
        orderNumberSequence + 1
    ) % 1296;

    const currentYear = new Date().getFullYear();
    const timestampPart = Date.now()
        .toString(36)
        .slice(-4)
        .padStart(4, "0")
        .toUpperCase();
    const sequencePart = orderNumberSequence
        .toString(36)
        .padStart(2, "0")
        .toUpperCase();

    return `LUM-${currentYear}-${timestampPart}${sequencePart}`;

}

function createOrderSnapshot(orderData, orderNumber) {

    const delivery = checkoutState.delivery;
    const complement = delivery.addressComplement
        ? ` — ${delivery.addressComplement}`
        : "";

    return {
        orderNumber,
        items: orderData.items.map(item => ({
            productId: item.id,
            name: item.name,
            collection: item.collection,
            image: item.image,
            quantity: item.quantity,
            unitPrice: item.price
        })),
        subtotal: orderData.subtotal,
        shipping: orderData.shipping,
        total: orderData.total,
        customer: {
            fullName: checkoutState.personal.fullName,
            email: checkoutState.personal.email,
            phone: checkoutState.personal.phone
        },
        delivery: {
            postalCode: delivery.postalCode,
            address: delivery.address,
            addressNumber: delivery.addressNumber,
            addressComplement: delivery.addressComplement,
            neighborhood: delivery.neighborhood,
            city: delivery.city,
            state: delivery.state,
            formattedAddress: `${delivery.address}, ${delivery.addressNumber}${complement} — ${delivery.neighborhood}, ${delivery.city}/${delivery.state} — CEP ${delivery.postalCode}`
        },
        paymentMethod: checkoutState.paymentMethod
    };

}

function resetOperationalCheckoutState() {

    checkoutState.currentStep = 4;

    checkoutState.personal.fullName = "";
    checkoutState.personal.email = "";
    checkoutState.personal.phone = "";

    checkoutState.delivery.postalCode = "";
    checkoutState.delivery.address = "";
    checkoutState.delivery.addressNumber = "";
    checkoutState.delivery.addressComplement = "";
    checkoutState.delivery.neighborhood = "";
    checkoutState.delivery.city = "";
    checkoutState.delivery.state = "";

    checkoutState.paymentMethod = "";

    checkoutForm.reset();

    reviewPersonal.replaceChildren();
    reviewAddress.replaceChildren();
    reviewPayment.replaceChildren();
    reviewOrder.replaceChildren();
    orderItems.replaceChildren();

    orderUnavailable.hidden = true;
    orderUnavailable.textContent = "";

    clearStepErrors(1);
    clearStepErrors(2);
    renderPaymentDetails();
    setSubmittingState(false);

}

function renderConfirmation(orderSnapshot) {

    const payment = PAYMENT_DETAILS[
        orderSnapshot.paymentMethod
    ];

    confirmationOrderNumber.textContent = orderSnapshot.orderNumber;
    confirmationTotal.textContent = formatPrice(
        orderSnapshot.total
    );
    confirmationPayment.textContent = payment.label;

    checkoutForm.hidden = true;

    renderCurrentStep(
        true,
        false
    );

    if (liveRegion) {

        liveRegion.textContent = (
            `Pedido simulado confirmado. Número ${orderSnapshot.orderNumber}. Nenhuma cobrança foi realizada.`
        );

    }

}

function completeSimulatedOrder(orderSnapshot) {

    clearCart();

    confirmedOrderSnapshot = orderSnapshot;

    clearCheckoutDraft();
    resetOperationalCheckoutState();
    renderConfirmation(confirmedOrderSnapshot);

}

function redirectToFirstInvalidStep() {

    const isPersonalAndDeliveryValid = validatePersonalAndDeliveryStep();
    const isPaymentValid = validatePaymentStep();

    if (!isPersonalAndDeliveryValid) {

        goToStep(1);
        announceStepErrors(1);
        focusFirstInvalidField(1);

        return true;

    }

    if (!isPaymentValid) {

        goToStep(2);
        announceStepErrors(2);
        focusFirstInvalidField(2);

        return true;

    }

    return false;

}

function validateCheckoutForSubmission() {

    if (redirectToFirstInvalidStep()) return null;

    const orderData = getCheckoutOrderData();

    if (!orderData) {

        redirectToCartIfEmpty();

        return null;

    }

    if (
        !isValidOrderData(orderData)
        || typeof clearCart !== "function"
    ) {

        if (liveRegion) {
            liveRegion.textContent = "Não foi possível validar o pedido. Revise o carrinho antes de tentar novamente.";
        }

        return null;

    }

    return orderData;

}

async function handleCheckoutSubmit(event) {

    event.preventDefault();

    if (
        checkoutState.currentStep !== 3
        || checkoutState.isSubmitting
    ) return;

    const initialOrderData = validateCheckoutForSubmission();

    if (!initialOrderData) {

        updateCheckoutSubmitState();

        return;

    }

    setSubmittingState(true);

    let isCompleted = false;

    try {

        await new Promise(resolve => {

            window.setTimeout(
                resolve,
                PROCESSING_FEEDBACK_DELAY
            );

        });

        const finalOrderData = validateCheckoutForSubmission();

        if (!finalOrderData) return;

        const orderNumber = generateOrderNumber();
        const orderSnapshot = createOrderSnapshot(
            finalOrderData,
            orderNumber
        );

        completeSimulatedOrder(orderSnapshot);

        isCompleted = true;

    } catch (error) {

        if (liveRegion) {
            liveRegion.textContent = "Não foi possível concluir a simulação. Tente novamente.";
        }

    } finally {

        if (!isCompleted) {
            setSubmittingState(false);
        }

    }

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

function renderCurrentStep(
    focusHeading = false,
    announceStepChange = true
) {

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
    updateCheckoutSubmitState();

    const stepName = STEP_NAMES[
        checkoutState.currentStep - 1
    ];

    if (liveRegion && announceStepChange) {

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
    const orderData = renderOrderSummary();

    if (!orderData) return;

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

    if (
        currentStep === 2
        && !renderReviewData(orderData)
    ) return;

    goToStep(
        currentStep + 1
    );

    saveCheckoutDraft();

}

function handlePreviousStep() {

    const currentStep = checkoutState.currentStep;
    const formState = captureFormState();

    if (!renderOrderSummary()) return;

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

function handlePaymentChange(event) {

    const paymentMethod = event.target.value;

    if (!VALID_PAYMENT_METHODS.has(paymentMethod)) return;

    checkoutState.paymentMethod = paymentMethod;

    validatePaymentStep();
    renderPaymentDetails(paymentMethod);

    const orderData = renderOrderSummary();

    if (!orderData) return;

    renderReviewData(orderData);

    if (liveRegion) {

        liveRegion.textContent = (
            `Modalidade ${PAYMENT_DETAILS[paymentMethod].label} selecionada.`
        );

    }

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
                handlePaymentChange
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
        handleCheckoutSubmit
    );

}

/* ==========================================================
   Initialization
========================================================== */

function redirectToCartIfEmpty() {

    const hasValidProducts = getValidCheckoutItems().length > 0;

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
        && confirmButton
        && confirmationOrderNumber
        && confirmationTotal
        && confirmationPayment
        && paymentFieldset
        && paymentError
        && paymentDetails
        && paymentDetailsTitle
        && paymentDetailsDescription
        && orderItems
        && orderUnavailable
        && orderSubtotal
        && orderShipping
        && orderTotal
        && reviewPersonal
        && reviewAddress
        && reviewPayment
        && reviewOrder
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

    const orderData = renderOrderSummary();

    if (!orderData) return;

    renderPaymentDetails();

    if (checkoutState.currentStep === 3) {
        renderReviewData(orderData);
    }

    renderCurrentStep();

    registerCheckoutEvents();

}

initializeCheckout();

})();
