import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AUTHORIZED_ROUTE, CLIENT_ID, CLIENT_SECRET, REDIRECT_URL } from './App';
import { saveTokensAndScope } from './storage';
import axios from 'axios';

const CODE_SEARCHPARAMS_KEY = 'code';

const EXCHANGE_URL = 'https://oauth2.googleapis.com/token';
async function exchangeAuthorizationCodeWithTokens({authorizationCode}) {
    const params = new URLSearchParams();
    params.append('code', authorizationCode);
    params.append('client_id', CLIENT_ID);
    params.append('client_secret', CLIENT_SECRET);
    params.append('redirect_uri', REDIRECT_URL);
    params.append('grant_type', 'authorization_code');

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const {data} = await axios.post(EXCHANGE_URL, params, config);
    const {access_token: accessToken, expires_in: expiresIn, refresh_token: refreshToken, scope} = data;
    return {accessToken, expiresIn, refreshToken, scope};
}

function GoogleOAuthAuthorizationCodeReceiver() {
    const [searchParams] = useSearchParams();
    const code = searchParams.get(CODE_SEARCHPARAMS_KEY);
    const error = searchParams.get('error');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        exchangeAuthorizationCodeWithTokens({ authorizationCode: code }).then((data) => {
            saveTokensAndScope(data);
            setLoading(false);
            navigate(AUTHORIZED_ROUTE);
        });
    }, [code, navigate]);

    if (error == null) {
        if (loading) {
            return <div>Exchanging code with tokens</div>;
        } else {
            return <div>Authorization successful</div>;
        }
    } else {
        return <div>Some error occurred. Please try again later or contact kapildevneupane55@gmail.com</div>;
    }
}

export default GoogleOAuthAuthorizationCodeReceiver;