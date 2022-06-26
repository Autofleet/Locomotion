import React, { useEffect, useState } from 'react';
import propsTypes from 'prop-types';
import Loader from '../Loader';
import { ButtonTextContainer, StyledButton, SubmitButtonText } from './styled';

const RoundedButton = ({
  onPress,
  style,
  hollow,
  setLoading,
  disabled,
  type,
  useCancelTextButton,
  ...props
}) => {
  const [loadingState, setLoadingState] = useState(false);

  const onPressWithLoading = async (args) => {
    setLoadingState(true);
    await onPress(args);
    return setLoadingState(false);
  };

  useEffect(() => {
    if (setLoading) {
      setLoading(loadingState);
    }
  }, [loadingState]);

  return (
    <StyledButton
      {...props}
      onPress={onPressWithLoading}
      hollow={hollow}
      disabled={(loadingState || disabled)}
      isLoading={loadingState}
      type={type}
      style={style}
      useCancelTextButton={useCancelTextButton}
    >
      <ButtonTextContainer>
        <SubmitButtonText
          hollow={hollow}
          disabled={disabled}
          type={type}
          useCancelTextButton={useCancelTextButton}
        >
          {props.children}
        </SubmitButtonText>
      </ButtonTextContainer>
    </StyledButton>
  );
};

RoundedButton.defaultProps = {
  type: 'confirm',
  hollow: false,
  onPress: () => null,
  disabled: false,
  useCancelTextButton: false,
  setLoading: null,
};

RoundedButton.propTypes = {
  type: propsTypes.string,
  hollow: propsTypes.bool,
  onPress: propsTypes.func,
  disabled: propsTypes.bool,
  useCancelTextButton: propsTypes.bool,
  setLoading: propsTypes.func,
};

export default RoundedButton;
