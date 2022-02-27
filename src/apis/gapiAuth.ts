const getGapiAuthInstance = async () => {
  if (gapi.auth2 === undefined) {
    await new Promise((res, rej) => {
      gapi.load('client:auth2', { callback: res, onerror: rej });
    });
    await gapi.client.init({
      clientId: process.env.REACT_APP_GAPI_CLIENTID,
      scope: 'email',
    });
  }

  return gapi.auth2.getAuthInstance();
};

export default getGapiAuthInstance;
