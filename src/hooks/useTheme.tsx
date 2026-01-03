import { useStore } from '../stores/userStore';
import { darkTheme, lightTheme } from '../utils/Colors';

export const useTheme = () => {
  const colorScheme = useStore(state => state.theme);
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  return { theme, colorScheme };
};
