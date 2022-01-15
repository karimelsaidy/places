import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  useWindowDimensions,
  Alert,
  Linking,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../assests/colors';
import ImageCropPicker from 'react-native-image-crop-picker';

const bottomSheet = React.forwardRef((props, ref) => {
  const {height} = useWindowDimensions();

  const options = [
    {
      title: 'Take a photo',
      icon: <Icon size={22} name="camera" color={colors.grey} />,
      onPress: () => {
        ImageCropPicker.openCamera({
          freeStyleCropEnabled: true,
          compressImageQuality: 0.8,
          cropping: true,
        })
          .then(image => {
            props.addImage(image.path);
            ref.current.close();

          })
          .catch(e => {
            if (e.code === 'E_PICKER_CANCELLED') {
              return;
            }
            Alert.alert(
              'access Camera Denied',
              'please go to your Settings and Allow places to Access your camera',
              [
                {text: 'ok'},
                {text: 'Settings', onPress: () => Linking.openSettings()},
              ],
            );
          });
      },
    },
    {
      title: 'Open Gallery',
      icon: <Icon size={22} name="camera-burst" color={colors.grey} />,
      onPress: () => {
        ImageCropPicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
          compressImageQuality: 0.5,
          freeStyleCropEnabled: true,
        })
          .then(image => {
            props.addImage(image.path);
            ref.current.close();
          })
          .catch(e => {
            if (e.code === 'E_PICKER_CANCELLED') {
              return;
            }
            Alert.alert(
              'access Camera Denied',
              'please go to your Settings and Allow places to Access your camera',
              [
                {text: 'ok'},
                {text: 'Settings', onPress: () => Linking.openSettings()},
              ],
            );
          });
      },
    },
    {
      title: 'Cancel',
      icon: <Icon size={22} name="close-thick" color={colors.red} />,
      onPress: () => {
        ref.current.close();
      },
    },
  ];
  return (
    <RBSheet
      ref={ref}
      style={styles.rbSheet}
      height={height * 0.3}
      closeOnDragDown={true}
      customStyles={{
        container: {
          borderTopStartRadius: 15,
          borderTopEndRadius: 15,
        },
        wrapper: {
          backgroundColor: 'transparent',
        },
        draggableIcon: {
          backgroundColor: '#000',
        },
      }}>
      {options.map(item => {
        return (
          <TouchableOpacity
            style={styles.btn}
            onPress={item.onPress}
            key={item.title}>
            {item.icon}
            <Text style={styles.btnTxt}> {item.title}</Text>
          </TouchableOpacity>
        );
      })}
    </RBSheet>
  );
});
const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    paddingStart: 12,
    paddingVertical: 5,
  },
  btnTxt: {
    fontSize: 18,
  },
});
export default bottomSheet;
