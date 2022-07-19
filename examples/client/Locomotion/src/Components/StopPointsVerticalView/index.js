import React from 'react';
import moment from 'moment';
import CardsTitle from '../CardsTitle';
import i18n from '../../I18n';
import VerticalTimeLineCard from './VerticalTimeLine';
import { ContentSubTitle, ContentTitle, PanelContentContainer } from './styled';
import { getOrdinal } from '../../lib/ride/utils';
import {
  RIDE_ACTIVE_STATES, RIDE_STATES, STOP_POINT_STATES, STOP_POINT_TYPES,
} from '../../lib/commonTypes';

const getEtaText = eta => moment(eta).format('HH:mm');

const stopPointText = (sp, isFutureRide) => {
  if (isFutureRide) {
    return '';
  }
  if (sp.state === STOP_POINT_STATES.PENDING) {
    return getEtaText((sp.plannedArrivalTime || sp.afterTime));
  }

  return i18n.t(`stopPoints.states.${sp.state}`);
};

const MAX_DESC_LIMIT = 50;

const Index = ({ ride }) => {
  const {
    state,
    stopPoints,
  } = ride;
  const rideIsActive = [...RIDE_ACTIVE_STATES, RIDE_STATES.CANCELED].includes(state);
  const isFutureRide = stopPoints[0].afterTime;
  if (stopPoints
    && stopPoints.length) {
    return (
      <>
        <CardsTitle title={i18n.t('ride.journey')} />
        <PanelContentContainer>
          {stopPoints.map((sp, index) => (
            <VerticalTimeLineCard
              key={`VerticalTimeLineCard#${sp.id}`}
              sp={sp}
              first={index === 0}
              last={index + 1 === stopPoints.length}
              content={(
                <>
                  <ContentTitle>
                    {`${sp.ordinalDesc ? `${getOrdinal(sp.ordinalDesc + 1)} ` : ''}${i18n.t(`stopPointsTypes.${sp.type}`)}`}
                  </ContentTitle>
                  <ContentSubTitle>
                    {(sp.description || '').slice(0, MAX_DESC_LIMIT)}
                  </ContentSubTitle>
                </>
            )}
              underContent={(
                <ContentTitle>
                  {rideIsActive
                    ? stopPointText(sp, isFutureRide)
                    : getEtaText(sp.completedAt || sp.arrivedAt)
                }
                </ContentTitle>
            )}
            />
          ))}
        </PanelContentContainer>
      </>
    );
  }
  return null;
};

export default Index;
