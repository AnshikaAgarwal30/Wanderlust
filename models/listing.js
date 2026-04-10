const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    
image: {
  /*filename: String,*/
  url: {
    type: String,
    default: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
    set: (v) => v === "" ? "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max" : v,
  },
  //ye chnge kra h
  filename: { type: String, default: "listingimage"}
},
    price: Number,
    location: String,
    country: String,
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",

      },
    ],
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if(listing){
     await Review.deleteMany({_id : {$in: listing.reviews}});

  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;