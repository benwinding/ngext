export interface NgextConfig {
  env?: {[key: string] : any};
  scripts?: string[];
  baseHref?: string;
  useFallback404?: boolean;
  dist?: string;
}

export interface NgextConfigResolved extends NgextConfig {
  scriptsResolved?: string[];
  stylesResolved?: string[];
}
