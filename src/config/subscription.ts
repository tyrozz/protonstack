import { Subscription, ProductWithPrices } from '@/types/subscriptions'

export const basic: ProductWithPrices = {
    active: true,
    description: 'Basic subscription',
    id: 'prod_J1Z2X2Z2X2Z2X2',
    image: null,
    metadata: null,
    name: 'Basic',
    prices: [
        {
            active: true,
            currency: 'gbp',
            description: 'Basic subscription monthly',
            id: 'price_1MJQawAibJqcowQPx7T90q2E',
            interval: 'month',
            interval_count: 1,
            metadata: null,
            product_id: 'prod_J1Z2X2Z2X2Z2X2',
            trial_period_days: null,
            type: 'recurring',
            unit_amount: 500,
        },
        {
            active: true,
            currency: 'gbp',
            description: 'Basic subscription yerly',
            id: 'price_1MLIIuAibJqcowQP3PuewuTX',
            interval: 'year',
            interval_count: 1,
            metadata: null,
            product_id: 'prod_J1Z2X2Z2X2Z2X2',
            trial_period_days: null,
            type: 'recurring',
            unit_amount: 5000,
        },
    ],
}

export const pro: ProductWithPrices = {
    active: true,
    description: 'Pro subscription',
    id: 'prod_J1Z2X2Z2X2Z2X2',
    image: null,
    metadata: null,
    name: 'Pro',
    prices: [
        {
            active: true,
            currency: 'gbp',
            description: 'Pro subscription monthly',
            id: 'price_1MJQawAibJqcowQPx7T90q2E',
            interval: 'month',
            interval_count: 1,
            metadata: null,
            product_id: 'prod_J1Z2X2Z2X2Z2X2',
            trial_period_days: null,
            type: 'recurring',
            unit_amount: 1000,
        },
        {
            active: true,
            currency: 'gbp',
            description: 'Pro subscription yerly',
            id: 'price_1MLIIuAibJqcowQP3PuewuTX',
            interval: 'year',
            interval_count: 1,
            metadata: null,
            product_id: 'prod_J1Z2X2Z2X2Z2X2',
            trial_period_days: null,
            type: 'recurring',
            unit_amount: 10000,
        },
    ],
}
