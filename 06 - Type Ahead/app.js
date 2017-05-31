// const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
//
// let cities = [];
//
// fetch(endpoint)
//     .then(blob => blob.json()) //return another promise
//     .then(data => cities = data) // how to get data into cities?
//     console.log(cities);

document.addEventListener("DOMContentLoaded", function() {

    const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
    const cities = [],
        searchInput = document.querySelector('.search'),
        suggestions = document.querySelector('.suggestions');

    fetch(endpoint)
        .then(blob => blob.json()) //return another promise
        .then(data => cities.push(...data)) // how to get data into cities? We will get an array in a array with cities.push(data) that's why we had to use spread

    function findMatches(wordToMatch, cities) {
        // if the city or state match what was searched, how to put a variable into a regular expression?
        return cities.filter(place => {
            const regex = new RegExp(wordToMatch, 'gi'); //a global, case-insensitive search
            return place.city.match(regex) || place.state.match(regex)
        });
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function displayMatches() {
        const matchArray = findMatches(this.value, cities),
            html = matchArray.map(place => {
                // to highlight
                const regex = new RegExp(this.value, 'gi'),
                    cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`),
                    stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
                return `
                <li>
                    <span class="name">${cityName}, ${stateName}</span>
                    <span class="population">${numberWithCommas(place.population)}</span>
                </li>
            `;
            }).join(' '); //that will return not an array but one string
        suggestions.innerHTML = html;
    }

    searchInput.addEventListener('change', displayMatches);
    searchInput.addEventListener('keyup', displayMatches);


});
