function login() {
    //Get email info//
    let emailentered= document.getElementById("email").value

    //GET code//
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://desktop-87aa.restdb.io/rest/userinfo",
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        }
      }
      
      $.ajax(settings).done(function (data) {
      });

      }

const APIKEY = "67a447880b037f5d6b192c9d"; 
const APIURL = "https://desktop-87aa.restdb.io/rest/userinfo"; 

