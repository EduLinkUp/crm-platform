import Stripe from "stripe"

export const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-03-25.dahlia",
      typescript: true,
    })
  : null

export const subscriptionTiers = {
  STARTER: {
    name: "Starter",
    price: 999, // $9.99 in cents
    features: [
      "5 Team Members",
      "100 API Calls/month",
      "Basic Analytics",
      "Email Support",
      "1 Organization",
    ],
    limits: {
      teamMembers: 5,
      apiCalls: 100,
      organizations: 1,
    },
  },
  PRO: {
    name: "Pro",
    price: 2999, // $29.99 in cents
    features: [
      "25 Team Members",
      "1,000 API Calls/month",
      "Advanced Analytics",
      "Priority Support",
      "5 Organizations",
      "Custom Integrations",
      "API Access",
    ],
    limits: {
      teamMembers: 25,
      apiCalls: 1000,
      organizations: 5,
    },
  },
  ENTERPRISE: {
    name: "Enterprise",
    price: 9999, // $99.99 in cents
    features: [
      "Unlimited Team Members",
      "10,000 API Calls/month",
      "Real-time Analytics",
      "24/7 Phone Support",
      "Unlimited Organizations",
      "Custom Integrations",
      "Advanced API Access",
      "Dedicated Account Manager",
      "Custom Features",
    ],
    limits: {
      teamMembers: -1, // Unlimited
      apiCalls: 10000,
      organizations: -1, // Unlimited
    },
  },
} as const

export type SubscriptionTier = keyof typeof subscriptionTiers

export async function createCustomer(email: string, name?: string) {
  if (!stripe) throw new Error("Stripe not configured")
  return await stripe.customers.create({ email, name })
}

export async function createCheckoutSession(
  customerId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string,
  metadata?: Record<string, string>
) {
  if (!stripe) throw new Error("Stripe not configured")
  return await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "subscription",
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata,
  })
}

export async function createBillingPortalSession(
  customerId: string,
  returnUrl: string
) {
  if (!stripe) throw new Error("Stripe not configured")
  return await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })
}

export async function getSubscription(subscriptionId: string) {
  if (!stripe) throw new Error("Stripe not configured")
  return await stripe.subscriptions.retrieve(subscriptionId)
}

export async function cancelSubscription(subscriptionId: string) {
  if (!stripe) throw new Error("Stripe not configured")
  return await stripe.subscriptions.cancel(subscriptionId)
}

export async function updateSubscription(
  subscriptionId: string,
  priceId: string
) {
  if (!stripe) throw new Error("Stripe not configured")
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)
  
  return await stripe.subscriptions.update(subscriptionId, {
    items: [{
      id: subscription.items.data[0].id,
      price: priceId,
    }],
  })
}
