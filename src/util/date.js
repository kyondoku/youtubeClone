import { format, register } from "timeago.js";
import koLocale from "timeago.js/lib/lang/ko";

register("ko", koLocale);

// lang을 별도로 전달하지 않으면 en_US
export function formatAgo(date, lang = "en_US") {
  return format(date, lang);
}
