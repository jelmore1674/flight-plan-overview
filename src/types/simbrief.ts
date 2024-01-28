interface SimbriefGeneral {
  release: string;
  icao_airline: string;
  flight_number: string;
  is_etops: string;
  dx_rmk: string;
  sys_rmk: {};
  is_detailed_profile: string;
  cruise_profile: string;
  climb_profile: string;
  descent_profile: string;
  alternate_profile: string;
  reserve_profile: string;
  costindex: string;
  cont_rule: string;
  initial_altitude: string;
  stepclimb_string: string;
  avg_temp_dev: string;
  avg_tropopause: string;
  avg_wind_comp: string;
  avg_wind_dir: string;
  avg_wind_spd: string;
  gc_distance: string;
  route_distance: string;
  air_distance: string;
  total_burn: string;
  cruise_tas: string;
  cruise_mach: string;
  passengers: string;
  route: string;
  route_ifps: string;
  route_navigraph: string;
}

export interface Airport {
  icao_code: string;
  iata_code: string;
  faa_code: {};
  elevation: string;
  pos_lat: string;
  pos_long: string;
  name: string;
  timezone: string;
  plan_rwy: string;
  trans_alt: string;
  trans_level: string;
  metar: string;
  metar_time: string;
  metar_category: string;
  metar_visibility: string;
  metar_ceiling: string;
  taf: string;
  taf_time: string;
  notam: {};
}

export interface AlternateAirport extends Airport {
  cruise_altitude: string;
  distance: string;
  gc_distance: string;
  air_distance: string;
  track_true: string;
  track_mag: string;
  tas: string;
  gs: string;
  avg_wind_comp: string;
  avg_wind_dir: string;
  avg_wind_spd: string;
  avg_tropopause: string;
  avg_tdv: string;
  ete: string;
  burn: string;
  route: string;
  route_ifps: string;
}

interface Atc {
  flightplan_text: string;
  route: string;
  callsign: string;
  initial_spd_unit: string;
  initial_alt: string;
  initial_alt_unit: string;
}

interface Aircraft {
  icao_code: string;
  base_type: string;
  name: string;
  reg: string;
}

interface Fuel {
  taxi: string;
  enroute_burn: string;
  contingency: string;
  alternate_burn: string;
  reserve: string;
  etops: string;
  extra: string;
  min_takeoff: string;
  plan_takeoff: string;
  plan_ramp: string;
  plan_landing: string;
  avg_fuel_flow: string;
  max_tanks: string;
}

interface Weights {
  oew: string;
  pax_count: string;
  bag_count: string;
  pax_count_actual: string;
  bag_count_actual: string;
  pax_weight: string;
  bag_weight: string;
  freight_added: string;
  cargo: string;
  payload: string;
  est_zfw: string;
  max_zfw: string;
  est_tow: string;
  max_tow: string;
  max_tow_struct: string;
  tow_limit_code: string;
  est_ldw: string;
  max_ldw: string;
  est_ramp: string;
}

interface Map {
  name: string;
  link: string;
}

interface Images {
  directory: string;
  map: Map[];
}

interface PrefileLink {
  name: string;
  site: string;
  link: string;
}

interface Prefile {
  vatsim: PrefileLink;
  ivao: PrefileLink;
  pilotedge: PrefileLink;
  poscon: PrefileLink;
}

export interface SimbriefData {
  general: SimbriefGeneral;
  params: {
    units: string;
  };
  origin: Airport;
  destination: Airport;
  alternate: AlternateAirport;
  atc: Atc;
  aircraft: Aircraft;
  fuel: Fuel;
  weights: Weights;
  images: Images;
  prefile: Prefile;
}
