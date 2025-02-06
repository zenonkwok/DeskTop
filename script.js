function login() {
  const APIKEY = "67a447880b037f5d6b192c9d"; 
  const APIURL = "https://desktop-87aa.restdb.io/rest/userinfo"; 
    //Get email info//
    let emailentered= document.getElementById("email").value

    let settings = {
      method: "GET", //[cher] we will use GET to retrieve info
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
      },
    }

    //[STEP 8]: Make our AJAX calls
    // Once we get the response, we modify our table content by creating the content internally. We run a loop to continuously add on data
    // RESTDb/NoSql always adds in a unique id for each data; we tap on it to have our data and place it into our links 
    fetch(APIURL, settings)
      .then(response => response.json())
      .then(response => {
        console.log(response);

        window.location.href = "profile.html"

      });
    }
