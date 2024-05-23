const mongoose = require('mongoose');
const mongoUrl = 'mongodb+srv://ayan:ayan123@cluster0.yhx43so.mongodb.net/mern?retryWrites=true&w=majority&appName=Cluster0';
const mongoDB = async () => {
    try {
        await mongoose.connect(mongoUrl)
        console.log('Connected Successfully');

        const fetchedData = await mongoose.connection.db.collection("food_items").find({}).toArray();
        global.food_items = fetchedData;

        const foodCategory = await mongoose.connection.db.collection("food_category").find({}).toArray();
        global.food_category = foodCategory;

        // console.log(global.food_category)

    } catch (err) {
        console.log(err)
    }
}

module.exports = mongoDB
