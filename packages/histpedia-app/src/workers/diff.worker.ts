// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-restricted-globals
// const ctx: Worker = self as any;

self.addEventListener('message', async (event) => {
  console.log('worker側だよ！！ 受け取った値は', event.data);
  const res = event.data * event.data;
  self.postMessage({ input: event.data, output: res }); // 呼び出し元にEventを発火して結果を返す
});

// export default ctx;
export default {};
