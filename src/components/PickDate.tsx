import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export type DatePickerRef = {
  getDate: () => any;
};

const PickDate = (props: any, ref: any) => {
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
        <Text>Select Date</Text>
      </Pressable>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Text>{selectedDate}</Text>
    </View>
  );
};

export default forwardRef(PickDate);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});
