import * as React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Searchbar } from 'react-native-paper';

export default function ProspectsSearchBar() {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Filter your prospects"
        placeholderTextColor="#999"
        onChangeText={setSearchQuery}
        value={searchQuery}
        iconColor="#6C63FF"
        elevation={1}
        style={styles.searchBar}
        inputStyle={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  searchBar: {
    borderRadius: 15,
    backgroundColor: '#F6F6F6',
    height: 48, // forces uniform height
  },
  input: {
    fontSize: 14,
    paddingBottom: 0,
    paddingTop: 0,
    marginTop: -2, // small tweak to center vertically
    fontFamily: 'Lexend-Regular',
  },
})