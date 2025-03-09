const express = require('express');
const router = express.Router();

router.post('/foodData', (req, res) => {

    const responseData = []
    responseData.push(global.food_items);
    responseData.push(global.food_category);
    try {
        res.status(200).send(responseData)
    } catch (error) {
        console.log(error.message)
        res.send('Server error')
    }
})

module.exports = router