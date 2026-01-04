import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// Hooks
import { useTheme } from '../hooks/useTheme';

export type DatePickerRef = {
  getDate: () => any;
};

const DatePicker = (props: any, ref: any) => {
  const { theme } = useTheme();
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleConfirm = (date: any) => {
    setSelectedDate(date.toDateString());
    hideDatePicker();
  };

  useImperativeHandle(ref, () => ({
    getDate: () => selectedDate,
  }));

  return (
    <View style={styles.container}>
      <Pressable onPress={showDatePicker}>
        <Text style={{ ...styles.txt, color: theme.textPrimary }}>
          Select Date
        </Text>
      </Pressable>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Text style={{ color: theme.textSecondary }}>{selectedDate}</Text>
    </View>
  );
};

export default forwardRef(DatePicker);

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
