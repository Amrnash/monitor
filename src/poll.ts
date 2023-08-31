import { Check } from "./models/check";
import axios from "axios";

export async function poll() {
  const checks = await Check.findAll();
  for (const check of checks) {
    setInterval(() => {
      const url = check.path ? `${check.url}/${check.path}` : check.url;
      axios.get(url, { headers: check.httpHeaders });
    }, check.interval);
  }
}
