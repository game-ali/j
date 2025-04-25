// Function to generate the timetable 
function generateTimetable() {
    // Retrieve saved data from local storage
    const settings = JSON.parse(localStorage.getItem('settings'));
    const programDetails = JSON.parse(localStorage.getItem('programDetails'));
    const lecturers = JSON.parse(localStorage.getItem('lecturers'));
    const venues = JSON.parse(localStorage.getItem('venues'));

    if (!settings || !programDetails || !lecturers || !venues) {
        alert('Imcomplete data...');
        return;
    }

    // Extract data
    const { days, periods, startTimes } = settings;
    const creditHours = parseInt(programDetails.creditHours, 10); // Credit hours to determine class duration
    const courseList = programDetails.courses.split('-').map(course => course.trim());
    const lecturerList = lecturers || [];
    const venueList = venues || [];

    const durationPerClass = creditHours * 60; // Convect credit hours to minutes
    const timetableContainer = document.getElementById('table-container');
    timetableContainer.innerHTML = ''; 

    const table = document.createElement('table');
    table.border = '1';
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Day', 'Period', 'Course', 'Lecturer', 'Venue', 'Start Time', 'End Time'];

    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.style.padding = '10px';
        th.style.backgroundColor = '#f2f2f2';
        th.style.textAlign = 'center';
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');

    let courseIndex = 0;
    let lecturerIndex = 0;
    let venueIndex = 0;

    for (let day = 0; day < days; day++) {
        const dayName = Object.keys(startTimes)[day];
        if (!startTimes[dayName]) continue;

        let currentTime = startTimes[dayName];

        for (let period = 1; period <= periods; period++) {
            const startTime = currentTime;
            const endTime = calculateEndTime(startTime, durationPerClass);

            const row = document.createElement('tr');

            // Day
            const dayCell = document.createElement('td');
            dayCell.textContent = dayName.charAt(0).toUpperCase() + dayName.slice(1);
            dayCell.style.textAlign = 'center';
            row.appendChild(dayCell);

            // Period
            const periodCell = document.createElement('td');
            periodCell.textContent = `Period ${period}`;
            periodCell.style.textAlign = 'center';
            row.appendChild(periodCell);

            // Course (Editable)
            const courseCell = document.createElement('td');
            courseCell.textContent = courseList[courseIndex];
            courseCell.contentEditable = true; // Allow editing
            courseCell.style.textAlign = 'center';
            courseCell.addEventListener('input', () => updateTimetable());
            row.appendChild(courseCell);

            // Lecturer (Editable)
            const lecturerCell = document.createElement('td');
            lecturerCell.textContent = lecturerList[lecturerIndex]?.name || 'N/A';
            lecturerCell.contentEditable = true; // Allow editing
            lecturerCell.style.textAlign = 'center';
            lecturerCell.addEventListener('input', () => updateTimetable());
            row.appendChild(lecturerCell);

            // Venue (Editable)
            const venueCell = document.createElement('td');
            venueCell.textContent = venueList[venueIndex] || 'N/A';
            venueCell.contentEditable = true; // Allow editing
            venueCell.style.textAlign = 'center';
            venueCell.addEventListener('input', () => updateTimetable());
            row.appendChild(venueCell);

            // Start Time
            const startTimeCell = document.createElement('td');
            startTimeCell.textContent = startTime;
            startTimeCell.style.textAlign = 'center';
            row.appendChild(startTimeCell);

            // End Time
            const endTimeCell = document.createElement('td');
            endTimeCell.textContent = endTime;
            endTimeCell.style.textAlign = 'center';
            row.appendChild(endTimeCell);

            tbody.appendChild(row);

            // Update indies and time
            courseIndex = (courseIndex + 1) % courseList.length;
            lecturerIndex = (lecturerIndex + 1) % lecturerList.length;
            venueIndex = (venueIndex + 1) % venueList.length;
            currentTime = endTime;
        }
    }

    table.appendChild(tbody);
    timetableContainer.appendChild(table);

    alert('Timetable generated successfullly... Editable fields is now enabled.');
}

// Helper function to calculate end time
function calculateEndTime(startTime, duration) {
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + duration;
    const endHours = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;

    return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
}

// Save updated timetable to local storage...
function updateTimetable() {
    const table = document.querySelector('#table-container table');
    const updatedTimetable = [];

    // Loop through table rows to gather updated data
    Array.from(table.querySelectorAll('tbody tr')).forEach(row => {
        const cells = row.querySelectorAll('td');
        updatedTimetable.push({
            day: cells[0].textContent,
            period: cells[1].textContent,
            course: cells[2].textContent,
            lecturer: cells[3].textContent,
            venue: cells[4].textContent,
            startTime: cells[5].textContent,
            endTime: cells[6].textContent,
        });
    });

    // Save updated timetabled
    localStorage.setItem('updatedTimetable', JSON.stringify(updatedTimetable));
    console.log('Timetable updated:', updatedTimetable);
}

// Function to load timetable from local storage on page reload
function loadSavedTimetable() {
    const savedTimetable = JSON.parse(localStorage.getItem('updatedTimetable'));

    if (savedTimetable && savedTimetable.length > 0) {
        const timetableContainer = document.getElementById('table-container');
        timetableContainer.innerHTML = ''; // Clear existing timetable if any

        const table = document.createElement('table');
        table.border = '1';
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';

        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const headers = ['Day', 'Period', 'Course', 'Lecturer', 'Venue', 'Start Time', 'End Time'];

        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.style.padding = '10px';
            th.style.backgroundColor = '#f2f2f2';
            th.style.textAlign = 'center';
            th.textContent = headerText;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement('tbody');

        savedTimetable.forEach(entry => {
            const row = document.createElement('tr');

            Object.values(entry).forEach(value => {
                const cell = document.createElement('td');
                cell.textContent = value;
                cell.contentEditable = true; // Allow editing
                cell.style.textAlign = 'center';
                cell.addEventListener('input', () => updateTimetable());
                row.appendChild(cell);
            });

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        timetableContainer.appendChild(table);

        console.log('Saved timetable loaded successfully..');
    }
}

// Function to reset the timetable
function resetTimetable() {
    localStorage.removeItem('updatedTimetable'); // Clear timetable from local storage
    document.getElementById('table-container').innerHTML = ''; // Clear timetable from UI
    alert('Timetable has reset...');
}

// Attach event listeners
//document.getElementById('generateTb').addEventListener('click', generateTimetable);
///document.getElementById('resetTimetable').addEventListener('click', resetTimetable);

// Load timetable on page reload
document.addEventListener('DOMContentLoaded', loadSavedTimetable);
