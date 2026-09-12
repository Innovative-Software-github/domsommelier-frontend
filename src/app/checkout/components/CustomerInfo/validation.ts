/** Normalize on blur/submission, never while the user is typing. */
export const normalizeCustomerName = (value: string): string =>
  value.normalize('NFC').trim().replace(/\s+/gu, ' ');

export const validateCustomerName = (value: string): string | undefined => {
  const name = normalizeCustomerName(value);
  if (!name) return 'Укажите имя и фамилию';
  if (name.length > 100)
    return 'Имя и фамилия должны быть не длиннее 100 символов';
  // Unicode letters support names in different languages and combining accents.
  const part = /^(?:\p{L}\p{M}*)+(?:[-’'](?:\p{L}\p{M}*)+)*$/u;
  const parts = name.split(' ');
  if (!parts.every((word) => part.test(word))) {
    return 'Используйте буквы, пробелы, дефис или апостроф';
  }
  if (parts.length < 2) return 'Укажите имя и фамилию через пробел';
  return undefined;
};

export const validateCustomerPhone = (value: string): string | undefined => {
  const phone = value.trim();
  if (!phone) return 'Укажите номер телефона';
  // Accept local numbers and Russian prefixes; do not silently strip arbitrary text.
  if (
    !/^(?:(?:\+7|8|7)[\s-]*)?(?:\([0-9]{3}\)|[0-9]{3})[\s-]*[0-9]{3}[\s-]*[0-9]{2}[\s-]*[0-9]{2}$/.test(
      phone,
    )
  ) {
    return 'Введите номер из 10 цифр или 11 цифр с кодом +7 или 8';
  }
  const digits = phone.replace(/\D/g, '');
  const national = digits.length === 11 ? digits.slice(1) : digits;
  if (!/^[3489][0-9]{9}$/.test(national)) {
    return 'Проверьте код оператора или города';
  }
  return undefined;
};

export const normalizeCustomerPhone = (value: string): string => {
  if (validateCustomerPhone(value)) return value.trim();
  const digits = value.replace(/\D/g, '');
  return `+7${digits.length === 11 ? digits.slice(1) : digits}`;
};
