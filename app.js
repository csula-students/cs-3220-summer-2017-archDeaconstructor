// single state store
class Store {
    constructor (storage) {
        this.storage = storage; // assuming local storage will be passed in as storage
        // these are the key name you can use in Store
        this.CART_KEY = 'CART';
        this.QUEUE_KEY = 'QUEUE';
        this.FOODS_KEY = 'FOODS';
    }

    // you can get item by store.cartItems
    get cartItems () {
        return JSON.parse(this.storage.getItem(this.CART_KEY));
    }

    // to call setter, simply "assign" like store.cartItems = something
    set cartItems (cartItems) {
        this.storage.setItem(this.CART_KEY, JSON.stringify(cartItems));
    }

    get queue () {
        return JSON.parse(this.storage.getItem(this.QUEUE_KEY));
    }

    set queue (queue) {
        this.storage.setItem(this.QUEUE_KEY, JSON.stringify(queue));
    }

    get foods () {
        return JSON.parse(this.storage.getItem(this.FOODS_KEY));
    }

    set foods (foods) {
        this.storage.setItem(this.FOODS_KEY, JSON.stringify(foods));
    }
}

class Cart {
    // take dom element into JavaScript class to attachment events
    constructor(root, store) {
        this.root = root;
        this.store = store;
        this.items = this.store.cartItems;
        this.init();
    }

    init () {
        this.render();
    }

    destroy () {
        tbody.innerHTML = ``;
    }

    removeItem (item) {
        var toRemove = items.indexOf(item);
        items.splice(toRemove, 1);
        this.render();
    }

    placeOrder () {
        // add item to statuses in store as status "in progress"
    }

    render () {
        console.log(this.store.cartItems);
        let tbody = this.root.querySelector('tbody');
        tbody.innerHTML = `<tr class="item">
            <td>'items.imgsrc'<br />'items.name'</td>
            <td>'items.price'</td>
            <td><input type="checkbox" name="quant" value="DontRemove" checked><br></td>
        </tr>`;
    }
}

class CheckoutButton {
    constructor(root, store) {
        this.root = root;
        this.store = store;
        this.onClick = () => this.addItemToCart();
        this.init();
    }

    init () {
        this.root.addEventListener('click', this.onClick);
    }

    destroy () {
    }

    addItemToCart () {
        let cartItems = this.store.cartItems || [];
        console.log(this.root.dataset);
        let d = new Date();
        cartItems.push({
            imgsrc: '<img src="http://img.sndimg.com/food/image/upload/h_420,w_560,c_fit/v1/img/recipes/33/90/71/picNISqBi.jpg" alt="Bagels and Lox (credit to Food Network)" style="width:280px;height:210px;">',
            name: '<p>Bagels w/ Lox</p>',
            price: '<p>$7.95</p>',
            date: d.toDateString(),
            customer: 'D. Lectable',
            status: 'In Progress'
        });
        console.log(cartItems);
        this.store.cartItems = cartItems;
    }
}

class StatusTable {
    // take dom element into JavaScript class to attachment events
    constructor(root, store) {
        this.root = root;
        this.store = store;
        this.items = this.store.cartItems;
        init();
    }

    init () {
        let created = document.querySelector('#createdheader');
        createdheader.addEventListener("click", sort(date));
        let itemheader = document.querySelector('#itemheader');
        itemheader.addEventListener("click", sort(name));
        let customerheader = document.querySelector('#customerheader');
        customerheader.addEventListener("click", sort(customer));
        let statusheader = document.querySelector('#statusheader');
        statusheader.addEventListener("click", sort(status));
        render();
    }

    destroy () {
        tbody.innerHTML = '';
    }

    sort (columnName) {
        dynamicSort(columnName);
        render();
    }

    // render rows of items under table using root.innerHTML
    render () {
        console.log(this.store.cartItems);
        let tbody = this.root.querySelector('tbody');
        tbody.innerHTML = `<tr class="item">
            <td><p>'items.date'</p></td>
            <td>'items.imgsrc'<br />'items.name'</td>
            <td>'items.customer'</td>
            <td>'items.status'</td>
        </tr>`;
    }
}

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

// DOMContentLoaded event will allow us to run the following function when
// everything is ready. Think of the following code will only be executed by
// the end of document
document.addEventListener('DOMContentLoaded', () => {
    let statusTable = document.querySelector('#status-table');
    let cart = document.querySelector('#cart-table');
    let checkoutButtons = document.querySelectorAll('#checkout-button');
    let store = new Store(window.localStorage);
    if (table) {
        new StatusTable(table, store);
    }
    if (cart) {
        new Cart(cart, store);
    }
    if (checkoutButtons && checkoutButtons.length) {
        for (var i = 0; i < checkoutButtons.length; i ++) {
            new CheckoutButton(checkoutButtons[i], store);
        }
    }
});