import { TCondition, WordModels } from "./typings";
import { WordType, Plurality, Plurar, PlurarGender, Singular, SingularGender, GenderType, VerbType, PersonNumberType, WordTypes } from "./word";

export interface WordValueBase {
  value: string;
}

export interface WordForm<WT extends WordType, WP extends Plurality> {
  plurality?: WP;
  gender?: TCondition<WP, Plurar, PlurarGender, TCondition<WP, Singular, SingularGender, GenderType>>;
  person?: TCondition<WT, VerbType, PersonNumberType, undefined>;
}

export interface WordBaseForm<WT extends WordType, WP extends Plurality> {
  form: WordForm<WT, WP>;
}

export interface BubbleWordBase<WT extends WordTypes, T extends WordModels<PT> | unknown, PT extends Plurality> extends WordValueBase {
  id: number;
  type: WT;
  properties: T;
  children: T[];
}
