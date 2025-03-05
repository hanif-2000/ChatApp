import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageBubble from '../components/MessageBubble';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ChatScreen = ({route}: any) => {
  const {roomID} = route.params;
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const connectWebSocket = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      if (!storedUsername) {
        Alert.alert('Error', 'Username not found.');
        return;
      }
      setUsername(storedUsername);

      const WS_URL = `wss://chat-api-k4vi.onrender.com/ws/${roomID}/${storedUsername}`;
      ws.current = new WebSocket(WS_URL);
      ws.current.onopen = () => console.log('WebSocket Connected');

      ws.current.onmessage = event => {
        try {
          console.log('📩 WebSocket Message:', event.data);
          const receivedData = JSON.parse(event?.data);

          if (receivedData?.event === 'join') {
            Alert.alert(`${receivedData?.username} joined the room`);
          } else if (receivedData?.event === 'leave') {
            Alert.alert(`${receivedData?.username} left the room`);
          }

          if (receivedData?.event === 'message' && receivedData?.message) {
            setMessages(prev => [...prev, receivedData?.message]);
          }
        } catch (error) {
          console.error('⚠️ WebSocket Error:', error);
        }
      };
      ws.current.onclose = () => console.log('WebSocket Disconnected');
    };

    connectWebSocket();
    return () => ws.current?.close();
  }, [roomID]);

  const sendMessage = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      if (!message.trim()) {
        Alert.alert('Warning', 'Message cannot be empty.');
        return;
      }

      const payload = JSON.stringify({event: 'message', content: message});
      ws.current.send(payload);
      setMessage('');
    } else {
      Alert.alert('Error', 'WebSocket is not connected.');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <MessageBubble
            message={item}
            isCurrentUser={item.username === username}
          />
        )}
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="attach-file" size={24} color="#888" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Icon name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 3,
  },
  iconButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000',
  },
  sendButton: {
    backgroundColor: '#25D366',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatScreen;
