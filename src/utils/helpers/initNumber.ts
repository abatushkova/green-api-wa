import { loadState } from '../../app/localStorage';

export const checkNumber = (number: string): boolean => {
  const localContacts = loadState().contacts.list;
  const phoneNumbers = localContacts.map((item: any) => item.phoneNumber);

  return !!(/^(\+7|8)\d{10}$/.exec(number.trim())) && !phoneNumbers.includes(number);
};

export const createNewNumber = (number: string): string => {
  if (/^\+7\d{10}$/.exec(number.trim())) {
    return number.trim().replace('+7', '8');
  }

  return number;
}
