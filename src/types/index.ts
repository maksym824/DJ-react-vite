export enum AccessLevelType {
  EVERYONE = 1,
  GOLD = 2,
  VIP = 3,
}

export enum TypeOfAttachedFile {
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
  "product" = "product",
  "event" = "event",
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
  country_code: string;
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
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  profile_url: string;
  display_name: string;
  profile_exists: number;
  profile_active: boolean;
  profile_done: boolean;
  loginas: boolean;
  admin: boolean;
  partner: boolean;
  dj: boolean;
  me: MeAccount;
};

export type MeAccount = {
  user_id: number;
  user_key: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  profile_exists: number;
  profile_active: boolean;
  profile_done: boolean;
  loginas: boolean;
  admin: boolean;
  partner: boolean;
  dj: boolean;
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

export type Fan = {
  name: string;
  username: string;
  date: string;
};

export enum FanType {
  ALL = 0,
  FOLLOWERS = 1,
  GOLD = 2,
  VIP = 3,
}

export type Artist = {
  display_name: string;
  id: number;
  profile_picture: string;
  profile_url: string;
  user_id: string;
  user_key: string;
};

export type DJSearch = {
  user_id: number;
  user_key: string;
  first_name: string;
  last_name: string;
  display_name: string;
};

export type Post = {
  id: number;
  post_id: number;
  user_id: number;
  title: string;
  body: string;
  active: number;
  created_at: string;
  updated_at: string;
  posttype_id: number;
  publish: number;
  accesslevel_id: number;
};

export type Product = {
  product_id: number;
  accesslevel_id: number;
  user_id: number;
  name: string;
  active: string;
  price: string;
  description: string;
  tax_code: string;
  shippable: number;
  statement_descriptor: string;
  stripe_id: string;
  image_url: string;
  product_url: string;
  sku: string;
  stripe_price_id: string;
  type: number;
  product_type: string;
  status_id: number;
  created_at: string;
  updated_at: string;
  publish: number;
};

export type Event = {
  id: number;
  event_name: string;
  event_date: string;
  start_time: string;
  end_time: string;
  description: string;
  link_buy_tickets: string;
  artwork: string;
  artwork_cache: string;
  venue: string;
  city: string;
  publish: number;
  created_at: string;
  updated_at: string;
};
