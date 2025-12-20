export type NavRoot = {
  Home: NavHomeTab;
  Settings: undefined;
  ProfileInfo: undefined;
};

export type NavAuthStack = {
  Login: undefined;
  SignUp: undefined;
}

export type NavHomeTab = {
  Map: undefined;
  Matches: undefined;
  Chat: undefined;
}