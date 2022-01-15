import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import placesScreen from '../Screens/placesScreen';
import placesDetailScreen from '../Screens/placeDetailScreen';
import addPlaceScreen from '../Screens/addPlaceScreen';
import colors from '../assests/colors';

const nav = createStackNavigator(
  {
    placesScreen: {
      screen: placesScreen,
      navigationOptions: {
        title: 'All places',
      },
    },
    placesDetailScreen,
    addPlaceScreen,
  },
  {
    defaultNavigationOptions: {
      headerTitleStyle: {
        fontFamily: 'LuxuriousRoman-Regular',
        color: colors.accent,
      },
    },
  },
);

export default createAppContainer(nav);
