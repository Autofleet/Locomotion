import { useState } from 'react';
import { createContainer } from 'unstated-next';
import cashPaymentMethod from '../../pages/Payments/cashPaymentMethod';
import { getByKey } from '../../context/settings/api';
import network from '../../services/network';
import SETTINGS_KEYS from '../settings/keys';
import SettingContext from '../settings';

const BASE_PATH = '/api/v1/me/customers';

const usePayments = () => {
  const useSettings = SettingContext.useContainer();
  const [customer, setCustomer] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentAccount, setPaymentAccount] = useState(null);

  const getCustomer = async () => {
    const { data: clientData } = await network.get(BASE_PATH);
    return clientData;
  };

  const loadCustomer = async () => {
    const customerData = await getCustomer();
    setCustomer(customerData);
    setPaymentMethods(customerData.paymentMethods);
    return customerData;
  };

  const getOrFetchCustomer = async () => {
    if (customer) {
      return customer;
    }

    return loadCustomer();
  };

  const setup = async () => {
    const { data: intent } = await network.post(`${BASE_PATH}/setup`);
    return intent;
  };

  const getClientPaymentAccount = async () => {
    const { data } = await network.get(`${BASE_PATH}/payment-account`);
    setPaymentAccount(data);
    return data;
  };

  const getOrFetchClientPaymentAccount = () => {
    if (paymentAccount) {
      return paymentAccount;
    }
    return getClientPaymentAccount();
  };

  const detachPaymentMethod = async (paymentMethodId) => {
    const { data: paymentMethodsData } = await network.post(`${BASE_PATH}/${paymentMethodId}/detach`);
    return paymentMethodsData;
  };

  const clientHasValidPaymentMethods = () => paymentMethods.length > 0
  && paymentMethods.some(pm => !pm.isExpired);

  const isCashPaymentEnabled = async () => {
    const paymentSetting = await
    useSettings.getMultipleSettingByKey([
      SETTINGS_KEYS.CASH_ENABLED,
      SETTINGS_KEYS.CASH_ENABLED_IN_APP,
    ]);
    const cashEnabled = paymentSetting[SETTINGS_KEYS.CASH_ENABLED];
    const cashEnabledInApp = paymentSetting[SETTINGS_KEYS.CASH_ENABLED_IN_APP];
    return cashEnabled && cashEnabledInApp;
  };

  const getClientDefaultMethod = async () => {
    if (paymentMethods && paymentMethods.length) {
      return (paymentMethods || []).find(pm => pm.isDefault) || paymentMethods[0];
    }
    const cashEnabled = await isCashPaymentEnabled();
    if (cashEnabled) {
      return cashPaymentMethod;
    }
  };

  const createPaymentMethod = async (paymentMethodId) => {
    const { data: paymentMethod } = await network.post(`${BASE_PATH}/${paymentMethodId}`);
    return paymentMethod;
  };

  const updatePaymentMethod = async (paymentMethodId, values) => {
    const { data: paymentMethod } = await network.patch(`${BASE_PATH}/${paymentMethodId}`, values);
    return paymentMethod;
  };

  const getClientOutstandingBalanceCard = () => paymentMethods.find(pm => pm.hasOutstandingBalance);

  return {
    paymentAccount,
    getClientPaymentAccount,
    getCustomer,
    customer,
    loadCustomer,
    setup,
    paymentMethods,
    detachPaymentMethod,
    getOrFetchCustomer,
    clientHasValidPaymentMethods,
    getClientDefaultMethod,
    isCashPaymentEnabled,
    createPaymentMethod,
    updatePaymentMethod,
    getClientOutstandingBalanceCard,
    getOrFetchClientPaymentAccount,
  };
};

export default createContainer(usePayments);
