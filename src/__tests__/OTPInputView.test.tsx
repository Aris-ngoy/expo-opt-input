import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import OTPInputView from '../index';

describe('OTPInputView', () => {
  const pinCount = 6;

  it('renders the correct number of input fields', () => {
    const { getByTestId } = render(<OTPInputView pinCount={pinCount} />);
    const otpInputView = getByTestId('OTPInputView');
    expect(otpInputView.findAllByType('TextInput').length).toBe(pinCount);
  });

  it('autofocuses on the first input field on load', () => {
    const { getByTestId } = render(<OTPInputView autoFocusOnLoad />);
    const otpInputView = getByTestId('OTPInputView');
    const inputFields = otpInputView.findAllByType('TextInput');
    expect(inputFields[0].props.editable).toBe(true);
  });

  it('handles input changes correctly', async () => {
    const onCodeChangedMock = jest.fn();
    const { getByTestId } = render(
      <OTPInputView pinCount={pinCount} onCodeChanged={onCodeChangedMock} />
    );

    const otpInputView = getByTestId('OTPInputView');
    const inputFields = await otpInputView.findAllByType('TextInput');

    fireEvent.changeText(inputFields[0], '1');
    fireEvent.changeText(inputFields[1], '2');
    fireEvent.changeText(inputFields[2], '3');
    fireEvent.changeText(inputFields[3], '4');
    fireEvent.changeText(inputFields[4], '5');
    fireEvent.changeText(inputFields[5], '6');

    await waitFor(() => {
      expect(onCodeChangedMock).toHaveBeenCalledWith('123456');
    });
  });

  it('calls onCodeFilled when the input is complete', async () => {
    const onCodeFilledMock = jest.fn();
    const { getByTestId } = render(
      <OTPInputView pinCount={pinCount} onCodeFilled={onCodeFilledMock} />
    );

    const otpInputView = getByTestId('OTPInputView');
    const inputFields = await otpInputView.findAllByType('TextInput');

    fireEvent.changeText(inputFields[0], '1');
    fireEvent.changeText(inputFields[1], '2');
    fireEvent.changeText(inputFields[2], '3');
    fireEvent.changeText(inputFields[3], '4');
    fireEvent.changeText(inputFields[4], '5');
    fireEvent.changeText(inputFields[5], '6');

    await waitFor(() => {
      expect(onCodeFilledMock).toHaveBeenCalledWith('123456');
    });
  });

  it('handles backspace correctly', async () => {
    const onCodeChangedMock = jest.fn();
    const { getByTestId } = render(
      <OTPInputView pinCount={pinCount} onCodeChanged={onCodeChangedMock} />
    );

    const otpInputView = getByTestId('OTPInputView');
    const inputFields = await otpInputView.findAllByType('TextInput');

    fireEvent.changeText(inputFields[0], '1');
    fireEvent.changeText(inputFields[1], '2');
    fireEvent.changeText(inputFields[2], '3');
    fireEvent.changeText(inputFields[3], '4');
    fireEvent.changeText(inputFields[4], '5');
    fireEvent.changeText(inputFields[5], '6');

    fireEvent(inputFields[5], 'onKeyPress', {
      nativeEvent: { key: 'Backspace' },
    });

    await waitFor(() => {
      expect(onCodeChangedMock).toHaveBeenCalledWith('12345');
    });
  });

  it('clears input fields when clearInputs prop is true', async () => {
    const { getByTestId } = render(
      <OTPInputView pinCount={pinCount} clearInputs />
    );
    const otpInputView = getByTestId('OTPInputView');
    const inputFields = await otpInputView.findAllByType('TextInput');

    fireEvent.changeText(inputFields[0], '1');
    fireEvent.changeText(inputFields[1], '2');
    fireEvent.changeText(inputFields[2], '3');
    fireEvent.changeText(inputFields[3], '4');
    fireEvent.changeText(inputFields[4], '5');
    fireEvent.changeText(inputFields[5], '6');

    fireEvent.press(otpInputView);

    await waitFor(() => {
      inputFields.forEach((field: { props: { value: any } }) => {
        expect(field.props.value).toBe('');
      });
    });
  });
});
