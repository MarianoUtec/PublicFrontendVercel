import { useEffect, useState } from 'react';

/**
 * Devuelve `true` cuando el viewport es más alto que ancho (típico de un
 * celular en vertical), y se mantiene actualizado ante resize/rotación.
 * No depende de un ancho fijo en px: compara alto vs. ancho, tal como
 * se pidió ("cualquier pantalla que sea más alta que ancha").
 */
export function useIsMobile(): boolean {
  const getIsMobile = () =>
    typeof window !== 'undefined' && window.innerHeight > window.innerWidth;

  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    const handleChange = () => setIsMobile(getIsMobile());
    window.addEventListener('resize', handleChange);
    window.addEventListener('orientationchange', handleChange);
    return () => {
      window.removeEventListener('resize', handleChange);
      window.removeEventListener('orientationchange', handleChange);
    };
  }, []);

  return isMobile;
}
