document.addEventListener("DOMContentLoaded", function() {

    const canvas = document.getElementById('draw'),
              c = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    c.strokeStyle = '#BADA55';
    c.lineJoin = 'round';
    c.lineCap = 'round';
    c.lineWidth = 100;
    c.globalCompositeOperation = 'difference';

    let isDrawing = false,
         lastX = 0;
         lastY = 0,
         hue = 0,
         direction = true;

    function draw(e) {
        // click and drag functionality
        if (!isDrawing) {
            // this will stop fn from running when they are not moused down
            return;
        }
        // colors
        c.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        // drawing
        c.beginPath();
        // start from
        c.moveTo(lastX, lastY);
        // go to
        c.lineTo(e.offsetX, e.offsetY);
        c.stroke();
        // update variables
        lastX = e.offsetX;
        lastY = e.offsetY;
        // ES6 trick
        // [lastX, lastY] = [e.offsetX, e.offsetY]; //Destructuring an array - extract data from arrays or objects into distinct variables
        hue++;
        if (hue >= 360) {
            hue = 0;
        }
        if (c.lineWidth >= 100 || c.lineWidth <= 1) {
            // flip the direction
            direction = !direction;
        }
        if (direction) {
            c.lineWidth++;
        } else {
            c.lineWidth--;
        }
    }

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        lastX = e.offsetX;
        lastY = e.offsetY;
    });
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);
});
