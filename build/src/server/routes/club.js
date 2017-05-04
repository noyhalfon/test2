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

var _clubModel = require('../.././models/club-model');

var _clubModel2 = _interopRequireDefault(_clubModel);

var _userClubModel = require('../.././models/user-club-model');

var _userClubModel2 = _interopRequireDefault(_userClubModel);

var _customer = require('../.././database/repositories/customer.repository');

var _customer2 = _interopRequireDefault(_customer);

var _club = require('../.././database/repositories/club.repository');

var _club2 = _interopRequireDefault(_club);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res, next) {
    _club2.default.getAllClubs().then(function (clubs) {
        if (clubs) {
            res.status(200).json(clubs);
        } else {
            console.log("club.js: no clubs ");
            res.status(200).json(clubs);
        }
    }).catch(function (err) {
        console.log(err);
        res.status(500).json(clubs);
    });
});

router.get('/user/:id', function (req, res, next) {
    var id = req.params.id;

    _customer2.default.findCustomerById(id).then(function (customer) {
        _clubModel2.default.find({ _id: { $in: customer.clubs } }).then(function (clubs) {
            res.status(200).json({ clubs: clubs });
        });
    });
});

exports.default = router;
//# sourceMappingURL=club.js.map
