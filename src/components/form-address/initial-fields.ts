import { IFields } from '../../global/types/fields';

export const initialFields = {
  firstName: {
    value: '',
    errorText: '',
    isInvalid: false,
    isValidating: false,
    validate: {
      required: true,
    },
  },
  lastName: {
    value: '',
    errorText: '',
    isInvalid: false,
    isValidating: false,
    validate: {
      required: true,
      characterLimit: 2,
    },
  },
  address1: {
    value: '',
    errorText: '',
    isInvalid: false,
    isValidating: false,
    validate: {
      required: true,
    },
  },
  address2: {
    value: '',
    errorText: '',
    isInvalid: false,
    isValidating: false,
  },
  city: {
    value: '',
    errorText: '',
    isInvalid: false,
    isValidating: false,
    validate: {
      required: true,
    },
  },
  stateId: {
    value: '',
    errorText: '',
    isInvalid: false,
    isValidating: false,
    validate: {
      required: true,
    },
  },
  zipcode: {
    value: '',
    errorText: '',
    isInvalid: false,
    isValidating: false,
    validate: {
      required: true,
      characterLimit: 5,
      characterMax: 5,
    },
  },
  phoneNumber: {
    value: '',
    errorText: '',
    isInvalid: false,
    isValidating: false,
    validate: {
      required: true,
      characterLimit: 10,
      characterMax: 10,
    },
  },
} as IFields;
