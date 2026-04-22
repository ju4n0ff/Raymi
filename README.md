# 📷 Fotografía Studio — React

Landing page profesional para servicio de fotografía. Construida con **React + Vite**.

## Estructura del proyecto

```
fotografia-studio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/        ← Un archivo por componente
│   │   ├── Cursor.jsx
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Gallery.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Packs.jsx
│   │   ├── Contact.jsx
│   │   ├── Modal.jsx
│   │   └── Footer.jsx
│   ├── hooks/             ← Lógica reutilizable
│   │   ├── useCustomCursor.js
│   │   ├── useNavScroll.js
│   │   ├── useScrollReveal.js
│   │   └── useModal.js
│   ├── data/
│   │   └── index.js       ← Fotos, packs, servicios, contacto
│   ├── styles/            ← CSS Modules por componente
│   │   ├── global.css
│   │   ├── Cursor.module.css
│   │   ├── Navbar.module.css
│   │   ├── Hero.module.css
│   │   ├── Gallery.module.css
│   │   ├── About.module.css
│   │   ├── Services.module.css
│   │   ├── Packs.module.css
│   │   ├── Contact.module.css
│   │   ├── Modal.module.css
│   │   └── Footer.module.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

## Instalación y uso

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar servidor de desarrollo
npm run dev

# 3. Build para producción
npm run build

# 4. Preview del build
npm run preview
```


