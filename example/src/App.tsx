import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import OTPInputView from 'react-native-expo-opt-input';

export default function App() {
  return (
    <View style={styles.container}>
      <OTPInputView
        placeholderCharacter=""
        codeInputFieldStyle={styles.codeInputField}
        returnKeyType="done"
        style={styles.otpInputView}
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
  codeInputField: {
    borderColor: 'black',
    borderWidth: 2,
    color: 'gray',
  },
  otpInputView: {
    width: 200,
  },
});
