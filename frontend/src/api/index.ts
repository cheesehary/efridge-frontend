// const buildUrl = (url: string): string => {
//   return process.env.SERVICE_URL + '/api' + url;
// };

const ajax = {
  // get: (url: string): Promise<any> => {
  //   return fetch(buildUrl(url), {
  //     method: 'GET',
  //     credentials: 'include',
  //   }).then((response) => {
  //     if (response.ok) return response.json();
  //     throw new Error(`http error, status ${response.status}`);
  //   });
  // },
  graphql: (query: IQuery | string): Promise<any> => {
    return fetch(process.env.SERVICE_URL + '/graphql', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(typeof query === 'string' ? { query } : query),
    }).then((response) => {
      if (response.ok) return response.json();
      if (response.status === 401) return (window.location.href = '/');
      throw new Error(`http error, status ${response.status}`);
    });
  },
};

interface IQuery {
  query: string;
  operationName?: string;
  variables?: { [key: string]: any };
}

export default ajax;
