import {
    differenceInDays,
    differenceInHours,
    differenceInMinutes
} from "date-fns";

export const getDaysSincePost = (postDate: string | Date) => {
    const today = new Date();
    const postDateObj = new Date(postDate);
    const diffDays = differenceInDays(today, postDateObj);
    if (diffDays === 0) {
        const diffHours = differenceInHours(today, postDateObj);
        if (diffHours < 1) {
            const diffMin = differenceInMinutes(today, postDateObj);
            if (diffMin < 1) {
                return "Agora";
            }
            return `Há ${diffMin} minutos`;
        }
        return `Há ${diffHours} horas`;
    }
    return `Há ${diffDays} dias`;
};