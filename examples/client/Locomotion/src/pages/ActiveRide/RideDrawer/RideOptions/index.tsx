import React, {
  useContext, useEffect, useState,
} from 'react';
import { RIDE_POPUPS } from '../../../../context/newRideContext/utils';
import RideButtons from './RideButtons';
import ServiceOptions from './ServiceOptions';
import RideNotes from '../../../../popups/RideNotes';
import { RidePageContext } from '../../../../context/newRideContext';
import ChoosePaymentMethod from '../../../../popups/ChoosePaymentMethod';
import { popupNames } from './utils';
import { BottomSheetContext, SNAP_POINT_STATES } from '../../../../context/bottomSheetContext';
import payments from '../../../../context/payments';
import { PaymentMethodInterface } from '../../../../context/payments/interface';
import { RideStateContextContext } from '../../../../context/ridePageStateContext';
import { BS_PAGES } from '../../../../context/ridePageStateContext/utils';


const RideOptions = () => {
  const usePayments = payments.useContainer();
  const [popupToShow, setPopupToShow] = useState<popupNames | null>(null);

  const {
    updateRidePayload,
    ride,
    ridePopup,
    stopRequestInterval,
  } = useContext(RidePageContext);

  const {
    setFooterComponent,
  } = useContext(BottomSheetContext);

  const {
    changeBsPage,
  } = useContext(RideStateContextContext);

  const setPopupName = (popupName: popupNames) => {
    setPopupToShow(popupName);
  };

  const clearPopup = () => {
    setPopupToShow(null);
  };


  useEffect(() => {
    const updateClient = async () => {
      await usePayments.loadCustomer();
    };

    updateClient();
  }, []);

  const loadCustomerData = async () => {
    await usePayments.getOrFetchCustomer();
  };

  useEffect(() => {
    loadCustomerData();
  }, []);

  useEffect(() => {
    const updateDefaultPaymentMethod = async () => {
      const paymentMethod: PaymentMethodInterface |
       undefined = await usePayments.getClientDefaultMethod();
      if (paymentMethod) {
        updateRidePayload({
          paymentMethodId: paymentMethod.id,
        });
      }
    };

    updateDefaultPaymentMethod();
  }, [usePayments.paymentMethods]);

  useEffect(() => {
    setFooterComponent(() => (
      <RideButtons
        displayPassenger={false}
        setPopupName={setPopupName}
      />
    ));

    changeBsPage(BS_PAGES.SERVICE_ESTIMATIONS);
    return () => {
      setFooterComponent(null);
    };
  }, []);

  useEffect(() => {
    if (ridePopup === RIDE_POPUPS.FAILED_SERVICE_REQUEST) {
      changeBsPage(BS_PAGES.ADDRESS_SELECTOR);
      stopRequestInterval();
    }
  }, [ridePopup]);

  return (
    <>
      <ServiceOptions />
      <RideNotes
        isVisible={popupToShow === 'notes'}
        notes={ride?.notes}
        onSubmit={(text: string) => {
          updateRidePayload({
            notes: text,
          });
          clearPopup();
        }}
        onCancel={() => {
          clearPopup();
        }}
      />
      <ChoosePaymentMethod
        selected={ride?.paymentMethodId?.length
          && usePayments.paymentMethods.includes(ride?.paymentMethodId as never)
          ? ride.paymentMethodId : usePayments.getClientDefaultMethod()?.id}
        rideFlow
        isVisible={popupToShow === 'payment'}
        onCancel={() => clearPopup()}
        onSubmit={(payment: any) => {
          updateRidePayload({
            paymentMethodId: payment,
          });
        }}
      />
    </>
  );
};

export default RideOptions;
