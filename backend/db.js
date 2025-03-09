const mongoose = require('mongoose');
const mongoUrl = 'mongodb+srv://ayan:ayan123@cluster0.yhx43so.mongodb.net/mern?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoUrl);
        console.log('Connected Successfully');

        const fetchedData = await mongoose.connection.db.collection("food_items").find({}).toArray();
        console.log("Fetched food_items:", fetchedData.length);  
        global.food_items = fetchedData;

        const foodCategory = await mongoose.connection.db.collection("food_category").find({}).toArray();
        console.log("Fetched food_category:", foodCategory.length); 
        global.food_category = foodCategory;

    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}

module.exports = mongoDB;
