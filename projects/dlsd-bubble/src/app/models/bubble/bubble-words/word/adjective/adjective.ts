import { WordBaseForm } from "../../bubble-word";
import { Plurality } from "../properties/plurality";
import { AdjectiveType } from "../properties/types";
import { AdjectiveDegree } from "./adjective-degree";

export interface WordAdjective<T extends Plurality> extends WordBaseForm<AdjectiveType, T> {
  degree?: AdjectiveDegree;
  regular?: boolean;
}
