const AllowedCorsOrgins = [
  'http://localhost:3000',
  'https://cloudflare-dev-summer-challenge-21.pages.dev/',
  'https://*.cloudflare-dev-summer-challenge-21.pages.dev/'
]

export const CorsHeaders = (reqOrigin: string | null) => {
  const origin = checkOrigin(reqOrigin)
  return {
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Origin': origin,
  }
}

const checkOrigin = (origin: string | null) => {
  if (origin != null) {
    let domain = origin.replace('https://', '').split('.')

    if ((domain.length == 4 && domain[1] == 'cloudflare-dev-summer-challenge-21') || domain.length == 3 && domain[0] == 'cloudflare-dev-summer-challenge-21') {
      return origin
    } else {
      const returnOrigin = AllowedCorsOrgins.find((AllowedCorsOrgins) =>
        AllowedCorsOrgins.includes(origin),
      )
      return returnOrigin == null ? AllowedCorsOrgins[1] : returnOrigin
    }
  } else {
    return AllowedCorsOrgins[0]
  }
}
