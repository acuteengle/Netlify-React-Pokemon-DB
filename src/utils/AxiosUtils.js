import axios from 'axios';
import { isEmpty } from 'lodash';

import { BASE_URL } from '../configs/AppConstants';

export const executeAPIRequest = (requestMethod = 'GET', requestUrl = '', onSuccess = null, onError = null, requestData = {}, requestParams = {}, requestHeaders = {}) => {
    if (!requestUrl) {
        return;
    }

    const axiosConfig = {
        method: requestMethod,
        url: BASE_URL + requestUrl
    };

    if (!isEmpty(requestData)) {
        axiosConfig.data = requestData;
    }
    if (!isEmpty(requestParams)) {
        axiosConfig.params = requestParams;
    }
    if (!isEmpty(requestHeaders)) {
        axiosConfig.headers = requestHeaders;
    }

    axios(axiosConfig)
        .then(res => {
            typeof onSuccess === 'function' && onSuccess(res);
        })
        .catch(err => {
            const response =
                err.response
                    ? err.response
                    : {
                        code: 500,
                        message: 'Something went wrong with the request'
                    };
            typeof onError === 'function' && onError(response);
        });
}