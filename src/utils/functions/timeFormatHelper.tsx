import { userStore } from '../../stores/userStore';

export const timeFormatHelper = (time: string) => {
  if (time) {
    const hour12Format = userStore(state => state.hour12Format);
    // We split the string to get just the "16:05:54" part
    const timeParts = time.split(' ')[0];

    // Create a dummy date object with the time
    const date = new Date(`2026-01-01T${timeParts}`);

    if (hour12Format) {
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    }

    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false,
    });
  }
  return '';
};
