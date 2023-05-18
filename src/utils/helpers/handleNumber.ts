export const checkNumber = (number: string): boolean => {
  return !!(/^(\+7|8)\d{10}$/.exec(number.trim()));
};

export const createNewNumber = (number: string): string => {
  const validNumber = number.trim();

  if (/^8\d{10}$/.exec(validNumber)) {
    return validNumber.replace('8', '7');
  }

  return validNumber.slice(1);
};
