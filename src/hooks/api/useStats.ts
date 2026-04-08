import { useLiveQuery } from "dexie-react-hooks";
import * as statsApi from "@/lib/api/stats";

export const useBrewCountForBean = (bean: string | undefined) => {
	return (
		useLiveQuery(() => statsApi.getBrewCountForBean(bean ?? ""), [bean]) ?? 0
	);
};
