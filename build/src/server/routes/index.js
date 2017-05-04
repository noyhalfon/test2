'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _userModel = require('../.././models/user-model');

var _userModel2 = _interopRequireDefault(_userModel);

var _customer = require('../.././database/repositories/customer.repository');

var _customer2 = _interopRequireDefault(_customer);

var _crypto = require('../.././services/crypto.service');

var _crypto2 = _interopRequireDefault(_crypto);

var _datetime = require('../.././helpers/datetime.functions');

var _datetime2 = _interopRequireDefault(_datetime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.status(200).json({ response: "OK!" });
});

router.post('/', function (req, res, next) {
  var password = req.body.password;
  var email = req.body.email;

  _customer2.default.findCustomerByEmail(email).then(function (customer) {
    _crypto2.default.isMatch(password, customer.password).then(function (match) {
      if (match) {
        console.log("customer logged in");
        res.status(200).json({ isAuth: true, customer: customer });
      } else {
        res.status(200).json({ isAuth: false });
        console.log("wrong password");
      }
    }).catch(function (err) {
      console.log(err);
    });
  }).catch(function (err) {
    console.log("customer wasnt found");
    res.status(200).json({ isAuth: false });
  });
});

router.post('/singup', function (req, res, next) {
  var id = req.body.id;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var password = req.body.password;
  var address = req.body.address;
  var email = req.body.email;
  var phone = req.body.phone;
  var birthday = req.body.birthday;
  //TODO#username

  var customer = new _userModel2.default({
    id: id,
    username: firstName,
    firstName: firstName,
    lastName: lastName,
    password: password,
    address: address,
    email: email,
    age: _datetime2.default.calculateAge(birthday),
    phoneNumber: phone,
    img: "",
    birthday: birthday,
    clubs: [],
    credits: [],
    receipts: []
  });

  console.log(customer);
  _customer2.default.addCustomer(customer);

  res.status(200).json({ isAuth: true });
});

exports.default = router;
//# sourceMappingURL=index.js.map
