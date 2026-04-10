const express = require("express");
const app = express();
const mongoose = require("mongoose");
//const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
//const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
//const { listingSchema, reviewSchema } = require("./schema.js");
//const Review = require("./models/review.js");

const listings = require("./ROUTES/listing.js");
const reviews = require("./ROUTES/review.js");

//const { error } = require("console");


//const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const MONGO_URL = "mongodb+srv://agarwalanshika834_db_user:ipQZtlbYe7qehuLj@cluster0.jro2ag7.mongodb.net/?appName=Cluster0";

main().then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});


async function main() {
    await mongoose.connect(MONGO_URL)
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};


app.get("/", (req, res) => {
    res.send("Hi, I AM root");
});

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
   // console.log(res.locals.success);
    next();
});















//CREATE ROUTE
/*app.post("/listings", async (req, res) => {
    const newListing = newListing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
    //let listing = req.body;
    //console.log(listing);
    // Yahan database mein save karne ka code aayega
    //res.redirect("/listings"); // Save hone ke baad wapas index page par bhejne ke liye
});*/

// CREATE ROUTE
/*app.post("/listings", validateListing,
     wrapAsync(async (req, res, next) => {

    
    const newListing = new Listing(req.body.listing); 

    /*if(!newListing.title) {
        throw new ExpressError(400, "title is missing");
    }

    if(!newListing.description) {
        throw new ExpressError(400, "Description is missing");
    }

    if(!newListing.location) {
        throw new ExpressError(400, "location is missing");
    }*/
    
    // 2. Is naye listing ko database mein save karein
    //await newListing.save(); 
    
    // 3. Save hone ke baad wapas index page par bhej dein
    //res.redirect("/listings");
    /*} catch(err) {
        next(err);
    }*/
/*})
);


//edit route
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing})

}));

//update route
app.put("/listings/:id",validateListing,
     wrapAsync(async(req, res) => {

    /*if(!req.body.listing) {
        throw new ExpressError(400, "send valid data for listing");
    }*/

    /*let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
}));


//delete route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));


//REVIEWS



/*app.get("/testListing",async (req, res) => {
    let sampleListing = new Listing({
        title: "My New Villa",
        description: "By the beach",
        price: 1200,
        location: "Calangute, Goa",
        country: "India",

    });

    await sampleListing.save();
    console.log("sample was saved");
    res.send("successful testing");
    


})*/


app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

app.all(/.*/, (req, res, next) => {
    next(new ExpressError(404, "page not found"));
});

app.use((err, req, res, next) => {
    let {statusCode=500, message= "something went wrong"} = err;
    res.status(statusCode).render("error.ejs", { message });
    //res.render("error.ejs", {message});
    //res.status(statusCode).send(message);
   // res.send("something went wrong!")
});

app.listen(8080, () => {
    console.log("server is listening to the port 8080");
});













