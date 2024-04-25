export const EMAIL_REGEX: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const PASSWORD_REGEX: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
export const UPPERCASE_REGEX = /^(?=.*?[A-Z]).{1,}$/;
export const LOWERCASE_REGEX = /^(?=.*?[a-z]).{1,}$/;
export const NUMERIC_REGEX = /^(?=.*?[0-9]).{1,}$/;
export const SPECIAL_CHARACTER_REGEX = /^(?=.*?[#?!@$%^&*-]).{1,}$/;