// ------------------ Register Page ------------------
const registerForm = document.getElementById('registerForm');
if(registerForm){
    registerForm.addEventListener('submit', function(e){
        e.preventDefault();
        const username = document.getElementById('regUsername').value;
        const password = document.getElementById('regPassword').value;

        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if username exists
        if(users.some(u => u.username === username)){
            document.getElementById('registerMessage').innerText = 'Username already exists!';
        } else {
            users.push({username, password});
            localStorage.setItem('users', JSON.stringify(users));
            document.getElementById('registerMessage').innerText = 'Registration successful! You can login now.';
            registerForm.reset();
        }
    });
}

// ------------------ Login Page ------------------
const loginForm = document.getElementById('loginForm');
if(loginForm){
    loginForm.addEventListener('submit', function(e){
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        let users = JSON.parse(localStorage.getItem('users')) || [];

        const user = users.find(u => u.username === username && u.password === password);
        if(user){
            localStorage.setItem('currentUser', username);
            window.location.href = 'dashboard.html';
        } else {
            document.getElementById('loginMessage').innerText = 'Invalid credentials!';
        }
    });
}

// ------------------ Dashboard Page ------------------
const dashboardForm = document.getElementById('dashboardForm');
const appointmentsTable = document.getElementById('appointmentsTable');

function loadAppointments(){
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointmentsTable.innerHTML = '';
    appointments.forEach(app => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${app.patient}</td><td>${app.doctor}</td><td>${app.date}</td><td>${app.time}</td>`;
        appointmentsTable.appendChild(row);
    });
}

if(dashboardForm){
    loadAppointments();

    dashboardForm.addEventListener('submit', function(e){
        e.preventDefault();
        const pname = document.getElementById('pname').value;
        const pdoctor = document.getElementById('pdoctor').value;
        const pdate = document.getElementById('pdate').value;
        const ptime = document.getElementById('ptime').value;

        let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        appointments.push({patient: pname, doctor: pdoctor, date: pdate, time: ptime});
        localStorage.setItem('appointments', JSON.stringify(appointments));

        loadAppointments();
        dashboardForm.reset();
        alert('Appointment booked successfully!');
    });
}

// ------------------ Logout ------------------
const logoutBtn = document.getElementById('logoutBtn');
if(logoutBtn){
    logoutBtn.addEventListener('click', function(){
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
}

// ------------------ Redirect if not logged in ------------------
if(window.location.pathname.includes('dashboard.html')){
    const currentUser = localStorage.getItem('currentUser');
    if(!currentUser){
        window.location.href = 'index.html';
    }
}



