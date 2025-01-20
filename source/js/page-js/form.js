//=======================get data from form Register============================//
function deleteKeysFromLocalStorage(keys) {
    keys.forEach(key => {
        localStorage.removeItem(key);
        console.log(`Deleted key: ${key}`);
    });
  
}

// Function to delete keys from localStorage

// List of keys to delete
const keysToDelete = [
    "Chandy neat"
   


];

// Call the function to delete the specified keys
deleteKeysFromLocalStorage(keysToDelete);
document.getElementById("submit-register").addEventListener("click", (e) => {
    e.preventDefault();
    
    // Retrieve values from input fields
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Check if all fields are filled
    if (name && email && password) {
        // Create an object to hold the registration data
        let dataRegister = {
            Name: name,
            Email: email,
            Password: password
        };
      
        // Store the object in localStorage as a JSON string
        localStorage.setItem("registrationData", JSON.stringify(dataRegister));
        
        // Optional: Confirm storage
        console.log("Stored data:", dataRegister);
        
        // Redirect to the desired page
        window.location.href = "../../index.html"; 
        
        // Reset input values
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
    } else {
        alert("Please fill in all fields.");
    }
});

    
  //=======================get data from form Register============================//
  //=======================get data from form login============================//
  document.getElementById("submit-login").addEventListener("click", (e) => {
    e.preventDefault();
    
    // Retrieve values from input fields
    const emailLogin = document.getElementById("email-login").value;
    const passwordLogin = document.getElementById("password-login").value;

    // Check if all fields are filled
    if (emailLogin && passwordLogin) {
        // Retrieve the registration data from localStorage
        const storedData = localStorage.getItem("registrationData");
        if (storedData) {
            const dataRegister = JSON.parse(storedData);

            // Validate the login credentials
            if (dataRegister.Email === emailLogin && dataRegister.Password === passwordLogin) {
                // Redirect to the desired page
                window.location.href = "../../index.html"; 

                // Reset input values
                document.getElementById("email-login").value = "";
                document.getElementById("password-login").value = "";
            } else {
                alert("Invalid email or password. Please try again.");
            }
        } else {
            alert("No registration data found. Please register first.");
        }
    } else {
        alert("Please fill in all fields.");
    }
});

  //=======================get data from form login============================//
  