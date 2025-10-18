import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Star, ArrowRight, Zap, Crown, Building } from "lucide-react";

export default function PricingPage() {
	const plans = [
		{
			name: "Personal",
			icon: Zap,
			price: "Free",
			description: "Perfect for individuals getting started with digital payments",
			features: [
				"Send & receive money",
				"Basic spending insights",
				"Standard customer support",
				"Mobile app access",
				"2 free ATM withdrawals/month",
				"Basic security features",
			],
			limitations: ["Monthly transfer limit: $5,000", "International transfer fee: 1%", "No investment tools", "No priority support"],
			cta: "Get Started Free",
			popular: false,
			to: "/signup",
		},
		{
			name: "Premium",
			icon: Star,
			price: "$9.99",
			period: "/month",
			description: "Enhanced features for power users and frequent travelers",
			features: [
				"Everything in Personal",
				"Unlimited transfers",
				"Advanced analytics & insights",
				"Priority customer support",
				"10 free ATM withdrawals/month",
				"Multi-currency accounts",
				"Investment tools & portfolio tracking",
				"Premium card with rewards",
				"International transfers: 0.5% fee",
			],
			limitations: ["Monthly limit: $50,000", "Business features not included"],
			cta: "Start Premium Trial",
			popular: true,
			to: "/signup?plan=premium",
		},
		{
			name: "Business",
			icon: Building,
			price: "$29.99",
			period: "/month",
			description: "Comprehensive solution for businesses and teams of any size",
			features: [
				"Everything in Premium",
				"Unlimited business transfers",
				"Team management & permissions",
				"Advanced reporting & analytics",
				"Dedicated account manager",
				"API access & integrations",
				"Bulk payment processing",
				"Custom spending controls",
				"International transfers: 0.3% fee",
				"24/7 priority support",
			],
			limitations: ["Requires business verification"],
			cta: "Contact Sales",
			popular: false,
			to: "/contact?plan=business",
		},
	];

	const enterpriseFeatures = [
		"Custom integration & API access",
		"Dedicated infrastructure",
		"Advanced compliance tools",
		"Custom reporting & analytics",
		"24/7 dedicated support team",
		"SLA guarantees",
		"Custom security protocols",
		"Multi-entity management",
	];

	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<section className="py-20 lg:py-32 bg-gradient-to-br from-background via-card to-background">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-4xl mx-auto text-center space-y-8">
						<Badge variant="secondary" className="w-fit mx-auto">
							Transparent Pricing
						</Badge>
						<h1 className="text-4xl lg:text-6xl font-bold text-balance">
							Simple, Fair <span className="text-primary/70">Pricing</span>
						</h1>
						<p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
							Choose the plan that fits your needs. No hidden fees, no surprises. Start free and upgrade as you grow.
						</p>
					</div>
				</div>
			</section>

			{/* Pricing Plans */}
			<section className="py-20">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
						{plans.map((plan, index) => (
							<Card
								key={index}
								className={`relative border-border/50 hover:border-secondary/50 transition-all duration-300 hover:shadow-lg ${
									plan.popular ? "border-secondary shadow-lg scale-105" : ""
								}`}
							>
								{plan.popular && (
									<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
										<Badge className="bg-secondary text-secondary-foreground">Most Popular</Badge>
									</div>
								)}

								<CardHeader className="text-center space-y-4">
									<div className="w-12 h-12 bg-secondary/30 rounded-lg flex items-center justify-center mx-auto">
										<plan.icon className="w-6 h-6 text-primary" />
									</div>
									<div>
										<CardTitle className="text-2xl">{plan.name}</CardTitle>
										<CardDescription className="mt-2">{plan.description}</CardDescription>
									</div>
									<div className="space-y-1">
										<div className="text-4xl font-bold">
											{plan.price}
											{plan.period && <span className="text-lg text-muted-foreground font-normal">{plan.period}</span>}
										</div>
									</div>
								</CardHeader>

								<CardContent className="space-y-6">
									<Button size="lg" className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : "bg-muted-foreground"}`} asChild>
										<Link to={plan.to}>
											{plan.cta}
											<ArrowRight className="ml-2 w-4 h-4" />
										</Link>
									</Button>

									<div className="space-y-3">
										<h4 className="font-semibold text-sm uppercase tracking-wide">Included Features</h4>
										<ul className="space-y-2">
											{plan.features.map((feature, featureIndex) => (
												<li key={featureIndex} className="flex items-start text-sm">
													<Check className="w-4 h-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
													<span>{feature}</span>
												</li>
											))}
										</ul>
									</div>

									{plan.limitations && plan.limitations.length > 0 && (
										<div className="space-y-3">
											<h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Limitations</h4>
											<ul className="space-y-2">
												{plan.limitations.map((limitation, limitIndex) => (
													<li key={limitIndex} className="flex items-start text-sm text-muted-foreground">
														<X className="w-4 h-4 text-destructive mr-2 flex-shrink-0 mt-0.5" />
														<span>{limitation}</span>
													</li>
												))}
											</ul>
										</div>
									)}
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Enterprise Section */}
			<section className="py-20 bg-card/50">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-4xl mx-auto">
						<Card className="border-border/50">
							<CardHeader className="text-center space-y-4">
								<div className="w-12 h-12 bg-secondary/30 rounded-lg flex items-center justify-center mx-auto">
									<Crown className="w-6 h-6 text-primary" />
								</div>
								<CardTitle className="text-2xl">Enterprise</CardTitle>
								<CardDescription className="text-base">Custom solutions for large organizations with complex financial needs</CardDescription>
								<div className="text-3xl font-bold">Custom Pricing</div>
							</CardHeader>

							<CardContent className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-3">
										<h4 className="font-semibold">Enterprise Features</h4>
										<ul className="space-y-2">
											{enterpriseFeatures.slice(0, 4).map((feature, index) => (
												<li key={index} className="flex items-start text-sm">
													<Check className="w-4 h-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
													<span>{feature}</span>
												</li>
											))}
										</ul>
									</div>
									<div className="space-y-3">
										<h4 className="font-semibold">Additional Benefits</h4>
										<ul className="space-y-2">
											{enterpriseFeatures.slice(4).map((feature, index) => (
												<li key={index} className="flex items-start text-sm">
													<Check className="w-4 h-4 text-primary mr-2 flex-shrink-0 mt-0.5" />
													<span>{feature}</span>
												</li>
											))}
										</ul>
									</div>
								</div>

								<div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
									<Button size="lg" asChild>
										<Link to="/contact?plan=enterprise">
											Contact Sales Team
											<ArrowRight className="ml-2 w-4 h-4" />
										</Link>
									</Button>
									<Button variant="outline" size="lg" asChild>
										<Link to="/demo">Schedule Demo</Link>
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section className="py-20">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center space-y-4 mb-16">
						<h2 className="text-3xl lg:text-4xl font-bold text-balance">Pricing FAQ</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">Common questions about our pricing and plans.</p>
					</div>

					<div className="max-w-3xl mx-auto space-y-6">
						{[
							{
								question: "Can I change plans anytime?",
								answer:
									"Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.",
							},
							{
								question: "Are there any hidden fees?",
								answer:
									"No hidden fees, ever. All costs are clearly displayed upfront. The only additional charges are optional services like expedited transfers or premium cards.",
							},
							{
								question: "What payment methods do you accept?",
								answer: "We accept all major credit cards, debit cards, and bank transfers. You can also pay using your PayWallet balance.",
							},
							{
								question: "Is there a free trial for Premium?",
								answer: "Yes! New users get a 30-day free trial of Premium features. No credit card required to start.",
							},
							{
								question: "What happens if I exceed my plan limits?",
								answer: "We'll notify you before you reach your limits. You can either upgrade your plan or pay a small fee for additional transactions.",
							},
						].map((faq, index) => (
							<Card key={index} className="border-border/50">
								<CardHeader>
									<CardTitle className="text-lg">{faq.question}</CardTitle>
								</CardHeader>
								<CardContent>
									<CardDescription className="text-base leading-relaxed">{faq.answer}</CardDescription>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-foreground text-background">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<div className="max-w-3xl mx-auto space-y-8">
						<h2 className="text-3xl lg:text-4xl font-bold text-balance">Ready to Get Started?</h2>
						<p className="text-xl text-muted-foreground leading-relaxed">
							Join millions of users who trust PayWallet with their financial needs. Start free today.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button size="lg" variant="secondary" asChild className="text-lg px-8">
								<Link to="/signup">
									Start Free Account
									<ArrowRight className="ml-2 w-5 h-5" />
								</Link>
							</Button>
							<Button
								variant="outline"
								size="lg"
								asChild
								className="text-lg px-8 border-background text-background hover:bg-background hover:text-foreground bg-transparent"
							>
								<Link to="/contact">Talk to Sales</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
