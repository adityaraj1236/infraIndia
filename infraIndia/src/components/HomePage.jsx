import { Button } from "@mantine/core";
import Navbar from "./Navbar/Navbar";
import { Link } from "react-router-dom";
import { MapPin, BrainCircuit, PackageSearch, BarChart3, ClipboardList, ShieldCheck, Layers, Bell, DollarSign , ShieldCheckIcon } from "lucide-react";
import { FooterLinks } from "./footer/FooterLinks";

// Challenges List (can come from API in future)
const challenges = [
    "Missing real-time project updates.",
    "Fake attendance & ghost workers inflating costs.",
    "Material wastage & untracked inventory.",
    "Delayed payments, lost bills & no financial transparency.",
    "Projects running over budget with no warnings."
];

// Feature List
const features = [
    { icon: PackageSearch, title: "Real-Time Material Tracking", description: "Monitor material flow & avoid wastage." },
    { icon: BarChart3, title: "Finance Manager Dashboard", description: "Track project expenses, payments & cash flow." },
    { icon: ClipboardList, title: "Automated Progress Reports", description: "Daily site progress reports with visual proof." },
    { icon: ShieldCheckIcon, title: "Role-Based Access Controls", description: "Secure data with role-specific permissions." },
    { icon: Layers, title: "Multi-Project Monitoring", description: "Manage multiple projects from a single dashboard." },
    { icon: Bell, title: "WhatsApp Alerts", description: "Instant alerts & updates directly on WhatsApp." },
    { icon: DollarSign, title: "Vendor & Subcontractor Payments", description: "Simplified, transparent payment processes." },
    { icon: ClipboardList, title: "Vendor Bidding Platform", description: "Enable competitive bidding for materials and contracts to reduce procurement costs." },
    { icon: BrainCircuit, title: "Robotics in Construction", description: "Integrate robotics for automation in repetitive and hazardous construction tasks." },
    { icon: MapPin, title: "Geo-Tagged Attendance", description: "Track worker attendance with precise location data." },
    { icon: BrainCircuit, title: "AI Photo Analysis", description: "Smart image analysis for project progress tracking." },
];


const HomePage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero Section */}
            <section className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-12 gap-10">
                {/* Left - Image */}
                <div className="w-full md:w-1/2">
                    <img 
                        src="https://images.pexels.com/photos/14364849/pexels-photo-14364849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                        alt="Construction Hero" 
                        className="w-full rounded-lg shadow-lg object-cover loading-lazy"
                    />
                </div>

                {/* Right - Content */}
                <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
                    <h1 className="text-4xl font-bold text-gray-800 leading-tight">
                        Empowering Construction Projects Across India with Smart Technology
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Real-time Tracking, AI-Powered Insights & Total Financial Control – 
                        All in One Construction Management Platform.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col md:flex-row md:justify-start gap-4 mt-6">
                        <Link to="/login" className="w-full md:w-auto">
                            <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium">
                                Start Free Trial
                            </Button>
                        </Link>
                        <a 
  href="https://calendly.com/xpanshilglobal/"  // Replace with your actual Calendly link
  target="_blank" 
  rel="noopener noreferrer"
>
  <Button 
    variant="outline" 
    className="w-full md:w-auto border-blue-600 text-blue-600 hover:bg-blue-50 font-medium"
  >
    Schedule Demo
  </Button>
</a>

                    </div>
                </div>
            </section>

            {/* Problem Statement Section */}
            <section className="max-w-7xl mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold text-gray-800 leading-tight text-center md:text-left mb-8">
                    Indian Construction Faces Unique Challenges. Are You Ready to Solve Them?
                </h2>

                {/* Problem List & CTA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div className="space-y-4 text-gray-700">
                        {challenges.map((challenge, index) => (
                            <p key={index} className="flex items-center space-x-2">
                                <span>✅</span>
                                <span>{challenge}</span>
                            </p>
                        ))}
                    </div>

                    {/* CTA Block */}
                    <div className="flex flex-col items-start space-y-4 bg-blue-50 p-6 rounded-lg shadow">
                        <p className="text-lg font-medium text-gray-800">
                            Switch to <span className="font-bold">InfraIndia</span> & Manage Everything from a Single App.
                        </p>
                        <Link to="/signup" className="w-full md:w-auto">
                            <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium">
                                Get Started Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Section 3 - Features Overview */}
            <section className="max-w-7xl mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold text-gray-800 leading-tight text-center mb-8">
                    Powerful Features to Simplify Construction Management
                </h2>

                {/* 3x3 Grid of Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center space-y-4">
                            <feature.icon className="w-12 h-12 text-blue-600" />
                            <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Book a Demo Section */}
<section className="bg-blue-50 py-12 px-6">
  <div className="max-w-4xl mx-auto text-center space-y-6">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
      Ready to Experience It Live?
    </h2>
    <p className="text-lg text-gray-600">
      Schedule a free demo with our experts and see how InfraIndia can transform your construction project management.
    </p>
    <a 
      href="https://calendly.com/xpanshilglobal"  // Replace with your actual link
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium px-6 py-3 rounded-xl transition"
    >
      Book Your Demo
    </a>
  </div>
</section>

            <FooterLinks/>
        </div>
    );
};

export default HomePage;
