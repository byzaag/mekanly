import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  Splash: undefined;
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  CafeDetail: { cafeId: number };
};

export type MainTabParamList = {
  HomeTab: undefined;
  ExploreTab: undefined;
  FavoritesTab: undefined;
  ProfileTab: undefined;
};
