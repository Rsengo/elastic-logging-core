import constants from '../constants/constants';
import axios from 'axios';

const _createUrl = (url) => `${url}/${constants.urlPostfix}`;

const createClient = ({url, timeout}) => axios.create({
    baseURL: _createUrl(url),
    timeout: timeout,
    headers: { 
        'Content-Type': constants.contentType 
    },
});

export default createClient;