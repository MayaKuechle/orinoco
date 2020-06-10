/**
 * This script gets all cameras from the API and places them in card rows.
 * It is used on sales.html
 */


/* This function updates the page by creating card rows with the different details of the cameras */
function updatePage(result) {

    var cardRow=document.getElementById ("cameracard");

    for ( i = 0; i < result.length;i++)
    {
        var currentDiv = document.createElement("div");
        currentDiv.className="col-md-4";

        var newDiv = document.createElement("img");

        newDiv.id = "myCameraPicture";

        newDiv.className = "myCameraPicture responsive";

        newDiv.src=result[i].imageUrl;


        currentDiv.appendChild(newDiv);

        newDiv = document.createElement("h3");

        newDiv.id = "myCameraBrand";

        newDiv.className = "myCameraBrand";

        newDiv.innerHTML="Brand: " + result[i].name;


        currentDiv.appendChild(newDiv);

        newDiv = document.createElement("div");

        newDiv.id = "myCameraDescription";

        newDiv.className = "myCameraDescription";

        newDiv.innerHTML="<strong>Description:</strong> </br>" + result[i].description;

        
        currentDiv.appendChild(newDiv);

        newDiv = document.createElement("div");

        newDiv.id = "myCameraLenses";

        newDiv.className = "myCameraLenses";

        newDiv.innerHTML="<strong>Lenses: </strong></br>" + result[i].lenses;


        currentDiv.appendChild(newDiv);

        newDiv = document.createElement("div");

        newDiv.id = "myCameraPrice";

        newDiv.className = "myCameraPrice";

        newDiv.innerHTML="<strong>Price: </strong></br>" + result[i].price;
        

        currentDiv.appendChild(newDiv);

        newDiv = document.createElement("a");

        newDiv.id = "Info";

        newDiv.className = "btn btn-primary btn-lg infobutton";

        newDiv.innerHTML="Info";

        newDiv.href = "singleproductpage.html?id=" + result[i]._id;


        currentDiv.appendChild(newDiv);
        cardRow.appendChild(currentDiv);
    }
}

/* This function gets the data by fetching it from the endpoint from API (API:/cameras) */
function getData() {

    fetch('http://localhost:3000/api/cameras')

        .then((response) => {

            return response.json();
        })

        .then((data) => {

            console.log(data);

            updatePage(data);
        });
}

/* This function calls the getData function */
$(document).ready(function () {
    getData();
});