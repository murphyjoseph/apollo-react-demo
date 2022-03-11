export interface IField {
  value: any;
  errorText: string;
  isInvalid: boolean;
  isValidating: boolean;
  validate?: {
    required?: boolean;
    stringIncludes?: string;
    characterLimit?: number;
    characterMax?: number;
  }
}

export interface IFields {
  [key: string]: IField;
}

// ---------------------------------------
// EXAMPLE INITIAL FIELDS

// const setInitialFields = (defaultValue: string) => ({
//   inviteEmail: {
//     value: defaultValue,
//     errorText: '',
//     isInvalid: false,
//     isValidating: false,
//     validate: {
//       required: true,
//       stringIncludes: '@',
//       characterLimit: 4,
//       characterMax: 12,
//     },
//   },
// } as IFields);
