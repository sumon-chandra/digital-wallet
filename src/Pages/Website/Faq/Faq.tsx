import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Search, HelpCircle, Shield, CreditCard, Globe, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function FAQPage() {
	const faqCategories = [
		{
			icon: HelpCircle,
			title: "Getting Started",
			faqs: [
				{
					question: "How do I create a PayWallet account?",
					answer:
						"Creating an account is simple! Download our mobile app or visit our website, click 'Sign Up', and follow the prompts. You'll need to provide basic information like your name, email, and phone number. The entire process takes less than 2 minutes.",
				},
				{
					question: "What documents do I need to verify my account?",
					answer:
						"For basic verification, you'll need a government-issued photo ID (driver's license, passport, or state ID). For higher transaction limits, we may require additional documents like proof of address or income verification.",
				},
				{
					question: "Is PayWallet free to use?",
					answer:
						"Yes! PayWallet offers a free Personal plan that includes basic features like sending and receiving money, spending insights, and mobile app access. Premium plans are available for users who need advanced features.",
				},
				{
					question: "How long does account verification take?",
					answer:
						"Most accounts are verified instantly using our automated system. In some cases, manual review may be required, which typically takes 1-2 business days. You'll receive email updates throughout the process.",
				},
			],
		},
		{
			icon: CreditCard,
			title: "Payments & Transfers",
			faqs: [
				{
					question: "How fast are money transfers?",
					answer:
						"Domestic transfers are typically instant, while international transfers can take 1-3 business days depending on the destination country and local banking systems. Premium users enjoy faster processing times.",
				},
				{
					question: "What are the transfer limits?",
					answer:
						"Personal accounts have a $5,000 monthly limit, Premium accounts have $50,000 monthly limits, and Business accounts have unlimited transfers. Daily limits may also apply based on your verification level.",
				},
				{
					question: "Can I cancel a transfer after sending it?",
					answer:
						"Domestic transfers are typically processed instantly and cannot be cancelled. International transfers may be cancelled within a short window if they haven't been processed yet. Contact support immediately if you need to cancel a transfer.",
				},
				{
					question: "What payment methods can I use to add money?",
					answer:
						"You can add money using bank transfers (ACH), debit cards, credit cards, and wire transfers. Bank transfers are free, while card payments may have small fees. Check our fee schedule for details.",
				},
			],
		},
		{
			icon: Shield,
			title: "Security & Safety",
			faqs: [
				{
					question: "How secure is my money with PayWallet?",
					answer:
						"Your funds are protected by bank-level security including 256-bit SSL encryption, two-factor authentication, and fraud monitoring. We're also FDIC insured up to $250,000 per account, providing the same protection as traditional banks.",
				},
				{
					question: "What should I do if I suspect fraud on my account?",
					answer:
						"Contact our support team immediately at support@paywallet.com or through the app's chat feature. We'll freeze your account to prevent further unauthorized activity and investigate the issue. Most fraud cases are resolved within 24-48 hours.",
				},
				{
					question: "Can I set spending limits on my account?",
					answer:
						"Yes! You can set daily, weekly, and monthly spending limits through the app settings. You can also set limits for specific categories like online purchases or international transactions.",
				},
				{
					question: "How do you protect my personal information?",
					answer:
						"We use industry-standard encryption to protect your data and never share your personal information with third parties without your consent. Our privacy policy details exactly how we collect, use, and protect your information.",
				},
			],
		},
		{
			icon: Globe,
			title: "International Features",
			faqs: [
				{
					question: "Which countries can I send money to?",
					answer:
						"PayWallet supports transfers to over 180 countries and territories worldwide. You can check the full list in our app or website. Some countries may have specific requirements or limitations.",
				},
				{
					question: "What currencies do you support?",
					answer:
						"We support over 50 major currencies including USD, EUR, GBP, JPY, CAD, AUD, and many more. Exchange rates are updated in real-time and displayed transparently before you confirm any transaction.",
				},
				{
					question: "How do international transfer fees work?",
					answer:
						"International transfer fees vary by plan: Personal accounts pay 1%, Premium accounts pay 0.5%, and Business accounts pay 0.3%. There are no hidden fees - the total cost is always shown upfront.",
				},
				{
					question: "Can I hold multiple currencies in my account?",
					answer:
						"Yes! Premium and Business account holders can maintain balances in multiple currencies, making it easy to send money internationally without conversion fees each time.",
				},
			],
		},
		{
			icon: Users,
			title: "Business Accounts",
			faqs: [
				{
					question: "What's the difference between Personal and Business accounts?",
					answer:
						"Business accounts offer higher limits, team management features, advanced reporting, API access, bulk payments, and dedicated support. They're designed for companies that need to manage multiple users and higher transaction volumes.",
				},
				{
					question: "Can I upgrade from Personal to Business?",
					answer:
						"Yes, you can upgrade anytime through your account settings. You'll need to provide business verification documents, and the upgrade typically takes 1-2 business days to process.",
				},
				{
					question: "Do you offer API access for businesses?",
					answer:
						"Yes! Business and Enterprise accounts include API access for integrating PayWallet into your existing systems. We provide comprehensive documentation and developer support to help with integration.",
				},
				{
					question: "Can I add team members to my business account?",
					answer:
						"Business accounts support multiple team members with customizable permissions. You can control what each team member can access and set spending limits for different roles.",
				},
			],
		},
	];

	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<section className="py-20 lg:py-32 bg-gradient-to-br from-background via-card to-background">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-4xl mx-auto text-center space-y-8">
						<Badge variant="secondary" className="w-fit mx-auto">
							Frequently Asked Questions
						</Badge>
						<h1 className="text-4xl lg:text-6xl font-bold text-balance">
							Get <span className="text-primary/70">Answers</span> Fast
						</h1>
						<p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
							Find answers to the most common questions about PayWallet. Can't find what you're looking for? Our support team is here to help.
						</p>
					</div>
				</div>
			</section>

			{/* Search Section */}
			<section className="py-12 bg-card/50">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-2xl mx-auto">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5" />
							<input
								type="text"
								placeholder="Search for answers..."
								className="w-full pl-10 pr-4 py-3 border border-primary rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
							/>
						</div>
						<p className="text-sm text-muted-foreground text-center mt-3">Try searching for "transfer", "fees", "security", or "verification"</p>
					</div>
				</div>
			</section>

			{/* FAQ Categories */}
			<section className="py-20">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-4xl mx-auto space-y-12">
						{faqCategories.map((category, categoryIndex) => (
							<div key={categoryIndex} className="space-y-6">
								<div className="flex items-center space-x-3">
									<div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
										<category.icon className="w-5 h-5 text-primary" />
									</div>
									<h2 className="text-2xl font-bold">{category.title}</h2>
								</div>

								<div className="space-y-4">
									{category.faqs.map((faq, faqIndex) => (
										<Card key={faqIndex} className="border-border/50">
											<Collapsible>
												<CollapsibleTrigger className="w-full">
													<CardHeader className="hover:bg-card/50 transition-colors duration-200">
														<div className="flex items-center justify-between text-left">
															<CardTitle className="text-lg font-semibold pr-4">{faq.question}</CardTitle>
															<ChevronDown className="w-5 h-5 text-primary flex-shrink-0 transition-transform duration-200" />
														</div>
													</CardHeader>
												</CollapsibleTrigger>
												<CollapsibleContent>
													<CardContent className="pt-0">
														<CardDescription className="text-base leading-relaxed">{faq.answer}</CardDescription>
													</CardContent>
												</CollapsibleContent>
											</Collapsible>
										</Card>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Still Need Help */}
			<section className="py-20 bg-card/50">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-3xl mx-auto text-center space-y-8">
						<h2 className="text-3xl lg:text-4xl font-bold text-balance">Still Need Help?</h2>
						<p className="text-xl text-muted-foreground leading-relaxed">
							Can't find the answer you're looking for? Our support team is available 24/7 to assist you.
						</p>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<Card className="border-border/50 hover:border-primary/50 transition-colors duration-300">
								<CardHeader className="text-center">
									<HelpCircle className="w-8 h-8 text-primary mx-auto mb-2" />
									<CardTitle className="text-lg">Live Chat</CardTitle>
								</CardHeader>
								<CardContent className="text-center">
									<CardDescription className="mb-4">Get instant help through our chat system</CardDescription>
									<Button variant="outline" size="sm" className="w-full bg-transparent">
										Start Chat
									</Button>
								</CardContent>
							</Card>

							<Card className="border-border/50 hover:border-primary/50 transition-colors duration-300">
								<CardHeader className="text-center">
									<Users className="w-8 h-8 text-primary mx-auto mb-2" />
									<CardTitle className="text-lg">Contact Support</CardTitle>
								</CardHeader>
								<CardContent className="text-center">
									<CardDescription className="mb-4">Send us a message and we'll respond quickly</CardDescription>
									<Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
										<Link to="/contact">Contact Us</Link>
									</Button>
								</CardContent>
							</Card>

							<Card className="border-border/50 hover:border-primary/50 transition-colors duration-300">
								<CardHeader className="text-center">
									<Globe className="w-8 h-8 text-primary mx-auto mb-2" />
									<CardTitle className="text-lg">Help Center</CardTitle>
								</CardHeader>
								<CardContent className="text-center">
									<CardDescription className="mb-4">Browse our comprehensive help documentation</CardDescription>
									<Button variant="outline" size="sm" className="w-full bg-transparent">
										Visit Help Center
									</Button>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</section>

			{/* Popular Topics */}
			<section className="py-20">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center space-y-4 mb-12">
						<h2 className="text-3xl lg:text-4xl font-bold text-balance">Popular Help Topics</h2>
						<p className="text-xl text-muted-foreground leading-relaxed">Quick links to the most searched topics</p>
					</div>

					<div className="max-w-4xl mx-auto">
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							{[
								"Account Verification",
								"Transfer Limits",
								"International Fees",
								"Security Settings",
								"Card Activation",
								"Password Reset",
								"Transaction History",
								"Business Upgrade",
							].map((topic, index) => (
								<Button key={index} variant="outline" className="h-auto p-4 text-sm hover:border-secondary/50 bg-transparent">
									{topic}
								</Button>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-foreground text-background">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<div className="max-w-3xl mx-auto space-y-8">
						<h2 className="text-3xl lg:text-4xl font-bold text-balance">Ready to Get Started?</h2>
						<p className="text-xl text-muted-foreground leading-relaxed">
							Join millions of users who trust PayWallet for their financial needs. Create your free account today.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button size="lg" variant="secondary" asChild className="text-lg px-8">
								<Link to="/signup">
									Create Free Account
									<ArrowRight className="ml-2 w-5 h-5" />
								</Link>
							</Button>
							<Button
								variant="outline"
								size="lg"
								asChild
								className="text-lg px-8 border-background text-background hover:bg-background hover:text-foreground bg-transparent"
							>
								<Link to="/contact">Contact Support</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
