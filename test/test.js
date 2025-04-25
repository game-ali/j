//document.getElementById('sMessage').style.background='lightblue';
//document.getElementById('sMessage').style.borderRadius='15px';
//document.getElementById('sMessage').style.backgroundWidth='20px';
// Generate Timetable Tooltip

document.getElementById('generateTb').addEventListener('mouseover', function () {
    const message = "click to generate timetable."; // Tooltip message
    document.getElementById('sMessage').textContent = message; // Display message
});

document.getElementById('settings').addEventListener('mouseover', function () {
    let show = "Click to choose your preferred configuration";
    document.getElementById('sMessage').textContent= show;
});
document.getElementById('program').addEventListener('mouseover', function(){
let show ="click to enter  program details."
document.getElementById('sMessage').textContent=show;
addEventListener('mouseout',function() {
    document.getElementById('sMessage').textContent= null;
    addEventListener('mousedown', function(){
        document.getElementById('sMessage').textContent="Thank you!";
    })
    // body...
})
});
document.getElementById('lecturers').addEventListener('mouseover', function(){
let lShow ="click to enter lecturers details."
document.getElementById('sMessage').textContent=lShow;
addEventListener('mouseout',function() {
    document.getElementById('sMessage').textContent= null;
    // body...
})
});
document.getElementById('venues').addEventListener('mouseover', function(){
let vShow ="click to enter all venues."
document.getElementById('sMessage').textContent=vShow;
addEventListener('mouseout',function() {
    document.getElementById('sMessage').textContent= null;
    // body...
})
});
document.getElementById('generateRt').addEventListener('mouseover', function(){
let rShow ="click to generate timetable report."
document.getElementById('sMessage').textContent=rShow;
addEventListener('mouseout',function() {
    document.getElementById('sMessage').textContent= null;
    // body...
})
});
document.getElementById('downloadTb').addEventListener('mouseover', function(){
let dShow ="click to download timetable."
document.getElementById('sMessage').textContent=dShow;
addEventListener('mouseout',function() {
    document.getElementById('sMessage').textContent= null;
    // body...
})
});

document.getElementById('downloadRt').addEventListener('mouseover', function(){
let rtShow ="click to download timetable report."
document.getElementById('sMessage').textContent=rtShow;
addEventListener('mouseout',function() {
    document.getElementById('sMessage').textContent= null;
    // body...
})
});
document.getElementById('clearF').addEventListener('mouseover', function(){
let cShow ="click to clear everything."
document.getElementById('sMessage').textContent=cShow;
addEventListener('mouseout',function() {
    document.getElementById('sMessage').textContent= null;
    // body...
})
});
