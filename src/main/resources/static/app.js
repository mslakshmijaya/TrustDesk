const API_BASE = "";

const AUTH_TOKEN = "trustdesk-demo-token";


// ==========================================================
// PAGE NAVIGATION
// ==========================================================

function showPage(pageId, menuButton = null) {

    // ------------------------------------------------------
    // Hide all pages
    // ------------------------------------------------------

    document.querySelectorAll(".page").forEach(page => {
        page.classList.add("hidden");
    });


    // ------------------------------------------------------
    // Show selected page
    // ------------------------------------------------------

    const page = document.getElementById(pageId);

    if (page) {
        page.classList.remove("hidden");
    }


    // ------------------------------------------------------
    // Remove active state from all menu items
    // ------------------------------------------------------

    document.querySelectorAll(".menu-item").forEach(button => {
        button.classList.remove("active");
    });


    // ------------------------------------------------------
    // Set selected menu item active
    // ------------------------------------------------------

    if (menuButton) {

        menuButton.classList.add("active");

    } else {

        document.querySelectorAll(".menu-item").forEach(button => {

            const onclickValue =
                button.getAttribute("onclick");

            if (
                onclickValue &&
                onclickValue.includes(pageId)
            ) {
                button.classList.add("active");
            }
        });
    }


    // ------------------------------------------------------
    // Page titles
    // ------------------------------------------------------

    const titles = {

        dashboardPage: {
            title: "Dashboard",
            subtitle: "TrustDesk support operations"
        },

        ticketsPage: {
            title: "All Tickets",
            subtitle: "View and manage customer support tickets"
        },
        createTicketPage: {
            title: "Create New Ticket",
            subtitle: "Create a customer support ticket"
        },
        customersPage: {
            title: "Customers",
            subtitle: "Customer information and support history"
        },

        ordersPage: {
            title: "Orders",
            subtitle: "Customer order information"
        },

        triagePage: {
            title: "AI Triage",
            subtitle: "AI-powered ticket analysis"
        },

        knowledgePage: {
            title: "Knowledge Base",
            subtitle: "Grounded support policies and documents"
        },

        actionsPage: {
            title: "Actions / Approvals",
            subtitle: "Human approval for customer-impacting actions"
        }



    };


    const pageInfo = titles[pageId];


    if (pageInfo) {

        const pageTitle =
            document.getElementById("pageTitle");

        const pageSubtitle =
            document.getElementById("pageSubtitle");


        if (pageTitle) {
            pageTitle.textContent = pageInfo.title;
        }


        if (pageSubtitle) {
            pageSubtitle.textContent = pageInfo.subtitle;
        }
    }


    // ------------------------------------------------------
    // Automatically load tickets
    // ------------------------------------------------------

    if (pageId === "ticketsPage") {

        loadAllTickets();

    }

    if (pageId === "customersPage") {
        if (typeof loadCustomers === "function") {
            loadCustomers();
        }
    }

    if (pageId === "ordersPage") {
        if (typeof loadOrders === "function") {
            loadOrders();
        }
    }

    if (pageId === "actionsPage") {
        if (typeof loadTools === "function") {
            loadTools();
        }
    }
}


// ==========================================================
// HTTP HEADERS
// ==========================================================

function getHeaders() {

    return {
        "Authorization": "Bearer " + AUTH_TOKEN,
        "Content-Type": "application/json"
    };

}
function showCreateTicketForm() {

    showPage("createTicketPage");

    loadCustomersForTicketForm();
}

// ==========================================================
// LOADING
// ==========================================================
document
    .getElementById("newCustomerId")
    .addEventListener("change", async function () {

        const customerId = this.value;

        const orderSelect =
            document.getElementById("newOrderId");

        orderSelect.innerHTML =
            `<option value="">No Order</option>`;

        if (!customerId) {
            return;
        }

        try {

            const response = await fetch(
                `${API_BASE}/api/orders`,
                {
                    method: "GET",
                    headers: getHeaders()
                }
            );

            if (!response.ok) {
                throw new Error("Failed to load orders");
            }

            const orders = await response.json();

            const customerOrders =
                orders.filter(
                    order =>
                        order.customer_id === customerId
                );

            customerOrders.forEach(order => {

                const option =
                    document.createElement("option");

                option.value = order.order_id;

                option.textContent =
                    `${order.order_id} - ${order.status} - ${order.total} ${order.currency}`;

                orderSelect.appendChild(option);
            });

        } catch (error) {

            console.error(
                "Unable to load customer orders:",
                error
            );
        }
    });
function showLoading(show) {

    const loading =
        document.getElementById("loading");


    if (!loading) {
        return;
    }


    if (show) {

        loading.classList.remove("hidden");

    } else {

        loading.classList.add("hidden");

    }
}


// ==========================================================
// ERROR
// ==========================================================

function showError(message) {

    const error =
        document.getElementById("error");


    if (!error) {
        return;
    }


    error.textContent = message;

    error.classList.remove("hidden");

}


// ==========================================================
// CLEAR ERROR
// ==========================================================

function clearError() {

    const error =
        document.getElementById("error");


    if (error) {
        error.classList.add("hidden");
    }

}


// ==========================================================
// SHOW ELEMENT
// ==========================================================

function show(id) {

    const element =
        document.getElementById(id);


    if (element) {

        element.classList.remove("hidden");

    }

}


// ==========================================================
// HIDE ELEMENT
// ==========================================================

function hide(id) {

    const element =
        document.getElementById(id);


    if (element) {

        element.classList.add("hidden");

    }

}


// ==========================================================
// LOAD ALL TICKETS
// ==========================================================

async function loadAllTickets() {

    clearError();

    showLoading(true);


    try {

        const response = await fetch(
            `${API_BASE}/api/tickets`,
            {
                method: "GET",
                headers: getHeaders()
            }
        );


        if (!response.ok) {

            throw new Error(
                "Could not load tickets. HTTP " +
                response.status
            );

        }


        const tickets =
            await response.json();


        displayAllTickets(tickets);


    } catch (error) {

        console.error("Load tickets error:", error);

        showError(error.message);


    } finally {

        showLoading(false);

    }

}
async function createTicket(event) {

    event.preventDefault();

    const message =
        document.getElementById("createTicketMessage");

    message.innerHTML = "";

    const ticket = {
        customer_id:
            document.getElementById("newCustomerId").value,

        order_id:
            document.getElementById("newOrderId").value || null,

        channel:
            document.getElementById("newChannel").value,

        subject:
            document.getElementById("newSubject").value.trim(),

        body:
            document.getElementById("newBody").value.trim(),

        status: "open"
    };

    try {

        const response = await fetch(
            `${API_BASE}/api/tickets`,
            {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify(ticket)
            }
        );

        if (!response.ok) {

            const errorText = await response.text();

            throw new Error(
                "Failed to create ticket. HTTP " +
                response.status +
                " - " +
                errorText
            );
        }

        const createdTicket = await response.json();

        message.innerHTML = `
            <div class="success-message">
                Ticket
                <strong>${createdTicket.ticket_id}</strong>
                created successfully.
            </div>
        `;

        document
            .getElementById("createTicketForm")
            .reset();

        setTimeout(() => {

            showPage("ticketsPage");

            if (typeof loadAllTickets === "function") {
                loadAllTickets();
            }

        }, 1000);

    } catch (error) {

        message.innerHTML = `
            <div class="error-message">
                ${error.message}
            </div>
        `;
    }
}
async function loadCustomersForTicketForm() {

    const customerSelect =
        document.getElementById("newCustomerId");

    customerSelect.innerHTML =
        `<option value="">Select Customer</option>`;

    try {

        const response = await fetch(
            `${API_BASE}/api/customers`,
            {
                method: "GET",
                headers: getHeaders()
            }
        );

        if (!response.ok) {
            throw new Error("Failed to load customers");
        }

        const customers = await response.json();

        customers.forEach(customer => {

            const option =
                document.createElement("option");

            option.value = customer.customer_id;

            option.textContent =
                `${customer.customer_id} - ${customer.name}`;

            customerSelect.appendChild(option);
        });

    } catch (error) {

        console.error(
            "Unable to load customers:",
            error
        );
    }
}
async function loadCustomers() {

    const container = document.getElementById("customersList");

    container.innerHTML = "<p>Loading customers...</p>";

    try {

        const response = await fetch(
            `${API_BASE}/api/customers`,
            {
                method: "GET",
                headers: getHeaders()
            }
        );

        if (!response.ok) {
            throw new Error(
                "Failed to load customers. HTTP " +
                response.status
            );
        }

        const customers = await response.json();

        if (!customers.length) {
            container.innerHTML =
                "<p class='empty-message'>No customers found.</p>";
            return;
        }

        container.innerHTML = "";

        customers.forEach(customer => {

            const card = document.createElement("div");

            card.className = "data-card";

            card.innerHTML = `
                <h3>${customer.name || "-"}</h3>

                <p>
                    <strong>Customer ID:</strong>
                    ${customer.customer_id || customer.customerId || "-"}
                </p>

                <p>
                    <strong>Email:</strong>
                    ${customer.email || "-"}
                </p>

                <p>
                    <strong>Tier:</strong>
                    ${customer.tier || "-"}
                </p>

                <p>
                    <strong>Country:</strong>
                    ${customer.country || "-"}
                </p>

                <p>
                    <strong>Verified:</strong>
                    ${customer.verified ? "Yes" : "No"}
                </p>

                <p>
                    <strong>Created:</strong>
                    ${customer.createdAt || "-"}
                </p>
            `;

            container.appendChild(card);
        });

    } catch (error) {

        container.innerHTML =
            `<p class="error-message">${error.message}</p>`;
    }
}

async function loadOrders() {

    const container = document.getElementById("ordersList");

    container.innerHTML = "<p>Loading orders...</p>";

    try {

        const response = await fetch(
            `${API_BASE}/api/orders`,
            {
                method: "GET",
                headers: getHeaders()
            }
        );

        if (!response.ok) {
            throw new Error(
                "Failed to load orders. HTTP " +
                response.status
            );
        }

        const orders = await response.json();

        if (!orders.length) {
            container.innerHTML =
                "<p class='empty-message'>No orders found.</p>";
            return;
        }

        container.innerHTML = "";

        orders.forEach(order => {

            const card = document.createElement("div");

            card.className = "data-card";

            const items = order.items || [];

            let itemsHtml = "";

            if (items.length > 0) {

                itemsHtml = `
                    <div class="order-items">
                        <strong>Order Items</strong>
                        <ul>
                            ${items.map(item => `
                                <li>
                                    <strong>${item.name || "-"}</strong>
                                    |
                                    SKU: ${item.sku || "-"}
                                    |
                                    Quantity: ${item.quantity || 0}
                                    |
                                    Category: ${item.category || "-"}
                                    |
                                    Final Sale:
                                    ${item.final_sale ? "Yes" : "No"}
                                </li>
                            `).join("")}
                        </ul>
                    </div>
                `;

            } else {

                itemsHtml =
                    "<p>No order items available.</p>";
            }

            card.innerHTML = `
                <h3>
                    Order ${order.order_id || "-"}
                </h3>

                <p>
                    <strong>Customer ID:</strong>
                    ${order.customer_id || "-"}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${order.status || "-"}
                </p>

                <p>
                    <strong>Total:</strong>
                    ${order.total || "-"}
                    ${order.currency || ""}
                </p>

                <p>
                    <strong>Payment:</strong>
                    ${order.payment_status || "-"}
                </p>

                <p>
                    <strong>Placed:</strong>
                    ${order.placed_at || "-"}
                </p>

                <p>
                    <strong>Delivered:</strong>
                    ${order.delivered_at || "-"}
                </p>

                <p>
                    <strong>Return Eligible Until:</strong>
                    ${order.eligible_return_until || "-"}
                </p>

                <p>
                    <strong>Tracking:</strong>
                    ${order.tracking_number || "-"}
                </p>

                ${itemsHtml}
            `;

            container.appendChild(card);
        });

    } catch (error) {

        container.innerHTML =
            `<p class="error-message">${error.message}</p>`;
    }
}


async function loadOrders() {

    const container = document.getElementById("ordersList");

    container.innerHTML = "<p>Loading orders...</p>";

    try {

        const response = await fetch(
            `${API_BASE}/api/orders`,
            {
                method: "GET",
                headers: getHeaders()
            }
        );

        if (!response.ok) {
            throw new Error(
                "Failed to load orders. HTTP " +
                response.status
            );
        }

        const orders = await response.json();

        if (!orders.length) {
            container.innerHTML =
                "<p class='empty-message'>No orders found.</p>";
            return;
        }

        container.innerHTML = "";

        orders.forEach(order => {

            const card = document.createElement("div");

            card.className = "data-card";

            const items = order.items || [];

            let itemsHtml = "";

            if (items.length > 0) {

                itemsHtml = `
                    <div class="order-items">
                        <strong>Order Items</strong>
                        <ul>
                            ${items.map(item => `
                                <li>
                                    <strong>${item.name || "-"}</strong>
                                    |
                                    SKU: ${item.sku || "-"}
                                    |
                                    Quantity: ${item.quantity || 0}
                                    |
                                    Category: ${item.category || "-"}
                                    |
                                    Final Sale:
                                    ${item.final_sale ? "Yes" : "No"}
                                </li>
                            `).join("")}
                        </ul>
                    </div>
                `;

            } else {

                itemsHtml =
                    "<p>No order items available.</p>";
            }

            card.innerHTML = `
                <h3>
                    Order ${order.order_id || "-"}
                </h3>

                <p>
                    <strong>Customer ID:</strong>
                    ${order.customer_id || "-"}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${order.status || "-"}
                </p>

                <p>
                    <strong>Total:</strong>
                    ${order.total || "-"}
                    ${order.currency || ""}
                </p>

                <p>
                    <strong>Payment:</strong>
                    ${order.payment_status || "-"}
                </p>

                <p>
                    <strong>Placed:</strong>
                    ${order.placed_at || "-"}
                </p>

                <p>
                    <strong>Delivered:</strong>
                    ${order.delivered_at || "-"}
                </p>

                <p>
                    <strong>Return Eligible Until:</strong>
                    ${order.eligible_return_until || "-"}
                </p>

                <p>
                    <strong>Tracking:</strong>
                    ${order.tracking_number || "-"}
                </p>

                ${itemsHtml}
            `;

            container.appendChild(card);
        });

    } catch (error) {

        container.innerHTML =
            `<p class="error-message">${error.message}</p>`;
    }
}

// ==========================================================
// DISPLAY ALL TICKETS
// ==========================================================

function displayAllTickets(tickets) {

    const container =
        document.getElementById("ticketsList");


    if (!container) {

        console.error(
            "Element #ticketsList was not found in index.html"
        );

        return;

    }


    // ------------------------------------------------------
    // Search box
    // ------------------------------------------------------

    const searchInput =
        document.getElementById("ticketSearch");


    const searchText =
        searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";


    // ------------------------------------------------------
    // Filter tickets
    // ------------------------------------------------------

    let filteredTickets =
        Array.isArray(tickets)
            ? tickets
            : [];


    if (searchText) {

        filteredTickets =
            filteredTickets.filter(ticket => {

                const ticketId =
                    ticket.ticket_id
                        ? ticket.ticket_id.toLowerCase()
                        : "";

                const subject =
                    ticket.subject
                        ? ticket.subject.toLowerCase()
                        : "";

                const customerId =
                    ticket.customer_id
                        ? ticket.customer_id.toLowerCase()
                        : "";


                return (
                    ticketId.includes(searchText) ||
                    subject.includes(searchText) ||
                    customerId.includes(searchText)
                );

            });

    }


    // ------------------------------------------------------
    // Clear old content
    // ------------------------------------------------------

    container.innerHTML = "";


    // ------------------------------------------------------
    // No tickets
    // ------------------------------------------------------

    if (filteredTickets.length === 0) {

        container.innerHTML = `
            <div class="empty-message">
                No tickets found.
            </div>
        `;

        return;

    }


    // ------------------------------------------------------
    // Create table
    // ------------------------------------------------------

    const table =
        document.createElement("table");


    table.style.width = "100%";
    table.style.borderCollapse = "collapse";


    table.innerHTML = `
        <thead>

            <tr>

                <th style="text-align:left; padding:12px;">
                    Ticket ID
                </th>

                <th style="text-align:left; padding:12px;">
                    Customer ID
                </th>

                <th style="text-align:left; padding:12px;">
                    Order ID
                </th>

                <th style="text-align:left; padding:12px;">
                    Subject
                </th>

                <th style="text-align:left; padding:12px;">
                    Channel
                </th>

                <th style="text-align:left; padding:12px;">
                    Status
                </th>

                <th style="text-align:left; padding:12px;">
                    Created At
                </th>

                <th style="text-align:left; padding:12px;">
                    Action
                </th>

            </tr>

        </thead>

        <tbody></tbody>
    `;


    const tbody =
        table.querySelector("tbody");


    // ------------------------------------------------------
    // Add ticket rows
    // ------------------------------------------------------

    filteredTickets.forEach(ticket => {

        const row =
            document.createElement("tr");


        row.style.borderTop =
            "1px solid #e5e7eb";


        row.innerHTML = `

            <td style="padding:12px;">
                ${ticket.ticket_id || "-"}
            </td>

            <td style="padding:12px;">
                ${ticket.customer_id || "-"}
            </td>

            <td style="padding:12px;">
                ${ticket.order_id || "-"}
            </td>

            <td style="padding:12px;">
                ${ticket.subject || "-"}
            </td>

            <td style="padding:12px;">
                ${ticket.channel || "-"}
            </td>

            <td style="padding:12px;">
                ${ticket.status || "-"}
            </td>

            <td style="padding:12px;">
                ${ticket.created_at || "-"}
            </td>

            <td style="padding:12px;">

                <button
                    class="primary"
                    onclick="viewTicket('${ticket.ticket_id}')">

                    View

                </button>

            </td>

        `;


        tbody.appendChild(row);

    });


    container.appendChild(table);

}


// ==========================================================
// SEARCH TICKETS
// ==========================================================

function searchTickets() {

    loadAllTickets();

}


// ==========================================================
// VIEW TICKET
// ==========================================================

function viewTicket(ticketId) {

    const ticketInput =
        document.getElementById("ticketId");


    if (!ticketInput) {

        showError(
            "Ticket ID input field was not found."
        );

        return;

    }


    ticketInput.value = ticketId;


    // Go to AI Triage page

    showPage("triagePage");


    // Load complete ticket context

    loadTicket();

}


// ==========================================================
// LOAD SINGLE TICKET
// ==========================================================

async function loadTicket() {

    clearError();


    const ticketInput =
        document.getElementById("ticketId");


    if (!ticketInput) {

        showError(
            "Ticket ID input field was not found."
        );

        return;

    }


    const ticketId =
        ticketInput.value.trim();


    if (!ticketId) {

        showError(
            "Please enter a ticket ID."
        );

        return;

    }


    showLoading(true);


    try {

        const response = await fetch(
            `${API_BASE}/api/tickets/${ticketId}`,
            {
                method: "GET",
                headers: getHeaders()
            }
        );


        if (!response.ok) {

            throw new Error(
                "Ticket could not be loaded. HTTP " +
                response.status
            );

        }


        const data =
            await response.json();


        displayTicket(data);


    } catch (error) {

        console.error(
            "Load ticket error:",
            error
        );

        showError(error.message);


    } finally {

        showLoading(false);

    }

}


// ==========================================================
// DISPLAY TICKET
// ==========================================================

function displayTicket(data) {

    if (!data) {

        showError(
            "No ticket data received."
        );

        return;

    }


    const ticket =
        data.ticket;


    const customer =
        data.customer;


    const order =
        data.order;


    // ------------------------------------------------------
    // Ticket
    // ------------------------------------------------------

    if (ticket) {

        const ticketIdDisplay =
            document.getElementById("ticketIdDisplay");


        const ticketStatus =
            document.getElementById("ticketStatus");


        const ticketChannel =
            document.getElementById("ticketChannel");


        const ticketCreated =
            document.getElementById("ticketCreated");


        const ticketSubject =
            document.getElementById("ticketSubject");


        const ticketBody =
            document.getElementById("ticketBody");


        if (ticketIdDisplay) {
            ticketIdDisplay.textContent =
                ticket.ticket_id || "-";
        }


        if (ticketStatus) {
            ticketStatus.textContent =
                ticket.status || "-";
        }


        if (ticketChannel) {
            ticketChannel.textContent =
                ticket.channel || "-";
        }


        if (ticketCreated) {
            ticketCreated.textContent =
                ticket.created_at || "-";
        }


        if (ticketSubject) {
            ticketSubject.textContent =
                ticket.subject || "-";
        }


        if (ticketBody) {
            ticketBody.textContent =
                ticket.body || "-";
        }


        show("ticketSection");

    }


    // ------------------------------------------------------
    // Customer
    // ------------------------------------------------------

    if (customer) {

        const customerName =
            document.getElementById("customerName");


        const customerEmail =
            document.getElementById("customerEmail");


        const customerTier =
            document.getElementById("customerTier");


        const customerCountry =
            document.getElementById("customerCountry");


        const customerVerified =
            document.getElementById("customerVerified");


        if (customerName) {
            customerName.textContent =
                customer.name || "-";
        }


        if (customerEmail) {
            customerEmail.textContent =
                customer.email || "-";
        }


        if (customerTier) {
            customerTier.textContent =
                customer.tier || "-";
        }


        if (customerCountry) {
            customerCountry.textContent =
                customer.country || "-";
        }


        if (customerVerified) {

            customerVerified.textContent =
                customer.verified
                    ? "Yes"
                    : "No";

        }


        show("customerSection");

    }


    // ------------------------------------------------------
    // Order
    // ------------------------------------------------------

    if (order) {

        const orderId =
            document.getElementById("orderId");


        const orderStatus =
            document.getElementById("orderStatus");


        const orderPlaced =
            document.getElementById("orderPlaced");


        const orderDelivered =
            document.getElementById("orderDelivered");


        const orderReturn =
            document.getElementById("orderReturn");


        const orderTotal =
            document.getElementById("orderTotal");


        const paymentStatus =
            document.getElementById("paymentStatus");


        if (orderId) {
            orderId.textContent =
                order.order_id || "-";
        }


        if (orderStatus) {
            orderStatus.textContent =
                order.status || "-";
        }


        if (orderPlaced) {
            orderPlaced.textContent =
                order.placed_at || "-";
        }


        if (orderDelivered) {
            orderDelivered.textContent =
                order.delivered_at || "-";
        }


        if (orderReturn) {
            orderReturn.textContent =
                order.eligible_return_until || "-";
        }


        if (orderTotal) {

            orderTotal.textContent =
                (order.total ?? "-") +
                " " +
                (order.currency || "");

        }


        if (paymentStatus) {
            paymentStatus.textContent =
                order.payment_status || "-";
        }


        displayOrderItems(
            order.items
        );


        show("orderSection");

    }

}


// ==========================================================
// DISPLAY ORDER ITEMS
// ==========================================================

function displayOrderItems(items) {

    const container =
        document.getElementById("orderItems");


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (!items || items.length === 0) {

        container.textContent =
            "No order items available.";

        return;

    }


    items.forEach(item => {

        const div =
            document.createElement("div");


        div.className =
            "order-item";


        div.innerHTML = `

            <strong>
                ${item.name || "-"}
            </strong>

            <span>
                SKU: ${item.sku || "-"}
            </span>

            <span>
                Quantity: ${item.quantity ?? "-"}
            </span>

            <span>
                Category: ${item.category || "-"}
            </span>

            <span>
                Final Sale:
                ${item.final_sale ? "Yes" : "No"}
            </span>

        `;


        container.appendChild(div);

    });

}


// ==========================================================
// RUN AI TRIAGE
// ==========================================================

async function runTriage() {

    clearError();


    const ticketInput =
        document.getElementById("ticketId");


    if (!ticketInput) {

        showError(
            "Ticket ID input field was not found."
        );

        return;

    }


    const ticketId =
        ticketInput.value.trim();


    if (!ticketId) {

        showError(
            "Please enter a ticket ID."
        );

        return;

    }


    showLoading(true);


    hide("triageSection");


    try {

        const response = await fetch(
            `${API_BASE}/api/tickets/${ticketId}/triage`,
            {
                method: "POST",
                headers: getHeaders()
            }
        );


        if (!response.ok) {

            throw new Error(
                "AI triage failed. HTTP " +
                response.status
            );

        }


        const data =
            await response.json();


        displayTriage(data);


    } catch (error) {

        console.error(
            "AI triage error:",
            error
        );

        showError(error.message);


    } finally {

        showLoading(false);

    }

}


// ==========================================================
// DISPLAY TRIAGE
// ==========================================================

function displayTriage(data) {

    if (!data) {

        showError(
            "No triage response received."
        );

        return;

    }


    // ------------------------------------------------------
    // Category
    // ------------------------------------------------------

    const category =
        document.getElementById("triageCategory");


    if (category) {

        category.textContent =
            data.category || "-";

    }


    // ------------------------------------------------------
    // Priority
    // ------------------------------------------------------

    const priority =
        document.getElementById("triagePriority");


    if (priority) {

        priority.textContent =
            data.priority || "-";

    }


    // ------------------------------------------------------
    // Escalation
    // ------------------------------------------------------

    const escalation =
        document.getElementById(
            "triageEscalation"
        );


    if (escalation) {

        escalation.textContent =
            data.escalation_required
                ? "Required"
                : "Not Required";

    }


    // ------------------------------------------------------
    // Reasoning
    // ------------------------------------------------------

    const reasoning =
        document.getElementById(
            "triageReasoning"
        );


    if (reasoning) {

        reasoning.textContent =
            data.reasoning ||
            "No reasoning available.";

    }


    // ------------------------------------------------------
    // Recommended actions
    // ------------------------------------------------------

    const actions =
        document.getElementById(
            "recommendedActions"
        );


    if (actions) {

        actions.innerHTML = "";


        if (
            data.recommended_actions &&
            data.recommended_actions.length > 0
        ) {

            data.recommended_actions.forEach(action => {

                const li =
                    document.createElement("li");


                li.textContent =
                    action;


                actions.appendChild(li);

            });

        } else {

            const li =
                document.createElement("li");


            li.textContent =
                "No action recommended.";


            actions.appendChild(li);

        }

    }


    // ------------------------------------------------------
    // Draft reply
    // ------------------------------------------------------

    const draftReply =
        document.getElementById(
            "draftReply"
        );


    if (draftReply) {

        draftReply.textContent =
            data.draft_reply ||
            "No draft reply generated.";

    }


    // ------------------------------------------------------
    // Citations
    // ------------------------------------------------------

    const citations =
        document.getElementById(
            "citations"
        );


    if (citations) {

        citations.innerHTML = "";


        if (
            data.citations &&
            data.citations.length > 0
        ) {

            data.citations.forEach(citation => {

                const span =
                    document.createElement("span");


                span.className =
                    "citation";


                span.textContent =
                    citation;


                citations.appendChild(span);

            });

        } else {

            citations.textContent =
                "No knowledge-base citations available.";

        }

    }


    // ------------------------------------------------------
    // Show triage section
    // ------------------------------------------------------

    show("triageSection");

}


// ==========================================================
// PAGE INITIALIZATION
// ==========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        // Start with Dashboard

        showPage("dashboardPage");

    }
);