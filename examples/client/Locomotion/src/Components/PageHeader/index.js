import React from 'react';
import propsTypes from 'prop-types';
import { Platform, View } from 'react-native';
import {
  Header, HeaderText, HeaderIconContainer, HeaderIcon, SkipButton, SkipButtonText,
} from './styled';
import i18n from '../../I18n';
import backArrow from '../../assets/arrow-back.png';

const PageHeader = ({
  title, icon, onIconPress, iconSide, displayIcon, width, showSkipButton, onPressSkip, action, showShadow,
}) => (
  <Header style={Platform.OS === 'android' && showShadow ? { shadowColor: '#000' } : {}} showShadow={showShadow}>
    {displayIcon !== false
      ? (
        <HeaderIconContainer side={iconSide} onPress={onIconPress} data-test-id="NavigationPanelButton">
          <HeaderIcon width={width} height={width} source={icon} side={iconSide} />
        </HeaderIconContainer>
      ) : <View />}
    <HeaderText>{title}</HeaderText>
    {showSkipButton
      && (
      <SkipButton
        testID="skipButton"
        noBackground
        onPress={onPressSkip}
      >

        <SkipButtonText>
          {i18n.t('general.skip')}
        </SkipButtonText>
      </SkipButton>
      )}
    {action}
  </Header>
);

export default PageHeader;

PageHeader.defaultProps = {
  title: '',
  icon: backArrow,
  iconSide: 'left',
  onIconPress: () => null,
  height: '25px',
  width: '25px',
  showShadow: true,
};

PageHeader.propTypes = {
  title: propsTypes.string,
  icon: propsTypes.string,
  iconSide: propsTypes.string,
  onIconPress: propsTypes.func,
  width: propsTypes.string,
  height: propsTypes.string,
  showShadow: propsTypes.bool,
};
