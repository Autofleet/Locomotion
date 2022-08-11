import moment from 'moment';
import React, { useContext, useState } from 'react';
import propsTypes from 'prop-types';
import SvgIcon from '../../../../../../Components/SvgIcon';
import i18n from '../../../../../../I18n';
import Seat from '../../../../../../assets/seat.svg';
import { getFormattedPrice, TAG_OPTIONS } from '../../../../../../context/newRideContext/utils';
import { Context as ThemeContext } from '../../../../../../context/theme';
import {
  Circle, AvailableSeats,
  Capacity, CardContainer,
  CarIcon, Eta,
  Row, Price,
  ServiceDetails, TimeDetails,
  Title, Description,
  CarContainer, TitleContainer,
  EstimatedText, PriceContainer,
} from './styled';
import Tag from '../../../../../../Components/Tag';
import { RidePageContext } from '../../../../../../context/newRideContext';
import FareBreakdownPopup from '../../../../../../popups/FareBreakdownPopup';

const FARE_POPUP = 'fare popup';

const ServiceCard = ({ service, inPopup }) => {
  const theme = useContext(ThemeContext);
  const {
    setChosenService, chosenService, serviceEstimations, ride,
  } = useContext(RidePageContext);
  const [popup, setPopup] = useState('');
  const isFutureRide = ride.scheduledTo;
  const unavailable = !service.eta;
  const unavailableText = i18n.t('rideDetails.unavailable');
  const serviceDisplayPrice = getFormattedPrice(service.currency, service.price);
  const isSelected = chosenService && chosenService.id === service.id;
  const tagStyles = {
    [TAG_OPTIONS.FASTEST]: {
      container: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: theme.primaryColor,
        backgroundColor: theme.primaryColor,
      },
      textColor: theme.primaryButtonTextColor,
    },
    [TAG_OPTIONS.CHEAPEST]: {
      container: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: theme.primaryColor,
      },
      textColor: theme.primaryColor,
    },
  };

  const getEta = () => {
    const minutesUntilPickup = moment(service.eta).diff(moment(), 'minutes');
    return minutesUntilPickup < 1
      ? i18n.t('general.now')
      : i18n.t('rideDetails.toolTipEta', { minutes: minutesUntilPickup });
  };

  const getDescription = forFutureRidesView => (
    <Description style={{ ...(forFutureRidesView && { width: '60%' }) }} numberOfLines={2}>
      {service.description}
    </Description>
  );

  return (
    <>
      <CardContainer
        theme={theme}
        inPopup={inPopup}
        selected={isSelected}
        activeOpacity={inPopup ? 1 : 0.5}
        noBackground
        disabled={unavailable}
        onPress={() => {
          if (!inPopup) {
            if (isSelected) {
              return setPopup(FARE_POPUP);
            }
            setChosenService(service);
          }
        }}
      >
        <CarContainer unavailable={unavailable}>
          <CarIcon
            resizeMode="contain"
            source={{ uri: service.iconUrl }}
          />
        </CarContainer>
        <ServiceDetails unavailable={unavailable}>
          <Row>
            <TitleContainer>
              <Title>
                {service.name}
              </Title>
              {serviceEstimations.filter(s => s.price).length > 1
            && service.tag
            && !(isFutureRide && service.tag === TAG_OPTIONS.FASTEST)
            && (
            <Tag
              key={service.tag}
              containerStyles={tagStyles[service.tag].container}
              text={service.tag}
              textColor={tagStyles[service.tag].textColor}
            />
            )
            }
            </TitleContainer>
            <Price>
              {service.price !== undefined ? serviceDisplayPrice : unavailableText}
            </Price>

          </Row>
          {!unavailable && (
          <Row>
            {!isFutureRide
              ? (
                <TimeDetails>
                  <Eta>
                    {moment(service.eta).format('h:mm A')}
                  </Eta>
                  <Circle />
                  <Eta>
                    {getEta()}
                  </Eta>
                </TimeDetails>
              )
              : getDescription(isFutureRide)}

            {service.isPriceEstimated ? (
              <EstimatedText>
                {i18n.t('rideDetails.estimatedFare')}
              </EstimatedText>
            ) : (
              <Capacity>
                <AvailableSeats>
                  {service.availableSeats}
                </AvailableSeats>
                <SvgIcon Svg={Seat} width={15} height={15} />
              </Capacity>
            )}

          </Row>
          )}
          {service.description && !isFutureRide && (
          <Row>
            {getDescription()}
            {service.isPriceEstimated ? (
              <Capacity>
                <AvailableSeats>
                  {service.availableSeats}
                </AvailableSeats>
                <SvgIcon Svg={Seat} width={15} height={15} />
              </Capacity>
            ) : null}
          </Row>
          )}
        </ServiceDetails>
      </CardContainer>
      {popup === FARE_POPUP && (
      <FareBreakdownPopup
        isVisible={popup === FARE_POPUP}
        service={service}
        onClose={() => setPopup('')}
      />
      )}
    </>
  );
};

ServiceCard.defaultProps = {
  service: {},
  inPopup: false,
};

ServiceCard.propTypes = {
  service: propsTypes.any,
  inPopup: propsTypes.bool,
};

export default ServiceCard;
