import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useTranslation } from 'react-i18next';
// Hooks
import { useTheme } from '../hooks/useTheme';

export type TimeUpdaterRef = {
  getTime: () => any;
};

export type Props = {
  currTime: any;
};

const TimeUpdater = (props: any, ref: any) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [isTimeUpdaterVisible, setIsTimeUpdaterVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');

  const showTimeUpdater = () => {
    setIsTimeUpdaterVisible(true);
  };

  const hideTimeUpdater = () => {
    setIsTimeUpdaterVisible(false);
  };

  const handleConfirm = (time: any) => {
    setSelectedTime(time.toTimeString());
    hideTimeUpdater();
  };

  useImperativeHandle(ref, () => ({
    getTime: () => selectedTime,
  }));

  return (
    <View style={styles.container}>
      <Pressable onPress={showTimeUpdater}>
        <Text style={{ ...styles.txt, color: theme.textPrimary }}>
          {t('home-tabs.match-stack.update.form.time')}
        </Text>
      </Pressable>
      <DateTimePickerModal
        isVisible={isTimeUpdaterVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideTimeUpdater}
      />
      {selectedTime ? (
        <Text style={{ color: theme.textSecondary }}>{selectedTime}</Text>
      ) : (
        <Text style={{ color: theme.textSecondary }}>{props.currTime}</Text>
      )}
    </View>
  );
};

export default forwardRef<TimeUpdaterRef, Props>(TimeUpdater);

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
