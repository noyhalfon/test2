import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SaleSchema = new Schema({
    id: Number,
    name: String,
    img: String,
    description: String,
    points: Number,
    price: Number
});

export { SaleSchema };
export default mongoose.model('Sale', SaleSchema);