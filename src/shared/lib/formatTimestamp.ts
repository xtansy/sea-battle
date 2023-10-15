import { formatDistance } from "date-fns";
import ru from "date-fns/locale/ru";

export const formatTimestamp = (timestamp: number): string => {
    return formatDistance(timestamp, new Date(), {
        addSuffix: true,
        locale: ru,
    });
};
