const CategoriesArray = [
  '🍕 Food 🍕',
  '🧋 Drinks 🧋',
  '🍳 Breakfast 🍳',
  '🍱 Lunch 🍱',
  '🍝 Dinner 🍝',
  '🚕 Taxi 🚕',
  '🛩 Travel 🛩',
  '⛽ Gas ⛽',
  '💆 Therapy 💆',
];

const CategoryNone = ['None'];

export const Categories = [...CategoriesArray, ...CategoryNone].map((category, index) => {
  return {
    key: index,
    value: category,
  };
});
