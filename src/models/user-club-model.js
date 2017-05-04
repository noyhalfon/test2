import mongoose from 'mongoose';
import { CustomerSchema } from './user-model';
import Customer from './user-model';

const Schema = mongoose.Schema;

const UserClubSchema = new Schema({
    id: Number,
    customerId: {type : mongoose.Schema.Types.ObjectId, ref : 'Customer'}, 
    points: Number
});

export { UserClubSchema };
export default mongoose.model('UserClub', UserClubSchema);