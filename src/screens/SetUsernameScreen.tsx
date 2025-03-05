import React, {useState} from 'react';
import {View, Text, TextInput, Button, Alert, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUsername} from '../api/chatService';

const SetUsernameScreen = ({navigation}: any) => {
  const [username, setUsernameState] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSetUsername = async () => {
    if (!username.trim()) {
      Alert.alert('Error', 'Username cannot be empty');
      return;
    }

    setLoading(true);

    try {
      const response = await setUsername(username);
      await AsyncStorage.setItem('username', username);
      Alert.alert('Success', 'Username set successfully');
      navigation.replace('RoomsList');
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert(
        'API Error',
        error.response ? JSON.stringify(error.response.data) : error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Username:</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsernameState}
      />
      <Button
        title={loading ? 'Loading...' : 'Continue'}
        onPress={handleSetUsername}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  label: {fontSize: 18, marginBottom: 10},
  input: {width: '80%', padding: 10, borderWidth: 1, marginBottom: 20},
});

export default SetUsernameScreen;
