import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Edit,
  LogOut,
  Shield,
  Building,
  Search,
  Settings,
  CreditCard,
  Bell,
  BarChart3,
} from "lucide-react";
import ApiService from "../../service/ApiService";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  createdAt: string;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ProfilePage: useEffect triggered");
    const token = localStorage.getItem("token");
    console.log("ProfilePage: Token found:", !!token);
    
    if (!token) {
      console.log("ProfilePage: No token, redirecting to login");
      navigate("/login");
      return;
    }

    fetchProfile();
  }, [navigate]);

  const fetchProfile = async () => {
    console.log("ProfilePage: fetchProfile called");
    try {
      const response = await ApiService.getUserProfile();
      console.log("ProfilePage: API response:", response);
      
      if (response.statusCode === 200) {
        console.log("ProfilePage: Setting profile data:", response.data);
        setProfile(response.data);
      } else {
        console.log("ProfilePage: API error status:", response.statusCode);
        setError("Failed to load profile data");
      }
    } catch (error: any) {
      console.error("ProfilePage: Error fetching profile:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to load profile"
      );
    } finally {
      console.log("ProfilePage: Setting loading to false");
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "destructive";
      case "user":
        return "default";
      default:
        return "secondary";
    }
  };

  console.log("ProfilePage: Render state - isLoading:", isLoading, "error:", error, "profile:", profile);

  if (isLoading) {
    console.log("ProfilePage: Rendering loading state");
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-slate-600 font-medium">
                Loading your profile...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    console.log("ProfilePage: Rendering error state");
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="max-w-md w-full border-red-200">
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <User className="h-8 w-8 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      Profile Error
                    </h3>
                    <p className="text-red-600 text-sm mb-6">{error}</p>
                    <Button
                      onClick={() => navigate("/login")}
                      className="w-full"
                    >
                      Go to Login
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  console.log("ProfilePage: Rendering main content with profile:", profile);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">My Profile</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Manage your account information, preferences, and access your
            personalized dashboard
          </p>
        </div>

        {profile ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Profile Overview Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <Avatar className="w-24 h-24 mx-auto">
                      <AvatarImage
                        src="/api/placeholder/150"
                        alt={profile.name}
                      />
                      <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                        {getInitials(profile.name)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">
                        {profile.name}
                      </h2>
                      <p className="text-slate-600 text-sm">{profile.email}</p>
                    </div>

                    <Badge
                      variant={getRoleBadgeVariant(profile.role)}
                      className="capitalize"
                    >
                      <Shield className="h-3 w-3 mr-1" />
                      {profile.role.toLowerCase()}
                    </Badge>

                    <Separator />

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Member since</span>
                        <span className="font-medium text-slate-900">
                          {new Date(profile.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Profile Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>
                    Your personal details and account information
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">
                        Full Name
                      </Label>
                      <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border">
                        <User className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-900 font-medium">
                          {profile.name}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">
                        Email Address
                      </Label>
                      <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border">
                        <Mail className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-900 font-medium">
                          {profile.email}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">
                        Phone Number
                      </Label>
                      <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border">
                        <Phone className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-900 font-medium">
                          {profile.phoneNumber}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">
                        Account Type
                      </Label>
                      <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border">
                        <Shield className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-900 font-medium capitalize">
                          {profile.role.toLowerCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex gap-4">
                    <Button
                      onClick={() => navigate("/edit-profile")}
                      className="flex items-center gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      Edit Profile
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      Hotel Services
                    </CardTitle>
                    <CardDescription>
                      Access hotel services and features
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => navigate("/rooms")}
                    >
                      <Building className="h-4 w-4 mr-2" />
                      Browse Rooms
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => navigate("/find-booking")}
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Find Booking
                    </Button>
                    {profile.role === "ADMIN" && (
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => navigate("/admin")}
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Admin Dashboard
                      </Button>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Account Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your account preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Bell className="h-4 w-4 mr-2" />
                      Notifications
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Payment Methods
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-full justify-start"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Your recent hotel interactions and bookings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Building className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">
                          Welcome to Hotel System
                        </p>
                        <p className="text-sm text-slate-600">
                          Your account is ready to use
                        </p>
                      </div>
                      <span className="text-xs text-slate-500">
                        {new Date(profile.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">
                          Profile Updated
                        </p>
                        <p className="text-sm text-slate-600">
                          Your profile information is complete
                        </p>
                      </div>
                      <span className="text-xs text-slate-500">Today</span>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Shield className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">
                          Account Verified
                        </p>
                        <p className="text-sm text-slate-600">
                          Your account has been successfully verified
                        </p>
                      </div>
                      <span className="text-xs text-slate-500">
                        {new Date(profile.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Account Statistics
                  </CardTitle>
                  <CardDescription>
                    Overview of your account activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">0</div>
                      <div className="text-sm text-slate-600">
                        Total Bookings
                      </div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">0</div>
                      <div className="text-sm text-slate-600">
                        Active Bookings
                      </div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        0
                      </div>
                      <div className="text-sm text-slate-600">Past Stays</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Preferences & Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Preferences & Settings
                  </CardTitle>
                  <CardDescription>
                    Customize your account preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900">
                          Email Notifications
                        </p>
                        <p className="text-sm text-slate-600">
                          Receive booking confirmations and updates
                        </p>
                      </div>
                      <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900">
                          SMS Notifications
                        </p>
                        <p className="text-sm text-slate-600">
                          Get important updates via SMS
                        </p>
                      </div>
                      <div className="w-12 h-6 bg-slate-300 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900">
                          Marketing Communications
                        </p>
                        <p className="text-sm text-slate-600">
                          Receive special offers and promotions
                        </p>
                      </div>
                      <div className="w-12 h-6 bg-slate-300 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Card className="max-w-md mx-auto">
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    <User className="h-8 w-8 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      No Profile Data
                    </h3>
                    <p className="text-gray-600 text-sm mb-6">
                      Unable to load profile information. Please try again.
                    </p>
                    <Button
                      onClick={fetchProfile}
                      className="w-full"
                    >
                      Retry
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
