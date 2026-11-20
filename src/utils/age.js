/**
 * Calculates Blessy Tuscano's current age dynamically based on her birth date (December 3, 2005).
 * Every year on December 3rd, her age automatically increments without needing manual portfolio updates.
 */
export function getBlessyAge() {
  const birthDate = new Date(2005, 11, 3); // December 3, 2005 (month is 0-indexed: 11 = December)
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}
