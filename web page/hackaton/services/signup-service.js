let array = [];
let ver = true;
const passw = new RegExp ('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$');


let signupService = {
    getInput: () => {
        $("#submitsign").on("click", () => {
            let user = {
                username: $("#usernamesignup").val(),
                password: $("#passwordsignup").val(),
                confirmPW: $("#confirmPW").val(),
                email: $("#emailsignup").val()
            };
            
            
            //check password
            let pwVer = user.password === user.confirmPW;
            pwVer ? console.log('pw match') : alert("Passwords do not match");
            if (!passw.test(user.password)){
                    
                    alert("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character");
                    console.log("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character");
                    return;
                }

            // Check if localStorage is empty and check conditions for first account 

            // Check if username or email already exists in localStorage
            let isDuplicate = false;
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    let client = localStorage.getItem(key);
                    let objectClient = JSON.parse(client);

                    if (user.username === objectClient.username || user.email === objectClient.email) {
                        alert("Account already taken. Please choose a different username or email.");
                        isDuplicate = true;
                        break;
                    }
                }
            }
            
    

            if (!isDuplicate) {                                  

                alert("Welcome to Zen Master dear " + user.username + ". Please Login to continue your journey");

                localStorage.setItem(localStorage.length + 1, JSON.stringify(user));
                window.location.hash = "#home";
                console.log("Account created successfully");

                // Retrieve existing users from localStorage or initialize an empty array
                let users = JSON.parse(localStorage.getItem("users")) || [];

                // Add the new user to the array
                users.push(user);

                // Store the updated user data back in localStorage
                localStorage.setItem("users", JSON.stringify(users));
            }

           
        });
    }
};

export default signupService;


