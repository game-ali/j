// Saving Settings to Local Storage
document.getElementById('save-settings').addEventListener('click', function () {
    const settings = {
        schoolName: document.getElementById('school-name').value,
        academicYear: document.getElementById('academic-year').value,
        days: document.getElementById('days').value,
        periods: document.getElementById('periods').value,
        breakDuration: document.getElementById('break-duration').value,
        startTimes: {
            monday: document.getElementById('start-time-monday').value,
            tuesday: document.getElementById('start-time-tuesday').value,
            wednesday: document.getElementById('start-time-wednesday').value,
            thursday: document.getElementById('start-time-thursday').value,
            friday: document.getElementById('start-time-friday').value,
            saturday: document.getElementById('start-time-saturday').value,
            sunday: document.getElementById('start-time-sunday').value,
        },
        restrictedTime: {
            day: document.getElementById('restricted-day').value,
            startTime: document.getElementById('restricted-start-time').value,
            endTime: document.getElementById('restricted-end-time').value,
        },
    };

    localStorage.setItem('settings', JSON.stringify(settings));
    alert('settings saved successfully...');
});

// Save Program Details to Local Storage
document.getElementById('save-course-details').addEventListener('click', function () {
    const programDetails = {
        programName: document.getElementById('program-name').value,
        courses: document.getElementById('course-and-code').value,
        level: document.getElementById('level').value,
        creditHours: document.getElementById('credit-hours').value,
    };

    localStorage.setItem('programDetails', JSON.stringify(programDetails));
    alert('Program details saved successfully..');
});

// Save Lecturer Details to Local Storage
document.getElementById('save-lecturer').addEventListener('click', function () {
    const lecturerDetails = {
        name: document.getElementById('lecturer-name').value,
        courses: document.getElementById('lecturer-courses').value,
        id: document.getElementById('lecturer-id').value,
    };

    // Save as an array to support multipless lecturers
    const lecturers = JSON.parse(localStorage.getItem('lecturers')) || [];
    lecturers.push(lecturerDetails);
    localStorage.setItem('lecturers', JSON.stringify(lecturers));

    alert('Lecture r details saved successfully....');
});

// Save Venues to Local Storage
document.getElementById('save-venues').addEventListener('click', function () {
    const venues = document.getElementById('venues').value.split('-').map(venue => venue.trim());
    localStorage.setItem('venues', JSON.stringify(venues));
    alert('Venues saved successfully.');
});

// Retrive data from local Storage (Optional: For debugging or displayng Saved data)
function loadSavedData() {
    const settings = JSON.parse(localStorage.getItem('settings'));
    const programDetails = JSON.parse(localStorage.getItem('programDetails'));
    const lecturers = JSON.parse(localStorage.getItem('lecturers'));
    const venues = JSON.parse(localStorage.getItem('venues'));

    console.log('Settings:', settings);
    console.log('Program Details:', programDetails);
    console.log('Lecturers:', lecturers);
    console.log('Venues:', venues);
}

// Call this function to see save data in the console.
loadSavedData();
