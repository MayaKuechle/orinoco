/**
 * This script makes sure that customer sees total price of order
 * It is used on order.html
 */

 
/* This function calls the getCartItems function */
$(document).ready(function () {
    getCartItems();
});

    var totalPrice = 0;

/* This function gets the cart items from the localStorage */
function getCartItems () {

    let cartItems = localStorage.getItem('OrinocoCart');
    cartItems=JSON.parse(cartItems);

    for(id in cartItems) {
    
    var quantity = cartItems[id];

     $.ajax({
        type: "GET",
        url: 'http://localhost:3000/api/cameras/' + id,
        dataType: "json",
        contentType: 'application/json',
        success: function(data){
            updatePage (data, quantity);
        },
            error: function(jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
    },
	async: false
      });
    }

    displayTotalPrice(totalPrice);

    console.log(totalPrice);
}

/* This function visualizes the cart items onto the page by creating a card row */
function updatePage(data, quantity) {

    console.log(data);

    var cartRow = document.getElementById ("cart-total-final");
        
    totalPrice += data.price * quantity;
}
    
/* This function displays the total price of all items in the cart */
function displayTotalPrice(totalPrice) {

    var currentDiv = document.getElementById ("cart-total-final");

        var newDiv = document.createElement("div");
        currentDiv.appendChild(newDiv);

        newDiv = document.createElement("p");

        newDiv.id = "totalpricefinal";

        newDiv.className = "cart-total-price-final";

        newDiv.innerHTML = "<strong>Total: </strong></br>" + totalPrice;

        currentDiv.appendChild(newDiv);
}