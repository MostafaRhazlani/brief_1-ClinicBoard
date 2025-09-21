import Form from '../components/form-modal.js';
import Modal from '../components/popup-form-modal.js';
import { getData, setData } from '../localStorage.js';

export default function Expenses() {
    const container = document.createElement('div');
    container.className = 'content';
    container.innerHTML = `
        <h2>Expenses</h2>
        <div class="content-card">
            <div class="card-header">
                <button class="btn add-expense-btn">
                    <i class="fa-solid fa-plus"></i>
                    Add Expense
                </button>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th>Amount</th>
                            <th>Category</th>
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

    // Render all expenses
    function renderExpenses() {
        tableBody.innerHTML = '';
        const data = getData('clinicApp:data') || { cash: { expense: [] } };
        const expenses = data.cash.expense || [];
        if (expenses.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No expenses found.</td></tr>`;
            return;
        }
        expenses.forEach((expense, idx) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${idx + 1}</td>
                <td>${expense.amount}</td>
                <td>${expense.category}</td>
                <td>${expense.description}</td>
                <td>${new Date(expense.date).toDateString()}</td>
            `;
            tableBody.appendChild(tr);
        });
    }

    renderExpenses();

    // Create the form for expense creation
    const form = Form({
        fields: [
            { type: "number", id: "expense_amount", label: "Amount", placeholder: "Enter amount" },
            { type: "text", id: "expense_category", label: "Category", placeholder: "Enter category" },
            { type: "text", id: "expense_description", label: "Description", placeholder: "Enter description" },
            { type: "submit", value: 'Add Expense', className: 'btn' }
        ]
    });

    // Create modal and pass form as content
    const modal = Modal({ content: form });
    container.appendChild(modal);

    // Show modal on button click
    container.querySelector('.add-expense-btn').addEventListener('click', () => {
        modal.open();
    });

    // Handle submit form to store new expense in localstorage
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const amountInput = form.querySelector('#expense_amount');
        const categoryInput = form.querySelector('#expense_category');
        const descInput = form.querySelector('#expense_description');

        const amount = amountInput.value.trim();
        const category = categoryInput.value.trim();
        const description = descInput.value.trim();

        if (!amount || !category || !description) {
            alert('All fields are required.');
            return;
        }

        let data = getData('clinicApp:data') || {
            patients: [],
            appointments: [],
            cash: {
                receipt: [],
                expense: [],
            },
            authentication: { users: [] }
        };

        console.log(data);
        

        // Add new expense
        data.cash.expense.push({
            amount,
            category,
            description,
            date: new Date().toISOString()
        });

        setData('clinicApp:data', data);

        alert('Expense added!');
        modal.close();

        // Clear input fields
        amountInput.value = '';
        categoryInput.value = '';
        descInput.value = '';

        // Re-render expenses list
        renderExpenses();
    });

    return container;
}
