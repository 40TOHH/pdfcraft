'use client';

import { useState, useEffect } from 'react';

/**
 * Компонент, который отображает детей только после монтирования на клиенте
 * Полезен для избежания ошибок гидратации при использовании клиентских данных
 */
export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <>{children}</> : <div className="p-2 rounded-full" aria-hidden="true"><div className="h-5 w-5" /></div>;
}