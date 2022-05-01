export interface ITokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export interface IPairTokens {
  accessToken: string;
  refreshToken: string;
}
