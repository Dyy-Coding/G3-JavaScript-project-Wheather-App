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
    // "registrationData"
   


];

// Call the function to delete the specified keys
deleteKeysFromLocalStorage(keysToDelete);
function loadFile(event) {
    const output = document.getElementById('output');
    const fileInput = document.getElementById('profile-pic');
    
    // Check if a file is selected
    if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        console.log("Selected file:", file.name); // Log the file name
        
        // Create a URL for the image and display it
        output.src = URL.createObjectURL(file);
        output.style.display = 'block'; // Show the image
    }
}

document.getElementById("submit-register").addEventListener("click", (e) => {
    e.preventDefault();
    
    // Retrieve values from input fields
    const profilePicture = document.getElementById("output").src; // Get the image source
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Check if all fields are filled
    if (name && email && password && profilePicture) {
        // Create an object to hold the registration data
        let dataRegister = {
            Name: name,
            Email: email,
            Password: password,
            Profile: profilePicture // Store image source
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
        document.getElementById("output").style.display = "none"; // Hide the image
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

  //=======================Get data user to store in profile============================//
   // Get references to the HTML elements
   const proPicture = document.getElementById("profile");
   const profileName = document.getElementById("profile-name");
   const emailProfile = document.getElementById("email");
   const locationProfile = document.getElementById("location");
   const dateProfile = document.getElementById("date-sign");

   // Retrieve data from localStorage
   const data = JSON.parse(localStorage.getItem("registrationData"));

   if (data) {
       // Set profile picture
       proPicture.src = data.Profile; // Set profile picture source
       
       // Set name and email
       profileName.textContent = data.Name; // Display name
       emailProfile.textContent = data.Email; // Display email
       
       // Set location and date
       locationProfile.textContent = "Location: " + (data.Location || "Not Provided");
       const currentDate = new Date();
       dateProfile.textContent = `Profile created on: ${currentDate.toLocaleString()}`; // Display current date and time
   } else {
       // Handle case where no data is found
       profileName.textContent = "No profile data found.";
   }


  //=======================Get data user to store in profile============================//

  