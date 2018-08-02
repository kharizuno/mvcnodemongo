import newsCtrl from '../controllers/newsCtrl';

const newsLink = (routes, multer) => {
    // For Parsing multipart/form-data
    let upload = multer();

    routes.route('/news')
        .get(upload.array(), newsCtrl.list)
        .post(upload.array(), newsCtrl.list);

    routes.route('/news-save')
        .get(upload.array(), newsCtrl.save)
        .post(upload.array(), newsCtrl.save);

    routes.route('/news-update')
        .get(upload.array(), newsCtrl.update)
        .post(upload.array(), newsCtrl.update);

    routes.route('/news-delete')
        .get(upload.array(), newsCtrl.delete)
        .post(upload.array(), newsCtrl.delete);
};

export default newsLink;
/**/