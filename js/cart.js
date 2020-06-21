/**
 * This script shows all items that are in the cart (from the localStorage) and by submitting the submit form 
 * and clicking the checkout button you can checkout with your order
 * 
 * It is used on cart.html
 */


/* This function makes sure that only by filling out the submit form correctly, does the checkout button at the bottom work */
$(document).ready(function() {

    function validate () {
        var fname = $('.fname').val()
        var lname = $('.lname').val()
        var email2 = $('.email2').val()
        var address = $('.address').val()
        var city = $('.city').val()
        var statusElm = $('.status')
        statusElm.empty()

        var isValid = true


        if(fname.length < 2) {
            isValid=false
            statusElm.append ('<div class="red">First Name is not valid.</div>')
        }

        if(lname.length < 2) {
            isValid=false
            statusElm.append ('<div class="red">Last Name is not valid.</div>')
        }

        if(email2.length < 5) {
            isValid=false
            statusElm.append ('<div class="red">Email is not valid.</div>')
        }

        if(address.length < 9) {
            isValid=false
            statusElm.append ('<div class="red">Address is not valid.</div>')
        }

        if(city.length < 4) {
            isValid=false
            statusElm.append ('<div class="red">City is not valid.</div>')
        }
        return isValid
    }

    $('.submit').click(function(event){

        var isValid = validate();

        if (isValid == true) {

            let cartItems = localStorage.getItem('OrinocoCart');
            cartItems=JSON.parse(cartItems);

            var cartProducts = [];
            for(id in cartItems) {
                cartProducts.push(id);
                console.log(cartProducts);
            }

            var order = {"contact":{
                "firstName": $('.fname').val(),
                "lastName": $('.lname').val(),
                "address": $('.address').val(),
                "city": $('.city').val(),
                "email": $('.email2').val()
                },
                "products": cartProducts
            };

            sendOrder(order);

            window.location.href = "order.html";
        }
    })
})  

var url = "http://localhost:3000/api/cameras/order";

/* This function calls the getCartItems function */
$(document).ready(function () {
    getCartItems();
});

function sendOrder(order) {
        $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            contentType: 'application/json',
            data: JSON.stringify(order),
            success: function(data){ 
                console.log (data);
                //window.localStorage.clear();
            },
                error: function(jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

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
            //window.localStorage.clear();
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

/* This function visualizes the cart items onto the page by creating card rows */
function updatePage(data, quantity) {

    console.log("quantity="+quantity);

    var cartRow = document.getElementById ("cart-row-two");

        var currentDiv = document.createElement("div");
        currentDiv.className="cartRow";

        newDiv = document.createElement("h1");

        newDiv.id = "cameratitlefinal";

        newDiv.className = "cart-row-two partone";

        newDiv.innerHTML = data.name;


        currentDiv.appendChild(newDiv);
        var newDiv = document.createElement("img");

        newDiv.id = "cameraimagefinal";

        newDiv.className = "cart-row-two partone card-img-top";

        newDiv.src = data.imageUrl;


        currentDiv.appendChild(newDiv);

        newDiv = document.createElement("p");

        newDiv.id = "price";

        newDiv.className = "cart-row-two cart-column-two";

        newDiv.innerHTML = data.price;


        currentDiv.appendChild(newDiv);

        newDiv = document.createElement("p");

        newDiv.id = "quantity";

        newDiv.className = "cart-row-two parttwo cart-column-two";

        newDiv.innerHTML = quantity;

        
        totalPrice += data.price * quantity;


        currentDiv.appendChild(newDiv);
        cartRow.appendChild(currentDiv);
}

/* This function displays the total price of all items in the cart */
function displayTotalPrice(totalPrice) {

    var currentDiv = document.getElementById ("cart-total");

        var newDiv = document.createElement("div");
        currentDiv.appendChild(newDiv);

        newDiv = document.createElement("p");

        newDiv.id = "totalprice";

        newDiv.className = "cart-total-price";

        newDiv.innerHTML = "<strong>Total: </strong></br>" + totalPrice;

        currentDiv.appendChild(newDiv);
}