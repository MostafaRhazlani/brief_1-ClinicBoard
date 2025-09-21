export default function Patients() {
    const container = document.createElement('div');
    container.className = 'content';
    container.innerHTML = `

        <div class="patient-title">
            <h2>Patients</h2>
            <button class="btn">
                <i class="fa-solid fa-user-plus"></i>
                Add Patient
            </button>
        </div>
        <div class="cards-container">
            <div class="card">
                <div class="card-head">
                    <div class="avatar"></div>
                    <div>
                        <div class="name">Alixender</div>
                        <div class="email">alex@gamil.com</div>
                    </div>
                </div>
                <div class="info">
                    N° phone: <strong>0612345678</strong>
                </div>
                <div class="date">Friday, June 26</div>
            </div>
            <div class="card">
                <div class="card-head">
                    <div class="avatar"></div>
                    <div>
                        <div class="name">Alixender</div>
                        <div class="email">alex@gamil.com</div>
                    </div>
                </div>
                <div class="info">
                    N° phone: <strong>0612345678</strong>
                </div>
                <div class="date">Friday, June 26</div>
            </div>
            <div class="card">
                <div class="card-head">
                    <div class="avatar"></div>
                    <div>
                        <div class="name">Alixender</div>
                        <div class="email">alex@gamil.com</div>
                    </div>
                </div>
                <div class="info">
                    N° phone: <strong>0612345678</strong>
                </div>
                <div class="date">Friday, June 26</div>
            </div>
            <div class="card">
                <div class="card-head">
                    <div class="avatar"></div>
                    <div>
                        <div class="name">Alixender</div>
                        <div class="email">alex@gamil.com</div>
                    </div>
                </div>
                <div class="info">
                    N° phone: <strong>0612345678</strong>
                </div>
                <div class="date">Friday, June 26</div>
            </div>
            <div class="card">
                <div class="card-head">
                    <div class="avatar"></div>
                    <div>
                        <div class="name">Alixender</div>
                        <div class="email">alex@gamil.com</div>
                    </div>
                </div>
                <div class="info">
                    N° phone: <strong>0612345678</strong>
                </div>
                <div class="date">Friday, June 26</div>
            </div>
            <div class="card">
                <div class="card-head">
                    <div class="avatar"></div>
                    <div>
                        <div class="name">Alixender</div>
                        <div class="email">alex@gamil.com</div>
                    </div>
                </div>
                <div class="info">
                    N° phone: <strong>0612345678</strong>
                </div>
                <div class="date">Friday, June 26</div>
            </div>
        </div>
    `
    return container;
}