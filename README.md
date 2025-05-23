Este proyecto implementa un modelo de optimización de portafolio basado en la Teoría Moderna de Portafolio de Markowitz (MPT) para calcular:

  - La frontera eficiente

Usa precios históricos obtenidos desde Yahoo Finance y presenta resultados a través de una arquitectura web con backend en Django y frontend en Next.js.

🧠 Funcionalidades
  🔧 Backend (Django + SQLite)
  📥 Actualización de precios históricos usando yfinance y almacenamiento en base de datos SQLite.
  
  ⚙️ Procesamiento de optimización vía modelo de frontera eficiente (soporte actual solo para este tipo de optimización).
  
  📡 Exposición de resultados mediante una API RESTful:
  
    Datos de precios
    
    Pesos optimizados para la frontera eficiente
  
  🛠️ Estructura lista para expandir con optimización por Sharpe ratio y múltiples horizontes temporales (solo faltan endpoints y ajustes frontend).
  
💻 Frontend (Next.js)
  📃 Diseño modular con páginas dedicadas para:

    Frontera eficiente
    
    Precios históricos de acciones

🧠 Uso dinámico de procesamiento cliente/servidor según necesidad.

🔗 Comunicación con el backend usando Axios.

📊 Visualización interactiva mediante Chart.js.

🛠️ Tecnologías utilizadas
  Backend: Django, SQLite, yfinance, numpy, scipy
  
  Frontend: Next.js (React), Axios, Chart.js, Tailwind CSS
  
  Otros: Python 3.10+

🚧 Próximas mejoras
Incorporar maximización de Sharpe ratio desde el frontend.

Permitir al usuario elegir el horizonte temporal de inversión.

Mejorar el manejo de errores de API y fallos de ticker.
