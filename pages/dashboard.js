import { getData } from "../localStorage.js";

export default function Dashboard() {
    const container = document.createElement('div');
    container.className = 'content';
    container.innerHTML = `
        <h1>Dashboard</h1>

        <div class="dashboard">
            <div class="card">
                <div class="welcome">
                    <div>
                        <p>Welcome back</p>
                        <h2>DR. Mostafa Rhazlani</h2>
                    </div>
                    <div class="stats">
                        <div class="stat-box appointments">
                            <i class="fa-solid fa-calendar-check"></i>
                            <span>Appointments</span><br><strong class="total_appointment"></strong>
                        </div>
                        <div class="stat-box consultations">
                            <i class="fa-solid fa-user-md"></i>
                            <span>Consultations</span><br><strong class="totalConsultations"></strong>
                        </div>
                        <div class="stat-box room">
                            <i class="fa-solid fa-bed"></i>
                            <span>Room visit</span><br><strong class="roomVisit"></strong>
                        </div>
                    </div>
                </div>
                <img src="../img/doctors.svg" alt="Doctors">
            </div>
            <div class="bottom-cards">
                <div class="card left">
                    <div class="stats">
                        <div class="stat-box appointments">
                            <img src="../img/income.svg">
                            <span>Monthly Income</span><br><strong class="totalIncome"></strong>
                        </div>
                        <div class="stat-box consultations">
                        <img src="../img/expense.svg">
                        <span>Total expenses</span><br><strong class="totalExpense"></strong>
                        </div>
                        <div class="stat-box room">
                        <img src="../img/profit3.svg">
                        <span>Profit margin</span><br><strong class="totalProfit"></strong>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="card profile">
                        <div class="avatar"></div>
                            <h3>DR. Mostafa Rhazlani</h3>
                            <p>him / her Post</p>
                        <div class="patients-limit">
                            <p><strong>120 Patients</strong></p>
                            <p>200 Patients Limit</p>
                        </div>
                        <div class="profile-stats">
                            <div class="total">
                                <p>Total Patient</p>
                                <h3>2301</h3>
                            </div>
                            <div class="consult">
                                <p>Consultations</p>
                                <h3>33</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `

    const data = getData('clinicApp:data');

    // display total appointments
    const total_appointment = container.querySelector('.total_appointment');
    const totalAppointment = data.appointments.length;
    total_appointment.textContent = "+" + totalAppointment;
    
    // display total consultations
    let totalConsultations = 0;
    const consultations = container.querySelector('.totalConsultations');
    data.appointments.forEach(a => {
        if(a.type === 'Consultation') {
            
            totalConsultations += 1;
        }
    });
    consultations.textContent = "+" + totalConsultations;

    // display total room visit
    let totalRoomVisit = 0;
    const roomVisit = container.querySelector('.roomVisit');
    data.appointments.forEach(a => {
        if(a.room) {
            totalRoomVisit += 1;
        }
    });
    roomVisit.textContent = "+" + totalRoomVisit;

    let totalAmount = 0;
    const totalIncome = container.querySelector('.totalIncome');
    data?.cash?.receipt?.forEach(re => {
        totalAmount += parseInt(re.amount);
    })
    totalIncome.textContent = "+" + totalAmount;

    let totalExpense = 0;
    const expense = container.querySelector('.totalExpense');
    data?.cash?.expense?.forEach(ex => {
        totalExpense += parseInt(ex.amount);
    })
    expense.textContent = "+" + totalExpense;
    
    let profitMargin = 0;
    const totalProfit = container.querySelector('.totalProfit');
    profitMargin = totalAmount - totalExpense;
    totalProfit.textContent = profitMargin


    return container;
}