import { RedirectModal } from '../src/components/RedirectModal';
import { render } from '@testing-library/react-native';

describe('open settings', () => {
  test('container exists', () => {
    const { getByTestId } = render(
      <RedirectModal
        modalVisible={true}
        setModalVisible={false}
        someone="testone"
        navigation={false}
      />,
    );
    expect(getByTestId('modalCont')).toBeTruthy();
  });
});
