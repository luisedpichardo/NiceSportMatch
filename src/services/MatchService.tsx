export const createMatchService = (
  address: string,
  day: string,
  time: string,
  publisher: any,
) => {
  try {
    console.log('create MatchService');
    const match = {
        address,
        day,
        time,
        publisher,
    }
    console.log(match)
  } catch (e: any) {
    throw new Error(e.message);
  }
};
