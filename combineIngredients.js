export function combineIngredientsAndMeasures(ingredients, measures) {
  const combined = [];

  const allIngredients = Object.values(ingredients).map((ingredient) => {
    return ingredient;
  });

  const allMeasures = Object.values(measures).map((measure) => {
    return measure;
  });

  for (let i = 0; i < allIngredients.length; i++) {
    combined.push(`${allIngredients[i]} -- ${allMeasures[i]}`);
  }

  return combined.map((item) => `<li>${item}</li>`).join(' ');
}
