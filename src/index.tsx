import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  type FC,
} from 'react';
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
  type TextStyle,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { isAutoFillSupported, codeToArray } from './helper';

interface OTPInputViewProps {
  pinCount?: number;
  autoFocusOnLoad?: boolean;
  secureTextEntry?: boolean;
  editable?: boolean;
  keyboardAppearance?: 'default' | 'light' | 'dark';
  keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric';
  clearInputs?: boolean;
  placeholderCharacter?: string;
  selectionColor?: string;
  code?: string;
  onCodeChanged?: (code: string) => void;
  onCodeFilled?: (code: string) => void;
  style?: any;
  codeInputFieldStyle?: TextStyle;
  codeInputHighlightStyle?: TextStyle;
  placeholderTextColor?: string;
  returnKeyType?:
    | 'done'
    | 'next'
    | 'go'
    | 'previous'
    | 'search'
    | 'none'
    | 'default';
}

const OTPInputView: FC<OTPInputViewProps> = ({
  pinCount = 6,
  autoFocusOnLoad = true,
  secureTextEntry = false,
  editable = true,
  keyboardAppearance = 'default',
  keyboardType = 'number-pad',
  clearInputs = false,
  placeholderCharacter = '',
  selectionColor = '#000',
  code: propsCode = '',
  onCodeChanged,
  onCodeFilled,
  style,
  codeInputFieldStyle,
  codeInputHighlightStyle,
  placeholderTextColor,
  returnKeyType,
}) => {
  const [digits, setDigits] = useState(codeToArray(propsCode));
  const [selectedIndex, setSelectedIndex] = useState(autoFocusOnLoad ? 0 : -1);
  const fields = useRef<TextInput[]>(Array(pinCount).fill(null));

  const blurAllFields = useCallback(() => {
    fields.current.forEach((field) => field && field.blur());
    setSelectedIndex(-1);
  }, []);

  const clearAllFields = useCallback(() => {
    if (clearInputs && propsCode === '') {
      setDigits([]);
      setSelectedIndex(0);
    }
  }, [clearInputs, propsCode]);

  const copyCodeFromClipBoardOnAndroid = useCallback(() => {
    const interval = setInterval(async () => {
      if (Platform.OS === 'android') {
        const code = await Clipboard.getStringAsync();
        const regexp = new RegExp(`^\\d{${pinCount}}`);
        if (code && regexp.test(code)) {
          setDigits(code.split(''));
          blurAllFields();
          onCodeFilled && onCodeFilled(code);
        }
      }
    }, 400);
    return interval;
  }, [pinCount, blurAllFields, onCodeFilled]);

  const handleKeyboardDidHide = useCallback(() => {
    blurAllFields();
  }, [blurAllFields]);

  const focusField = useCallback(
    (index: number) => {
      if (selectedIndex !== index && fields.current[index]) {
        fields?.current[index]?.focus();
        setSelectedIndex(index);
      }
    },
    [selectedIndex]
  );

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardDidHide
    );
    const clipboardCheckInterval = copyCodeFromClipBoardOnAndroid();
    return () => {
      keyboardDidHideListener.remove();
      clearInterval(clipboardCheckInterval);
    };
  }, [copyCodeFromClipBoardOnAndroid, handleKeyboardDidHide]);

  useEffect(() => {
    if (propsCode !== undefined) {
      setDigits(codeToArray(propsCode));
    }
  }, [propsCode]);

  useEffect(() => {
    clearAllFields();
  }, [clearAllFields, clearInputs]);

  const handleInputChange = useCallback(
    (index: number, text: string) => {
      const newDigits = [...digits];
      let newIndex = index;
      if (text.length === 0) {
        if (newDigits.length > 0) {
          newDigits.splice(index, 1);
        }
      } else {
        text.split('').forEach((value: string) => {
          if (newIndex < pinCount) {
            newDigits[newIndex] = value;
            newIndex += 1;
          }
        });
        newIndex -= 1;
      }

      setDigits(newDigits);
      const result = newDigits.join('');
      if (result.length >= pinCount) {
        onCodeFilled && onCodeFilled(result);
        focusField(pinCount - 1);
        blurAllFields();
      } else {
        if (text.length > 0 && index < pinCount - 1) {
          focusField(index + 1);
        }
      }
      onCodeChanged && onCodeChanged(result); // Call onCodeChanged with the updated code
    },
    [digits, pinCount, onCodeChanged, onCodeFilled, focusField, blurAllFields]
  );

  const handleKeyPress = useCallback(
    (index: number, key: string) => {
      if (key === 'Backspace') {
        if (!digits[index] && index > 0) {
          handleInputChange(index - 1, '');
          focusField(index - 1);
        }
      }
    },
    [digits, focusField, handleInputChange]
  );

  const renderInputFields = () => {
    const inputFields = [];
    for (let i = 0; i < pinCount; i++) {
      inputFields.push(
        <TextInput
          key={i}
          style={[
            styles.defaultTextFieldStyle,
            codeInputFieldStyle,
            selectedIndex === i && codeInputHighlightStyle,
          ]}
          ref={(ref) => (fields.current[i] = ref as TextInput)}
          onChangeText={(text) => handleInputChange(i, text)}
          onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(i, key)}
          value={!clearInputs ? digits[i] : ''}
          keyboardAppearance={keyboardAppearance}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          textContentType={isAutoFillSupported ? 'oneTimeCode' : 'none'}
          selectionColor={selectionColor}
          secureTextEntry={secureTextEntry}
          editable={editable}
          placeholder={placeholderCharacter}
          placeholderTextColor={
            placeholderTextColor || styles.defaultTextFieldStyle.color
          }
        />
      );
    }
    return inputFields;
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (!clearInputs) {
          let filledPinCount = digits.filter(
            (digit) => digit !== null && digit !== undefined
          ).length;
          focusField(Math.min(filledPinCount, pinCount - 1));
        } else {
          clearAllFields();
          focusField(0);
        }
      }}
    >
      <View testID="OTPInputView" style={style}>
        <View style={styles.inputContainer}>{renderInputFields()}</View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default OTPInputView;

const styles = StyleSheet.create({
  defaultTextFieldStyle: {
    width: 45,
    height: 45,
    borderColor: 'rgba(226, 226, 226, 1)',
    borderWidth: 1,
    borderRadius: 2,
    textAlign: 'center',
    color: 'rgba(226, 226, 226, 1)',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
