export const EXCLUDED_PROPERTIES_KEY = 'serde:excluded_properties';

export type ExcludeProperties = string[];

/* tslint:disable:variable-name only-arrow-functions */
/**
 * Adding this decorator prevents the property from being included in the object built by Serde.serialize()
 */
export function Exclude() {
  return function (target: any, key: string): void {
    Reflect.defineMetadata(
      EXCLUDED_PROPERTIES_KEY,
      [...(Reflect.getMetadata(EXCLUDED_PROPERTIES_KEY, target) || []), key],
      target
    );
  };
}
