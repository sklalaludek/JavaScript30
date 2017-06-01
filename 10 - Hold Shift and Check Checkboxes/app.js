document.addEventListener("DOMContentLoaded", function() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let lastChecked;

    function handleCheck(e) {
        let inBetween = false;
        // Check if the shift key is down && check check
        if (e.shiftKey && this.checked) {
            // loop over every single checkbox
            checkboxes.forEach(checkbox => {
                console.log(checkbox);
                if (checkbox === this || checkbox === lastChecked) {
                    inBetween = !inBetween;
                }

                if (inBetween) {
                    checkbox.checked = true;
                }
            });
        }
        lastChecked = this;
    }

    //the click event will fire up even if  you use your keyboard
    checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));

});
