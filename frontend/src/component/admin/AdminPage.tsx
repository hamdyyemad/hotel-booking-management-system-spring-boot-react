import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building,
  Calendar,
  Users,
  Plus,
  Settings,
  BarChart3,
  Shield,
  Home,
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

const AdminPage: React.FC = () => {
  const [adminName, setAdminName] = useState<string>("");
  const [stats, setStats] = useState({
    totalRooms: 0,
    totalBookings: 0,
    activeBookings: 0,
    totalUsers: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [profileResponse, roomsResponse, bookingsResponse] =
          await Promise.all([
            ApiService.getUserProfile(),
            ApiService.getAllRooms(),
            ApiService.getAllBookings(),
          ]);

        if (profileResponse.statusCode === 200) {
          setAdminName(profileResponse.data.name);
        }

        if (roomsResponse.statusCode === 200) {
          setStats((prev) => ({
            ...prev,
            totalRooms: roomsResponse.data?.length || 0,
          }));
        }

        if (bookingsResponse.statusCode === 200) {
          const bookings = bookingsResponse.data || [];
          const activeBookings = bookings.filter(
            (booking: any) =>
              booking.status === "confirmed" || booking.status === "pending"
          ).length;

          setStats((prev) => ({
            ...prev,
            totalBookings: bookings.length,
            activeBookings: activeBookings,
            totalUsers: new Set(bookings.map((booking: any) => booking.userId))
              .size,
          }));
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const adminActions = [
    {
      title: "Manage Rooms",
      description: "Add, edit, or remove hotel rooms",
      icon: <Building className="h-8 w-8" />,
      action: () => navigate("/admin/manage-rooms"),
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "Manage Bookings",
      description: "View and manage all bookings",
      icon: <Calendar className="h-8 w-8" />,
      action: () => navigate("/admin/manage-bookings"),
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      title: "Add New Room",
      description: "Create a new room listing",
      icon: <Plus className="h-8 w-8" />,
      action: () => navigate("/admin/add-room"),
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      title: "View Analytics",
      description: "Check booking statistics and reports",
      icon: <BarChart3 className="h-8 w-8" />,
      action: () => navigate("/admin/analytics"),
      color: "bg-orange-500 hover:bg-orange-600",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome back, <span className="text-blue-600">{adminName}</span>!
          </h1>
          <p className="text-xl text-gray-600">
            Manage your hotel operations from the admin dashboard
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Rooms
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.totalRooms}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Building className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Bookings
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.totalBookings}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Bookings
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.activeBookings}
                  </p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Users
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.totalUsers}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adminActions.map((action, index) => (
              <Card
                key={index}
                className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                onClick={action.action}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`inline-flex p-3 rounded-full mb-4 ${action.color.replace(
                      "hover:",
                      ""
                    )} text-white`}
                  >
                    {action.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Overview of recent hotel operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Building className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Room Management</p>
                    <p className="text-sm text-gray-600">
                      Manage your hotel rooms and availability
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => navigate("/admin/manage-rooms")}
                >
                  Manage
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Calendar className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Booking Management
                    </p>
                    <p className="text-sm text-gray-600">
                      View and manage all guest bookings
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => navigate("/admin/manage-bookings")}
                >
                  Manage
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;
