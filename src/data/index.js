export const SLIDES = [
  {
    id: 1,
    cat: 'retratos',
    src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80',
    label: 'Retrato natural',
    caption: 'Retrato · Luz natural',
  },
  {
    id: 2,
    cat: 'bodas',
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
    label: 'Ceremonia íntima',
    caption: 'Boda · Exterior',
  },
  {
    id: 3,
    cat: 'naturaleza',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    label: 'Paisaje andino',
    caption: 'Naturaleza · Montaña',
  },
  {
    id: 4,
    cat: 'eventos',
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
    label: 'Evento corporativo',
    caption: 'Evento · Corporativo',
  },
  {
    id: 5,
    cat: 'retratos',
    src: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=600&q=80',
    label: 'Sesión editorial',
    caption: 'Retrato · Editorial',
  },
  {
    id: 6,
    cat: 'bodas',
    src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80',
    label: 'Primera danza',
    caption: 'Boda · Recepción',
  },
  {
    id: 7,
    cat: 'naturaleza',
    src: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=600&q=80',
    label: 'Amanecer',
    caption: 'Naturaleza · Costa',
  },
  {
    id: 8,
    cat: 'eventos',
    src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80',
    label: 'Show en vivo',
    caption: 'Evento · Concierto',
  },
]

export const CATS = [
  { key: 'all',        label: 'Todos' },
  { key: 'retratos',   label: 'Retratos' },
  { key: 'bodas',      label: 'Bodas' },
  { key: 'eventos',    label: 'Eventos' },
  { key: 'naturaleza', label: 'Naturaleza' },
]

export const SERVICES = [
  {
    icon: '🖼',
    name: 'Retratos',
    desc: 'Sesiones individuales, familiares y corporativas con enfoque en la personalidad.',
  },
  {
    icon: '💍',
    name: 'Bodas',
    desc: 'Cobertura completa del gran día, desde la preparación hasta la celebración.',
  },
  {
    icon: '🎉',
    name: 'Eventos',
    desc: 'Corporativos, sociales y culturales. Capturo la energía de cada momento.',
  },
  {
    icon: '🏔',
    name: 'Naturaleza',
    desc: 'Paisajes, flora y fauna. La belleza del Perú vista a través del lente.',
  },
]

export const PACKS = [
  {
    badge: 'Starter',
    name: 'Esencial',
    price: 'S/ 299',
    featured: false,
    desc: 'Ideal para sesiones sencillas o retratos individuales.',
    items: [
      '1 hora de sesión',
      '1 locación',
      '15 fotos editadas',
      'Entrega en 5 días',
      'Galería digital privada',
    ],
  },
  {
    badge: '⭐ Más popular',
    name: 'Premium',
    price: 'S/ 599',
    featured: true,
    desc: 'Perfecto para bodas pequeñas, familias y eventos medianos.',
    items: [
      '3 horas de sesión',
      'Hasta 2 locaciones',
      '40 fotos editadas',
      'Entrega en 7 días',
      'Galería digital privada',
      'Impresión 20x30 cm incluida',
    ],
  },
  {
    badge: 'Full',
    name: 'Completo',
    price: 'S/ 999',
    featured: false,
    desc: 'Para bodas, eventos grandes o proyectos editoriales completos.',
    items: [
      'Día completo (8 hrs)',
      'Locaciones ilimitadas',
      '80+ fotos editadas',
      'Entrega en 10 días',
      'Galería digital privada',
      'Álbum impreso 30x30 cm',
      'Segundo fotógrafo',
    ],
  },
  {
    badge: 'Naturaleza',
    name: 'Expedición',
    price: 'S/ 799',
    featured: false,
    desc: 'Salidas fotográficas a paisajes naturales del Perú. Precio incluye transporte.',
    items: [
      'Día completo en naturaleza',
      'Transporte incluido',
      '50 fotos editadas',
      'Entrega en 10 días',
      'Posibilidad de impresión fine art',
    ],
  },
]

export const CONTACT_INFO = [
  { icon: '📍', label: 'Ubicación',  value: 'Lima, Perú' },
  { icon: '📸', label: 'Instagram',  value: '@RaymiEstudio_foto' },
  { icon: '✉️',  label: 'Email',     value: 'hola@RaymiEstudio.pe' },
  { icon: '📱', label: 'WhatsApp',   value: '+51 999 888 777' },
]
