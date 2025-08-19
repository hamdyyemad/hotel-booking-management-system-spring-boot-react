import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar, User, Building, Save, ArrowLeft } from "lucide-react";
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

interface EditBookingFormData {
  checkInDate: string;
  checkOutDate: string;
  status: string;
}

const EditBookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [formData, setFormData] = useState<EditBookingFormData>({
    checkInDate: "",
    checkOutDate: "",
    status: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate();

  const fetchBooking = useCallback(async () => {
    try {
      const response = await ApiService.getBookingById(id!);
      if (response.statusCode === 200) {
        const bookingData = response.data;
        setBooking(bookingData);
        setFormData({
          checkInDate: bookingData.checkInDate.split("T")[0],
          checkOutDate: bookingData.checkOutDate.split("T")[0],
          status: bookingData.status,
        });
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to load booking"
      );
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "ADMIN") {
      navigate("/login");
      return;
    }

    if (id) {
      fetchBooking();
    }
  }, [id, navigate, fetchBooking]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.checkInDate || !formData.checkOutDate || !formData.status) {
      setError("Please fill in all fields.");
      return;
    }

    if (new Date(formData.checkInDate) >= new Date(formData.checkOutDate)) {
      setError("Check-out date must be after check-in date.");
      return;
    }

    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await ApiService.updateBooking(id!, formData);
      if (response.statusCode === 200) {
        setSuccess("Booking updated successfully!");
        setTimeout(() => {
          navigate("/admin/manage-bookings");
        }, 2000);
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to update booking"
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading booking...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-10 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-red-600 mb-4">Booking not found.</p>
              <Button onClick={() => navigate("/admin/manage-bookings")}>
                Back to Bookings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/manage-bookings")}
            className="mb-4 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Bookings
          </Button>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Edit Booking #{booking.id}
          </h1>
          <p className="text-lg text-gray-600">
            Update booking details and status
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Information */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-500">
                  Guest Name
                </Label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-900">{booking.userName}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-500">
                  Guest Email
                </Label>
                <div className="p-3 bg-gray-50 rounded-md">
                  <span className="text-gray-900">{booking.userEmail}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-500">
                  Room
                </Label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                  <Building className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-900">{booking.roomName}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-500">
                  Total Price
                </Label>
                <div className="p-3 bg-gray-50 rounded-md">
                  <span className="text-gray-900 font-semibold">
                    ${booking.totalPrice}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-500">
                  Created Date
                </Label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-900">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Edit Form */}
          <Card>
            <CardHeader>
              <CardTitle>Edit Booking Details</CardTitle>
              <CardDescription>
                Update the booking dates and status
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
                    {success}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="checkInDate">Check-in Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="checkInDate"
                      name="checkInDate"
                      type="date"
                      value={formData.checkInDate}
                      onChange={handleInputChange}
                      className="pl-10"
                      disabled={isSaving}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="checkOutDate">Check-out Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="checkOutDate"
                      name="checkOutDate"
                      type="date"
                      value={formData.checkOutDate}
                      onChange={handleInputChange}
                      className="pl-10"
                      disabled={isSaving}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isSaving}
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="flex items-center gap-2"
                    disabled={isSaving}
                  >
                    <Save className="h-4 w-4" />
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/admin/manage-bookings")}
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditBookingPage;
