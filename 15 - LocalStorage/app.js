document.addEventListener("DOMContentLoaded", function() {
    // console.log('💩');

    const addItems = document.querySelector('.add-items');
    const itemsList = document.querySelector('.plates');
    //   on page load we check if there is something in localStorage and then we fall back to an empty array
    const items = JSON.parse(localStorage.getItem('items')) || [];

    //page is refreshing - in console there is a hello and then navigated to...
    function addItem(e) {
        //that's going to stop the page from reloading because by default, a form is just going to reload the page or send the data to an external source
        e.preventDefault();
        //this is going to be the actual form
        const text = (this.querySelector('[name=item]')).value;
        const item = {
            text: text,
            //ES6 shorthand property which is just 'text'
            done: false
        };
        items.push(item);
        populateList(items, itemsList);
        //   set item's array into local storage, it's just a key value store and you may only use strings in localStorage.
        // when we add an item, we put it into localStorage and update
        localStorage.setItem('items', JSON.stringify(items));
        //clear the input, this is the form element, and form elements have a method called reset on it.
        this.reset();
    }

    //   why is it an empty object?
    // because if for some reason you forget to pass in sth it's not going to break your JS. It's just going to loop over an array of nothing, and then your map function will work jus fine.
    function populateList(items = [], platesList) {
        platesList.innerHTML = items.map((el, index) => {
            return `
                <li>
                <input type="checkbox" data-index=${index} id="item${index}" ${el.done ? 'checked' : ' '}/>
                    <label for="">${el.text}</label>
                </li>
             `;
        }).join(' ');
    }
    //   we need to attache event listeners to them
    // the whole idea behind event delegation is rather than listening for a click or change on these checkboxes directly, what we do is we are looking for somebody who is going to be on the page at the time of listening.
    function toggleDone(e) {
        console.log(e.target); // 2 different mouse event handles, we click on the checkbox and the label
        //   we want to check if the target matches the thing that we are looking for.
        // jQuery e.target.is('input')
        if (!e.target.matches('input')) return; // skip this  unless it's an input
        const el = e.target;
        const index = el.dataset.index;
        items[index].done = !items[index].done;
        // console.log(el.dataset.index);
        localStorage.setItem('items', JSON.stringify(items));
        populateList(items, itemsList); //update the actual visibility
    }

    //by listening to the submit event we cover all of our bases
    addItems.addEventListener('submit', addItem);
    itemsList.addEventListener('click', toggleDone);
    populateList(items, itemsList);
});
