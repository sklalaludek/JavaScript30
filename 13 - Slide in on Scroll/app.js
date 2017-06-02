document.addEventListener("DOMContentLoaded", function() {
    // console.log('💩');
    const sliderImages = document.querySelectorAll('.slide-in');

    function debounce(func, wait = 20, immediate = true) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    function checkSlide(e) {

        sliderImages.forEach(sliderImage => {
            // where we are at a every bottom our window, window.scrollY (px from the top)
            // half way through the image
            const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2,
                // topPos is the number of pixels from the top of the closest relatively positioned parent element.
                //  topPos = image.offsetTop;
                // bottom of the image
                imageBottom = sliderImage.offsetTop + sliderImage.height,
                isHalfShown = slideInAt > sliderImage.offsetTop,
                isNotScrolledPast = window.scrollY < imageBottom;

            if (isHalfShown && isNotScrolledPast) {
                sliderImage.classList.add('active');
            } else {
                sliderImage.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', debounce(checkSlide));
});
