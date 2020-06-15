/**
 * This script calls the endpoint from API (API:/cameras) and adds called details of chosen camera from "sales.js" to webpage by using URL query parameters and returns item corresponding to given _id
 * It is used on singleproductpage.html
 */



/**
 * We create constants to:
 * 1: Search property that contains the query string portion of the current url
 * 2: Create new URLSearchParams interface that defines utility methods to work with the query string of a URL
 * 3: create a URL parameter to get the "id" of the various cameras
 */

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

/* This function gets the data by fetching it from the endpoint from API (API:/cameras) */
function getData() {

    fetch('http://localhost:3000/api/cameras/'+id)

        .then((response) => {

            return response.json();
        })

        .then((data) => {

        updatePage (data);
        
        });
}

/* This function updates the page by getting the elements By ID from the singleproductpage.html and placing the data from the API into this section */
function updatePage(data) {
    var cameratitle = document.getElementById("cameratitle");
    cameratitle.innerHTML = data.name;

    var cameraimage = document.getElementById("cameraimage");
    cameraimage.src = data.imageUrl;

    var cameradescription = document.getElementById("cameradescription");
    cameradescription.innerHTML = data.description;

    var cameralenses = document.getElementById("cameralenses");
    cameralenses.innerHTML = data.lenses;

    var cameraprice = document.getElementById("cameraprice");
    cameraprice.innerHTML = data.price;
}

$(document).ready(function () {
        var data = getData();
        console.log (data);
    });


/* We declare a variable to add an "addcart" button that adds the item to the cart with the addEventListener 'click' */
let carts = document.querySelectorAll('.addcart');

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        setItems();
        totalcost(setItems[i])
    })
}

/* This function makes sure that the item gets added properly to the localStorage. 
//It makes sure that the localStorage shows not only the id but also the correct quantity 
selected with the TouchSpin on localStorage */
function setItems(products) {
    let cartItems = localStorage.getItem('OrinocoCart');
    cartItems=JSON.parse(cartItems);

    if (cartItems !== null) {

        if(cartItems[id] === undefined || cartItems[id] === null) {
            cartItems = {
                ...cartItems,
                [id]: 0
            }
        }

        var spinner = $("input[name='demo3']").val();
        
        cartItems[id] = spinner;
        
    } else {
        cartItems = {
            [id]: 1
        }
        var spinner = $("input[name='demo3']").val();
        
        cartItems[id] = spinner;
    }
    localStorage.setItem("OrinocoCart", JSON.stringify (cartItems));
}

$("input[name='demo3']").TouchSpin();