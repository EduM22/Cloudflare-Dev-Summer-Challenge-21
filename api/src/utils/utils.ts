const AllowedCorsOrgins = ['http://localhost:3000']

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
    const returnOrigin = AllowedCorsOrgins.find((AllowedCorsOrgins) =>
      AllowedCorsOrgins.includes(origin),
    )
    // TODO: change in PROD to be 0
    return returnOrigin == null ? AllowedCorsOrgins[1] : returnOrigin
  } else {
    return AllowedCorsOrgins[0]
  }
}
