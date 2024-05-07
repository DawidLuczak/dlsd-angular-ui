import { WordBaseForm } from "../../bubble-word";
import { Plurality } from "../properties/plurality";
import { VerbType } from "../properties/types";
import { TenseModeType } from "./tense-modes";
import { TenseType } from "./tense-types";

export interface WordVerbTense {
  type?: TenseType;
  form?: TenseModeType;
}

export interface WordVerb<PT extends Plurality> extends WordBaseForm<VerbType, PT> {
  tense?: WordVerbTense;
}
