import { NextRequest, NextResponse } from 'next/server'

const allowedOrigins = [
  'http://localhost:3000',
  'https://your-frontend-domain.com'
]

export function corsHeaders(origin?: string) {
  const isAllowedOrigin = origin && allowedOrigins.includes(origin)
  
  return {
    'Access-Control-Allow-Origin': isAllowedOrigin ? origin : allowedOrigins[0],
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  }
}

export function handleCors(request: NextRequest): NextResponse | undefined {
  const origin = request.headers.get('origin')
  
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: corsHeaders(origin || undefined)
    })
  }
  
  return undefined
}