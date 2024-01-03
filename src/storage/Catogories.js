export const CategoriesObj = [
  { emoji: '🍝', value: 'Dinner' },
  { emoji: '🍱', value: 'Lunch' },
  { emoji: '🍳', value: 'Breakfast' },
  { emoji: '🍕', value: 'Food' },
  { emoji: '🧋', value: 'Drinks' },
  { emoji: '🚅', value: 'Travel' },
  { emoji: '⛽', value: 'Gas' },
  { emoji: '🏨', value: 'Accommodation' },
  { emoji: '💆', value: 'Leisure' },
];

const CategoriesArray = CategoriesObj.map(category => `${category.emoji} ${category.value} ${category.emoji}`);
export const CategoryNone = 'None';

export const Categories = [...CategoriesArray, CategoryNone].map((category, index) => {
  return {
    key: index,
    value: category,
  };
});
