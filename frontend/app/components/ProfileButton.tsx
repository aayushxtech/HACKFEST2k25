import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  Profile: undefined;
};

const ProfileButton = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
      <Ionicons name="person-circle-outline" size={40} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profileButton: {
    padding: 8,
    borderRadius: 8,
  },
});

export default ProfileButton;