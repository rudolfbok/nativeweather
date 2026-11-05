export const removeDiacritics = (value: string) => value.normalize('NFD').replace(/[̀-ͯ]/g, '');
