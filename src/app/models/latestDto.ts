import { ChartData } from "./chartData";


export interface LatestDto {
    fullName: string,
    symbol: string,
    latestRate: number,
    rateChange: number,
    lastWeek: ChartData
}