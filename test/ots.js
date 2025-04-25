// Function to validate overlapping time slots
function validateTimeSlot(day, startTime, endTime, existingSlots) {
    // Check if the day already has scheduled slots
    if (!existingSlots[day]) {
        existingSlots[day] = [];
    }

    // Loop through all existing slots for the day
    for (let slot of existingSlots[day]) {
        // Check if the new time overlaps with any existing slot
        if (
            (startTime >= slot.startTime && startTime < slot.endTime) || // Overlaps within an existing slot
            (endTime > slot.startTime && endTime <= slot.endTime) ||    // Overlaps at the end of an existing slot
            (startTime <= slot.startTime && endTime >= slot.endTime)    // Completely overlaps an existing slot
        ) {
            return false; // Overlap detected
        }
    }

    // If no overlap, add the new slot to the day's schedule
    existingSlots[day].push({ startTime, endTime });
    return true;
}

// Function to integrate validation into timetable generation
function generateTimetableWithValidation() {
    // Retrieve saved data from local storage
    const settings = JSON.parse(localStorage.getItem('settings'));
    const programDetails = JSON.parse(localStorage.getItem('programDetails'));
    const lecturers = JSON.parse(localStorage.getItem('lecturers'));
    const venues = JSON.parse(localStorage.getItem('venues'));

    if (!settings || !programDetails || !lecturers || !venues) {
        alert('Incomplete data! Please ensure all required data is saved.');
        return;
    }

    // Extract data
    const { days, periods, startTimes, breakDuration } = settings;
    const courseList = programDetails.courses.split('-').map(course => course.trim());
    const lecturerList = lecturers || [];
    const venueList = venues || [];

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
    const existingSlots = {}; // Object to track scheduled slots for each day

    let courseIndex = 0;
    let lecturerIndex = 0;
    let venueIndex = 0;

    for (let day = 0; day < days; day++) {
        const dayName = Object.keys(startTimes)[day];
        if (!startTimes[dayName]) continue;

        let currentTime = startTimes[dayName];

        for (let period = 1; period <= periods; period++) {
            const startTime = currentTime;
            const endTime = calculateEndTime(startTime, breakDuration);

            // Validate the time slot before adding it
            if (!validateTimeSlot(dayName, startTime, endTime, existingSlots)) {
                alert(`Conflict detected! Unable to schedule Period ${period} on ${dayName}.`);
                continue; // Skip this period if there's a conflict
            }

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

            // Course
            const courseCell = document.createElement('td');
            courseCell.textContent = courseList[courseIndex];
            courseCell.style.textAlign = 'center';
            row.appendChild(courseCell);

            // Lecturer
            const lecturerCell = document.createElement('td');
            lecturerCell.textContent = lecturerList[lecturerIndex]?.name || 'N/A';
            lecturerCell.style.textAlign = 'center';
            row.appendChild(lecturerCell);

            // Venue
            const venueCell = document.createElement('td');
            venueCell.textContent = venueList[venueIndex] || 'N/A';
            venueCell.style.textAlign = 'center';
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

            // Update indices and time
            courseIndex = (courseIndex + 1) % courseList.length;
            lecturerIndex = (lecturerIndex + 1) % lecturerList.length;
            venueIndex = (venueIndex + 1) % venueList.length;
            currentTime = endTime;
        }
    }

    table.appendChild(tbody);
    timetableContainer.appendChild(table);

    alert('Timetable generated successfully!');
}

// Helper function to calculate end time
function calculateEndTime(startTime, duration) {
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + parseInt(duration, 10);
    const endHours = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;

    return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
}

// Attach event listener to the generate timetable button
document.getElementById('generateTb').addEventListener('click', generateTimetableWithValidation);