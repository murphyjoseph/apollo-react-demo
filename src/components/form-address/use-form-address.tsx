import React, { SyntheticEvent, useState, useEffect } from 'react';
import { FormAddress } from './form-address';
import { validateField, validateFields } from '../../global/util/validate';
import { initialFields } from './initial-fields';
import { IFields } from '../../global/types/fields';
import { useAddressCreate } from './use-address-create';
import { useAddressUpdate } from './use-address-update';
import { useAddressGet } from './use-address-get';
import { IAddress, TAddressFields } from './types';
import { useGlobalContext } from '../../global/context/global-context';

export const useFormAddress = (onSubmitCallback?: any) => {

  const { user } = useGlobalContext();
  const [fields, setFields] = useState<IFields>(initialFields);
  const [isDirty, setIsDirty] = useState(false);
  const [buttonText, setButtonText] = useState('Save');
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const [hasAddressError, setHasAddressError] = useState(false);

  const { addressGetData } = useAddressGet(setButtonIsDisabled, setButtonText);
  const {
    addressCreate,
    addressCreateData,
    addressCreateLoading,
    addressCreateErrorRails,
  } = useAddressCreate(setButtonIsDisabled, setButtonText);
  const {
    addressUpdate,
    addressUpdateData,
    addressUpdateLoading,
    addressUpdateErrorRails,
  } = useAddressUpdate(setButtonIsDisabled, setButtonText);

  // -------------------------------
  // SET INITIAL DEFAULTS

  useEffect(() => {
    if (addressGetData && addressGetData.user) {
      const fieldsCopy = { ...fields };
      const { user: { address } } = addressGetData;
      if (address) {
        Object.keys(address).forEach((key: TAddressFields) => {
          if (fieldsCopy[key]) {
            // assign values if address exists
            fieldsCopy[key].value = address[key];
          }
        });
        setFields({ ...fieldsCopy });
      }
    } else {
      // if no pre-existing address is there autofill firstname and lastname
      const fieldsCopy = { ...fields };
      if (fieldsCopy.firstName.value.length < 1) fieldsCopy.firstName.value = user.firstName;
      if (fieldsCopy.lastName.value.length < 1) fieldsCopy.lastName.value = user.lastName;
      setFields({ ...fieldsCopy });
    }

  }, [addressGetData, user]);

  // -------------------------------
  // HANDLE ADDRESS FORM SUBMIT

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    setIsDirty(true);
    setFields({ ...validateFields(fields) });
    console.log('Submit Fields: ', validateFields(fields));
    if (
      fields.firstName.isInvalid
      || fields.lastName.isInvalid
      || fields.address1.isInvalid
      || fields.stateId.isInvalid
      || fields.zipcode.isInvalid
      || fields.phoneNumber.isInvalid
    ) {
      setHasAddressError(true);
      return;
    }
    setHasAddressError(false);

    if (onSubmitCallback) onSubmitCallback();
    const parsedStateId = parseInt(fields.stateId.value, 10);
    const addressData: IAddress = {
      address1: fields.address1.value,
      address2: fields.address2.value,
      city: fields.city.value,
      stateId: parsedStateId,
      firstName: fields.firstName.value,
      lastName: fields.lastName.value,
      phoneNumber: fields.phoneNumber.value,
      zipcode: fields.zipcode.value,
    };
    if (addressGetData && addressGetData.user) {
      const { user: { address } } = addressGetData;
      if (address && address?.id && !address?.locked) {
        addressUpdate({
          variables: {
            id: address.id,
            ...addressData,
          },
        });
      } else {
        addressCreate({
          variables: addressData,
        });
      }
    }

  };

  // -------------------------------
  // HANDLE FIELD CHANGE

  const handleChange = (event: any) => {
    const { target: { name, value } } = event;
    const fieldCopy = { ...fields[name], value };
    const fieldCopyValidated = { ...validateField(fieldCopy) };
    setFields({ ...fields, [name]: { ...fieldCopyValidated } });
  };

  return {
    FormAddress: (
      <FormAddress
        onSubmit={handleSubmit}
        handleFieldChange={handleChange}
        address={fields}
        defaultValues={addressGetData?.user.address}
        buttonText={buttonText}
        buttonIsDisabled={buttonIsDisabled}
        isDirty={isDirty}
        errors={addressCreateErrorRails || addressUpdateErrorRails}
      />
    ),
    handleSubmit,
    hasAddressError,
    addressUpdateData,
    addressCreateData,
    addressCreateLoading,
    addressUpdateLoading,
  };

};
