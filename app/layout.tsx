import type { Metadata } from 'next';
import { Poppins as PoppinsFont } from 'next/font/google';

import { Toaster } from '@rock/components/ui/sonner';
import LenisProvider from '@rock/components/providers/lenis-provider';
import StoreProvider from '@rock/components/providers/store-provider';

import './globals.css';

import OgImage from './assets/images/og_image.webp';

const Poppins = PoppinsFont({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'IT Rock | Social',
  description:
    'At IT Rock, we specialize developing digital products like mobile apps, webs, and software solutions from start to finish. Let us rock your idea!',
  keywords:
    'red social nueva, plataforma social innovadora, comunidad en línea, conecta con personas, compartir contenido, social media moderna, crear perfil gratis, subir fotos y videos, descubrir contenido interesante, hacer amigos en línea, red social sin censura, privacidad en redes sociales, alternativa a redes tradicionales, plataforma social segura, personalizar perfil, encontrar intereses en común, publicaciones interactivas, comentar y reaccionar, chat en tiempo real, enviar mensajes privados, descubrir nuevas tendencias, plataforma social descentralizada, crear contenido viral, monetizar publicaciones, influencers en redes, engagement social, aumentar seguidores, red social para creadores, mejorar alcance en redes, inteligencia artificial en redes sociales, descubrir comunidades, trending topics en redes, explorar nuevos temas, proteger tu privacidad, contenido original y creativo, compartir experiencias en línea, crecer en redes sociales, seguridad en redes sociales, bloquear usuarios, reportar contenido, moderación de comunidad, reglas de convivencia en redes, red social sin algoritmos intrusivos.',
  openGraph: { images: OgImage.src },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LenisProvider>
      <html lang='en'>
        <body
          className={`${Poppins.variable} font-poppins grid min-h-dvh max-w-dvw items-center antialiased`}
        >
          <StoreProvider>{children}</StoreProvider>
          <Toaster richColors />
        </body>
      </html>
    </LenisProvider>
  );
}
