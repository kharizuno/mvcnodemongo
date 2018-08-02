import mongoose from 'mongoose';

const mongo = (app) => {
    mongoose.connect('mongodb://localhost/mvcnodemongo', function(err) {
        if (err) throw err;
        console.log('Database Connected...');
    });
};

export default mongo;