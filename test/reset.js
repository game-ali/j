// Function to clear all saved data in local storage
function clearAllData() {
    if (confirm("Are you sure you want to clear all saved data? This action cannot be undone.")) {
        localStorage.clear(); // Clears all data in local storage
        alert("all saved data has been cleared successfully..");
        location.reload(); // Reload the page to reflect changes
    }
}

// Function to clear specific data (e.g., settings, program details, timetable)
function clearSpecificData(key) {
    if (confirm(`Are you sure you want to clear ${key}? This action cannot be undone.`)) {
        localStorage.removeItem(key); // Removes the specific key from local storage
        alert(`${key} has been cleared successfuly`);
        location.reload(); // Reload the page to reflect change
    }
}

// Attach event listeners to buttons
document.getElementById('clearAllData').addEventListener('click', clearAllData);
document.getElementById('clearSettings').addEventListener('click', () => clearSpecificData('settings'));
document.getElementById('clearProgramDetails').addEventListener('click', () => clearSpecificData('programDetails'));
document.getElementById('clearLecturers').addEventListener('click', () => clearSpecificData('lecturers'));
document.getElementById('clearVenues').addEventListener('click', () => clearSpecificData('venues'));
document.getElementById('clearTimetable').addEventListener('click', () => clearSpecificData('updatedTimetable'));
