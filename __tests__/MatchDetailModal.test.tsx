import { MatchDetailsModal } from '../src/components/MatchDetailsModal';
import { render } from '@testing-library/react-native';

describe('Details for modal', () => {
  const match = {
    _id: '33',
    address: {
      lat: 33.23,
      long: 23.32,
    },
    day: 'day',
    publisher: 'test',
    status: 'upcoming',
    time: 'time',
  };

  test('the modal component exists', () => {
    const { getByTestId } = render(
      <MatchDetailsModal
        modalVisible="sender"
        setModalVisible={true}
        match={match}
      />,
    );
    expect(getByTestId('modalView')).toBeTruthy();
  });

  test('background opacity exists', () => {
    const { getByTestId } = render(
      <MatchDetailsModal
        modalVisible="sender"
        setModalVisible={true}
        match={match}
      />,
    );
    expect(getByTestId('background')).toBeTruthy();
  });

  test('day display', () => {
    const { getByTestId } = render(
      <MatchDetailsModal
        modalVisible="sender"
        setModalVisible={true}
        match={match}
      />,
    );
    expect(getByTestId('dayDisplay')).toBeTruthy();
  });

  test('Time Display', () => {
    const { getByTestId } = render(
      <MatchDetailsModal
        modalVisible="sender"
        setModalVisible={true}
        match={match}
      />,
    );
    expect(getByTestId('timeDisplay')).toBeTruthy();
  });

  test('Time Display', () => {
    const { getByTestId } = render(
      <MatchDetailsModal
        modalVisible="sender"
        setModalVisible={true}
        match={match}
      />,
    );
    expect(getByTestId('usernameMatch')).toBeTruthy();
  });
});
