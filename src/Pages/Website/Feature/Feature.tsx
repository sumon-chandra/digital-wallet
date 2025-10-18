import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	Smartphone,
	Shield,
	Zap,
	Globe,
	CreditCard,
	BarChart3,
	Users,
	Lock,
	ArrowRight,
	Check,
	Wallet,
	QrCode,
	Bell,
	TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function FeaturesPage() {
	const mainFeatures = [
		{
			icon: Smartphone,
			title: "Mobile-First Design",
			description: "Intuitive mobile app designed for seamless transactions on the go. Send, receive, and manage your money from anywhere.",
			benefits: ["iOS & Android apps", "Offline transaction queuing", "Biometric authentication", "Dark mode support"],
		},
		{
			icon: Shield,
			title: "Bank-Level Security",
			description: "Your funds are protected by military-grade encryption and multi-layer security protocols trusted by major financial institutions.",
			benefits: ["256-bit SSL encryption", "Two-factor authentication", "Fraud detection AI", "FDIC insured deposits"],
		},
		{
			icon: Zap,
			title: "Instant Transfers",
			description: "Send money to anyone, anywhere in the world in seconds. No more waiting days for international transfers.",
			benefits: ["Real-time processing", "24/7 availability", "Cross-border transfers", "Multiple currencies"],
		},
		{
			icon: Globe,
			title: "Global Reach",
			description: "Connect with over 180 countries and territories. Exchange currencies at competitive rates with transparent pricing.",
			benefits: ["180+ countries", "50+ currencies", "Live exchange rates", "No hidden fees"],
		},
		{
			icon: CreditCard,
			title: "Smart Cards",
			description: "Physical and virtual cards that work everywhere. Control spending with real-time notifications and instant freeze options.",
			benefits: ["Contactless payments", "Virtual card numbers", "Spending controls", "Instant notifications"],
		},
		{
			icon: BarChart3,
			title: "Financial Insights",
			description: "Understand your spending patterns with detailed analytics and personalized recommendations to help you save more.",
			benefits: ["Spending categories", "Budget tracking", "Savings goals", "Investment insights"],
		},
	];

	const additionalFeatures = [
		{
			icon: QrCode,
			title: "QR Code Payments",
			description: "Pay instantly by scanning QR codes at millions of merchants worldwide.",
		},
		{
			icon: Users,
			title: "Split Bills",
			description: "Easily split expenses with friends and family with automatic calculation and reminders.",
		},
		{
			icon: Bell,
			title: "Smart Notifications",
			description: "Stay informed with intelligent alerts about your account activity and spending.",
		},
		{
			icon: TrendingUp,
			title: "Investment Tools",
			description: "Grow your wealth with integrated investment options and portfolio management.",
		},
		{
			icon: Wallet,
			title: "Digital Wallet",
			description: "Store multiple payment methods securely and switch between them seamlessly.",
		},
		{
			icon: Lock,
			title: "Privacy Controls",
			description: "Complete control over your data with granular privacy settings and transparency.",
		},
	];

	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<section className="py-20 lg:py-32 bg-gradient-to-br from-background via-card to-background">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-4xl mx-auto text-center space-y-8">
						<Badge variant="secondary" className="w-fit mx-auto">
							Features & Capabilities
						</Badge>
						<h1 className="text-4xl lg:text-6xl font-bold text-balance">
							Everything You Need for <span className="text-primary/70">Modern Finance</span>
						</h1>
						<p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
							Discover powerful features designed to simplify your financial life. From instant transfers to advanced security, PayWallet provides all the
							tools you need to manage money with confidence.
						</p>
						<Button size="lg" asChild className="text-lg px-8">
							<Link to="/pricing">
								View Pricing Plans
								<ArrowRight className="ml-2 w-5 h-5" />
							</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Main Features */}
			<section className="py-20">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center space-y-4 mb-16">
						<h2 className="text-3xl lg:text-4xl font-bold text-balance">Core Features</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
							The essential tools that make PayWallet the preferred choice for millions of users worldwide.
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{mainFeatures.map((feature, index) => (
							<Card key={index} className="border-border/50 hover:border-secondary/50 transition-all duration-300 hover:shadow-lg">
								<CardHeader>
									<div className="w-12 h-12 bg-secondary/30 rounded-lg flex items-center justify-center mb-4">
										<feature.icon className="w-6 h-6 text-primary" />
									</div>
									<CardTitle className="text-xl">{feature.title}</CardTitle>
									<CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
								</CardHeader>
								<CardContent>
									<ul className="space-y-2">
										{feature.benefits.map((benefit, benefitIndex) => (
											<li key={benefitIndex} className="flex items-center text-sm text-muted-foreground">
												<Check className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
												{benefit}
											</li>
										))}
									</ul>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Additional Features */}
			<section className="py-20 bg-card/50">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center space-y-4 mb-16">
						<h2 className="text-3xl lg:text-4xl font-bold text-balance">Additional Features</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
							Even more ways to enhance your financial experience with PayWallet.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{additionalFeatures.map((feature, index) => (
							<Card key={index} className="border-border/50 hover:border-secondary/50 transition-colors duration-300">
								<CardHeader className="text-center">
									<div className="w-10 h-10 bg-secondary/30 rounded-lg flex items-center justify-center mx-auto mb-3">
										<feature.icon className="w-5 h-5 text-primary" />
									</div>
									<CardTitle className="text-lg">{feature.title}</CardTitle>
								</CardHeader>
								<CardContent className="text-center">
									<CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Feature Comparison */}
			<section className="py-20">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center space-y-4 mb-16">
						<h2 className="text-3xl lg:text-4xl font-bold text-balance">Why Choose PayWallet?</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
							See how we compare to traditional banking and other digital wallet solutions.
						</p>
					</div>

					<div className="max-w-4xl mx-auto">
						<Card className="border-border/50">
							<CardContent className="p-0">
								<div className="overflow-x-auto">
									<table className="w-full">
										<thead>
											<tr className="border-b border-border/50">
												<th className="text-left p-6 font-semibold">Feature</th>
												<th className="text-center p-6 font-semibold text-primary">PayWallet</th>
												<th className="text-center p-6 font-semibold text-muted-foreground">Traditional Banks</th>
												<th className="text-center p-6 font-semibold text-muted-foreground">Other Digital Wallets</th>
											</tr>
										</thead>
										<tbody>
											{[
												["Transfer Speed", "Instant", "1-3 days", "Minutes to hours"],
												["International Fees", "0.5-1%", "3-5%", "2-4%"],
												["Account Setup", "2 minutes", "Days to weeks", "5-10 minutes"],
												["24/7 Support", "✓", "Limited", "Limited"],
												["Multi-currency", "50+ currencies", "Limited", "10-20 currencies"],
												["Investment Tools", "✓", "Separate app", "Limited"],
											].map(([feature, payWallet, traditional, others], index) => (
												<tr key={index} className="border-b border-border/50 last:border-b-0">
													<td className="p-6 font-medium">{feature}</td>
													<td className="p-6 text-center text-primary font-semibold">{payWallet}</td>
													<td className="p-6 text-center text-muted-foreground">{traditional}</td>
													<td className="p-6 text-center text-muted-foreground">{others}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-foreground text-background">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<div className="max-w-3xl mx-auto space-y-8">
						<h2 className="text-3xl lg:text-4xl font-bold text-balance">Ready to Experience the Future?</h2>
						<p className="text-xl text-muted-foreground leading-relaxed">
							Join millions of users who have already made the switch to smarter, faster, and more secure digital finance.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button size="lg" variant="secondary" asChild className="text-lg px-8">
								<Link to="/pricing">
									View Pricing Plans
									<ArrowRight className="ml-2 w-5 h-5" />
								</Link>
							</Button>
							<Button
								variant="outline"
								size="lg"
								asChild
								className="text-lg px-8 border-background text-background hover:bg-background hover:text-foreground bg-transparent"
							>
								<Link to="/contact">Contact Sales</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
