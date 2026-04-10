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

## Personalización

### 🖼 Tus fotos
Coloca tus imágenes en `public/fotos/` y edita `src/data/index.js`:

```js
// Cambia cada objeto en SLIDES:
{
  id: 1,
  cat: 'retratos',
  src: '/fotos/retrato-1.jpg',   // ← tu ruta local
  label: 'Mi sesión de retrato',
  caption: 'Retrato · Luz natural',
}
```

### 🏷 Logo
En `src/components/Navbar.jsx`, reemplaza el contenido de `.logoMark`:
```jsx
<div className={styles.logoMark}>
  <img src="/logo.svg" alt="Logo" />
</div>
```

### 💰 Packs y precios
Edita el array `PACKS` en `src/data/index.js`.

### 📞 Datos de contacto
Edita `CONTACT_INFO` en `src/data/index.js`.

### 📊 Stats (Sobre mí)
Edita `STATS` directamente en `src/components/About.jsx`.

### 🎨 Colores
Todos los colores están en `src/styles/global.css` como variables CSS:
```css
:root {
  --terracota: #b5714a;
  --brown:     #3d2b1f;
  --cream:     #f5f0e8;
  /* ... */
}
```
