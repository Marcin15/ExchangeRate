import { SupportedCurrenciesDto } from "./dtos/supportedCurrenciesDto";

export interface CurrencyMetadata extends SupportedCurrenciesDto {
    isSelected: boolean,
    isVisible: boolean
};