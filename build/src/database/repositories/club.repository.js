"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _clubModel = require("../../models/club-model");

var _clubModel2 = _interopRequireDefault(_clubModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    addClub: function addClub(club) {
        club.save();
    },
    findClubById: function findClubById(id) {
        return new Promise(function (resolve, reject) {
            _clubModel2.default.findOne({ id: id }, function (err, club) {
                if (err) reject(err);else resolve(club);
            });
        });
    },
    findClubByObjectId: function findClubByObjectId(id) {
        return new Promise(function (resolve, reject) {
            _clubModel2.default.findOne({ _id: id }, function (err, club) {
                if (err) reject(err);else resolve(club);
            });
        });
    },
    getAllClubs: function getAllClubs() {
        return new Promise(function (resolve, reject) {
            _clubModel2.default.find({}, function (err, clubs) {
                if (err) reject(err);else resolve(clubs);
            });
        });
    },
    removeCustomerById: function removeCustomerById(club, customerId) {
        var index = 0;
        var i = 0;
        club.usersClub.forEach(function (userClub) {
            if (userClub.customerId == customerId) index = i;
            i++;
        });

        club.usersClub.splice(index, 1);
        club.save();
    },
    addSale: function addSale(club, sale) {
        club.sales.push(sale);
        club.save();
    },
    findSale: function findSale(club, saleId) {
        return club.sales.find(function (sale) {
            return sale.id == saleId;
        });
    },
    removeSale: function removeSale(club, saleId) {
        var i = 0;
        var index = 0;
        club.sales.forEach(function (sale) {
            if (sale.id == saleId) {
                index = i;
            }
            i++;
        });
        club.sales.splice(index, 1);
        club.save();
    },
    addPointsToClub: function addPointsToClub(club, customerId, points) {
        club.usersClub.forEach(function (userClub) {
            if (customerId.equals(userClub.customerId)) {
                userClub.points = parseInt(userClub.Points) + parseInt(points);
            }
        });
        club.save();
    },
    RemovePointsFromClub: function RemovePointsFromClub(club, customerId, points) {
        club.usersClub.forEach(function (userClub) {
            if (customerId.equals(userClub.customerId)) {
                userClub.points = parseInt(userClub.points) - parseInt(points);
            }
        });
        club.save();
    },
    changeInfo: function changeInfo(clubId, itemIndex, newItem) {
        this.findClubById(clubId).then(function (club) {
            if (club) {
                club[itemIndex] = newItem;
                club.save();
            } else {
                console.log("club not found");
            }
        }).catch(function (err) {
            console.log(err);
        });
    },
    changeSaleInfo: function changeSaleInfo(clubId, saleId, itemIndex, newItem) {
        var _this = this;

        this.findClubById(clubId).then(function (club) {
            if (club) {
                var sale = _this.findSale(club, saleId);
                if (sale) {
                    sale[itemIndex] = newItem;
                    club.save();
                } else {
                    console.log("Sale wasnt found");
                }
            } else {
                console.log("Club not found");
            }
        }).catch(function (err) {
            console.log(err);
        });
    },
    addBranch: function addBranch(clubId, branchId) {
        var _this2 = this;

        this.findClubById(clubId).then(function (club) {
            if (club) {
                _this2.findClubById(branchId).then(function (branch) {
                    if (branch) {
                        if (club.branches.indexOf(branch._id) == -1) {
                            club.branches.push(branch._id);
                            club.save();
                        }
                    } else {
                        console.log("Branch wasnt found");
                    }
                }).catch(function (err) {
                    console.log(err);
                });
            } else {
                console.log("Club wasnt found");
            }
        }).catch(function (err) {
            console.log(err);
        });
    },
    removeBranch: function removeBranch(clubId, branchId) {
        var _this3 = this;

        this.findClubById(clubId).then(function (club) {
            if (club) {
                _this3.findClubById(branchId).then(function (branch) {
                    if (branch) {
                        var index = club.branches.indexOf(branch._id);
                        club.branches.splice(index, 1);
                        club.save();
                    } else {
                        console.log("Branch wasnt found");
                    }
                }).catch(function (err) {
                    console.log(err);
                });
            } else {
                console.log("Club wasnt found");
            }
        }).catch(function (err) {
            console.log(err);
        });
    }
};
//# sourceMappingURL=club.repository.js.map
