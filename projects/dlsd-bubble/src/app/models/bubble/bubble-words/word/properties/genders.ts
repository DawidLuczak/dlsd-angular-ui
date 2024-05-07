export enum SingularGenderType {
  FEMININE,
  MASCULINE,
  NEUTER,
}

export enum PlurarGenderType {
  MASCULINE,
  NON_MASCULINE,
}

export type SingularGender = SingularGenderType;
export type PlurarGender = PlurarGenderType;
export type GenderType = SingularGender | PlurarGender;
