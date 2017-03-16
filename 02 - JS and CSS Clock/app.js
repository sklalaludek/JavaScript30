document.addEventListener("DOMContentLoaded", function() {

    function setDate(){
        const now = new Date();

        const sec = now.getSeconds();
        const secDegrees = ((sec / 60) * 360) + 90;
        const secondHand = document.querySelector(".second-hand");

        const min = now.getMinutes();
        const minDegrees = ((min / 60) * 360) + 90;
        const minHand = document.querySelector(".min-hand");

        const hour = now.getHours();
        const hourDegrees = ((hour / 12) * 360) + 90;
        const hourHand = document.querySelector(".hour-hand");

        secondHand.style.transform = `rotate(${secDegrees}deg)`;
        minHand.style.transform = `rotate(${minDegrees}deg)`;
        hourHand.style.transform = `rotate(${hourDegrees}deg)`;

    }

    setInterval(setDate, 1000);



});
