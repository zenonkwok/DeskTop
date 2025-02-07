function login() {
  const APIKEY = "67a447880b037f5d6b192c9d";
  const APIURL = "https://desktop-87aa.restdb.io/rest/userinfo";

  // Get email and password inputs
  let emailEntered = document.getElementById("email").value.trim();
  let passwordEntered = document.getElementById("password").value.trim();

  if (!emailEntered || !passwordEntered) {
    alert("Please enter both email and password.");
    return;
  }

  let settings = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": APIKEY,
      "Cache-Control": "no-cache"
    },
  };

  fetch(APIURL, settings)
    .then(response => response.json())
    .then(users => {
      console.log(users);

      let user = null;

      // Use a for loop to find the user
      for (let i = 0; i < users.length; i++) {
        if (users[i].Email === emailEntered && users[i].Password === passwordEntered) {
          user = users[i]; 
          break; // Exit loop once a match is found
        }
      }
      

      if (user) {
        alert("Login successful!");
        window.location.href = "profile.html";
      } else {
        alert("Invalid email or password. Please try again.");
      }
    })
    .catch(error => {
      console.error("Error fetching user data:", error);
      alert("An error occurred. Please try again later.");
    });
}
