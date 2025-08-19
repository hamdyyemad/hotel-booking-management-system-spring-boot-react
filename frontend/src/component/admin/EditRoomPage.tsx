import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Building, DollarSign, Users, Save, ArrowLeft } from "lucide-react";
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
import { Room } from "../../types";

interface EditRoomFormData {
  name: string;
  description: string;
  price: string;
  capacity: string;
  amenities: string;
  imageUrl: string;
}

const EditRoomPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [room, setRoom] = useState<Room | null>(null);
  const [formData, setFormData] = useState<EditRoomFormData>({
    name: "",
    description: "",
    price: "",
    capacity: "",
    amenities: "",
    imageUrl: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate();

  const fetchRoom = useCallback(async () => {
    try {
      const response = await ApiService.getRoomById(id!);
      if (response.statusCode === 200) {
        const roomData = response.data;
        setRoom(roomData);
        setFormData({
          name: roomData.name,
          description: roomData.description,
          price: roomData.price.toString(),
          capacity: roomData.capacity.toString(),
          amenities: roomData.amenities.join(", "),
          imageUrl: roomData.imageUrl,
        });
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message || error.message || "Failed to load room"
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
      fetchRoom();
    }
  }, [id, navigate, fetchRoom]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.capacity
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    const price = parseFloat(formData.price);
    const capacity = parseInt(formData.capacity);

    if (isNaN(price) || price <= 0) {
      setError("Please enter a valid price.");
      return;
    }

    if (isNaN(capacity) || capacity <= 0) {
      setError("Please enter a valid capacity.");
      return;
    }

    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      const updateData = {
        ...formData,
        price: price,
        capacity: capacity,
        amenities: formData.amenities
          .split(",")
          .map((item: string) => item.trim())
          .filter((item: string) => item),
      };

      const response = await ApiService.updateRoom(id!, updateData);
      if (response.statusCode === 200) {
        setSuccess("Room updated successfully!");
        setTimeout(() => {
          navigate("/admin/manage-rooms");
        }, 2000);
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to update room"
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
          <p className="mt-4 text-gray-600">Loading room...</p>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-10 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-red-600 mb-4">Room not found.</p>
              <Button onClick={() => navigate("/admin/manage-rooms")}>
                Back to Rooms
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
            onClick={() => navigate("/admin/manage-rooms")}
            className="mb-4 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Rooms
          </Button>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Edit Room: {room.name}
          </h1>
          <p className="text-lg text-gray-600">
            Update room information and details
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Room Information */}
          <Card>
            <CardHeader>
              <CardTitle>Current Room Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-500">
                  Room Name
                </Label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                  <Building className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-900">{room.name}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-500">
                  Price per Night
                </Label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-900 font-semibold">
                    ${room.price}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-500">
                  Capacity
                </Label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-900">{room.capacity} guests</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-500">
                  Amenities
                </Label>
                <div className="p-3 bg-gray-50 rounded-md">
                  <span className="text-gray-900">
                    {room.amenities.join(", ")}
                  </span>
                </div>
              </div>

              {room.imageUrl && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-500">
                    Current Image
                  </Label>
                  <img
                    src={room.imageUrl}
                    alt={room.name}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Edit Form */}
          <Card>
            <CardHeader>
              <CardTitle>Edit Room Details</CardTitle>
              <CardDescription>Update the room information</CardDescription>
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
                  <Label htmlFor="name">Room Name *</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter room name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-10"
                      disabled={isSaving}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Enter room description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={4}
                    disabled={isSaving}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price per Night *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="pl-10"
                        disabled={isSaving}
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity *</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="capacity"
                        name="capacity"
                        type="number"
                        placeholder="1"
                        value={formData.capacity}
                        onChange={handleInputChange}
                        className="pl-10"
                        disabled={isSaving}
                        required
                        min="1"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amenities">Amenities</Label>
                  <Input
                    id="amenities"
                    name="amenities"
                    type="text"
                    placeholder="WiFi, TV, Air Conditioning (comma separated)"
                    value={formData.amenities}
                    onChange={handleInputChange}
                    disabled={isSaving}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    disabled={isSaving}
                  />
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
                    onClick={() => navigate("/admin/manage-rooms")}
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

export default EditRoomPage;
