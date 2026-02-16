import Stripe from "stripe";

export async function POST() {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [
            {
                price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID!,
                quantity: 1
            }
        ],
        success_url: "https://yourdomain.com/success",
        cancel_url: "https://yourdomain.com"
    });
    return Response.json({ url: session.url });
}