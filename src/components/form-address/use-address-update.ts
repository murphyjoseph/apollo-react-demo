import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADDRESS_UPDATE } from './gql-address-update';
import { IAddressUpdate } from './types';

export const useAddressUpdate = (
  setButtonIsDisabled: any,
  setButtonText: any
) => {

  const [addressUpdateErrorRails, setAddressUpdateErrorRails] = useState<string[]>();

  const [
    addressUpdate, {
      data: addressUpdateData,
      error: addressUpdateErrorServer,
      loading: addressUpdateLoading,
    }
  ] = useMutation<IAddressUpdate>(ADDRESS_UPDATE);

  useEffect(() => {
    if (addressUpdateData) {
      console.warn('Address Update Data: ', addressUpdateData);
      setButtonIsDisabled(false);
      setButtonText('Saved');
      const { addressUpdate: data } = addressUpdateData;
      if (data && data.errors) {
        setAddressUpdateErrorRails(data.errors);
      }
    }

    if (addressUpdateLoading) {
      console.warn('Address Update Loading: ', addressUpdateLoading);
      setButtonIsDisabled(true);
      setButtonText('Saving');
    }

    if (addressUpdateErrorServer) {
      console.warn('Address Update failed.', addressUpdateErrorServer);
      setButtonIsDisabled(false);
      setButtonText('Save');
    }
  }, [addressUpdateData, addressUpdateLoading, addressUpdateErrorServer]);

  return {
    addressUpdate,
    addressUpdateData,
    addressUpdateLoading,
    addressUpdateErrorServer,
    addressUpdateErrorRails,
  };
};
