export namespace ResourceEnum {
  export const BURGERS = 'burgers';
  export const RESTAURANTS = 'restaurants';

  export const values = <const>[BURGERS, RESTAURANTS];

  export const linkNames = <const>{
    [BURGERS]: 'Бургеры',
    [RESTAURANTS]: 'Рестораны',
  };
}

export type ResourceEnum = (typeof ResourceEnum.values)[number];
