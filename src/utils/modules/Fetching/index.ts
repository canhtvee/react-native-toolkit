// export type FetchResult<T> = {
//   status: 'loading' | 'successful' | 'failed';
//   data?: T;
//   message?: string;
// };

// function error<T>(message: string): FetchResult<T> {
//   const e: FetchResult<T> = {status: 'failed', message};
//   return e;
// }

// export async function commonCall<T>(url: string): Promise<FetchResult<T>> {
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       return error(response.statusText);
//     }
//     const data: T = await response.json();
//     const result: FetchResult<T> = {
//       status: 'successful',
//       data,
//     };
//     return result;
//   } catch (error: any) {
//     return {status: 'failed', message: error?.message || error.toSting()};
//   }
// }

// const url = 'https://jsonplaceholder.typicode.com/todos/1';

// export type dto = {
//   userId: number;
//   id: number;
//   title: string;
//   completed: boolean;
// };

// async function fetchJson(): Promise<FetchResult<dto>> {
//   const result = await commonCall<dto>(url);
//   console.log('result', result);
//   return result;
// }

export const FetchApi = {
  uploadFile: async (_: any): Promise<any> => {
    console.log('start upload');

    return new Promise(resolve => {
      setTimeout(() => {
        resolve({data: 'upload done'});

        console.log(' upload finished');
      }, 2000);
    });
  },
};
