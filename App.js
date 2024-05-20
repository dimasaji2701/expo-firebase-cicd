import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db, collection, addDoc, getDocs } from './firebaseConfig';
import { colors, sizes } from './theme';
import { Button, Input } from './src/components';
import { orderBy, query, doc, deleteDoc, updateDoc } from 'firebase/firestore';

export default function App() {
  const [notes, setNotes] = useState('');
  const [notesList, setNotesList] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  useEffect(() => {
    readData();
  }, []);

  const readData = async () => {
    try {
      const notesQuery = query(collection(db, "notes"), orderBy("createAt", "desc"));
      const querySnapshot = await getDocs(notesQuery);
      const notesArray = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        notesArray.push({ id: doc.id, ...data });
      });
      setNotesList(notesArray);
    } catch (e) {
      console.error("Error reading document: ", e);
    }
  };

  const addData = async () => {
    try {
      const docRef = await addDoc(collection(db, "notes"), {
        content: notes,
        createAt: new Date()
      });
      console.log("Document written with ID: ", docRef.id);
      Alert.alert('Berhasil tambah notes!');
      setNotes(''); // Clear input after adding
      readData(); // Refresh data
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const updateData = async () => {
    try {
      if (selectedNoteId) {
        const docRef = doc(db, "notes", selectedNoteId);
        await updateDoc(docRef, {
          content: notes,
          updateAt: new Date()
        });
        console.log("Document updated with ID: ", selectedNoteId);
        Alert.alert('Berhasil update note!');
        setNotes(''); // Clear input after updating
        setSelectedNoteId(null); // Clear selected note ID
        readData(); // Refresh data
      } else {
        Alert.alert('Tidak ada note yang dipilih untuk diupdate');
      }
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  const deleteData = async (id) => {
    try {
      const docRef = doc(db, "notes", id);
      await deleteDoc(docRef);
      console.log("Document deleted with ID: ", id);
      Alert.alert('Berhasil hapus note!');
      readData(); // Refresh data
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  const renderNote = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => { setNotes(item.content); setSelectedNoteId(item.id); }}>
      <Text style={styles.noteContent}>{item.content}</Text>
      <TouchableOpacity
        style={styles.btnDelete}
        onPress={() => Alert.alert(
          'Yakin mau hapus?',
          'Data anda akan dihapus permanent',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel'
            },
            {
              text: 'OK',
              onPress: () => deleteData(item.id)
            }
          ]
        )}>
        <Text style={styles.btnText}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes App ODP BNI</Text>
      <Input
        value={notes}
        onChangeText={setNotes}
        placeholder='Add a note...'
      />
      <Button
        title={selectedNoteId ? 'Update' : 'Add'}
        onPress={selectedNoteId ? updateData : addData}
      />
      <FlatList
        data={notesList}
        renderItem={renderNote}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: sizes.xl4
  },
  title: {
    color: colors.textColors.black,
    fontWeight: '800',
    fontSize: sizes.xl,
    marginBottom: 47,
    textAlign: 'center'
  },
  card: {
    margin: sizes.xl2,
    paddingHorizontal: sizes.large,
    paddingVertical: sizes.xl2,
    borderRadius: sizes.large,
    borderColor: colors.primary['green'],
    borderWidth: 1,
  },
  btnDelete: {
    flexDirection: 'row',
    marginTop: sizes.xl2,
    alignSelf: 'flex-end'
  },
  btnText: {
    color: 'red',
    fontWeight: 'bold',
  },
  noteContent: {
    fontSize: sizes.large,
    color: colors.textColors.black,
  },
  listContainer: {
    paddingBottom: 20
  }
});
