export function getRelativeTime(days: number): string {
  if (days < 30) {
    return `${days} día${days === 1 ? "" : "s"}`;
  } else if (days < 365) {
    const months = Math.floor(days / 30);
    return `${months} mes${months === 1 ? "" : "es"}`;
  } else {
    const years = Math.floor(days / 365);
    return `${years} año${years === 1 ? "" : "s"}`;
  }
}
