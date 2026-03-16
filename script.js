/*
TODO:
    Check wether the user has changed windows size                                                              Completed
    Make a function to obtain the local time of the user                                                        Completed
    Make a function to make the clock element draggable to the users desired position                           Completed
*/



const clock = document.getElementById('draggable-clock');
let xOffset = 0, yOffset = 0, active = false;
let initialX, initialY;


// Resets the clock to the center  when a resize is changed so the clock isnt stuck around the screen
window.addEventListener('resize', () => {
    xOffset = 0;
    yOffset = 0;
    clock.style.transform = `translate(0px, 0px)`;
});

// this function sycns with the users time and update the clocks hands
function updateClock() {
    const now = new Date();
    const h = now.getHours() % 12;
    const m = now.getMinutes();
    const s = now.getSeconds();
    const hDeg = (h * 30) + (m * 0.5) - 90;
    const mDeg = (m * 6) + (s * 0.1) - 90;

    document.getElementById('hour-hand').style.transform = `rotate(${hDeg}deg)`;
    document.getElementById('minute-hand').style.transform = `rotate(${mDeg}deg)`;
}
setInterval(updateClock, 1000);
updateClock();

// Made the clock draggable so the user can reposition it where they would like to.
function dragStart(e) {
    const cx = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    const cy = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;
    initialX = cx - xOffset;
    initialY = cy - yOffset;
    if (e.target === clock) active = true;
}

function drag(e) {
    if (active) {
        e.preventDefault();
        const cx = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
        const cy = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;
        xOffset = cx - initialX;
        yOffset = cy - initialY;
        clock.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    }
}

clock.addEventListener("mousedown", dragStart);
window.addEventListener("mouseup", () => active = false);
window.addEventListener("mousemove", drag);
clock.addEventListener("touchstart", dragStart, {passive: false});
window.addEventListener("touchend", () => active = false);
window.addEventListener("touchmove", drag, {passive: false});