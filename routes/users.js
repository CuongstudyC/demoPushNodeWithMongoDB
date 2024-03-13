var express = require('express');
var router = express.Router();
const userModel = require('../model/userModel');
const { validationResult } = require('express-validator');
const userValidator = require('../validator/userValidator');

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const users = await userModel.find({});
  res.render('user/index', { users: users });
});

router.get('/create', (req, res) => {
  res.render('user/create');
});

router.post('/create', userValidator(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log(errors.errors);
    //thay vi dung errors.array thi co the dung errors.errors
    const email = errors.errors.find(errorItem => errorItem.path === 'email');
    const password = errors.errors.find(errorItem => errorItem.path === 'password');
    const phone = errors.errors.find(errorItem => errorItem.path === 'phone');
    const newErrors = [];
    if (email) newErrors.push(email);
    if (password) newErrors.push(password);
    if (phone) newErrors.push(phone);

    return res.render('user/create',
      {
        errors: newErrors,
        email: (req.body.email) ? req.body.email : null,
        fullname: (req.body.fullname) ? req.body.fullname : null,
        phone: (req.body.phone) ? req.body.phone : null
      });
  } else {
    const body = req.body;
    let user = new userModel({
      email: body.email,
      password: body.password,
      fullname: body.fullname,
      phone: body.phone
    });

    await user.save();
    res.redirect('/user');
  }


});

module.exports = router;
