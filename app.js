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
        // TODO: attach remove cart items to rendered HTML
    }

    destroy () {
        tbody.innerHTML = ``;
    }

    removeItem (item) {
        // TODO: logic to remove an item from cart
        this.render();
    }

    placeOrder () {
        // add item to statuses in store as status "in progress"
    }

    render () {
        console.log(this.store.cartItems);
        let tbody = this.root.querySelector('tbody');
        tbody.innerHTML = `<tr class="item">
            <td>'items[1]'<br />'items[2]'</td>
            <td>'items[3]'</td>
        </tr>`;
    }
}

class CheckoutButton {
    constructor(root, store, array) {
        this.root = root;
        this.store = store;
        this.array = ;
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
        store.cartItems = array[i];
        console.log(this.root.dataset);
        cartItems.push({
            name: 'test'
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
        init();
    }

    init () {
        // attach click event listener to table header row on each column
        render();
    }

    destroy () {
        // remove all the events attached from init
    }

    sort (columnName) {
        // after sorting the array of statuses, re render item to update view
        render();
    }

    // render rows of items under table using root.innerHTML
    render () {
        console.log(this.store.cartItems);
        let tbody = this.root.querySelector('tbody');
        let d = new Date();
        tbody.innerHTML = `<tr class="item">
            <td><p>'d.toDateString()'</p></td>
            <td>'items[1]'<br />'items[2]'</td>
            <td><p>D. Lectable<p></td>
            <td><p>In Progress<p></td>
        </tr>`;
    }
}

// DOMContentLoaded event will allow us to run the following function when
// everything is ready. Think of the following code will only be executed by
// the end of document
document.addEventListener('DOMContentLoaded', () => {
    let statusTable = document.querySelector('#status-table');
    let cart = document.querySelector('#cart-table');
    let checkoutButtons = document.querySelectorAll('#checkout-button');
    let array1 = ['<img src="http://img.sndimg.com/food/image/upload/h_420,w_560,c_fit/v1/img/recipes/33/90/71/picNISqBi.jpg" alt="Bagels and Lox (credit to Food Network)" style="width:280px;height:210px;">',
    '<p>Bagels w/ Lox</p>','<p>$7.95</p>'];
    let array2 = ['<img src="http://food.fnr.sndimg.com/content/dam/images/food/fullset/2003/11/18/0/ei1b04_baked_salmon.jpg.rend.hgtvcom.616.462.jpeg" alt="Salmon Baked in Foil (credit to Giada de Laurentiis and Food Network)" style="width:280px;height:210px;">',
    '<p>Salmon Baked in Foil</p>','<p>$8.55</p>'];
    let array3 = ['<img src="http://food.fnr.sndimg.com/content/dam/images/food/fullset/2009/2/1/0/AI0212-1_Cheese-Quesadillas_s4x3.jpg.rend.hgtvcom.616.462.jpeg" alt="Three Cheese Quesadillas (credit Aida Mollenkamp and Food Network" style="width:280px;height:210px;">',
    '<p>Three Cheese Quesadillas</p>','<p>$7.35</p>'];
    let array = [array1,array2,array3];

    let store = new Store(window.localStorage);
    if (table) {
        new StatusTable(table, store);
    }
    if (cart) {
        new Cart(cart, store);
    }
    if (checkoutButtons && checkoutButtons.length) {
        for (var i = 0; i < checkoutButtons.length; i ++) {
            new CheckoutButton(checkoutButtons[i], store, array[i]);
        }
    }
});