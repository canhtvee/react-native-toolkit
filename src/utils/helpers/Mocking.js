export function mockApi(data) {
  return async () =>
    new Promise(resolve => {
      setTimeout(() => resolve(data), 1500);
    });
}
