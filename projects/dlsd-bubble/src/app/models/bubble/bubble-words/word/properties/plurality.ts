enum PluralityType {
  PLURAR,
  SINGULAR
}

export type Singular = PluralityType.SINGULAR;
export type Plurar = PluralityType.PLURAR;
export type Plurality = Singular | Plurar | unknown;
