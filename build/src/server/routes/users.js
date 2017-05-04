'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userModel = require('../.././models/user-model');

var _userModel2 = _interopRequireDefault(_userModel);

var _customer = require('../.././database/repositories/customer.repository');

var _customer2 = _interopRequireDefault(_customer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* GET users listing. */
router.get('/:id', function (req, res, next) {

  var id = req.params.id;
  _customer2.default.findCustomerById(id).then(function (customer) {
    if (customer) {
      res.status(200).json(customer);
    } else {
      console.log("user not found");
      res.status(200).json({ customer: customer });
    }
  }).catch(function (err) {
    console.log(err);
    res.status(500).end();
  });
});

router.post('/update', function (req, res, next) {
  var user = req.body.user;

  _customer2.default.updateCustomer(user).then(function (userUpdated) {
    res.status(200).json(true);
  }).catch(function (err) {
    console.log('User was not updated', err);
    res.status(500).json(false);
  });
});

exports.default = router;
//# sourceMappingURL=users.js.map
