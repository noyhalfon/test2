import mongoose from 'mongoose';
import Crypto from '../services/crypto.service';
import { ClubSchema } from './club-model';
import Club from './club-model';
import ManagerValidator from './validations/manager-schema-validations';

const Schema = mongoose.Schema;

const ManagerSchema = new Schema({
    id: Number,
    userName: String,
    firstName: String,
    lastName: String,
    password: String,
    email: String,
    clubs: [{type : mongoose.Schema.Types.ObjectId, ref : 'Club'}],
    permissions: String
});

ManagerSchema.pre('save', function(next) {
    var manager = this;

    Crypto.encrypt(manager.password).then((value) => {
        manager.password = value;
        next();
    });
});

ManagerValidator.runManagerValidations(ManagerSchema);

export { ManagerSchema };
export default mongoose.model('Manager', ManagerSchema);