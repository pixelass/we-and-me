import { BitlyClient } from "bitly";
import * as process from "process";

export const bitly = new BitlyClient(process.env.NEXT_PUBLIC_BITLY_ACCESS_TOKEN, {});
