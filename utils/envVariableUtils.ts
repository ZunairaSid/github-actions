export const toBoolean = (val: string | undefined) => {
  const truthyVals = 'y yes true';

  if (!val) {
    return false;
  }

  if (truthyVals.includes(val)) {
    return true;
  }

  return false;
};
