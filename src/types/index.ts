export enum AccessLevelType {
  EVERYONE = 1,
  GOLD = 2,
  VIP = 3,
}

export enum TypeOfVideo {
  EMBED = 1,
  UPLOAD = 0,
}

export enum TypeOfImagePost {
  SINGLE = 1,
  MULTIPLE = 2,
}

export enum PostType {
  "image" = "image",
  "video" = "video",
  "audio" = "audio",
  "text" = "text",
}

export type Country = {
  country_code: string;
  country: string;
};

export type User = {
  about_me: string;
  bank_account_name: string;
  bank_account_number: string;
  bookings: string;
  country: string;
  cover_photo: string;
  created_at: string;
  display_name: string;
  email: string;
  facebook: string;
  first_name: string;
  genre: string;
  instagram: string;
  last_name: string;
  location: string;
  management: string;
  mixcloud: string;
  partner_id: string;
  profile_picture: string;
  profile_url: string;
  roles: string;
  soundcloud: string;
  spotify: string;
  tiktok: string;
  title: string;
  twitter: string;
  user_id: number;
  user_key: string;
  username: string;
  website: string;
  youtube: string;
  paypal: string;
};

export type UserAccount = {
  user_id: number;
  user_key: string;
  roles: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
};

export type UserStatistics = {
  followers: number;
  gold: number;
  vip: number;
  monthly_income: number;
  subscription_last_30_days: number;
  products_last_30_days: number;
  total_last_30_days: number;
  subscription_last_365_days: number;
  products_last_365_days: number;
  total_last_365_days: number;
  subscription_last_all_days: number;
  products_last_all_days: number;
  total_last_all_days: number;
};

export type UserPayout = {
  id: number;
  user_id: number;
  amount: string;
  payout_date: string;
  payout_code: string;
  user_key: string;
  recipient: string;
  period_start: string;
  period_end: string;
};
