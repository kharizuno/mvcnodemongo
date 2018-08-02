import mongoose from 'mongoose';
let News = mongoose.model('News');

import topicExt from '../extends/topicExt';

class newsExt {

    static getList(opt, cb) {
        let find = (opt.row > 0) ? News.findOne() : News.find();

        if (opt.id) find.where('_id', opt.id);
        if (opt.slug) find.where('slug', opt.slug);
        if (opt.title) find.where({title: {$regex: opt.title, $options: 'i'}});
        if (opt.description) find.where({description: {$regex: opt.description, $options: 'i'}});
        if (opt.status) find.where('status', opt.status);

        if (opt.topics) {
            find.populate({
                path: 'topics',
                match: {name: {$regex: opt.topics, $options: 'i'}},
                select: 'id slug name'
            });
        } else {
            find.populate('topics', 'id slug name');
        }

        if (opt.skip) find.skip(opt.skip);
        if (opt.limit) find.limit(opt.limit);
        if (opt.sort) find.sort(opt.sort);

        return new Promise((resolve) => {
            find.exec(function (err, dt) {
                if (err) {
                    console.error(err);
                    return cb(err);
                }

                if (opt.topics) {
                    let filter = dt.filter(function (v) {
                        if (v.topics.length > 0) {
                            return v;
                        }
                    });

                    cb(null, filter);
                    resolve(filter);
                } else {
                    cb(null, dt);
                    resolve(dt);
                }
            }.bind(this));
        });
    }

    static async saveTo(dt, cb) {
        if (dt.topics) {
            dt.topics = await this.topicsID(dt);
        }

        let data = new News(dt);
        data.save(function (err, dt) {
            if (err) {
                console.error(err);
                return cb(err);
            }

            cb(null, dt);
        }.bind(this));
    }

    static async updateTo(dt, cb) {
        if (dt.topics) {
            dt.topics = await this.topicsID(dt);
        }

        News.findOneAndUpdate({_id: dt._id}, dt, function(err, dt) {
            if (err) {
                console.error(err);
                return cb(err);
            }

            cb(null, dt);
        }.bind(this));
    }

    static deleteTo(dt, cb) {
        News.findOneAndDelete(dt, function(err, dt) {
            if (err) {
                console.error(err);
                return cb(err);
            }

            cb(null, dt);
        }.bind(this));
    }

    static async topicsID(dt) {
        let topicData = dt.topics.split(',');
        let topicID = await Promise.all(topicData.map(async (v) => {
            let tp = await topicExt.getList({slug: v, row: 1}, (err, dt) => {
                if (err) {
                    console.error(err);
                    return cb(err);
                }
            });

            return tp._id;
        }));

        return topicID;
    }

}

export default newsExt;