export interface LatestDto {
    name: string;
    ISOCode: string,
    latestRate: number
    rateChange: number,
    dates: Date[],
    latest7DaysRateValues: number[]
}