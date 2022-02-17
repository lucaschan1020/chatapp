export function TypedRecord<TValue>() {
    return <T extends Record<PropertyKey, TValue>>(v: T): T => {
      return v;
    };
}