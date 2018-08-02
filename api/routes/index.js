import multer from 'multer';
import express from 'express';
const router = express.Router();

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

let test = {title: 'Kumparan Test', desc: 'Please download postman collection in postman folder to try api test'};
router.route('/')
    .get(function (req, res) {
        res.render('index', test);
    })
    .post(function (req, res) {
        res.render('index', test);
    });

import '../models/newsMod';
import '../models/topicMod';

import newsLink from './news';
newsLink(router, multer);

import topicLink from './topic';
topicLink(router, multer);

export default router;