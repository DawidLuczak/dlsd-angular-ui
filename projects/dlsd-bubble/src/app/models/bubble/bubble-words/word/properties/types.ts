export enum WordType {
  ADJECTIVE,
  ADVERB,
  CONJUCTIVE,
  NOUN,
  NUMERAL,
  PARTICLE,
  PRONOUN,
  PREPOSITION,
  VERB,
}

export type NounType = WordType.NOUN;
export type VerbType = WordType.VERB;
export type AdjectiveType = WordType.ADJECTIVE;
export type WordTypes = NounType | VerbType | AdjectiveType | unknown | undefined;
