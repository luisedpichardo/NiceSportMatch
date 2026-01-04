import { userStore } from '../stores/userStore';
import { darkTheme, lightTheme } from '../utils/Colors';

export const useTheme = () => {
  const colorScheme = userStore(state => state.theme);
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  return { theme, colorScheme };
};
