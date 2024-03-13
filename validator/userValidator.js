const {check} = require('express-validator');

const userCreateValidator = () => {

    return [
      check("email").notEmpty().withMessage("Email is required"),
      check("email").isEmail().withMessage("Email is wrong format"),
      check("email").matches(/^\w+([\.-]?\w+)*@\w+(\.\w{1,3})+$/).withMessage("Email must not be space and last doc must only 3 letter"),
      check("password").not().isEmpty().withMessage("Password is required"),
      check("password").isLength({min: 3}).withMessage('Password must be at least 3 characters long'),
      check("password").matches(/^[A-Z]\w+$/).withMessage("First Letter must be uppercase and not space in password"),
      check("phone").notEmpty().withMessage("Phone is required"),
      check("phone").isLength({min:9,max:12}).withMessage("Phone must be min :9  and max:12"),
      check("phone").matches(/^\d+$/).withMessage("Phone must be number digit")
    ]
}

module.exports = userCreateValidator;