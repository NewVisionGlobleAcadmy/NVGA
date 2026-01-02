document.getElementById('enrollForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Collect values
    const studentData = {
        name: document.getElementById('sName').value,
        admNo: document.getElementById('sAdmNo').value,
        sClass: document.getElementById('sClass').value,
        section: document.getElementById('sSection').value,
        contact: document.getElementById('sContact').value
    };

    // Create the display card
    const card = document.createElement('div');
    card.className = 'student-card';
    card.innerHTML = `
        <p><strong>Name:</strong> ${studentData.name}</p>
        <p><strong>Adm No:</strong> ${studentData.admNo}</p>
        <p><strong>Class:</strong> ${studentData.sClass} - ${studentData.section}</p>
        <p><strong>Contact:</strong> ${studentData.contact}</p>
    `;

    // Add to the container
    document.getElementById('studentListContainer').appendChild(card);

    // Success Message and Reset
    alert("Success! " + studentData.name + " has been added to the " + studentData.sClass + " list.");
    this.reset();
});
// Classes and Subjects mapping based on your requirements
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

// 1. Enrollment Function (Save to LocalStorage)
document.getElementById('enrollForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const newStudent = {
        name: document.getElementById('sName').value,
        admNo: document.getElementById('sAdmNo').value,
        sClass: document.getElementById('sClass').value,
        section: document.getElementById('sSection').value || "A",
        roll: document.getElementById('sRoll').value || "0",
        father: document.getElementById('sFather').value
    };

    let students = JSON.parse(localStorage.getItem('enrolledStudents')) || [];
    students.push(newStudent);
    localStorage.setItem('enrolledStudents', JSON.stringify(students));
    alert("Student " + newStudent.name + " Registered Successfully!");
    location.reload(); 
});

// 2. Marksheet Management Logic
function loadMarksEntry() {
    const students = JSON.parse(localStorage.getItem('enrolledStudents')) || [];
    const container = document.getElementById('marksEntryContainer');
    if (students.length === 0) return;

    container.innerHTML = `<h4>Select Student to Enter Marks:</h4>`;
    students.forEach((s, index) => {
        container.innerHTML += `
            <button class="btn-secondary" onclick="showMarkForm(${index})" style="margin:5px">
                ${s.name} (Class ${s.sClass})
            </button>`;
    });
}

function showMarkForm(index) {
    const students = JSON.parse(localStorage.getItem('enrolledStudents'));
    const s = students[index];
    const subjects = classSubjects[s.sClass];
    const examType = document.getElementById('examTypeAdmit')?.value || "Final Exam";

    let subjectInputs = "";
    subjects.forEach(sub => {
        subjectInputs += `
            <div class="input-group">
                <label>${sub}</label>
                <input type="number" class="mark-input" data-sub="${sub}" placeholder="Out of 100">
            </div>`;
    });

    document.getElementById('marksEntryContainer').innerHTML = `
        <div class="marks-form-box">
            <h4>Entering Marks for: ${s.name} (${examType})</h4>
            <div class="form-grid">${subjectInputs}</div>
            <button class="btn-energy" onclick="generateMarksheet(${index})">Generate Marksheet</button>
        </div>`;
}

function generateMarksheet(index) {
    const students = JSON.parse(localStorage.getItem('enrolledStudents'));
    const s = students[index];
    const examType = document.getElementById('examTypeAdmit').value;
    const inputs = document.querySelectorAll('.mark-input');
    const printArea = document.getElementById('printArea');

    let rows = "";
    let total = 0;
    inputs.forEach(input => {
        const val = parseInt(input.value) || 0;
        total += val;
        rows += `<tr><td>${input.getAttribute('data-sub')}</td><td>100</td><td>${val}</td></tr>`;
    });

    printArea.innerHTML = `
        <div class="marksheet">
            <div class="admit-header">
                <h2>NEW VISION GLOBAL ACADEMY</h2>
                <p>Pakhalmar, Palamu, Jharkhand</p>
                <hr>
                <h3>REPORT CARD: ${examType}</h3>
            </div>
            <div class="marksheet-info">
                <p><strong>Name:</strong> ${s.name} &nbsp;&nbsp; <strong>Class:</strong> ${s.sClass}</p>
                <p><strong>Adm No:</strong> ${s.admNo} &nbsp;&nbsp; <strong>Father:</strong> ${s.father}</p>
            </div>
            <table>
                <thead><tr><th>Subject</th><th>Max Marks</th><th>Obtained</th></tr></thead>
                <tbody>${rows}</tbody>
                <tfoot><tr><th colspan="2">Total Marks</th><th>${total}</th></tr></tfoot>
            </table>
            <div style="margin-top:40px; display:flex; justify-content: space-between;">
                <p>Class Teacher</p>
                <p>Principal Signature</p>
            </div>
        </div>`;
    window.print();
}

// Load data on page load
window.onload = loadMarksEntry;