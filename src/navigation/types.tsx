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
  ChatNav: ChatNavStack;
};

export type MatchNavStack = {
  Matches: undefined;
  CreateMatch: undefined;
};

export type ChatNavStack = {
  Chat: undefined;
  Messages: undefined;
};
