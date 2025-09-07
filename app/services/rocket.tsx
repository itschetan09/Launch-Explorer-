export interface RocketType {
  height: Height;
  diameter: Height;
  mass: Mass;
  first_stage: Firststage;
  second_stage: Secondstage;
  engines: Engines;
  landing_legs: Landinglegs;
  payload_weights: Payloadweight[];
  flickr_images: string[];
  name: string;
  type: string;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  company: string;
  wikipedia: string;
  description: string;
  id: string;
}

interface Payloadweight {
  id: string;
  name: string;
  kg: number;
  lb: number;
}

interface Landinglegs {
  number: number;
  material: null;
}

interface Engines {
  isp: Isp;
  thrust_sea_level: Thrustsealevel;
  thrust_vacuum: Thrustsealevel;
  number: number;
  type: string;
  version: string;
  layout: string;
  engine_loss_max: number;
  propellant_1: string;
  propellant_2: string;
  thrust_to_weight: number;
}

interface Isp {
  sea_level: number;
  vacuum: number;
}

interface Secondstage {
  thrust: Thrustsealevel;
  payloads: Payloads;
  reusable: boolean;
  engines: number;
  fuel_amount_tons: number;
  burn_time_sec: number;
}

interface Payloads {
  composite_fairing: Compositefairing;
  option_1: string;
}

interface Compositefairing {
  height: Height;
  diameter: Height;
}

interface Firststage {
  thrust_sea_level: Thrustsealevel;
  thrust_vacuum: Thrustsealevel;
  reusable: boolean;
  engines: number;
  fuel_amount_tons: number;
  burn_time_sec: number;
}

interface Thrustsealevel {
  kN: number;
  lbf: number;
}

interface Mass {
  kg: number;
  lb: number;
}

interface Height {
  meters: number;
  feet: number;
}

