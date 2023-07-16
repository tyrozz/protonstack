export type Subscription = {
    name: string
    cancel_at: string | null
    cancel_at_period_end: boolean | null
    canceled_at: string | null
    created: string
    current_period_end: string
    current_period_start: string
    ended_at: string | null
    id: string
    metadata: object | null
    price_id: string | null
    quantity: number | null
    status: string | null
    trial_end: string | null
    trial_start: string | null
    user_id: string
}

export type Product = {
    active: boolean | null
    description?: string | null
    id: string
    image?: string | null
    metadata?: object | null
    name: string | null
    default_price?: string | null
}

export type Price = {
    active: boolean | null
    currency: string | null
    description?: string | null
    id: string
    interval?: 'day' | 'week' | 'month' | 'year' | null
    interval_count?: number | null
    metadata?: object | null
    product_id?: string | null
    trial_period_days?: number | null
    type: 'one_time' | 'recurring' | null
    unit_amount?: number | null
    recurring?: {
        aggregate_usage: null
        interval: 'month'
        interval_count: 1
        trial_period_days: null
        usage_type: 'licensed'
    }
}

export interface ProductWithPrices extends Product {
    prices: Price[]
}
export interface PriceWithProduct extends Price {
    products: Product | null
}
export interface SubscriptionWithProduct extends Subscription {
    prices: PriceWithProduct | null
}

type BillingInterval = 'lifetime' | 'year' | 'month'
