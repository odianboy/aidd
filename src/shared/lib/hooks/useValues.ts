import { useState } from 'react';

export const useValues = <T>(initialData: T) => {
  const [values, setValues] = useState(initialData);

  const updateValues = (updates: Partial<T>) =>
    setValues(prev => ({ ...prev, ...updates }));

  return { values, updateValues };
};
