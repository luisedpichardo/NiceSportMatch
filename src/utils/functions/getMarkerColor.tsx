// Service
import { getMatchesIdsService } from '../../services/UserService';

export const getMarkerColor = async (elem: any, username: string) => {
  try {
    if (username) {
      const matchesIds = await getMatchesIdsService(username);
      if (username === elem.publisher) {
        return 'green';
      } else if (matchesIds.includes(elem._id)) {
        return 'blue';
      }
    }
    return 'red';
  } catch (e: any) {
    throw new Error(e.message);
  }
};
