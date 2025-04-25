

document.getElementById('generateTb').addEventListener('mouseout', function () {
    document.getElementById('sMessage').textContent = ''; // Clear message
});

// Toggle Settings Form
const toggleSettingsButton = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');

toggleSettingsButton.addEventListener('click', () => {
    if (settingsForm.classList.contains('hidden')) {
        settingsForm.classList.remove('hidden'); // Show settings form
        toggleSettingsButton.textContent = 'Close ⚙️'; // Update button text
    } else {
        settingsForm.classList.add('hidden'); // Hide settings form
        toggleSettingsButton.textContent = '⚙️'; // Update button text
    }
});
// Toggle Program Details Form
const toggleprogramButton = document.getElementById('program'); // Button
const programForm = document.getElementById('program-details-form'); // Form

toggleprogramButton.addEventListener('click', () => {
    // Check if the form is hidden
    if (programForm.classList.contains('hidden')) {
        programForm.classList.remove('hidden'); // Show the form
        toggleprogramButton.textContent = 'Close 📋'; // Update button text
    } else {
        programForm.classList.add('hidden'); // Hide the form
        toggleprogramButton.textContent = '📋'; // Update button text
    }
});
// Toggle lecture Details Form
const togglelecturerButton = document.getElementById('lecturers'); // Button
const lecturerForm = document.getElementById('lecturer-form'); // Form

togglelecturerButton.addEventListener('click', () => {
    // Check if the form is hidden
    if (lecturerForm.classList.contains('hidden')) {
        lecturerForm.classList.remove('hidden'); // Show the form
        togglelecturerButton.textContent = 'Close 👨‍🏫'; // Update button text
    } else {
        lecturerForm.classList.add('hidden'); // Hide the form
        togglelecturerButton.textContent = '👨‍🏫'; // Update button text
    }
});
// Toggle venues Details Form
const togglevenuesButton = document.getElementById('venues'); // Button
const venuesForm = document.getElementById('venue-form'); // Form

togglevenuesButton.addEventListener('click', () => {
    // Check if the form is hidden
    if (venuesForm.classList.contains('hidden')) {
        venuesForm.classList.remove('hidden'); // Show the form
        togglevenuesButton.textContent = 'Close 🏛️'; // Update button text
    } else {
        venuesForm.classList.add('hidden'); // Hide the form
        togglevenuesButton.textContent = '🏛️'; // Update button text
    }
});
let generShow="Report has been generated successfully. ";
document.getElementById('generateRt').addEventListener('click', function() {
    document.getElementById('generMessage').textContent=generShow;
    // body...
});
document.getElementById('downloadTb').addEventListener('click', function() {
    alert('Timetable downloaded successfully.');
    // body...
});
document.getElementById('downloadRt').addEventListener('click', function() {
    alert('Timetable Report downloaded successfully.');

    // body...
});
document.getElementById('clearF').addEventListener('click', function() {
    alert('Form Cleared successfully.');
    document.getElementById('table-container').textContent='';
    // body...
});