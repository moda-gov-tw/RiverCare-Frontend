import { NextResponse, NextRequest } from "next/server"
import { NODE_URL, ASSETS_URL } from "./environments/environment"

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64")
  const unsafeEval = process.env.NODE_ENV === "production" ? "" : `'unsafe-eval'`
  const cspHeader = `
    default-src 'self' https://verify.walletconnect.com;
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${unsafeEval};
    connect-src
      'self' 
      https://*.papers.tech
      wss://relay.walletconnect.com
      ${ASSETS_URL}
      ${NODE_URL};
    style-src
      'self'
      'nonce-${nonce}'
      'sha256-tsYY7FHBs/jNXPrB1eEUK2eQbefzdEskDUPyLIaZF48='
      'sha256-eVg46Wn8rNnnMm/sDYA/lI6R8D2NeGPd0gLaI+xEee8='
      'sha256-8CoZk72WNP8kQ/Ns6+Kk3H0eno8QJQN5kXzvMt2ke2s='
      'sha256-CEpMsg0Og5mx/rq1b5Qo6nxgf1u+wlqoJv7aCj9/SIY='
      'sha256-Mgt9TgDLHTtZtJQJVtn0grxil5xftfp+D2OZYzTIsAk='
      'sha256-nXPCVi+gV9cY7Hy00iue03wMGmFMCdFfUbnVl+IpljE='
      'sha256-+0tdQx1FNwxG1rQLa4Do5PfZA7zEDyLNXY8yhNxn3k0='
      'sha256-k6BFlr5fb4NnZQ8o2Hd7iTk0CdG6KzqHljaQ3ZrYf70='
      'sha256-Iagq3/9Nw6rffHxgmOoCUOS3kmT88g4e9//8H60nDOs='
      'sha256-EI50Kz53w5vIjFJGLgESOfWTpf3n8lLsmoNdADHYC94=';
    img-src 'self' blob: data: https://templewallet.com;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`

  const requestHeaders = new Headers(request.headers)

  // Setting request headers
  requestHeaders.set("x-nonce", nonce)
  requestHeaders.set(
    "Content-Security-Policy",
    // Replace newline characters and spaces
    cspHeader.replace(/\s{2,}/g, " ").trim()
  )

  return NextResponse.next({
    headers: requestHeaders,
    request: {
      headers: requestHeaders
    }
  })
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" }
      ]
    }
  ]
}
