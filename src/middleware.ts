import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES = ['/login', '/register']
const IGNORED_PATHS = [
    '/_next',         // arquivos estáticos do Next.js (JS, CSS)
    '/favicon.ico',   // favicon
    '/manifest.json', // manifest PWA
    '/images',        // imagens públicas
    '/assets',        // assets personalizados
    '/api/auth'       // rotas de autenticação (se usar alguma lib como next-auth)
]

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Permitir acesso a rotas ignoradas
    if (IGNORED_PATHS.some(path => pathname.startsWith(path))) {
        return NextResponse.next()
    }

    // Permitir acesso a rotas públicas
    if (PUBLIC_ROUTES.includes(pathname)) {
        return NextResponse.next()
    }

    const token = request.cookies.get('elodrinks_token')?.value

    // Redireciona para o login se não houver token
    if (!token) {
        const loginUrl = new URL('/login', request.url)
        return NextResponse.redirect(loginUrl)
    }

    // Segue para a rota normalmente
    return NextResponse.next()
}

export const config = {
    matcher: ['/:path*']
}
