export const REGEX = {
  EMAIL: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"
};

export const isValidString = (regex: string, value: string): boolean => {
  const pattern = new RegExp(regex);
  return pattern.test(value);
};