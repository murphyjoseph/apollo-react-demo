import React, { FC } from 'react';
import { Grid, Form } from '@wantable/kitter';
import { FieldText } from '../../ui-patterns/fields/field-text';
import { STATE_IDS } from '../../global/constants/state-ids';
import { ButtonMain } from '../../ui-patterns/buttons/button-main';
import { useGlobalContext } from '../../global/context/global-context';
import { Error } from '../../ui-patterns/error/error';
import { IFormAddress } from './address.interface';
import { FieldSelect } from '../../ui-patterns/fields/field-select';
import * as css from './_styles';
// Reactor Address Form
export const FormAddress: FC<IFormAddress> = ({
  onSubmit,
  handleFieldChange,
  address,
  defaultValues,
  buttonText,
  buttonIsDisabled,
  isDirty,
  errors,
}) => {

  const { user } = useGlobalContext();

  return (
    <Form
      traits={{
        name: 'inviteForm',
        onSubmit: (e: any) => onSubmit(e),
        isDirty,
        isNoHTMLValidate: true,
      }}
    >
      {
        errors && <Error errors={errors} />
      }
      <Grid>
        <Grid.Item traits={{ xs: { auto: { width: 1, gutter: 'size2' } } }}>
          <FieldText
            mainLabel="First Name"
            for="firstName"
            name="firstName"
            onChange={handleFieldChange}
            type="text"
            errorText={address.firstName.errorText}
            isInvalid={address.firstName.isInvalid && isDirty}
            defaultValue={defaultValues?.firstName || user.firstName || ''}
          />
        </Grid.Item>
        <Grid.Item traits={{ xs: { auto: { width: 1, gutter: 'size2' } } }}>
          <FieldText
            mainLabel="Last Name"
            for="lastName"
            name="lastName"
            onChange={handleFieldChange}
            type="text"
            errorText={address.lastName.errorText}
            isInvalid={address.lastName.isInvalid && isDirty}
            defaultValue={defaultValues?.lastName || user.lastName || ''}
          />
        </Grid.Item>
      </Grid>
      <Grid>
        <Grid.Item traits={{ xs: { auto: { width: 1, gutter: 'size2' } } }}>
          <FieldText
            mainLabel="Address"
            for="address1"
            name="address1"
            onChange={handleFieldChange}
            type="text"
            errorText={address.address1.errorText}
            isInvalid={address.address1.isInvalid && isDirty}
            defaultValue={defaultValues?.address1}
          />
        </Grid.Item>
        <Grid.Item traits={{ xs: { auto: { width: 1, gutter: 'size2' } } }}>
          <FieldText
            mainLabel="Apt/Unit #"
            for="address2"
            name="address2"
            onChange={handleFieldChange}
            type="text"
            errorText={address.address2.errorText}
            isInvalid={address.address2.isInvalid && isDirty}
            defaultValue={defaultValues?.address2}
          />
        </Grid.Item>
      </Grid>
      <Grid>
        <Grid.Item traits={{ xs: { auto: { width: 1, gutter: 'size2' } } }}>
          <FieldText
            mainLabel="City"
            for="city"
            name="city"
            onChange={handleFieldChange}
            type="text"
            errorText={address.city.errorText}
            isInvalid={address.city.isInvalid && isDirty}
            defaultValue={defaultValues?.city}
          />
        </Grid.Item>
        <Grid.Item traits={{ xs: { auto: { width: 1, gutter: 'size2' } } }}>
          <FieldSelect
            mainLabel="State"
            for="stateId"
            name="stateId"
            options={STATE_IDS}
            onChange={handleFieldChange}
            errorText={address.stateId.errorText}
            isInvalid={address.stateId.isInvalid && isDirty}
            defaultValue={defaultValues?.stateId}
          />
        </Grid.Item>
      </Grid>
      <Grid>
        <Grid.Item traits={{ xs: { auto: { width: 1, gutter: 'size2' } } }}>
          <FieldText
            mainLabel="Zip Code"
            for="zipcode"
            name="zipcode"
            onChange={handleFieldChange}
            type="text"
            errorText={address.zipcode.errorText}
            isInvalid={address.zipcode.isInvalid && isDirty}
            maxLength={5}
            defaultValue={defaultValues?.zipcode}
          />
        </Grid.Item>
        <Grid.Item traits={{ xs: { auto: { width: 1, gutter: 'size2' } } }}>
          <FieldText
            mainLabel="Phone Number"
            for="phoneNumber"
            name="phoneNumber"
            onChange={handleFieldChange}
            type="text"
            errorText={address.phoneNumber.errorText}
            isInvalid={address.phoneNumber.isInvalid && isDirty}
            mask="phoneNumber"
            maxLength={10}
            defaultValue={defaultValues?.phoneNumber}
          />
        </Grid.Item>
      </Grid>
      <div className={css.buttonContainer}>
        <ButtonMain
          brand="secondary"
          text={buttonText}
          isForm
          isDisabled={buttonIsDisabled}
          width="size6"
        />
      </div>
    </Form>
  );
};
