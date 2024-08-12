export default interface loginRes {
  username: string;
  nickname: string;
  jwtTokenPair: jwtTokenPair;
}

interface jwtTokenPair {
  accessToken: string;
  refreshToken: string;
}
