export const CategoriesObj = [
  { emoji: '🍕', value: 'Food' },
  { emoji: '🧋', value: 'Drinks' },
  { emoji: '🍳', value: 'Breakfast' },
  { emoji: '🍱', value: 'Lunch' },
  { emoji: '🍝', value: 'Dinner' },
  { emoji: '🚕', value: 'Taxi' },
  { emoji: '🛩', value: 'Travel' },
  { emoji: '⛽', value: 'Gas' },
  { emoji: '💆', value: 'Therapy' },
];

const CategoriesArray = CategoriesObj.map(category => `${category.emoji} ${category.value} ${category.emoji}`);
export const CategoryNone = 'None';

export const Categories = [...CategoriesArray, CategoryNone].map((category, index) => {
  return {
    key: index,
    value: category,
  };
});
