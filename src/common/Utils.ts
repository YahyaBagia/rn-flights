export default class Utils {
  static formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const parts: string[] = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (remainingMinutes > 0) parts.push(`${remainingMinutes}m`);

    return parts.join(" ") || "0m";
  };
}
