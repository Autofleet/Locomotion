import network from '../../services/network';

export const getByKey = async (key: string, params?: any) => {
  const { data } = await network.get(`/api/v1/settings/${key}`, {
    params,
  });
  return data;
};

export const getMultipleByKeys = async (keys: string[]) => {
  const { data } = await network.get('/api/v1/settings/', {
    params: {
      keys,
    },
  });
  return data;
};

export const getAppSettings = async () => {
  const { data } = await network.get('/api/v1/app-settings');
  return data;
};

export const getWorkingHoursData = async () => {
  const { data } = await network.get('/api/v1/me/app-settings/working-hours');
  return data;
};
