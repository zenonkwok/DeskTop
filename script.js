function login() {
    //Set API key//
    APIKEY = "67a447880b037f5d6b192c9d"

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
        console.log(data);
      });

      if (data.username == "admin" && data.password == "admin") {
        window.location.href = "admin.html";
      }
}