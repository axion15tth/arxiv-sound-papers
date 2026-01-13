import { format, parseISO, subDays, isAfter, isBefore } from 'date-fns';
import { ja } from 'date-fns/locale';

export const formatDate = (dateString) => {
  try {
    const date = parseISO(dateString);
    return format(date, 'yyyy年M月d日', { locale: ja });
  } catch (error) {
    return dateString;
  }
};

export const formatDateShort = (dateString) => {
  try {
    const date = parseISO(dateString);
    return format(date, 'M/d', { locale: ja });
  } catch (error) {
    return dateString;
  }
};

export const isWithinDateRange = (dateString, startDate, endDate) => {
  try {
    const date = parseISO(dateString);
    if (startDate && isBefore(date, startDate)) return false;
    if (endDate && isAfter(date, endDate)) return false;
    return true;
  } catch (error) {
    return false;
  }
};

export const getDateNDaysAgo = (days) => {
  return subDays(new Date(), days);
};
