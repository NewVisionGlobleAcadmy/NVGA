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

// 2. Function to Save Student (Admission Page)
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
            id: Date.now() // Unique ID for each entry
        };

        let students = JSON.parse(localStorage.getItem('enrolledStudents')) || [];
        students.push(newStudent);
        localStorage.setItem('enrolledStudents', JSON.stringify(students));
        
        alert("Success! " + newStudent.name + " Registered.");
        this.reset();
        displayAdmissionList(); // List update karein
    });
}

// 3. Function to Display List on Admission Page
function displayAdmissionList() {
    const listContainer = document.getElementById('studentListContainer');
    if (!listContainer) return;

    const students = JSON.parse(localStorage.getItem('enrolledStudents')) || [];
    if (students.length === 0) {
        listContainer.innerHTML = "<p>No students enrolled yet.</p>";
        return;
    }

    listContainer.innerHTML = ""; // Clear purana data
    students.forEach(s => {
        listContainer.innerHTML += `
            <div class="student-card">
                <p><strong>${s.name}</strong> (Class: ${s.sClass}-${s.section})</p>
                <small>Adm No: ${s.admNo} | Roll: ${s.roll}</small>
            </div>`;
    });
}

// 4. Function to Load Students on Examination Page
function loadExamPortal() {
    const entryContainer = document.getElementById('marksEntryContainer');
    if (!entryContainer) return;

    const students = JSON.parse(localStorage.getItem('enrolledStudents')) || [];
    if (students.length === 0) return;

    entryContainer.innerHTML = ""; // Clear placeholder
    students.forEach((s, index) => {
        const btn = document.createElement('button');
        btn.className = "btn-secondary";
        btn.style.margin = "5px";
        btn.innerHTML = `<i class="fas fa-user-edit"></i> ${s.name} (${s.sClass})`;
        btn.onclick = () => showMarkForm(index);
        entryContainer.appendChild(btn);
    });
}

// 5. Generate Admit Cards Logic
function generateAllAdmitCards() {
    const students = JSON.parse(localStorage.getItem('enrolledStudents')) || [];
    const examType = document.getElementById('examTypeAdmit').value;
    const examDate = document.getElementById('examDate').value;
    const printArea = document.getElementById('printArea');

    if (students.length === 0) {
        alert("Please add students first!");
        return;
    }

    let content = `<h2 style="text-align:center">ADMIT CARDS - ${examType}</h2>`;
    students.forEach(s => {
        content += `
            <div class="admit-card" style="border:2px solid #1e3a8a; padding:10px; margin:10px; width:300px; display:inline-block">
                <center><h4>NEW VISION GLOBAL ACADEMY</h4></center>
                <p><strong>Name:</strong> ${s.name}</p>
                <p><strong>Class:</strong> ${s.sClass}</p>
                <p><strong>Adm No:</strong> ${s.admNo}</p>
                <p><strong>Date:</strong> ${examDate}</p>
            </div>`;
    });
    
    printArea.innerHTML = content;
    window.print();
}

// Har page load hone par check karein
window.onload = function() {
    displayAdmissionList();
    loadExamPortal();
};
