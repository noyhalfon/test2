'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _userModel = require('../../models/user-model');

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    addCustomer: function addCustomer(customer) {
        return _userModel2.default.create(customer);
        // customer.save(function(err, customer){
        //     if(err)
        //         return console.error(err);
        // });
    },
    updateCustomer: function updateCustomer(customer, cb) {
        //??? what is cb. and whar exec does
        return _userModel2.default.findOneAndUpdate({ id: customer.Id }, customer).exec();
    },
    removeCustomer: function removeCustomer(customer) {
        customer.remove();
    },
    findCustomerById: function findCustomerById(id) {
        // return new Promise((resolve, reject) => {
        //     CustomerModel.findOne({Id: id}, (err, customer) => {
        //         if (err) reject(err);
        //         else resolve(customer);
        //     });
        // });
        return new Promise(function (resolve, reject) {
            _userModel2.default.findOne({ id: id }).populate('clubs').then(function (customer) {
                return resolve(customer);
            }).catch(function (err) {
                return reject(err);
            });
        });
    },
    findCustomerByObjectId: function findCustomerByObjectId(id) {
        return new Promise(function (resolve, reject) {
            _userModel2.default.findOne({ _id: id }, function (err, customer) {
                if (err) reject(err);else resolve(customer);
            });
        });
    },
    findCustomerByEmail: function findCustomerByEmail(email) {
        return new Promise(function (resolve, reject) {
            _userModel2.default.findOne({ email: email }, function (err, customer) {
                if (err) reject(err);else resolve(customer);
            });
        });
    },
    removeClubById: function removeClubById(customer, clubId) {
        var index;
        var i = 0;
        index = customer.clubs.indexOf(clubId);
        customer.Clubs.splice(index, 1);
        customer.save();
    },
    changePrivateInfo: function changePrivateInfo(custId, index, newItem) {
        this.findCustomerById(custId).then(function (customer) {
            if (customer) {
                customer[index] = newItem;
                customer.save();
            } else {
                console.log("Customer not found");
            }
        }).catch(function (err) {
            console.log(err);
        });
    },
    addCreditOrReceipt: function addCreditOrReceipt(customerId, item, prop) {
        var _this = this;

        this.findCustomerById(customerId).then(function (customer) {
            if (customer) {
                var exists = _this.findCreditOrReceipt(customer, item.id, prop); //customer.Credits.find(isCreditExists => isCreditExists.Id == credit.Id);
                if (!exists) {
                    customer[prop].push(item);
                    customer.save();
                } else {
                    console.log("Credit is exists");
                }
            }
        }).catch(function (err) {
            console.log(err);
        });
    },
    removeCreditOrReceipt: function removeCreditOrReceipt(customerId, creditId, prop) {
        var _this2 = this;

        this.findCustomerById(customerId).then(function (customer) {
            if (customer) {
                var index = _this2.getIndexOfCreditOrReceipt(customer, creditId, prop);
                customer[prop].splice(index, 1);
                customer.save();
            } else {
                console.log("Customer wasnt found");
            }
        }).catch(function (err) {
            console.log(err);
        });
    },
    findCreditOrReceipt: function findCreditOrReceipt(customer, creditId, prop) {
        return customer[prop].find(function (credit) {
            return credit.id == creditId;
        });
    },
    getIndexOfCreditOrReceipt: function getIndexOfCreditOrReceipt(customer, creditId, prop) {
        var index = 0;
        var i = 0;
        customer[prop].forEach(function (credit) {
            if (credit.id == creditId) index = i;
            i++;
        });
        return index;
    },
    changeCreditOrReceiptInfo: function changeCreditOrReceiptInfo(customerId, creditId, itemIndex, newItem, prop) {
        var _this3 = this;

        this.findCustomerById(customerId).then(function (customer) {
            if (customer) {
                var credit = _this3.findCreditOrReceipt(customer, creditId, prop);
                if (credit) {
                    credit[itemIndex] = newItem;
                    customer.save();
                } else {
                    console.log("Credit wasnt found");
                }
            } else {
                console.log("Customer not found");
            }
        }).catch(function (err) {
            console.log(err);
        });
    },
    addItemCreditOrReceipt: function addItemCreditOrReceipt(customerId, creditId, newItem, prop) {
        var _this4 = this;

        this.findCustomerById(customerId).then(function (customer) {
            if (customer) {
                var credit = _this4.findCreditOrReceipt(customer, creditId, prop);
                if (credit) {
                    credit.items.push(newItem);
                    customer.save();
                } else {
                    console.log("Credit wasnt found");
                }
            } else {
                console.log("Customer not found");
            }
        }).catch(function (err) {
            console.log(err);
        });
    },
    changeItemsCreditOrReceipt: function changeItemsCreditOrReceipt(customerId, creditId, newItem, oldItem, prop) {
        var _this5 = this;

        this.findCustomerById(customerId).then(function (customer) {
            if (customer) {
                var i = _this5.getIndexOfCreditOrReceipt(customer, creditId, prop);
                var credit = _this5.findCreditOrReceipt(customer, creditId, prop);
                if (credit != -1) {
                    var index = credit.items.indexOf(oldItem);
                    // customer.Credits[i].items[index] = newItem;
                    customer.Credits[i].items.splice(index, 1);
                    customer.Credits[i].items.push(newItem);
                    customer.save();
                } else {
                    console.log("Credit wasnt found");
                }
            } else {
                console.log("Customer not found");
            }
        }).catch(function (err) {
            console.log(err);
        });
    },
    removeItemsCreditOrReceipt: function removeItemsCreditOrReceipt(customerId, creditId, oldItem, prop) {
        var _this6 = this;

        this.findCustomerById(customerId).then(function (customer) {
            if (customer) {
                var i = _this6.getIndexOfCreditOrReceipt(customer, creditId, prop);
                var credit = _this6.findCreditOrReceipt(customer, creditId, prop);
                if (credit) {
                    var index = credit.items.indexOf(oldItem);
                    customer[prop][i].items.splice(index, 1);
                    customer.save();
                } else {
                    console.log("Credit wasnt found");
                }
            } else {
                console.log("Customer not found");
            }
        }).catch(function (err) {
            console.log(err);
        });
    }
};
//# sourceMappingURL=customer.repository.js.map
