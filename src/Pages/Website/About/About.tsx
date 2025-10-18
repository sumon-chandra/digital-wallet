import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Heart, Users, Award, Linkedin, Twitter, Github, ArrowRight, User } from "lucide-react";
import { Link } from "react-router-dom";
import aboutBanner from "@/assets/about-banner.png";

export default function AboutPage() {
	const teamMembers = [
		{
			name: "Sarah Chen",
			role: "CEO & Co-Founder",
			bio: "Former VP of Product at Stripe. 10+ years in fintech, passionate about financial inclusion.",
			image: "/professional-woman-ceo-fintech.jpg",
			linkedin: "#",
			twitter: "#",
		},
		{
			name: "Marcus Rodriguez",
			role: "CTO & Co-Founder",
			bio: "Ex-Google engineer specializing in distributed systems and blockchain technology.",
			image: "/professional-man-cto-tech.jpg",
			linkedin: "#",
			github: "#",
		},
		{
			name: "Emily Watson",
			role: "Head of Security",
			bio: "Cybersecurity expert with 8 years at major banks, ensuring your funds stay safe.",
			image: "/professional-woman-security-expert.jpg",
			linkedin: "#",
			twitter: "#",
		},
		{
			name: "David Kim",
			role: "Head of Design",
			bio: "Award-winning UX designer focused on making complex financial tools simple and accessible.",
			image: "/professional-man-designer-ux.jpg",
			linkedin: "#",
			twitter: "#",
		},
	];

	const values = [
		{
			icon: Target,
			title: "Innovation First",
			description: "We constantly push the boundaries of what's possible in digital finance, bringing you the latest technology and features.",
		},
		{
			icon: Heart,
			title: "Customer Obsessed",
			description: "Every decision we make starts with our users. Your success and satisfaction drive everything we do.",
		},
		{
			icon: Users,
			title: "Financial Inclusion",
			description: "We believe everyone deserves access to modern financial tools, regardless of their background or location.",
		},
		{
			icon: Award,
			title: "Trust & Transparency",
			description: "We maintain the highest standards of security and are transparent about our practices and policies.",
		},
	];

	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<section className="py-20 lg:py-32 bg-gradient-to-br from-background via-card to-background">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-4xl mx-auto text-center space-y-8">
						<Badge variant="secondary" className="w-fit mx-auto">
							About PayWallet
						</Badge>
						<h1 className="text-4xl lg:text-6xl font-bold text-balance">
							Building the Future of <span className="text-primary/70">Digital Finance</span>
						</h1>
						<p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
							Founded in 2020, PayWallet has grown from a simple idea to a global platform trusted by millions. We're on a mission to make financial services
							accessible, secure, and delightful for everyone.
						</p>
					</div>
				</div>
			</section>

			{/* Story Section */}
			<section className="py-20">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
						<div className="space-y-6">
							<h2 className="text-3xl lg:text-4xl font-bold text-balance">Our Story</h2>
							<div className="space-y-4 text-muted-foreground leading-relaxed">
								<p>
									PayWallet was born from a simple frustration: sending money to family abroad shouldn't cost a fortune or take days to complete. Our founders,
									Sarah and Marcus, experienced this firsthand when trying to support family members during the 2020 pandemic.
								</p>
								<p>
									What started as a weekend project quickly evolved into something much bigger. We realized that millions of people worldwide were facing the
									same challenges with traditional banking systems - high fees, slow transfers, and limited access to modern financial tools.
								</p>
								<p>
									Today, PayWallet serves over 2 million users across 180 countries, processing billions in transactions while maintaining our core mission:
									making financial services work for everyone, not just the privileged few.
								</p>
							</div>
							<Button asChild>
								<Link to="/contact">
									Join Our Mission
									<ArrowRight className="ml-2 w-4 h-4" />
								</Link>
							</Button>
						</div>
						<div className="relative">
							<img src={aboutBanner} alt="PayWallet team working together" />
							<div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-lg"></div>
						</div>
					</div>
				</div>
			</section>

			{/* Mission & Vision */}
			<section className="py-20 bg-card/50">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
						<Card className="border-border/50">
							<CardHeader>
								<CardTitle className="text-2xl">Our Mission</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-base leading-relaxed text-foreground">
									To democratize access to financial services by building secure, fast, and affordable digital payment solutions that work for everyone,
									everywhere. We believe that geography, income, or background should never be barriers to financial empowerment.
								</CardDescription>
							</CardContent>
						</Card>

						<Card className="border-border/50">
							<CardHeader>
								<CardTitle className="text-2xl">Our Vision</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-base leading-relaxed text-foreground">
									A world where financial transactions are as simple as sending a text message, where anyone can participate in the global economy, and where
									financial inclusion is not a privilege but a fundamental right for all people.
								</CardDescription>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Values */}
			<section className="py-20">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center space-y-4 mb-16">
						<h2 className="text-3xl lg:text-4xl font-bold text-balance">Our Values</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
							These principles guide every decision we make and every feature we build.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{values.map((value, index) => (
							<Card key={index} className="border-border/50 hover:border-primary/70 transition-colors duration-300">
								<CardHeader>
									<div className="w-12 h-12 bg-secondary/30 rounded-lg flex items-center justify-center mb-4">
										<value.icon className="w-6 h-6 text-primary" />
									</div>
									<CardTitle className="text-xl">{value.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<CardDescription className="text-base leading-relaxed text-foreground">{value.description}</CardDescription>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section className="py-20 bg-card/50">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center space-y-4 mb-16">
						<h2 className="text-3xl lg:text-4xl font-bold text-balance">Meet Our Team</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
							The passionate individuals behind PayWallet, working tirelessly to revolutionize digital finance.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{teamMembers.map((member, index) => (
							<Card key={index} className="border-border/50 hover:border-primary/70 transition-colors duration-300">
								<CardHeader className="text-center">
									<div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
										{/* <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-full object-cover" /> */}
										<User className="w-full h-full text-primary" />
									</div>
									<CardTitle className="text-lg">{member.name}</CardTitle>
									<CardDescription className="text-primary font-medium">{member.role}</CardDescription>
								</CardHeader>
								<CardContent className="text-center space-y-4">
									<p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
									<div className="flex justify-center space-x-3">
										{member.linkedin && (
											<Link to={member.linkedin} className="text-muted-foreground hover:text-primary transition-colors">
												<Linkedin className="w-4 h-4" />
											</Link>
										)}
										{member.twitter && (
											<Link to={member.twitter} className="text-muted-foreground hover:text-primary transition-colors">
												<Twitter className="w-4 h-4" />
											</Link>
										)}
										{member.github && (
											<Link to={member.github} className="text-muted-foreground hover:text-primary transition-colors">
												<Github className="w-4 h-4" />
											</Link>
										)}
									</div>
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
						<h2 className="text-3xl lg:text-4xl font-bold text-balance">Want to Join Our Mission?</h2>
						<p className="text-xl text-muted-foreground leading-relaxed">
							We're always looking for talented individuals who share our passion for financial innovation and inclusion.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button size="lg" variant="secondary" asChild className="text-lg px-8">
								<Link to="/careers">
									View Open Positions
									<ArrowRight className="ml-2 w-5 h-5" />
								</Link>
							</Button>
							<Button
								variant="outline"
								size="lg"
								asChild
								className="text-lg px-8 border-background text-background hover:bg-background hover:text-foreground bg-transparent"
							>
								<Link to="/contact">Get in Touch</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
