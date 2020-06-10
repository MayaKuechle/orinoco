/**
 * This script makes sure that the submit form and the Nav Contact Bar work
 * It is used on contact.html
 */


/* This function makes sure that only by filling out the submit form correctly, does the send button work */
$(document).ready(function() {
    $('.submit').click(function(event){
        console.log('Clicked button')

        var email = $('.email').val()
        var subject = $('.subject').val()
        var message = $('.message').val()
        var statusElm = $('.status')
        statusElm.empty()

        if(email.length > 5 && email.includes('@') && email.includes('.')) {
            statusElm.append ('<div class="green">Email is valid.</div>')
        } else {
            event.preventDefault()
            statusElm.append ('<div class="red">Email is not valid.</div>')
        }

        if(subject.length >= 2) {
            statusElm.append ('<div class="green">Subject is valid.</div>')
        } else {
            event.preventDefault()
            statusElm.append ('<div class="red">Subject is not valid.</div>')
        }

        if(message.length >= 10) {
            statusElm.append ('<div class="green">Message is valid.</div>')
        } else {
            event.preventDefault()
            statusElm.append ('<div class="red">Message is not valid.</div>')
        }
    })
})

/* Opens the Nav Contact Bar */
function openNavContact() {
    document.getElementById("myNav").style.height = "100%";
}
  
/* Closes the Nav Contact Bar */
function closeNavContact() {
    document.getElementById("myNav").style.height = "0%";
}