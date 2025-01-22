export default function getUnixInDate(timestamp: number): Date {
    return new Date(timestamp * 1000)
}