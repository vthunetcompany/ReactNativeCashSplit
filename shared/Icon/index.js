import React from 'react';
import ZocialIcon from 'react-native-vector-icons/Zocial';
import OcticonIcon from 'react-native-vector-icons/Octicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import FAIcon5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';

const getIconFont = (type) => {
  switch (type) {
    case 'Fontisto':
      return Fontisto;
    case 'MaterialIcon':
      return MaterialIcon;
    case 'EvilIcon':
      return EvilIcon;
    case 'Feather':
      return Feather;
    case 'AntDesign':
      return AntDesign;
    case 'SimpleLineIcon':
      return SimpleLineIcon;
    case 'ZocialIcon':
      return ZocialIcon;
    case 'FoundationIcon':
      return FoundationIcon;
    case 'FAIcon5':
      return FAIcon5;
    case 'FAIcon':
      return FAIcon;
    case 'Ionicon':
      return Ionicon;
    case 'MaterialCommunityIcons':
      return MaterialCommunityIcons;
    case 'EntypoIcon':
      return EntypoIcon;
    case 'OcticonIcon':
      return OcticonIcon;
    default:
      return FAIcon;
  }
};

const Icon = ({ type, ...props }) => {
  const FontIcon = getIconFont(type);
  return <FontIcon {...props} />;
};

export default Icon;
