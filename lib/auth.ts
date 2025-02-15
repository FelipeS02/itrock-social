export function isSessionExpirated(exp: number): boolean {
  // Get the current time in seconds (since JWT expiration is in miliseconds)
  const actualMiliseconds = Date.now();

  // Check if the token's expiration (`exp`) is before the current time
  return exp < actualMiliseconds;
}
