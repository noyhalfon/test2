'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _userClubModel = require('../../models/user-club-model');

var _userClubModel2 = _interopRequireDefault(_userClubModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    addUserClub: function addUserClub(userClub) {
        userClub.save();
    }
};
//# sourceMappingURL=userClub.repository.js.map
