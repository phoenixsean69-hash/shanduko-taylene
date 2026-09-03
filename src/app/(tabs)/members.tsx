import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MembersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Members</Text>
      <Text style={styles.subtitle}>
        Your registered household members
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6F5',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#183A35',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#7C8D8A',
  },
});
