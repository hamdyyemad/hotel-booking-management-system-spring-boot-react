import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Users,
  Bed,
  Clock,
  Star,
  Wifi,
  Car,
  Snowflake,
  Coffee,
} from "lucide-react";
import RoomResult from "../common/RoomResult";
import RoomSearch from "../common/RoomSearch";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Room } from "../../types";

const HomePage: React.FC = () => {
  const [roomSearchResults, setRoomSearchResults] = useState<Room[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleSearchResult = (results: Room[]) => {
    setRoomSearchResults(results);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      icon: <Snowflake className="h-8 w-8 text-blue-500" />,
      title: "Air Conditioning",
      description:
        "Stay cool and comfortable throughout your stay with our individually controlled in-room air conditioning.",
    },
    {
      icon: <Coffee className="h-8 w-8 text-orange-500" />,
      title: "Mini Bar",
      description:
        "Enjoy a convenient selection of beverages and snacks stocked in your room's mini bar with no additional cost.",
    },
    {
      icon: <Car className="h-8 w-8 text-green-500" />,
      title: "Parking",
      description:
        "We offer on-site parking for your convenience. Please inquire about valet parking options if available.",
    },
    {
      icon: <Wifi className="h-8 w-8 text-purple-500" />,
      title: "WiFi",
      description:
        "Stay connected throughout your stay with complimentary high-speed Wi-Fi access available in all guest rooms and public areas.",
    },
  ];

  const stats = [
    {
      number: "500+",
      label: "Happy Guests",
      icon: <Users className="h-6 w-6" />,
    },
    { number: "50+", label: "Luxury Rooms", icon: <Bed className="h-6 w-6" /> },
    { number: "24/7", label: "Support", icon: <Clock className="h-6 w-6" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section
        className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
          isVisible ? "animate-fade-in-up" : ""
        }`}
      >
        {/* Enhanced Background Layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-indigo-800/85 to-purple-900/90 z-10"></div>

        {/* Animated Background Pattern */}
        <div className="absolute inset-0 z-5">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 z-5 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
          <div
            className="absolute top-40 right-20 w-24 h-24 bg-blue-400/20 rounded-full blur-lg animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-32 left-1/4 w-40 h-40 bg-indigo-400/15 rounded-full blur-2xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-20 right-1/3 w-28 h-28 bg-purple-400/20 rounded-full blur-lg animate-float"
            style={{ animationDelay: "0.5s" }}
          ></div>

          {/* Additional floating elements */}
          <div
            className="absolute top-1/3 left-1/6 w-16 h-16 bg-yellow-400/15 rounded-full blur-md animate-float"
            style={{ animationDelay: "1.5s" }}
          ></div>
          <div
            className="absolute bottom-1/3 right-1/6 w-20 h-20 bg-pink-400/10 rounded-full blur-lg animate-float"
            style={{ animationDelay: "0.8s" }}
          ></div>
        </div>

        {/* Background Pattern Overlay */}
        <div className="absolute inset-0 z-5 bg-pattern-dots opacity-20"></div>

        {/* Main Background Image with Enhanced Styling */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
          style={{
            backgroundImage: "url('/assets/images/hotel.webp')",
            filter: "brightness(0.7) contrast(1.1) saturate(1.2)",
          }}
        ></div>

        {/* Additional Gradient Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30 z-15"></div>

        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up drop-shadow-2xl">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
              Hotel System
            </span>
          </h1>
          <p
            className="text-xl md:text-2xl mb-8 text-blue-100 animate-fade-in-up drop-shadow-lg"
            style={{ animationDelay: "0.2s" }}
          >
            Step into a haven of comfort and care
          </p>
          <p
            className="text-lg mb-12 text-blue-200 max-w-2xl mx-auto animate-fade-in-up drop-shadow-md"
            style={{ animationDelay: "0.4s" }}
          >
            Experience luxury, comfort, and exceptional service in the heart of
            the city
          </p>

          {/* Stats */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="bg-white/15 backdrop-blur-md border-white/30 text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-3 text-yellow-400 drop-shadow-lg">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold mb-2 drop-shadow-md">
                    {stat.number}
                  </div>
                  <div className="text-sm opacity-90 drop-shadow-sm">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <RoomSearch handleSearchResult={handleSearchResult} />
          <RoomResult roomSearchResults={roomSearchResults} />
        </div>
      </section>

      {/* View All Rooms Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Explore All Rooms
              </h2>
              <p className="text-gray-600 mb-6">
                Discover our complete collection of luxurious accommodations
                designed for your comfort
              </p>
              <Button size="lg" className="group" asChild>
                <a href="/rooms" className="inline-flex items-center gap-2">
                  View All Rooms
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Services at{" "}
              <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                Hotel
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide everything you need for a comfortable and memorable
              stay
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-800">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                Experience Luxury{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Redefined
                </span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                From our elegant rooms to world-class amenities, every detail is
                crafted to provide you with an unforgettable experience. Book
                your stay today and discover why Hotel is the preferred choice
                for discerning travelers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  asChild
                >
                  <a href="/rooms">Book Now</a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-black hover:bg-white hover:text-gray-900"
                  asChild
                >
                  <a href="/contact">Contact Us</a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/assets/images/parrall.jpg"
                  alt="Luxury Hotel Experience"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="font-semibold">5.0</span>
                  <span className="text-gray-600">(2,500+ reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
