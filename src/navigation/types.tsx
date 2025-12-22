export type NavRoot = {
  Home: NavHomeTab;
  Settings: undefined;
  ProfileInfo: undefined;
};

export type NavAuthStack = {
  Login: undefined;
  SignUp: undefined;
};

export type NavHomeTab = {
  Map: undefined;
  MatchesNav: MatchNavStack;
  Chat: undefined;
};

export type MatchNavStack = {
  Matches: undefined;
  CreateMatch: undefined;
};
