import { Link } from "react-router-dom";
import logo from "/public/logo.png";

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-background border-t border-border">
			<div className="mx-auto container space-y-8 px-4 py-16">
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
					<div>
						<div className="text-foreground">
							<img src={logo} alt="logo" className="size-20 " />
							<h2 className="text-2xl font-bold">
								{/* Text with gradient animation */}
								<span className="hidden sm:inline-block bg-gradient-to-r from-primary to-primary/90 bg-clip-text text-transparent">PayWallet</span>
							</h2>
						</div>

						<p className="mt-4 max-w-xs text-muted-foreground">Manage your PayWallet effortlessly with a modern, secure, and intuitive experience.</p>
					</div>

					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
						<div>
							<p className="font-medium text-foreground">Features</p>
							<ul className="mt-6 space-y-4 text-sm">
								<li>
									<a href="#" className="text-muted-foreground transition hover:text-primary">
										Wallet Management
									</a>
								</li>
								<li>
									<a href="#" className="text-muted-foreground transition hover:text-primary">
										Transaction History
									</a>
								</li>
								<li>
									<a href="#" className="text-muted-foreground transition hover:text-primary">
										Money Transfer
									</a>
								</li>
								<li>
									<a href="#" className="text-muted-foreground transition hover:text-primary">
										Role-Based Dashboard
									</a>
								</li>
								<li>
									<a href="#" className="text-muted-foreground transition hover:text-primary">
										Secure Authentication
									</a>
								</li>
							</ul>
						</div>

						<div>
							<p className="font-medium text-foreground">Quick Links</p>
							<ul className="mt-6 space-y-4 text-sm">
								<li>
									<Link to="/about" className="text-muted-foreground transition hover:text-primary">
										About
									</Link>
								</li>
								<li>
									<Link to="/feature" className="text-muted-foreground transition hover:text-primary">
										Feature
									</Link>
								</li>
								<li>
									<Link to="/pricing" className="text-muted-foreground transition hover:text-primary">
										Pricing
									</Link>
								</li>
								<li>
									<Link to="/faq" className="text-muted-foreground transition hover:text-primary">
										FAQ
									</Link>
								</li>
								<li>
									<Link to="/contact" className="text-muted-foreground transition hover:text-primary">
										Contack
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<p className="font-medium text-foreground">Contact</p>
							<ul className="mt-6 space-y-4 text-sm">
								<li>
									<a href="mailto:arman.miaa36@gmail.com" className="text-muted-foreground transition hover:text-primary">
										Email
									</a>
								</li>
								<li>
									<a
										href="https://www.linkedin.com/in/arman-miaa"
										className="text-muted-foreground transition hover:text-primary"
										target="_blank"
										rel="noreferrer"
									>
										LinkedIn
									</a>
								</li>
								<li>
									<a
										href="https://www.facebook.com/arman2mia"
										className="text-muted-foreground transition hover:text-primary"
										target="_blank"
										rel="noreferrer"
									>
										Facebook
									</a>
								</li>
								<li>
									<a href="tel:+8801736550601" className="text-muted-foreground transition hover:text-primary">
										WhatsApp: +8801736550601
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="pt-8 mt-8 border-t border-border">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<p className="text-sm text-muted-foreground">&copy; {currentYear} PayWallet Management System. All rights reserved.</p>
						<div className="flex mt-4 md:mt-0 space-x-6">
							<a href="#" className="text-sm text-muted-foreground transition hover:text-primary">
								Terms
							</a>
							<a href="#" className="text-sm text-muted-foreground transition hover:text-primary">
								Privacy
							</a>
							<a href="#" className="text-sm text-muted-foreground transition hover:text-primary">
								Cookies
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
