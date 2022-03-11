import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { ADDRESS_GET } from './gql-address-query';
import { useGlobalContext } from '../../global/context/global-context';
import { IAddressGet } from './types';

export const useAddressGet = (
  setButtonIsDisabled: any,
  setButtonText: any
) => {

  const { user } = useGlobalContext();

  const [
    getAddress, {
      data: addressGetData,
      loading: loadingAddressGet,
      error: addressGetError,
    }
  ] = useLazyQuery<IAddressGet>(ADDRESS_GET);

  useEffect(() => {
    if (user.id) getAddress({ variables: { id: user.id } });

    if (addressGetData) {
      console.log('Address Get Data: ', addressGetData);
      setButtonIsDisabled(false);
      setButtonText('Save');
    }

    if (addressGetError) {
      console.warn('Address Get Error: ', addressGetError);
      setButtonIsDisabled(false);
      setButtonText('Save');
    }

    if (loadingAddressGet) {
      console.warn('Address Get Loading: ', loadingAddressGet);
      setButtonIsDisabled(true);
      setButtonText('Save');
    }
  }, [user, addressGetData, addressGetError, loadingAddressGet]);

  return {
    addressGetData,
    addressGetError,
    loadingAddressGet,
  };
};
