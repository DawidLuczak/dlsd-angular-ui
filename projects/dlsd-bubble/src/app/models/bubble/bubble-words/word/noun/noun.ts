import { WordBaseForm } from "../../bubble-word";
import { Plurality } from "../properties/plurality";
import { NounType } from "../properties/types";

export interface WordNoun<WP extends Plurality> extends WordBaseForm<NounType, WP> {}
