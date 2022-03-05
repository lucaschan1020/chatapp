const omit = (obj: Object, ...keys: any[]) => {
  const keysToRemove = new Set(keys.flat());
  return Object.fromEntries(
    Object.entries(obj).filter((k) => !keysToRemove.has(k))
  );
};

export default omit;
