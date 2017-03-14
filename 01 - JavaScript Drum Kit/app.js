document.addEventListener("DOMContentLoaded", function() {
    const keys = document.querySelectorAll(".key");

    function removeTransition(event){
        if (event.propertyName == "transform") {
            this.classList.remove("playing");
        } else {
            return;
        }
    }

    function playSound(event){
        // console.log(event.keyCode);
        //is there any audio element on the page that has data-key of . 65?
        // const audioClap = document.querySelector("audio[data-key='65']");
        const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
        const key = document.querySelector(`.key[data-key="${event.keyCode}"]`);

    //add sound
        if(audio){
    //rewind to the start
        audio.currentTime = 0;
        audio.play();
        } else {
            return;
        }
    //add animation
        key.classList.add("playing");
    }


    window.addEventListener("keydown", playSound);
    keys.forEach(element => element.addEventListener("transitionend", removeTransition));



});
