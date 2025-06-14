export const formatDateTime = (dateInput, options, locale = "tr-TR") => {
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      return "Geçersiz Tarih";
    }
    const defaultOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      ...options,
    };
    return new Intl.DateTimeFormat(locale, defaultOptions).format(date);
  } catch (error) {
    console.error("formatDateTime error:", error);
    return String(dateInput);
  }
};

export const formatDate = (dateInput, options, locale = "tr-TR") => {
  return formatDateTime(
    dateInput,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      ...options,
    },
    locale
  );
};

export const formatCurrency = (
  amount,
  currency = "TRY",
  locale = "tr-TR",
  options
) => {
  try {
    const numAmount = Number(amount);
    if (isNaN(numAmount)) {
      return "Geçersiz Tutar";
    }
    const defaultOptions = {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      ...options,
    };
    return new Intl.NumberFormat(locale, defaultOptions).format(numAmount);
  } catch (error) {
    console.error("formatCurrency error:", error);
    return String(amount);
  }
};

export const capitalizeFirstLetter = (str) => {
  if (!str || typeof str !== "string") {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const truncateText = (text, maxLength) => {
  if (!text || typeof text !== "string") {
    return "";
  }
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength).trim() + "...";
};
