import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {HeaderButton} from 'react-navigation-header-buttons';
import colors from '../assests/colors';

const CustomHeaderButton = props => {
  return <HeaderButton IconComponent={Icon} iconSize={24} {...props} color={colors.primary} />;
};

export default CustomHeaderButton;
