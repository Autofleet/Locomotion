import { View, ScrollView } from 'react-native';
import styled from 'styled-components';
import RoundedButton from '../../Components/RoundedButton';
import Button from '../../Components/Button';
import { TextArea } from '../../Components/TextArea';

export const SelectButton = styled(RoundedButton)`
  margin: 10px;
`;

export const CloseButton = styled(Button)`
  height: 0;
  width: 0
`;

export const CardsScrollView = styled(ScrollView)`
  max-height: 400px;
  margin-bottom: 50px;
`;

export const TitleView = styled.View`
  display: flex;
  flex-direction: row;
`;

export const SummaryContainer = styled.View`
  flex: 1;
  flex-shrink: 1;
  max-height: 450px;
  padding: 20px 0;
  background-color: white;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border-color: rgba(0, 0, 0, 0.1);
  max-height: 450px;
`;

export const Title = styled.Text`
  margin: 0px 20px;
  font-size: 20px;
  color: black;
  font-weight: 500;
  margin-bottom: 15px;
`;

export const StyledTextArea = styled(TextArea)`
  margin-bottom: 20px;
`;

export const Container = styled(View)`
  flex: 1;
  text-align: left;
  width: 100%;
`;

export const Footer = styled(View)`
position: absolute;
bottom: 0px;
margin: 0 20px;
`;
