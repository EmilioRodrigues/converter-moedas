
import { useEffect, useState } from "react";

// Extend the Window interface to include atOptions
declare global {
  interface Window {
    atOptions: {
      key: string;
      format: string;
      height: number;
      width: number;
      params: Record<string, any>;
    };
  }
}

export default function BannerAd() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Safety check for script loading
    const loadAdScript = () => {
      try {
        // Cria o objeto global atOptions
        window.atOptions = {
          key: '8dac84ebf404708eca9b365a4c8b2ab0',
          format: 'iframe',
          height: 90,
          width: 728,
          params: {}
        };

        // Cria o script e adiciona ao DOM com segurança
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.defer = true;
        script.src = "//www.highperformanceformat.com/8dac84ebf404708eca9b365a4c8b2ab0/invoke.js";
        
        // Add error handling
        script.onerror = () => {
          console.warn("Failed to load ad script");
          setHasError(true);
          setIsLoading(false);
        };
        
        script.onload = () => {
          setIsLoading(false);
        };

        const container = document.getElementById("banner-ad-container");
        if (container) {
          container.appendChild(script);
        } else {
          setHasError(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.warn("Error loading ad:", error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    // Load script after a small delay to ensure DOM is ready
    const timer = setTimeout(loadAdScript, 100);

    // Limpeza
    return () => {
      clearTimeout(timer);
      const container = document.getElementById("banner-ad-container");
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  if (hasError) {
    return null; // Don't show anything if ad fails to load
  }

  return (
    <div 
      id="banner-ad-container" 
      style={{ 
        width: 728, 
        height: 90, 
        margin: "0 auto",
        minHeight: isLoading ? "90px" : "auto"
      }}
      className={isLoading ? "bg-gray-100 animate-pulse" : ""}
    />
  );
}
