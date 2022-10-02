const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const ProductSchema = mongoose.Schema({
  title: String,
  imageURL: String,
  price: Number,
  rating: Number,
  reviews: [
    {
      rating: {
        type: String,
      },
      descripton: {
        type: String,
      },
    },
  ],
});

ProductSchema.methods.saveReview = async function (reviewInfo) {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.reviews = this.reviews.concat({
      rating: reviewInfo.rating,
      descripton: reviewInfo.review,
    });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

module.exports = mongoose.model('products', ProductSchema);
