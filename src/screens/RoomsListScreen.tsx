import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {fetchRooms} from '../store/chatSlice';

const RoomsListScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const {rooms, loading} = useSelector((state: any) => state.chat);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={styles.roomCard}
      onPress={() => navigation.navigate('Chat', {roomID: item.id})}>
      <Icon name="chat" size={24} color="#4A90E2" />
      <View style={styles.roomInfo}>
        <Text style={styles.roomName}>{item.name}</Text>
        <Text style={styles.roomDate}>
          Created: {new Date(item.created_at).toLocaleDateString()}
        </Text>
      </View>
      <Icon name="arrow-forward-ios" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#4A90E2" />
      ) : rooms?.length > 0 ? (
        <FlatList
          data={rooms}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noRooms}>No rooms available.</Text>
      )}

      <TouchableOpacity
        style={styles.createRoomButton}
        onPress={() => navigation.navigate('CreateRoom')}>
        <Icon name="add" size={24} color="white" />
        <Text style={styles.createRoomText}>Create Room</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f5f5f5', paddingHorizontal: 15},
  listContainer: {paddingBottom: 20},
  noRooms: {fontSize: 16, textAlign: 'center', marginTop: 20, color: '#888'},
  roomCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2,
  },
  roomInfo: {flex: 1, marginLeft: 10},
  roomName: {fontSize: 18, fontWeight: '600'},
  roomDate: {fontSize: 12, color: '#777'},
  createRoomButton: {
    flexDirection: 'row',
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  createRoomText: {color: 'white', fontSize: 18, marginLeft: 5},
});

export default RoomsListScreen;
