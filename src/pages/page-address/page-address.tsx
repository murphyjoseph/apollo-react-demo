import React, { useEffect, SyntheticEvent, useState } from 'react';
import { useFormAddress } from '../../components/form-address/use-form-address';
import { traitsGridStandard } from '../../global/traits/traits-grid';

export const PageAddress = () => {

  const [event, setEvent] = useState<SyntheticEvent>();
  const [isAddressValidForCheckout, setIsAddressValidForCheckout] = useState(false);

  const {
    FormAddress,
    handleSubmit: handleAddressSubmit,
    hasAddressError,
    addressUpdateData,
    addressCreateData,
    addressCreateLoading,
    addressUpdateLoading,
  } = useFormAddress();

  useEffect(() => {
    if (addressCreateData || addressUpdateData) {
      console.log('===== address or credit card changed =====');
    }
  }, [addressUpdateData, addressCreateData]);

  return (
    <div>
      <Grid traits={traitsGridStandard}>
        <Grid.Item
          traits={{
            xs: { percent: { width: 90, gutter: 'size1' } },
            lg: { auto: { width: 3, gutter: 'size1' } },
          }}
        >
          <div>
            { FormAddress }
          </div>
        </Grid.Item>
      </Grid>
    </div>
  );
};
