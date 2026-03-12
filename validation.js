export function validateForm(data) {
    console.log("Server Side Validation");
    console.log(data)

    //store errors in an array errors
    const errors = [];

    if(data.fname.trim() == ""){
        errors.push("First name is required.");
    }

    if(data.lname.trim() == ""){
        errors.push("Last name is required.");
    }

    if(data.email.trim() == ""){
        errors.push("Email is required.");
    }

    const validMethods = ['pickup', 'delivery'];
    if(!validMethods.includes(data.method)){
        errors.push("Method must be pickup or delivery");
    }

    const validSizes = ['small', 'medium', 'large'];
    if(!validSizes.includes(data.size)){
        errors.push("Size must be small, medium, or large");
    }

    console.log(errors);
    return {
        isValid: errors.length === 0,
        errors: errors
    }
}

/* data object
{
  fname: 'Barry',
  lname: 'Allen',
  email: 'ballen@mail.edu',
  method: 'delivery',
  toppings: [ 'mushrooms', 'artichokes', 'tomatoes' ],
  size: 'large',
  comment: 'gotta go fast',
  discount: 'on'
}
*/