class library {

    static reststats(query = [], result, msg = 'Data is not available', comp) {
        let status = (result) ? 'Success' : 'Error';
        let message = (result) ? 'OK' : msg;
        if (comp) {
            message = msg;
        } else {
            let st = 1;
            switch (msg) {
                case 'Error':
                case 'Validation':
                    st = 0;
                    break;
            }

            if (st === 0 || comp) {
                status = 'Error';
                message = msg;
            }
        }

        return {status: status, message: message, query: query, data: (result) ? result : []};
    }

}

export default library;