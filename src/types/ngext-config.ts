export interface NgextConfig {
  env?: { [key: string]: any };
  headAppend?: string;
  scripts?: string[];
  assets?: ({ [key: string]: any } | string)[];
  baseHref?: string;
  routeFailPreventRedirect?: boolean;
  routeFailRedirectTo?: string;
  dist?: string;
  useFallback404?: boolean;
}

export interface NgextConfigResolved extends NgextConfig {
  scriptsResolved?: string[];
  stylesResolved?: string[];
  globalModule?: GlobalModule;
  custom404ComponentName?: string;
}

export type GlobalModule = { import: string; name: string };
