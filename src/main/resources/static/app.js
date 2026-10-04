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


// ==========================================================
// LOADING
// ==========================================================

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