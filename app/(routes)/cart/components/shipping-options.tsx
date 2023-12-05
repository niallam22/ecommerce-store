
interface ShippingOptions{
    option: string;
    description: string;
    shippingRateId: string;
    shippingRate: string;
    duration: string;
}

export const shippingOptions: ShippingOptions[] =[
    {
        option: 'A',
        description: 'Standard shipping',
        shippingRateId: process.env.NEXT_PUBLIC_SHIPPING_RATE_ID_B as string,
        shippingRate: process.env.NEXT_PUBLIC_SHIPPING_RATE_B as string,
        duration: '10-15 business days'
    },
    {
        option: 'B',
        description: 'Free shipping',
        shippingRateId: process.env.NEXT_PUBLIC_SHIPPING_RATE_ID_A as string,
        shippingRate: process.env.NEXT_PUBLIC_SHIPPING_RATE_A as string,
        duration: '10-15 business days'

    }

]

