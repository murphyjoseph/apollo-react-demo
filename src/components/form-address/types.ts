import { SyntheticEvent } from 'react';
import { IFields } from '../../global/types/fields';

export enum EAddressFields {
  firstName = 'firstName',
  lastName = 'lastName',
  address1 = 'address1',
  address2 = 'address2',
  zipcode = 'zipcode',
  phoneNumber = 'phoneNumber',
  city = 'city',
  stateId = 'stateId',
}

export type TAddressFields = keyof typeof EAddressFields | string;

export interface IAddress {
  id?: any;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  zipcode: string;
  phoneNumber: string;
  city: string;
  stateId: number;
  [key: string]: any;
}

export interface IAddressCreate {
  addressCreate?: {
    address?: IAddress;
    errors?: string[];
  }
}

export interface IAddressUpdate {
  addressUpdate?: {
    address?: IAddress;
    errors?: string[];
  }
}
export interface IAddressGet {
  user: {
    address?: IAddress;
    id?: any;
  }
}

export interface IFormAddress {
  onSubmit: (e: SyntheticEvent) => void;
  handleFieldChange: (e: SyntheticEvent) => void;
  address: IFields;
  defaultValues?: IAddress;
  buttonText: string;
  buttonIsDisabled: boolean;
  isDirty: boolean;
  errors?: string[];
}
