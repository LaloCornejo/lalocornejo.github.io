// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Firebase Variables
const auth = firebase.auth()
const database = firebase.database()


// //Validate input fields
// if(validate_email(email) == false || validate_password(password) == false){
    //     alert("Email or password is not valid")
    //     return
    // }
    
    
    // function validate_email(email){
//   expresion = /^[^@]+@\w+(\.\w+)+\w$/
//   if(expresion.test(email)){
    //       return true
    //       //Email is valid
    //   }else{
        //       //Email is not valid
        //       return false
//   }
// }
// function validate_password(password){

    //   //Only passwor with 6 or more characters
//   if(password.length > 6){
    //       return false
//   }else{
//       return true
//   }
// }

// function validate_field(field){
    //     if(field == null){
        //         return false
        //     }
        
        //     if(field.length <= 0){
//         return false
//     }else{
    //         return true
    //     }
    // }  
    
    //Login function
    function loggin(){
    //Firebase configuration
    email = document.getElementById("email").value
    passsword = document.getElementById("password").value

    auth.signinWithEmailAndPassword(email, password)
    .then(function(){
        //Declare user variable
        var user = auth.currentUser

        //Add this user to Firebase Database
        var database_ref = database.ref()

        //Create User data
        var user_data = {
            last_login : Date.now()
        }

        //Puah to Firebase Database
        database_ref.child('users/' + user.uid).set(user_data)

        //Done
        alert("User loged in succesfully!")
        console.log("User loged in succesfully!")
    })
    .cath(function(error){
        //Firebase will use this to alert of its errors
        var error_code = error.code
        var error_message = error.message

        alert(error_message)
     })
}