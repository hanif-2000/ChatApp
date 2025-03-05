import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface MessageBubbleProps {
  message: {
    id: number;
    content: string;
    username: string;
    created_at: string;
  };
  isCurrentUser: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isCurrentUser,
}) => {
  return (
    <View
      style={[
        styles.messageWrapper,
        isCurrentUser ? styles.myMessageWrapper : styles.otherMessageWrapper,
      ]}>
      <View
        style={[
          styles.messageContainer,
          isCurrentUser ? styles.myMessage : styles.otherMessage,
        ]}>
        {!isCurrentUser && (
          <Text style={styles.username}>{message.username}</Text>
        )}
        <Text style={styles.messageText}>{message.content}</Text>
        <Text style={styles.timestamp}>
          {new Date(message.created_at).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageWrapper: {
    flexDirection: 'row',
    marginVertical: 5,
    maxWidth: '80%',
  },
  myMessageWrapper: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  otherMessageWrapper: {
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
  },
  messageContainer: {
    padding: 10,
    borderRadius: 12,
    minWidth: '20%',
  },
  myMessage: {
    backgroundColor: '#25D366',
    borderTopRightRadius: 0,
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#E5E5EA',
    borderTopLeftRadius: 0,
    alignSelf: 'flex-start',
  },
  username: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 3,
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  timestamp: {
    fontSize: 12,
    alignSelf: 'flex-end',
    color: 'rgba(0,0,0,0.6)',
    marginTop: 3,
  },
});

export default MessageBubble;
