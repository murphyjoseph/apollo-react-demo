import { IField, IFields } from '../types/fields';

// ------------------------------------------------------
// FIELD VALIDATION RULES

const isRequiredInvalid = (field: IField) => {
  const { validate, value } = field;
  if (validate?.required) {
    if (!value) {
      return true;
    }
  }
  return false;
};

const isStringIncludesInvalid = (field: IField) => {
  const { validate, value } = field;
  if (validate?.stringIncludes) {
    if (!value.includes(validate.stringIncludes)) {
      return true;
    }
  }
  return false;
};

const isCharacterMaxInvalid = (field: IField) => {
  const { validate, value } = field;
  if (validate?.characterMax) {
    if (value.length > validate.characterMax) return true;
  }
  return false;
};

const isCharacterLimitInvalid = (field: IField) => {
  const { validate, value } = field;
  if (validate?.characterLimit) {
    if (value.length < validate.characterLimit) {
      return true;
    }
  }
  return false;
};

// ------------------------------------------------------
// VALIDATOR - iterates through validation rules

export const validateField = (field: IField) => {
  const fieldCopy = { ...field };
  const { validate } = fieldCopy;
  if (validate) {
    const { characterLimit, characterMax, required, stringIncludes } = validate;
    if (required && isRequiredInvalid(fieldCopy)) {
      fieldCopy.errorText = 'This field is required';
      fieldCopy.isInvalid = true;
    } else if (characterLimit && isCharacterLimitInvalid(fieldCopy)) {
      fieldCopy.errorText = `Field must have at least ${characterLimit} characters.`;
      fieldCopy.isInvalid = true;
    } else if (characterMax && isCharacterMaxInvalid(fieldCopy)) {
      fieldCopy.errorText = `Field cannot be more than ${characterMax} characters.`;
      fieldCopy.isInvalid = true;
    } else if (stringIncludes && isStringIncludesInvalid(fieldCopy)) {
      fieldCopy.errorText = `Field must include: '${stringIncludes}'.`;
      fieldCopy.isInvalid = true;
    } else {
      fieldCopy.errorText = '';
      fieldCopy.isInvalid = false;
    }
  }

  return {
    ...field,
    ...fieldCopy,
  };
};

// ------------------------------------------------------
// VALIDATOR - used for on submit to confirm all values are valid

export const validateFields = (fields: IFields) => {

  const fieldsCopy: any = { ...fields };
  Object.keys(fieldsCopy).forEach((fieldKey: string) => {
    fieldsCopy[fieldKey] = validateField(fieldsCopy[fieldKey]);
  });

  return fieldsCopy;

};
