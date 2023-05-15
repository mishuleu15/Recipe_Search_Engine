export function filterData(data, key) {
  let t0 = performance.now();
  const matchingKey = new RegExp(key);
  const matchingKeys = Object.entries(data).reduce((acc, [key, value]) => {
    if (matchingKey.test(key)) {
      acc[key] = value;
    }
    return acc;
  }, {});

  const filteredObj = Object.fromEntries(
    Object.entries(matchingKeys).filter(
      ([key, value]) => value !== '' && value != null && value !== ' '
    )
  );

  let t1 = performance.now();
  console.log('The time in miliseconds is: ' + (t1 - t0));
  return filteredObj;
}
