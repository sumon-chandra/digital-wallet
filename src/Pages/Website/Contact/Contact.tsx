import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, MessageSquare, Users, Building, ArrowRight } from "lucide-react";

export default function ContactPage() {
	const contactMethods = [
		{
			icon: Mail,
			title: "Email Support",
			description: "Get help via email within 24 hours",
			contact: "support@paywallet.com",
			availability: "24/7",
		},
		{
			icon: Phone,
			title: "Phone Support",
			description: "Speak directly with our support team",
			contact: "+1 (555) 123-4567",
			availability: "Mon-Fri, 9AM-6PM EST",
		},
		{
			icon: MessageSquare,
			title: "Live Chat",
			description: "Instant help through our chat system",
			contact: "Available in app",
			availability: "24/7",
		},
		{
			icon: MapPin,
			title: "Office Location",
			description: "Visit our headquarters",
			contact: "123 Financial District, NY 10004",
			availability: "Mon-Fri, 9AM-5PM EST",
		},
	];

	const departments = [
		{
			icon: Users,
			title: "General Support",
			description: "Account help, technical issues, and general questions",
		},
		{
			icon: Building,
			title: "Business Sales",
			description: "Enterprise solutions and business account inquiries",
		},
		{
			icon: MessageSquare,
			title: "Partnership",
			description: "Integration partnerships and business development",
		},
	];

	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<section className="py-20 lg:py-32 bg-gradient-to-br from-background via-card to-background">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-4xl mx-auto text-center space-y-8">
						<Badge variant="secondary" className="w-fit mx-auto">
							Get in Touch
						</Badge>
						<h1 className="text-4xl lg:text-6xl font-bold text-balance">
							We're Here to <span className="text-primary/70">Help</span>
						</h1>
						<p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
							Have questions about PayWallet? Need support with your account? Our team is ready to assist you with any inquiries or concerns you may have.
						</p>
					</div>
				</div>
			</section>

			{/* Contact Methods */}
			<section className="py-20">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center space-y-4 mb-16">
						<h2 className="text-3xl lg:text-4xl font-bold text-balance">How to Reach Us</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
							Choose the method that works best for you. We're available through multiple channels.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{contactMethods.map((method, index) => (
							<Card key={index} className="border-border/50 hover:border-secondary/50 transition-colors duration-300 text-center">
								<CardHeader>
									<div className="w-12 h-12 bg-secondary/30 rounded-lg flex items-center justify-center mx-auto mb-4">
										<method.icon className="w-6 h-6 text-primary" />
									</div>
									<CardTitle className="text-lg">{method.title}</CardTitle>
									<CardDescription>{method.description}</CardDescription>
								</CardHeader>
								<CardContent className="space-y-2">
									<p className="font-semibold text-sm">{method.contact}</p>
									<div className="flex items-center justify-center text-xs text-muted-foreground">
										<Clock className="w-3 h-3 mr-1" />
										{method.availability}
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Contact Form */}
			<section className="py-20 bg-card/50">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-4xl mx-auto">
						<div className="text-center space-y-4 mb-12">
							<h2 className="text-3xl lg:text-4xl font-bold text-balance">Send Us a Message</h2>
							<p className="text-xl text-muted-foreground leading-relaxed">Fill out the form below and we'll get back to you as soon as possible.</p>
						</div>

						<Card className="border-border/50">
							<CardContent className="p-8">
								<form className="space-y-6">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div className="space-y-2">
											<Label htmlFor="firstName">First Name</Label>
											<Input id="firstName" placeholder="Enter your first name" />
										</div>
										<div className="space-y-2">
											<Label htmlFor="lastName">Last Name</Label>
											<Input id="lastName" placeholder="Enter your last name" />
										</div>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div className="space-y-2">
											<Label htmlFor="email">Email Address</Label>
											<Input id="email" type="email" placeholder="Enter your email" />
										</div>
										<div className="space-y-2">
											<Label htmlFor="phone">Phone Number (Optional)</Label>
											<Input id="phone" type="tel" placeholder="Enter your phone number" />
										</div>
									</div>

									<div className="space-y-2">
										<Label htmlFor="department">Department</Label>
										<Select>
											<SelectTrigger>
												<SelectValue placeholder="Select a department" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="support">General Support</SelectItem>
												<SelectItem value="sales">Business Sales</SelectItem>
												<SelectItem value="partnership">Partnership</SelectItem>
												<SelectItem value="technical">Technical Issues</SelectItem>
												<SelectItem value="billing">Billing & Payments</SelectItem>
												<SelectItem value="other">Other</SelectItem>
											</SelectContent>
										</Select>
									</div>

									<div className="space-y-2">
										<Label htmlFor="subject">Subject</Label>
										<Input id="subject" placeholder="Brief description of your inquiry" />
									</div>

									<div className="space-y-2">
										<Label htmlFor="message">Message</Label>
										<Textarea id="message" placeholder="Please provide details about your inquiry or issue..." className="min-h-[120px]" />
									</div>

									<Button size="lg" className="w-full">
										Send Message
										<ArrowRight className="ml-2 w-4 h-4" />
									</Button>

									<p className="text-xs text-muted-foreground text-center">By submitting this form, you agree to our privacy policy and terms of service.</p>
								</form>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Departments */}
			<section className="py-20">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center space-y-4 mb-16">
						<h2 className="text-3xl lg:text-4xl font-bold text-balance">Specialized Support</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
							Get targeted help from our specialized teams based on your specific needs.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{departments.map((dept, index) => (
							<Card key={index} className="border-border/50 hover:border-secondary/50 transition-colors duration-300">
								<CardHeader className="text-center">
									<div className="w-12 h-12 bg-secondary/30 rounded-lg flex items-center justify-center mx-auto mb-4">
										<dept.icon className="w-6 h-6 text-primary" />
									</div>
									<CardTitle className="text-xl">{dept.title}</CardTitle>
								</CardHeader>
								<CardContent className="text-center">
									<CardDescription className="text-base leading-relaxed">{dept.description}</CardDescription>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Office Info */}
			<section className="py-20 bg-card/50">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-4xl mx-auto">
						<Card className="border-border/50">
							<CardContent className="p-8">
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
									<div className="space-y-6">
										<div>
											<h3 className="text-2xl font-bold mb-2">Visit Our Office</h3>
											<p className="text-muted-foreground leading-relaxed">
												Located in the heart of New York's Financial District, our office is open for in-person meetings and consultations.
											</p>
										</div>

										<div className="space-y-4">
											<div className="flex items-start space-x-3">
												<MapPin className="w-5 h-5 text-primary mt-0.5" />
												<div>
													<p className="font-semibold">Address</p>
													<p className="text-muted-foreground">
														123 Financial District
														<br />
														New York, NY 10004
													</p>
												</div>
											</div>

											<div className="flex items-start space-x-3">
												<Clock className="w-5 h-5 text-primary mt-0.5" />
												<div>
													<p className="font-semibold">Office Hours</p>
													<p className="text-muted-foreground">
														Monday - Friday: 9:00 AM - 5:00 PM EST
														<br />
														Weekend: By appointment only
													</p>
												</div>
											</div>
										</div>

										<Button asChild>
											<a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
												Get Directions
												<ArrowRight className="ml-2 w-4 h-4" />
											</a>
										</Button>
									</div>

									<div className="bg-muted/20 rounded-lg p-6 text-center">
										<div className="w-full h-48 bg-muted/40 rounded-lg flex items-center justify-center">
											<MapPin className="w-12 h-12 text-muted-foreground" />
										</div>
										<p className="text-sm text-muted-foreground mt-4">Interactive map coming soon</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
		</div>
	);
}
