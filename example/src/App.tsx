import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import OTPInputView from 'react-native-expo-opt-input';

export default function App() {
  return (
    <View style={styles.container}>
      <OTPInputView
        placeholderCharacter=""
        codeInputFieldStyle={{
          borderColor: 'black',
          borderWidth: 2,
          color: 'gray',
        }}
        returnKeyType="done"
        style={{ width: 200 }}
        pinCount={4}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
