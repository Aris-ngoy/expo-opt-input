## Installation

```
bun add react-native-expo-opt-input
yarn add react-native-expo-opt-input
npm install --save react-native-expo-opt-input
```

## Dependencies

### NOTES: 
 We use expo-clipboard to handle the clipboard in this package, So you should install expo-clipboard

`npx expo install expo-clipboard`

## Basic Usage

```js
import OTPInputView from 'react-native-expo-opt-input';

<OTPInputView pinCount={4} />

```

## More Advanced Usage

```js
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

```

## Parameters

| Parameter               | required | Description                                                                                     |
| ----------------------- | -------- | ----------------------------------------------------------------------------------------------- |
| pinCount                | YES      | Number of digits in the component                                                               |
| code                    | NO       | You can use this library as a controlled / uncontrolled component by supplying this prop or not |
| codeInputFieldStyle     | NO       | The style of the input field which is NOT focused                                               |
| codeInputHighlightStyle | NO       | The style of the input field which is focused                                                   |
| autoFocusOnLoad         | NO       | Auto activate the input and bring up the keyboard when component is loaded                      |
| onCodeChanged           | NO       | Callback when the digits are changed                                                            |
| onCodeFilled            | NO       | Callback when the last digit is entered                                                         |
| secureTextEntry         | NO       | Hide contents of text fields                                                                    |
| editable                | NO       | Set editable for inputs                                                                         |
| keyboardAppearance      | NO       | Keyboard appearance ('default', 'dark', 'light')                                                |
| keyboardType            | NO       | Keyboard type                                                                                   |
| clearInputs             | NO       | Clear inputs after entering code                                                                |
| placeholderCharacter    | NO       | The character/string that will be used as placeholder in the individual code input fields       |
| placeholderTextColor    | NO       | Color of the placeholderCharacter                                                               |

## Roadmap

- [x] Typescript definition file
- [x] Typescript implementation
- [x] Add basic unit tests
- [ ] Add integration tests
