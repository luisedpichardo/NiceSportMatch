export type NavRoot = {
  Home: NavHomeTab;
  Settings: undefined;
  ProfileInfo: undefined;
  SelectLanguage: undefined;
};

export type NavAuthStack = {
  Login: undefined;
  SignUp: undefined;
  Welcome: undefined;
};

export type NavHomeTab = {
  Map: undefined;
  MatchesNav: MatchNavStack;
  ChatNav: ChatNavStack;
};

export type MatchNavStack = {
  Matches: undefined;
  CreateMatch: undefined;
  UpdateMatch: any;
};

export type ChatNavStack = {
  Chat: any;
  Messages: any;
  AudioCallRequest: any;
};
