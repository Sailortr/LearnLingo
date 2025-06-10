/**
 * Bir e-posta adresinin temel formatını kontrol eder.
 * (Daha kapsamlı doğrulama için kütüphane kullanılması önerilir.)
 * @param {string} email - Kontrol edilecek e-posta adresi.
 * @returns {boolean} E-posta formatı geçerliyse true, değilse false.
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== "string") {
    return false;
  }
  // Basit bir regex, production için daha kapsamlı bir regex veya kütüphane gerekebilir.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Bir şifrenin temel güçlülük kriterlerini kontrol eder.
 * @param {string} password - Kontrol edilecek şifre.
 * @param {object} [options] - Şifre kriterleri.
 * @param {number} [options.minLength=8] - Minimum şifre uzunluğu.
 * @param {boolean} [options.requireUppercase=true] - Büyük harf gerekliliği.
 * @param {boolean} [options.requireLowercase=true] - Küçük harf gerekliliği.
 * @param {boolean} [options.requireNumber=true] - Rakam gerekliliği.
 * @param {boolean} [options.requireSpecialChar=false] - Özel karakter gerekliliği.
 * @returns {boolean} Şifre kriterlere uyuyorsa true, değilse false.
 */
export const isStrongPassword = (password, options = {}) => {
  if (!password || typeof password !== "string") {
    return false;
  }

  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumber = true,
    requireSpecialChar = false, // İsteğe bağlı
  } = options;

  if (password.length < minLength) return false;
  if (requireUppercase && !/[A-Z]/.test(password)) return false;
  if (requireLowercase && !/[a-z]/.test(password)) return false;
  if (requireNumber && !/\d/.test(password)) return false;
  if (requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password))
    return false; // Örnek özel karakterler

  return true;
};

/**
 * Bir değerin null, undefined, boş string, boş dizi veya boş nesne olup olmadığını kontrol eder.
 * @param {*} value - Kontrol edilecek değer.
 * @returns {boolean} Değer "boş" ise true, değilse false.
 */
export const isEmpty = (value) => {
  if (value === null || value === undefined) {
    return true;
  }
  if (typeof value === "string" && value.trim() === "") {
    return true;
  }
  if (Array.isArray(value) && value.length === 0) {
    return true;
  }
  if (
    typeof value === "object" &&
    Object.keys(value).length === 0 &&
    !(value instanceof Date)
  ) {
    return true;
  }
  return false;
};

/**
 * Bir değerin null veya undefined olmadığını kontrol eder.
 * @param {*} value - Kontrol edilecek değer.
 * @returns {boolean} Değer doluysa true, değilse false.
 */
export const isNotEmpty = (value) => {
  return !isEmpty(value);
};
