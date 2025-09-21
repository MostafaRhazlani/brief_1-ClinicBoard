import Form from '../components/form-modal.js';
import Modal from '../components/popup-form-modal.js';
import { getData, setData } from '../localStorage.js';

export default function Receipts() {
    const container = document.createElement('div');
    container.className = 'content';
    container.innerHTML = `
        <h2>Receipts</h2>
        <div class="content-card">
            <div class="card-header">
                <button class="btn add-receipt-btn">
                    <i class="fa-solid fa-plus"></i>
                    Add Receipt
                </button>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th>Amount</th>
                            <th>Payment Method</th>
                            <th>Description</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    `;

    const tableBody = container.querySelector('tbody');

    // Render all receipts
    function renderReceipts() {
        tableBody.innerHTML = '';
        const data = getData('clinicApp:data') || { cash: [] };
        const receipts = data.cash.receipt || [];
        if (receipts.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No receipts found.</td></tr>`;
            return;
        }
        receipts.forEach((receipt, idx) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${idx + 1}</td>
                <td>${receipt.amount}</td>
                <td>${receipt.method}</td>
                <td>${receipt.description}</td>
                <td>${new Date(receipt.date).toDateString()}</td>
            `;
            tableBody.appendChild(tr);
        });
    }

    renderReceipts();

    // Create the form for receipt creation
    const form = Form({
        fields: [
            { type: "number", id: "receipt_amount", label: "Amount", placeholder: "Enter amount" },
            { type: "text", id: "receipt_method", label: "Payment Method", placeholder: "Enter payment method" },
            { type: "text", id: "receipt_description", label: "Description", placeholder: "Enter description" },
            { type: "submit", value: 'Add Receipt', className: 'btn' }
        ]
    });

    // Create modal and pass form as content
    const modal = Modal({ content: form });
    container.appendChild(modal);

    // Show modal on button click
    container.querySelector('.add-receipt-btn').addEventListener('click', () => {
        modal.open();
    });

    // Handle submit form to store new receipt in localstorage
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const amountInput = form.querySelector('#receipt_amount');
        const methodInput = form.querySelector('#receipt_method');
        const descInput = form.querySelector('#receipt_description');

        const amount = amountInput.value.trim();
        const method = methodInput.value.trim();
        const description = descInput.value.trim();

        if (!amount || !method || !description) {
            alert('All fields are required.');
            return;
        }

        let data = getData('clinicApp:data') || {
            patients: [],
            appointments: [],
            cash: [{
                receipt: [],
                depense: [], 
            }],
            authentication: { users: [] }
        };

        // Add new receipt
        data.cash.receipt.push({
            amount,
            method,
            description,
            date: new Date().toISOString()
        });

        setData('clinicApp:data', data);

        alert('Receipt added!');
        modal.close();

        // Clear input fields
        amountInput.value = '';
        methodInput.value = '';
        descInput.value = '';

        // Re-render receipts list
        renderReceipts();
    });

    return container;
}
