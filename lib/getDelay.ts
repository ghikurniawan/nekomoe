export const getDelay = async (ms = 2000) => {
  const promise = await new Promise<Boolean>((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  }).then((res) => {
    return res;
  });
  return promise
}