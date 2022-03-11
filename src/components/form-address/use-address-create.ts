import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADDRESS_CREATE } from './gql-address-create';
import { IAddressCreate } from './types';

export const useAddressCreate = (
  setButtonIsDisabled: any,
  setButtonText: any
) => {

  const [addressCreateErrorRails, setAddressCreateErrorRails] = useState<string[]>();

  const [
    addressCreate, {
      data: addressCreateData,
      loading: addressCreateLoading,
      error: addressCreateErrorServer,
    }
  ] = useMutation<IAddressCreate>(ADDRESS_CREATE);

  useEffect(() => {
    if (addressCreateData) {
      console.warn('Address Create Data: ', addressCreateData);
      setButtonIsDisabled(false);
      setButtonText('Saved');
      const { addressCreate: data } = addressCreateData;
      if (data && data.errors) {
        setAddressCreateErrorRails(data.errors);
      }
    }

    if (addressCreateErrorServer) {
      console.warn('Address Create Server Error: ', addressCreateErrorServer);
      setButtonIsDisabled(false);
      setButtonText('Save');
    }

    if (addressCreateLoading) {
      console.warn('Address Create Loading: ', addressCreateLoading);
      setButtonIsDisabled(true);
      setButtonText('Saving');
    }
  }, [addressCreateData, addressCreateErrorServer, addressCreateLoading]);

  return {
    addressCreate,
    addressCreateData,
    addressCreateErrorServer,
    addressCreateErrorRails,
    addressCreateLoading,
  };
};
