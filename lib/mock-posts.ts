import { Post } from '@rock/models/post.model';
import { User } from '@rock/models/user.model';

import { subHours } from 'date-fns';

export const mockPalettes: Record<string, Omit<User['role'], 'name'>> = {
  orange: { background: '#FF3201', foreground: '#FAFAFA' },
  black: { background: '#FAFAFA', foreground: '#1A1A1A' },
  green: { background: '#A4C639', foreground: '#1A1A1A' },
  blue: { background: '#1B2DFD', foreground: '#FAFAFA' },
};

const getEmail = (name: string) => `${name}@itrocksweb.com`;

const getDate = (hours: number = 1) =>
  subHours(new Date(), hours).toISOString();

export const mockUsers: Record<string, User> = {
  maxi: {
    id: 1,
    email: getEmail('maxialbeldas'),
    role: {
      name: 'Referente Front-End',
      ...mockPalettes['orange'],
    },
    username: 'Maxi Albedas',
    avatar:
      'https://media.licdn.com/dms/image/v2/D4D03AQHix_EH0s1bvg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1664021725473?e=1744848000&v=beta&t=_PJEEFczTXUW1x5kUEu4EWhB55247uZhZtPgdEhPxOU',
  },
  seba: {
    id: 2,
    email: getEmail('sebastiancolombo'),
    role: {
      name: 'FOUNDER',
      ...mockPalettes['black'],
    },
    avatar:
      'https://media.licdn.com/dms/image/v2/C4D03AQF2eoZkgo3n2Q/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1636554933154?e=1744848000&v=beta&t=5YPJgEPlpPgdz0nOYUK6dQv8PDQovUz7lah8v7VYMtE',
    username: 'Sebastian Colombo',
  },
  lucas: {
    id: 3,
    email: getEmail('lucaszacarias'),
    role: {
      name: 'Android',
      ...mockPalettes['green'],
    },
    avatar:
      'https://media.licdn.com/dms/image/v2/D4D03AQHhtmt3pefebw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1718318090507?e=1744848000&v=beta&t=jmN6FNIF9-uXdtP78pR9YR7oU0ezzhfi-HaNk0SNDkY',
    username: 'Lucas Zacarias',
  },
  felipe: {
    id: 4,
    email: getEmail('felipesaracho'),
    role: {
      name: 'Front-End',
      ...mockPalettes['orange'],
    },
    avatar:
      'https://media.licdn.com/dms/image/v2/D4D03AQH8cIbFxbfFog/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1701866710295?e=1744848000&v=beta&t=iOCLAfEhQWu18-TtJpkHbGaewwYoh8lq5L0-iqWuwqY',
    username: 'Felipe Saracho',
  },
  julian: {
    id: 5,
    email: getEmail('julianyachelini'),
    role: {
      name: 'Back-end',
      ...mockPalettes['blue'],
    },
    avatar:
      'https://media.licdn.com/dms/image/v2/C5603AQENoVdTEgfJzQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1627313546962?e=1744848000&v=beta&t=dspdCcd2h33fQLhmvkbHVOEpMcH_RHFOxIPIJTd_8cs',
    username: 'Julián Yachelini',
  },
  itrock: {
    id: 6,
    email: getEmail('itrock'),
    role: {
      name: 'Anuncios',
      ...mockPalettes['black'],
    },
    avatar:
      'https://media.licdn.com/dms/image/v2/C4D0BAQFp3nldKUbPBQ/company-logo_100_100/company-logo_100_100/0/1657653571272/itrock_logo?e=1747872000&v=beta&t=3sZYlY9zfJeOll3ryKNT5JWF12YGnRccRgU1FzhW6TU',
    username: 'IT Rock',
  },
};

export const mockPosts: Post[] = [
  {
    id: 1,
    user: mockUsers['felipe'],
    comments: [
      { id: 1, images: [], text: 'JAJAJAJ', user: mockUsers['itrock'] },
    ],
    images: ['https://i.imgur.com/xeqNn0G.gif'],
    likes: [mockUsers['julian'], mockUsers['itrock']],
    text: 'se cayó producción',
    date: getDate(48),
  },
  {
    id: 2,
    user: mockUsers['lucas'],
    comments: [],
    images: [
      'https://www.arcor.com/ar/uploads/news_images/4a9092d9c5ec247b4a1e9f65e40da2b7-1200x630.png',
    ],
    likes: [mockUsers['felipe'], mockUsers['itrock'], mockUsers['seba']],
    text: `¡Hoy es un gran día! Después de mucho trabajo, finalmente lanzamos Universo Arcor 🎉
    
Una plataforma diseñada para conocer los principales procesos productivos a través de un recorrido virtual en 360°.
    
Gracias a todos los que hicieron esto posible. ¡Esto es solo el comienzo! 💪✨`,
    date: getDate(24),
  },
  {
    id: 3,
    user: mockUsers['seba'],
    comments: [],
    images: [
      'https://media.licdn.com/dms/image/v2/D4D22AQGTIrzy8bGobQ/feedshare-shrink_800/B4DZPlknW5HcAg-/0/1734723405705?e=1742428800&v=beta&t=x5b1SBLjr4CY9S8QZ972F_QbEhxOTX4q-SevjxRscIY',
      'https://media.licdn.com/dms/image/v2/D4D22AQFABZEz3xqvdw/feedshare-shrink_800/B4DZPlknWnGUAg-/0/1734723405923?e=1742428800&v=beta&t=uVh6knU-f7SYFMH2RFzsB1efa0lYhCV8IPUKkcH4qx8',
    ],
    likes: [mockUsers['felipe'], mockUsers['itrock'], mockUsers['lucas']],
    text: `Ayer estuvimos en Ethereum Argentina: Tierra de Builders, un evento clave para el ecosistema digital 🚀

Escuchamos a Vitalik Buterin creador de Ethereum, quien compartió, entre otras cosas, su interesante visión sobre blockchain, energía e inteligencia artificial.

¡Un hito que impulsa la innovación local y nos inspira a seguir adelante! 🤘`,
    date: getDate(24),
  },
  {
    id: 4,
    user: mockUsers['itrock'],
    comments: [],
    images: [
      'https://media.licdn.com/dms/image/v2/D4D22AQHCpuL5P_Bhrw/feedshare-shrink_800/B4DZQDcVyLHUAg-/0/1735224550612?e=1742428800&v=beta&t=t7Rk3MlQytzFWKAOaE5v0O5R7Rn8GAg2OzKmLDDDTGU',

      'https://media.licdn.com/dms/image/v2/D4D22AQFNWXi0zWTAYQ/feedshare-shrink_800/B4DZQDcVyVHMAg-/0/1735224549483?e=1742428800&v=beta&t=BspKCYGdCj6uLFeFeG-PCiqI7EapTMTx863e3eEU5Wg',

      'https://media.licdn.com/dms/image/v2/D4D22AQH3otXBr6hH1w/feedshare-shrink_800/B4DZQDcVy_GkAg-/0/1735224550859?e=1742428800&v=beta&t=WuXJusBhr-9A2mMOkwSN7e0QSO6IL_R7g6VRrRRkxwk',

      'https://media.licdn.com/dms/image/v2/D4D22AQHHxnUlYPJgDQ/feedshare-shrink_1280/B4DZQDcVzOHUAo-/0/1735224550967?e=1742428800&v=beta&t=zc1aZu2uFQLSFrfPng-EBTROBtkxJ9xmEsl02uCxKoM',
    ],
    likes: [mockUsers['felipe'], mockUsers['itrock'], mockUsers['lucas']],
    text: `Un 2024 lleno de rock 🎸

Sumamos 14 rockers, lanzamos apps, potenciamos proyectos y llevamos nuestra bandera tech a eventos internacionales.

¿Lo mejor? Crecer como equipo. ¡Gracias, equipazo! 🚀`,
    date: getDate(24 * 7),
  },
  {
    id: 5,
    user: mockUsers['itrock'],
    comments: [],
    images: [
      'https://media.licdn.com/dms/image/v2/D5622AQEkAr-IncI5MA/feedshare-shrink_800/feedshare-shrink_800/0/1732737191247?e=1742428800&v=beta&t=LlLsqdKdvZ2XL4rV6QbP0s9bGYhuG-NHFWouSFm-lio',

      'https://media.licdn.com/dms/image/v2/D5622AQHR9NEiR21wYw/feedshare-shrink_800/feedshare-shrink_800/0/1732737191269?e=1742428800&v=beta&t=c4VeVCES48QexDn0WKqn9zfoCSU9y7V24BsgfHnpiZI',

      'https://media.licdn.com/dms/image/v2/D5622AQFhfH3XpItG5g/feedshare-shrink_800/feedshare-shrink_800/0/1732737190923?e=1742428800&v=beta&t=Nqe4GAUiQW0loSzn7_tWRMvKjyjZQsUIZr5RPxxhCiI',
    ],
    likes: [mockUsers['felipe'], mockUsers['itrock'], mockUsers['lucas']],
    text: `Un 2024 lleno de rock 🎸

Sumamos 14 rockers, lanzamos apps, potenciamos proyectos y llevamos nuestra bandera tech a eventos internacionales.

¿Lo mejor? Crecer como equipo. ¡Gracias, equipazo! 🚀`,
    date: getDate(24 * 4),
  },
];
