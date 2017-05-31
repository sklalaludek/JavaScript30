document.addEventListener("DOMContentLoaded", function() {

    const panels = document.querySelectorAll('.panel');

    function toggleOpen() {
        this.classList.toggle('open');
    }

    function toggleActive(e) {
        // this.classList.toggle('open-active');

        // only flex grow transition, for different browsers 'flex'
        // if (e.propertyName === 'flex-grow')
        if (e.propertyName.includes('flex')) {
            this.classList.toggle('open-active');
        }
    }

    panels.forEach(panel => panel.addEventListener('click', toggleOpen));
    // when transition is end
    panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));


});
