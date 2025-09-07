export interface LaunchDetailsType {
  fairings: Fairings;
  links: Links;
  static_fire_date_utc: null;
  static_fire_date_unix: null;
  net: boolean;
  window: null;
  rocket: string;
  success: boolean;
  failures: any[];
  details: null;
  crew: any[];
  ships: any[];
  capsules: any[];
  payloads: string[];
  launchpad: string;
  flight_number: number;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: string;
  upcoming: boolean;
  cores: Core[];
  auto_update: boolean;
  tbd: boolean;
  launch_library_id: string;
  id: string;
}

interface Core {
  core: string;
  flight: number;
  gridfins: boolean;
  legs: boolean;
  reused: boolean;
  landing_attempt: boolean;
  landing_success: boolean;
  landing_type: string;
  landpad: string;
}

interface Links {
  patch: Patch;
  reddit: Reddit;
  flickr: Flickr;
  presskit: null;
  webcast: string;
  youtube_id: string;
  article: null;
  wikipedia: null;
}

interface Flickr {
  small: any[];
  original: any[];
}

interface Reddit {
  campaign: string;
  launch: null;
  media: null;
  recovery: string;
}

interface Patch {
  small: string;
  large: string;
}

interface Fairings {
  reused: null;
  recovery_attempt: null;
  recovered: null;
  ships: any[];
}


