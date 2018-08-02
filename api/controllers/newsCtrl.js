import lib from '../../system/library';
import newsExt from '../extends/newsExt';

class newsCtrl {

    static list(req, res) {
        let post = req.body;
        newsExt.getList(post, (err, dt) => {
            if (err) {
                console.error(err);
                return res.status(400).json(lib.reststats(post, err, 'Error'));
            }

            res.json(lib.reststats(post, dt));
        });
    }

    static save(req, res) {
        let post = req.body;
        newsExt.saveTo(post, (err, dt) => {
            if (err) {
                console.error(err);
                return res.status(400).json(lib.reststats(post, err, 'Validation'));
            }

            res.json(lib.reststats(post, dt, 'Data successfully inserted', true));
        });
    }

    static update(req, res) {
        let post = req.body;

        if (!post._id) return res.status(400).json(lib.reststats(post, '', 'ID is required'));

        newsExt.updateTo(post, (err, dt) => {
            if (err) {
                console.error(err);
                return res.status(400).json(lib.reststats(post, err, 'Validation'));
            }

            res.json(lib.reststats(post, dt, 'Data successfully updated', true));
        });
    }

    static delete(req, res) {
        let post = req.body;

        if (!post._id) return res.status(400).json(lib.reststats(post, '', 'ID is required'));

        newsExt.updateTo({_id: post._id, status: 'deleted'}, (err, dt) => {
            if (err) {
                console.error(err);
                return res.status(400).json(lib.reststats(post, err, 'Validation'));
            }

            res.json(lib.reststats(post, dt, 'Data successfully deleted', true));
        });

        /*newsExt.deleteTo(post, (err, dt) => {
            if (err) {
                console.error(err);
                return res.status(400).json(lib.reststats(post, err, 'Validation'));
            }

            res.json(lib.reststats(post, dt, 'Data successfully deleted', true));
        });*/
    }

}

export default newsCtrl;