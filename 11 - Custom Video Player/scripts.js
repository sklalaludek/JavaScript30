document.addEventListener("DOMContentLoaded", function() {

    // console.log('💩');
    const player = document.querySelector('.player'),
        video = document.querySelector('.viewer'),
        progress = document.querySelector('.progress'),
        progressBar = document.querySelector('.progress__filled'),
        toggle = player.querySelector('.toggle'),
        skipButtons = player.querySelectorAll('[data-skip]'),
        ranges = player.querySelectorAll('.player__slider');

    function togglePlay() {
        // It's only prop.paused there's no playing property
        // if (video.paused) {
        //     video.play();
        // } else {
        //     video.pause();
        // }
        // const method = video.paused ? 'play' : 'pause';
        // video[method]();
        const method = video[video.paused ? 'play' : 'pause']();
    }

    function updateButton() {
        const icon = this.paused ? '►' : '❚ ❚';
        toggle.textContent = icon;
    }

    function skip() {
        console.log(this.dataset.skip);
        // video.currentTime += parseInt(this.dataset.skip);
        video.currentTime += parseFloat(this.dataset.skip);
    }

    function handleRangeUpdate() {
        console.log(this.value);
        console.log(this.name);
        video[this.name] = this.value;
    }

    function handleProgress() {
        const percent = (video.currentTime / video.duration) * 100;

        progressBar.style.flexBasis = `${percent}%`;
    }

    function scrub(e) {
        const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
        video.currentTime = scrubTime
        console.log(e);
    }

    video.addEventListener('click', togglePlay);
    video.addEventListener('play', updateButton);
    video.addEventListener('pause', updateButton);
    // video.addEventListener('timeupdate', handleProgress);
    video.addEventListener('progress', handleProgress);
    toggle.addEventListener('click', togglePlay);
    skipButtons.forEach(button => button.addEventListener('click', skip));
    ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
    ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

    let mousedown = false;

    progress.addEventListener('click', scrub);
    // progress.addEventListener('mousemove', () => {
    //     if (mousedown) {
    //         scrub();
    //     }
    // });
    progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
    progress.addEventListener('mousedown', () => mousedown = true);
    progress.addEventListener('mouseup', () => mousedown = false);
});
