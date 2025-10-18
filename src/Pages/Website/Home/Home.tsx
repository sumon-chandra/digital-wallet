import Navbar from "@/layout/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, CreditCard, Globe, Shield, Smartphone, Star, TrendingUp, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import banner from "@/assets/banner.png";

const Home = () => {
	return (
		<div className="bg-background text-foreground min-h-screen">
			<Navbar />

			{/* Hero Section */}
			<section className="relative overflow-hidden bg-gradient-to-br from-background via-card to-background">
				<div className="absolute inset-0 bg-[url('/images/hero-pattern.png')] opacity-5"></div>
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<div className="space-y-8">
							<div className="space-y-4">
								<Badge variant="secondary" className="w-fit">
									🚀 New: Instant transfers now available
								</Badge>
								<h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
									Your Digital Wallet for the <span className="text-primary/70">Future</span>
								</h1>
								<p className="text-xl text-muted-foreground leading-relaxed">
									Experience seamless, secure, and lightning-fast digital payments. Join millions who trust PayWallet for their everyday transactions.
								</p>
							</div>

							<div className="flex flex-col sm:flex-row gap-4">
								<Button size="lg" asChild className="text-lg px-8">
									<Link to="/signup">
										Get Started Free
										<ArrowRight className="ml-2 w-5 h-5" />
									</Link>
								</Button>
								<Button variant="outline" size="lg" asChild className="text-lg px-8 bg-transparent">
									<Link to="/features">Learn More</Link>
								</Button>
							</div>

							<div className="flex items-center space-x-8 pt-4">
								<div className="flex items-center space-x-2">
									<div className="flex -space-x-2">
										{[1, 2, 3, 4].map((i) => (
											<div
												key={i}
												className="w-8 h-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-xs font-semibold text-secondary-foreground"
											>
												{i}
											</div>
										))}
									</div>
									<span className="text-sm text-muted-foreground">2M+ users</span>
								</div>
								<div className="flex items-center space-x-1">
									{[1, 2, 3, 4, 5].map((i) => (
										<Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
									))}
									<span className="text-sm text-muted-foreground ml-2">4.9/5 rating</span>
								</div>
							</div>
						</div>

						<div className="relative">
							<img src={banner} alt="Banner Image" />
						</div>
					</div>
				</div>
			</section>

			{/* Features Overview */}
			<section className="py-20 bg-card/50">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center space-y-4 mb-16">
						<h2 className="text-3xl lg:text-4xl font-bold text-balance">Why Choose PayWallet?</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
							Built with cutting-edge technology and designed for everyone, from individuals to businesses.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[
							{
								icon: Shield,
								title: "Bank-Level Security",
								description: "256-bit encryption and multi-factor authentication keep your money safe.",
							},
							{
								icon: Zap,
								title: "Instant Transfers",
								description: "Send money anywhere in the world in seconds, not days.",
							},
							{
								icon: Globe,
								title: "Global Access",
								description: "Use your wallet in 180+ countries with real-time currency conversion.",
							},
							{
								icon: CreditCard,
								title: "Multiple Payment Methods",
								description: "Link cards, bank accounts, and crypto wallets in one place.",
							},
							{
								icon: Smartphone,
								title: "Mobile First",
								description: "Designed for mobile with offline capabilities and biometric security.",
							},
							{
								icon: TrendingUp,
								title: "Smart Analytics",
								description: "Track spending, set budgets, and get insights into your financial habits.",
							},
						].map((feature, index) => (
							<Card key={index} className="border-border/50 hover:border-secondary/50 transition-colors duration-300">
								<CardHeader>
									<div className="w-12 h-12 bg-secondary/30 rounded-lg flex items-center justify-center mb-4">
										<feature.icon className="w-6 h-6 text-primary" />
									</div>
									<CardTitle className="text-xl">{feature.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="py-20">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
						{[
							{ number: "2M+", label: "Active Users" },
							{ number: "$50B+", label: "Transactions Processed" },
							{ number: "180+", label: "Countries Supported" },
							{ number: "99.9%", label: "Uptime Guarantee" },
						].map((stat, index) => (
							<div key={index} className="text-center space-y-2">
								<div className="text-3xl lg:text-4xl font-bold text-primary">{stat.number}</div>
								<div className="text-muted-foreground">{stat.label}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-foreground text-background">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<div className="max-w-3xl mx-auto space-y-8">
						<h2 className="text-3xl lg:text-4xl font-bold text-balance">Ready to Transform Your Financial Life?</h2>
						<p className="text-xl text-muted-foreground leading-relaxed">
							Join millions of users who have already made the switch to PayWallet. Get started in less than 2 minutes.
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
								<Link to="/contact">Talk to Sales</Link>
							</Button>
						</div>
						<div className="flex items-center justify-center space-x-6 pt-4">
							<div className="flex items-center space-x-2">
								<CheckCircle className="w-5 h-5 text-secondary" />
								<span className="text-sm">No setup fees</span>
							</div>
							<div className="flex items-center space-x-2">
								<CheckCircle className="w-5 h-5 text-secondary" />
								<span className="text-sm">Cancel anytime</span>
							</div>
							<div className="flex items-center space-x-2">
								<CheckCircle className="w-5 h-5 text-secondary" />
								<span className="text-sm">24/7 support</span>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Home;
