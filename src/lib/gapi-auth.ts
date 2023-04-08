import { GAPI_CLIENTID } from '@/config/env-keys';

const getGapiAuthInstance = async () => {
  if (gapi.auth2 === undefined) {
    await new Promise((res, rej) => {
      gapi.load('client:auth2', { callback: res, onerror: rej });
    });
    await gapi.client.init({
      clientId: GAPI_CLIENTID,
      scope: 'email',
    });
  }

  return gapi.auth2.getAuthInstance();
};

export default getGapiAuthInstance;
