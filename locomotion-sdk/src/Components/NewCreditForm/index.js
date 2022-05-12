import React, {useState} from "react";
import {
  CardField,
  useStripe,
} from '@stripe/stripe-react-native';
import i18n from "../../I18n";
import PaymentsContext from "../../context/payments";
import SubmitButton from "../../Components/RoundedButton";
import {CreditForm, CreditFormText, ErrorMessage, SkipSubmitContainer, SubmitContainer} from "./styled";

export const NewCreditForm = ({ onDone, canSkip = false }) => {
  const {confirmSetupIntent} = useStripe();
  const usePayments = PaymentsContext.useContainer();

  const [loading, setLoading] = useState(false);
  const [formReady, setFormReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePayPress = async () => {
    let customerData = usePayments.customer;
    console.log('customerData', customerData);
    if (!usePayments.customer) {
      customerData = await usePayments.createCustomer();
    }
    const createIntent = await usePayments.createIntent();
    const billingDetails = {
      email: customerData.email,
    };
    const {setupIntent, error} = await confirmSetupIntent(createIntent.clientSecret, {
      type: 'Card',
      billingDetails,
    });

    if (error) {
      console.error(error);
      setErrorMessage(error.message)
    }

    await onDone();
    await usePayments.getPaymentMethods()
  };

  return (
    <>
      <CreditForm>
        <CreditFormText>{i18n.t('payments.newCardDetails')}</CreditFormText>
        <CardField
          postalCodeEnabled={false}
          placeholder={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
          }}
          style={{
            width: '90%',
            height: 50,
          }}
          onCardChange={(cardDetails) => {
            console.log('onCardChange', cardDetails);
            if (cardDetails) {
              if (formReady !== cardDetails.complete) {
                setFormReady(cardDetails.complete)
              }
            }
          }}
          onFocus={(focusedField) => {
            console.log('focusField', focusedField);
          }}
        />
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </CreditForm>
      <SubmitContainer>
        {canSkip ? (
          <SkipSubmitContainer>
            <SubmitButton onPress={() => onDone()} disabled={loading}>
              {i18n.t('payments.skipForNow')}
            </SubmitButton>
          </SkipSubmitContainer>
        ) : (<></>)}
        <SubmitButton
          onPress={() => handlePayPress()}
          disabled={!formReady}
          setLoading={setLoading}
        >
          {i18n.t('payments.submitCard')}
        </SubmitButton>
      </SubmitContainer>
    </>
  );
};
