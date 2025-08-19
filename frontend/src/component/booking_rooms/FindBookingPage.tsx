import React, { useState } from "react";
import { Search, User, Building } from "lucide-react";
import ApiService from "../../service/ApiService";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Booking } from "../../types";

const FindBookingPage: React.FC = () => {
  const [bookingId, setBookingId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bookingId && !email) {
      setError("Please enter either a booking ID or email address.");
      return;
    }

    setIsLoading(true);
    setError("");
    setBooking(null);

    try {
      const response = await ApiService.findBooking(bookingId, email);
      if (response.statusCode === 200) {
        setBooking(response.data);
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Booking not found. Please check your details."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Find Your Booking
          </h1>
          <p className="text-lg text-gray-600">
            Enter your booking ID or email address to find your reservation
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search for Booking
            </CardTitle>
            <CardDescription>
              Provide either your booking ID or the email address used for
              booking
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bookingId">Booking ID</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="bookingId"
                    type="text"
                    placeholder="Enter your booking ID"
                    value={bookingId}
                    onChange={(e) => setBookingId(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Searching..." : "Find Booking"}
              </Button>
            </form>

            {booking && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
                <h3 className="font-semibold text-green-800 mb-2">
                  Booking Found!
                </h3>
                <div className="space-y-2 text-sm text-green-700">
                  <p>
                    <strong>Booking ID:</strong> {booking.id}
                  </p>
                  <p>
                    <strong>Room:</strong> {booking.roomName}
                  </p>
                  <p>
                    <strong>Check-in:</strong>{" "}
                    {new Date(booking.checkInDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Check-out:</strong>{" "}
                    {new Date(booking.checkOutDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Status:</strong> {booking.status}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FindBookingPage;
