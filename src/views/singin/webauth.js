import {Platform, NativeModules} from 'react-native';
import Auth0 from 'react-native-auth0';
import url from 'url';
import Auth0Error from "react-native-auth0/auth/auth0Error";
import AuthError from "react-native-auth0/auth/authError";
import {authCredentials} from "../../../app";
const auth0 = new Auth0(authCredentials);
const { A0Auth0 } = NativeModules;

auth0.webAuth.authorize = function(options = {}) {
    const { clientId, domain, agent } = this;
    return agent
        .newTransaction()
        .then(({state, verifier, ...defaults}) => {
            const bundleIdentifier = A0Auth0.bundleIdentifier;
            const redirectUri = `${bundleIdentifier.toLowerCase()}://${domain}/${Platform.OS}/${bundleIdentifier}/callback`;
            const expectedState = options.state || state;
            let query = {
                ...options,
                clientId,
                responseType: 'code',
                redirectUri,
                state: expectedState,
                ...defaults,
            };
            const authorizeUrl = `https://${domain}/v1/ui/timeline/${Platform.OS}`;
            return agent
                .show(authorizeUrl)
                .then((redirectUrl) => {
                    if (!redirectUrl || !redirectUrl.startsWith(redirectUri)) {
                        throw new AuthError({
                            json: {
                                error: 'a0.redirect_uri.not_expected',
                                error_description: `Expected ${redirectUri} but got ${redirectUrl}`
                            },
                            status: 0
                        });
                    }
                    const query = url.parse(redirectUrl, true).query;
                    const {
                        code,
                        error
                    } = query;
                    if (error) {
                        throw new Auth0Error({json: query, status: 0});
                    }
                    console.log(`Authentication response got  ${code} from ${redirectUrl} expected from ${redirectUri}`);
                    if(code){
                        return Promise.resolve({code, redirectUrl});
                    } else {
                        return Promise.reject(new Auth0Error({json: {
                                error:`Authorization failed`,
                                error_description:`Authorization failed`
                            }, status: 0}));
                    }
                });
        });
}.bind(auth0.webAuth);

export {auth0, authCredentials};