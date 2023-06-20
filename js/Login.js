const wrapper = document.querySelector('.wrapper');
const login = document.querySelector("#Login")
const closebx = document.querySelector('.icon-close');
const inputbox = document.querySelector('.input-box');

//Firebase configuration
email = document.getElementById("email").value;
passsword = document.getElementById("password").value

//Login function
function validate(){
    email = document.getElementById("email").value;
    passsword = document.getElementById("password").value;

    //Validate input fields
    if(validate_email(email) == false || validate_password(password) == false){
        alert("Email or password is not valid");
        return;
    }

    auth.signinWithEmailAndPassword(email, password)
    .then(function(){
        //Declare user variable
        var user = auth.currentUser;

        //Add this user to Firebase Database
        var database_ref = database.ref();

        //Create User data
        var user_data = {
            last_login : Date.now()
        }

        //Puah to Firebase Database
        database_ref.child('users/' + user.uid).set(user_data)

        //Done
        alert("User loged in succesfully!");
        console.log("User loged in succesfully!");
    })
    .cath(function(error){
        //Firebase will use this to alert of its errors
        var error_code = error.code;
        var error_message = error.message;

        alert(error_message);
     })
}

function validate_email(email){
  expresion = /^[^@]+@\w+(\.\w+)+\w$/
  if(expresion.test(email)){
      return true;
      //Email is valid
  }else{
      //Email is not valid
      return false;
  }
}
function validate_password(password){
  //Only passwor with 6 or more characters
  if(password.length > 6){
      return false;
  }else{
      return true;
  }
}

function validate_field(field){
    if(field == null){
        return false;
    }

    if(field.length <= 0){
        return false;
    }else{
        return true;
    }
}  

login.addEventListener("click", () => {
    wrapper.classList.add("active-popup");
    console.log("login");
});

closebx.addEventListener("click", () => {
    wrapper.classList.remove("active-popup");
    console.log("close");
});