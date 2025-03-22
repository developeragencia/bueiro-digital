import { useState, useCallback } from 'react';

type SortDirection = 'asc' | 'desc';

interface SortConfig {
  key: string;
  direction: SortDirection;
}

export function useSort<T extends Record<string, any>>(initialData: T[]) {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [data, setData] = useState<T[]>(initialData);

  const sortData = useCallback((items: T[], key: string, direction: SortDirection) => {
    return [...items].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'asc'
          ? aValue - bValue
          : bValue - aValue;
      }

      return 0;
    });
  }, []);

  const requestSort = useCallback((key: string) => {
    let direction: SortDirection = 'asc';

    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key, direction });
    setData(prevData => sortData(prevData, key, direction));
  }, [sortConfig, sortData]);

  return {
    items: data,
    setItems: setData,
    sortConfig,
    requestSort,
  };
}