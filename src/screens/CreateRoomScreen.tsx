import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { createChatRoom } from '../store/chatSlice';

const CreateRoomScreen = ({ navigation }: any) => {
  const [roomName, setRoomName] = useState('');
  const dispatch = useDispatch();

  const handleCreateRoom = async () => {
    if (!roomName.trim()) {
      Alert.alert('Error', 'Room name cannot be empty');
      return;
    }
    try {
      const newRoom = await dispatch(createChatRoom(roomName)).unwrap();
      Alert.alert('Success', 'Room created successfully!');
      navigation.replace('Chat', { roomID: newRoom.id });
    } catch (error) {
      Alert.alert('Error', 'Failed to create room. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Room Name:</Text>
      <TextInput style={styles.input} placeholder="Room Name" value={roomName} onChangeText={setRoomName} />
      <Button title="Create Room" onPress={handleCreateRoom} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  label: { fontSize: 18, marginBottom: 10 },
  input: { width: '80%', padding: 10, borderWidth: 1, marginBottom: 20 },
});

export default CreateRoomScreen;
