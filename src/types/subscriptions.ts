export type Subscription = {
    cancel_at: string | number | null
    cancel_at_period_end: boolean | null
    canceled_at: string | number | null
    created: string | number | null
    current_period_end: string | number | null
    current_period_start: string | number | null
    ended_at: string | number | null
    id: string
    metadata: object | null
    price_id: string | null
    quantity: string | number | null
    status:
        | 'trialing'
        | 'active'
        | 'canceled'
        | 'incomplete'
        | 'incomplete_expired'
        | 'past_due'
        | 'unpaid'
        | 'paused'
        | null
    trial_end: string | number | null
    trial_start: string | number | null
    user_id: string
}

export type Product = {
    active: boolean | null
    description: string | null
    id: string
    image?: string | null
    metadata: object | null
    name: string | null
    default_price: string | null
}

export type Price = {
    id: string
    description?: string | null
    product_id: string | null
    active: boolean | null
    currency: string | null
    type: 'one_time' | 'recurring' | null
    unit_amount: number | null
    metadata: object | null
    billing_scheme: 'per_unit' | 'tiered' | null
    recurring: {
        aggregate_usage: string | null
        interval: 'day' | 'week' | 'month' | 'year' | null
        interval_count: number | null
        trial_period_days: string | number | null
        usage_type: 'licensed' | 'metered' | null
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
