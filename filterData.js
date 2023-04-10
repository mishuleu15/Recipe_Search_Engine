export function filterData(data, key) {
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

  return filteredObj;
}
