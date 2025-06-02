
import { useEffect } from "react";

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
  useEffect(() => {
    // Cria o objeto global atOptions
    window.atOptions = {
      key: '8dac84ebf404708eca9b365a4c8b2ab0',
      format: 'iframe',
      height: 90,
      width: 728,
      params: {}
    };

    // Cria o script e adiciona ao DOM
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//www.highperformanceformat.com/8dac84ebf404708eca9b365a4c8b2ab0/invoke.js";
    const container = document.getElementById("banner-ad-container");
    if (container) {
      container.appendChild(script);
    }

    // Limpeza (opcional)
    return () => {
      const container = document.getElementById("banner-ad-container");
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <div id="banner-ad-container" style={{ width: 728, height: 90, margin: "0 auto" }} />
  );
}
