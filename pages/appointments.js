export default function Appoinetments() {
    const container = document.createElement('div');
    container.className = 'content';
    container.innerHTML = `
        <h2>Appoinetments</h2>
        <div class="content-card">
            <div class="card-header">
                <div class="search-box">
                    <span><i class="fa-solid fa-magnifying-glass"></i></span>
                    <input type="text" placeholder="Search...">
                </div>
                <button class="btn">
                    <i class="fa-solid fa-plus"></i>
                    Add Appointment
                </button>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th>Patient Name</th>
                            <th>Time</th>
                            <th>Email</th>
                            <th>Number Phone</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Abdullah Azudia</td>
                            <td>8:00</td>
                            <td>abdullah@gmail.com</td>
                            <td>0812345678</td>
                            <td><span class="status-badge">Confirmed</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="action-btn edit-btn"><i class="fa-regular fa-pen-to-square"></i></button>
                                    <button class="action-btn delete-btn"><i class="fa-regular fa-trash-can"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
    return container;
}