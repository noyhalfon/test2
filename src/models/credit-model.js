import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CreditSchema = new Schema({
    id: Number,
    dateOfPurchase: Date,
    dateOfExpired: Date,
    items: [String],
    totalCredit: Number
});

export {CreditSchema};
export default mongoose.model('Credit', CreditSchema);