import topicCtrl from '../controllers/topicCtrl';

const topicLink = (routes, multer) => {
    // For Parsing multipart/form-data
    let upload = multer();

    routes.route('/topic')
        .get(upload.array(), topicCtrl.list)
        .post(upload.array(), topicCtrl.list);

    routes.route('/topic-save')
        .get(upload.array(), topicCtrl.save)
        .post(upload.array(), topicCtrl.save);

    routes.route('/topic-update')
        .get(upload.array(), topicCtrl.update)
        .post(upload.array(), topicCtrl.update);

    routes.route('/topic-delete')
        .get(upload.array(), topicCtrl.delete)
        .post(upload.array(), topicCtrl.delete);
};

export default topicLink;
/**/