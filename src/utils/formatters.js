/**
 * Verilen bir tarih değerini (Date objesi, timestamp veya string)
 * yerel ayara göre okunabilir bir tarih ve saat formatına dönüştürür.
 * @param {Date|number|string} dateInput - Formatlanacak tarih.
 * @param {object} [options] - Intl.DateTimeFormat seçenekleri.
 * @param {string} [locale='tr-TR'] - Kullanılacak yerel ayar.
 * @returns {string} Formatlanmış tarih ve saat veya geçersiz giriş için boş string.
 */
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
    return String(dateInput); // Hata durumunda orijinal değeri döndür
  }
};

/**
 * Verilen bir tarih değerini sadece tarih olarak formatlar.
 * @param {Date|number|string} dateInput - Formatlanacak tarih.
 * @param {object} [options] - Intl.DateTimeFormat seçenekleri.
 * @param {string} [locale='tr-TR'] - Kullanılacak yerel ayar.
 * @returns {string} Formatlanmış tarih.
 */
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

/**
 * Bir sayı değerini para birimi formatına dönüştürür.
 * @param {number} amount - Formatlanacak sayı.
 * @param {string} [currency='TRY'] - Para birimi kodu (örn: 'USD', 'EUR').
 * @param {string} [locale='tr-TR'] - Kullanılacak yerel ayar.
 * @param {object} [options] - Intl.NumberFormat seçenekleri.
 * @returns {string} Formatlanmış para birimi.
 */
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

/**
 * Bir string'in ilk harfini büyük yapar.
 * @param {string} str - İşlenecek string.
 * @returns {string} İlk harfi büyük yapılmış string veya boş string.
 */
export const capitalizeFirstLetter = (str) => {
  if (!str || typeof str !== "string") {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Verilen metni belirtilen maksimum uzunluğa kısaltır ve sonuna '...' ekler.
 * @param {string} text - Kısaltılacak metin.
 * @param {number} maxLength - Metnin maksimum uzunluğu.
 * @returns {string} Kısaltılmış metin.
 */
export const truncateText = (text, maxLength) => {
  if (!text || typeof text !== "string") {
    return "";
  }
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength).trim() + "...";
};
