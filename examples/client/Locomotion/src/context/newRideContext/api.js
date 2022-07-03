import network from '../../services/network';

export const createServiceEstimations = async (stopPoints) => {
  try {
    const { data } = await network.post('api/v1/services/service-estimations', { stopPoints });
    return data;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

export const getServices = async () => {
  try {
    const { data } = await network.get('api/v1/services');
    return data;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

export const getService = async (serviceId) => {
  try {
    const { data } = await network.get(`api/v1/services/${serviceId}`);
    return data;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

export const createRide = async (ride) => {
  const { data } = await network.post('api/v1/client-rides', ride);
  return data;
};

export const patchRide = async (rideId, newData) => {
  try {
    const { data } = await network.patch(`api/v1/rides/${rideId}`, newData);
    return data;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

export const getActiveRide = async () => {
  const { data } = await network.get('api/v1/rides/active');
  return data;
};

export const getRide = async (rideId) => {
  const { data } = await network.get(`api/v1/rides/${rideId}`);
  return data;
};

export const track = async (rideId) => {
  const { data } = await network.put(`api/v2/rides/${rideId}/track`);
  return data;
};
