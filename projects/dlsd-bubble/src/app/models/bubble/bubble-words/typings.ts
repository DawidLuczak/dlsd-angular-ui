import { BubbleWordBase } from "./bubble-word";
import { WordTypes, Plurality, NounType, WordNoun, WordVerb, AdjectiveType, WordAdjective, WordType } from "./word";

export type TCondition<T, CT, T1, T2> = T extends CT ? T1 : T2;

export type TCondition2<T, CT1, TT1, CT2, TT2, TTT> = TCondition<T, CT1, TT1, TCondition<T, CT2, TT2, TTT>>;

export type NounOrElse<WT extends WordTypes, WPT extends Plurality, ElseType> = TCondition<WT, NounType, WordNoun<WPT>, ElseType>;

export type VerbOrElse<WT extends WordTypes, WPT extends Plurality, ElseType> = TCondition<WT, NounType, WordVerb<WPT>, ElseType>;

export type AdjectiveOrElse<WT extends WordTypes, WPT extends Plurality, ElseType> = TCondition<WT, AdjectiveType, WordAdjective<WPT>, ElseType>;

export type WordModel<WT extends WordTypes, WPT extends Plurality, TT> = NounOrElse<WT, WPT, VerbOrElse<WT, WPT, AdjectiveOrElse<WT, WPT, TT>>>;

export type WordModels<WPT extends Plurality> = WordNoun<WPT> | WordVerb<WPT> | WordAdjective<WPT>;

export type BubbleWord<WT extends WordTypes, PT extends Plurality> = BubbleWordBase<WT, TCondition<WT, WordType, WordModel<WT, PT, unknown>, unknown>, PT>;

export type BubbleWordUnknown = BubbleWord<WordTypes, Plurality>;
