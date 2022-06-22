import React, { useContext, useState } from 'react';
import { RidePageContext } from '../../../../../context/newRideContext';
import ServiceCard from './ServiceCard';
import { ServiceOptionsContainer } from './styles';

const ServiceOptions = () => {
  const [selectedService, setSelectedService] = useState(null);
  const { serviceEstimations } = useContext(RidePageContext);

  return (
    <ServiceOptionsContainer alwaysBounceVertical={false}>
      <>
        {(serviceEstimations || []).map(option => <ServiceCard service={option} />)}
      </>
    </ServiceOptionsContainer>
  );
};

export default ServiceOptions;
