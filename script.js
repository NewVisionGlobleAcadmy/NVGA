// 1. Data Structure for Classes and Subjects
const classSubjects = {
    "Nursery": ["Hindi", "English", "Math", "EVS"],
    "LKG": ["Hindi", "English", "Math", "EVS"],
    "UKG": ["Hindi", "English", "Math", "EVS"],
    "1": ["Hindi", "English", "Math", "EVS", "Computer", "G.K."],
    "2": ["Hindi", "English", "Math", "EVS", "Computer", "G.K."],
    "3": ["Hindi", "English", "Math", "EVS", "Computer", "G.K."],
    "4": ["Hindi", "English", "Math", "EVS", "Computer", "G.K."],
    "5": ["Hindi", "English", "Math", "EVS", "Computer", "G.K."],
    "6": ["Hindi", "English", "Math", "Science", "S.St", "Computer", "G.K."],
    "7": ["Hindi", "English", "Math", "Science", "S.St", "Computer", "G.K."],
    "8": ["Hindi", "English", "Math", "Science", "S.St", "Computer", "G.K."]
};

// 2. Admission Form Logic
const enrollForm = document.getElementById('enrollForm');
if (enrollForm) {
    enrollForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const newStudent = {
            name: document.getElementById('sName').value,
            admNo: document.getElementById('sAdmNo').value,
            sClass: document.getElementById('sClass').value,
            section: document.getElementById('sSection').value || "A",
            roll: document.getElementById('sRoll').value || "0",
            father: document.getElementById('sFather').value,
            id: Date.now()
        };
        let students = JSON.parse(localStorage.getItem('enrolledStudents')) || [];
        students.push(newStudent);
        localStorage.setItem('enrolledStudents', JSON.stringify(students));
        alert("Student " + newStudent.name + " Registered.");
        this.reset();
        displayAdmissionList();
    });
}

// 3. Display List on Admission Page
function displayAdmissionList() {
    const listContainer = document.getElementById('studentListContainer');
    if (!listContainer) return;
    const students = JSON.parse(localStorage.getItem('enrolledStudents')) || [];
    listContainer.innerHTML = students.length === 0 ? "<p>No students enrolled yet.</p>" : "";
    students.forEach(s => {
        listContainer.innerHTML += `<div class="student-card"><p><strong>${s.name}</strong> (Class: ${s.sClass}-${s.section})</p></div>`;
    });
}

// 4. Examination Portal Logic
function loadExamPortal() {
    const entryContainer = document.getElementById('marksEntryContainer');
    if (!entryContainer) return;
    const students = JSON.parse(localStorage.getItem('enrolledStudents')) || [];
    if (students.length === 0) return;
    entryContainer.innerHTML = "";
    students.forEach((s, index) => {
        const btn = document.createElement('button');
        btn.className = "btn-secondary";
        btn.style.margin = "5px";
        btn.innerHTML = `<i class="fas fa-edit"></i> Enter Marks: ${s.name}`;
        btn.onclick = () => showMarkForm(index);
        entryContainer.appendChild(btn);
    });
}

// 5. Show Marks Input Form
function showMarkForm(index) {
    const students = JSON.parse(localStorage.getItem('enrolledStudents'));
    const s = students[index];
    const subjects = classSubjects[s.sClass] || ["General"];
    let inputsHTML = `<h4>Entering Marks for: ${s.name}</h4><div class="form-grid">`;
    subjects.forEach(sub => {
        inputsHTML += `<div class="input-group"><label>${sub}</label><input type="number" class="m-input" data-sub="${sub}" placeholder="0-100"></div>`;
    });
    inputsHTML += `</div><button class="btn-energy" onclick="generateMarksheet(${index})">Print Marksheet</button>`;
    document.getElementById('marksEntryContainer').innerHTML = inputsHTML;
}

// 6. Generate & Print Marksheet
function generateMarksheet(index) {
    const students = JSON.parse(localStorage.getItem('enrolledStudents'));
    const s = students[index];
    const inputs = document.querySelectorAll('.m-input');
    const examType = document.getElementById('examTypeAdmit').value;
    let rows = "";
    let total = 0;
    inputs.forEach(inp => {
        let val = parseInt(inp.value) || 0;
        total += val;
        rows += `<tr><td>${inp.getAttribute('data-sub')}</td><td>100</td><td>${val}</td></tr>`;
    });

    const printArea = document.getElementById('printArea');
    printArea.innerHTML = `
        <div class="marksheet" style="border:5px double #1e3a8a; padding:20px; background:white;">
            <center><h2>NEW VISION GLOBAL ACADEMY</h2><p>REPORT CARD: ${examType}</p></center>
            <hr>
            <p><strong>Name:</strong> ${s.name} &nbsp;&nbsp; <strong>Class:</strong> ${s.sClass}</p>
            <p><strong>Adm No:</strong> ${s.admNo} &nbsp;&nbsp; <strong>Father:</strong> ${s.father}</p>
            <table border="1" style="width:100%; border-collapse:collapse; text-align:center;">
                <thead><tr><th>Subject</th><th>Max</th><th>Obtained</th></tr></thead>
                <tbody>${rows}</tbody>
                <tfoot><tr><th colspan="2">Total</th><th>${total}</th></tr></tfoot>
            </table>
        </div>`;
    window.print();
    location.reload(); // Reset for next student
}

// 7. Generate Admit Cards
function generateAllAdmitCards() {
    const students = JSON.parse(localStorage.getItem('enrolledStudents')) || [];
    const examType = document.getElementById('examTypeAdmit').value;
    const examDate = document.getElementById('examDate').value;
    let content = `<h2>ADMIT CARDS - ${examType}</h2>`;
    students.forEach(s => {
        content += `<div class="admit-card" style="border:2px solid #000; padding:10px; margin:10px; width:250px; display:inline-block">
            <h4>NVGA - ${examType}</h4><p>Name: ${s.name}</p><p>Class: ${s.sClass}</p><p>Date: ${examDate}</p></div>`;
    });
    document.getElementById('printArea').innerHTML = content;
    window.print();
}

window.onload = function() { displayAdmissionList(); loadExamPortal(); };
