import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// Hooks
import { useTheme } from '../hooks/useTheme';

export type TimePickerRef = {
  getTime: () => any;
};

const TimePicker = (props: any, ref: any) => {
  const { theme } = useTheme();
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');

  const showTimePicker = () => {
    setIsTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setIsTimePickerVisible(false);
  };

  const handleConfirm = (time: any) => {
    setSelectedTime(time.toTimeString());
    hideTimePicker();
  };

  useImperativeHandle(ref, () => ({
    getTime: () => selectedTime,
  }));

  return (
    <View style={styles.container}>
      <Pressable onPress={showTimePicker}>
        <Text style={{ ...styles.txt, color: theme.textPrimary }}>
          Select Time
        </Text>
      </Pressable>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
      />
      <Text style={{ color: theme.textSecondary }}>{selectedTime}</Text>
    </View>
  );
};

export default forwardRef(TimePicker);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  txt: {
    fontWeight: 'bold',
  },
});
