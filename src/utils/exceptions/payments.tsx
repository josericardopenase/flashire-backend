export class StripePayError extends Error {
	constructor(message: string) {
		super("Stripe payment error")
		this.name = "StripePayError"
	}
}
