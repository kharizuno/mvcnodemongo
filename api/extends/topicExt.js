import mongoose from 'mongoose';
let Topic = mongoose.model('Topic');

class topicExt {

    static getList(opt, cb) {
        let find = (opt.row > 0) ? Topic.findOne() : Topic.find();

        if (opt.id) find.where('_id', opt.id);
        if (opt.slug) find.where('slug', opt.slug);
        if (opt.name) find.where({name: {$regex: opt.name, $options: 'i'}});
        if (opt.description) find.where({description: {$regex: opt.description, $options: 'i'}});

        if (opt.skip) find.skip(opt.skip);
        if (opt.limit) find.limit(opt.limit);
        if (opt.sort) find.sort(opt.sort);

        return new Promise((resolve) => {
            find.exec(function (err, dt) {
                if (err) {
                    console.error(err);
                    return cb(err);
                }

                cb(null, dt);
                resolve(dt);
            }.bind(this));
        });
    }

    static saveTo(dt, cb) {
        let data = new Topic(dt);
        data.save(function (err, dt) {
            if (err) {
                console.error(err);
                return cb(err);
            }

            cb(null, dt);
        }.bind(this));
    }

    static updateTo(dt, cb) {
        Topic.findOneAndUpdate({_id: dt._id}, dt, function(err, dt) {
            if (err) {
                console.error(err);
                return cb(err);
            }

            cb(null, dt);
        }.bind(this));
    }

    static deleteTo(dt, cb) {
        Topic.findOneAndDelete(dt, function(err, dt) {
            if (err) {
                console.error(err);
                return cb(err);
            }

            cb(null, dt);
        }.bind(this));
    }

}

export default topicExt;