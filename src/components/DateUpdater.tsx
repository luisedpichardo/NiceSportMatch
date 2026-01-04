import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useTranslation } from 'react-i18next';
// Hooks
import { useTheme } from '../hooks/useTheme';

export type DateUpdaterRef = {
  getDate: () => any;
};

export type Props = {
  currDate: any;
};

const DateUpdater = (props: any, ref: any) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [isDateUpdaterVisible, setIsDateUpdaterVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const showDateUpdater = () => {
    setIsDateUpdaterVisible(true);
  };

  const hideDateUpdater = () => {
    setIsDateUpdaterVisible(false);
  };

  const handleConfirm = (date: any) => {
    setSelectedDate(date.toDateString());
    hideDateUpdater();
  };

  useImperativeHandle(ref, () => ({
    getDate: () => selectedDate,
  }));

  return (
    <View style={styles.container}>
      <Pressable onPress={showDateUpdater}>
        <Text style={{ ...styles.txt, color: theme.textPrimary }}>
          {t('home-tabs.match-stack.update.form.day')}
        </Text>
      </Pressable>
      <DateTimePickerModal
        isVisible={isDateUpdaterVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDateUpdater}
      />
      {selectedDate ? (
        <Text style={{ color: theme.textSecondary }}>{selectedDate}</Text>
      ) : (
        <Text style={{ color: theme.textSecondary }}>{props.currDate}</Text>
      )}
    </View>
  );
};

export default forwardRef<DateUpdaterRef, Props>(DateUpdater);

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
