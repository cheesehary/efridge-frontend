const buildUrl = (url: string): string => {
  return process.env.SERVICE_URL + '/api' + url;
};

const ajax = {
  get: (url: string): Promise<any> => {
    return fetch(buildUrl(url), {
      method: 'GET',
      credentials: 'include',
    }).then((response) => {
      if (response.ok) return response.json();
      throw new Error(`http error, status ${response.status}`);
    });
  },
};

export default ajax;
