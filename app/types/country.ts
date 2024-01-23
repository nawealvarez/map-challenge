export type Country = {
  country: string;
  isoCode: string;
  latitude: number;
  longitude: number;
};

export type LeafletCountry = {
  name: string;
  code: string;
  capital: string;
  currency: string;
  languages: Array<{ name: string }>;
  states: Array<{ name: string }>;
  latitude?: number;
  longitude?: number;
}