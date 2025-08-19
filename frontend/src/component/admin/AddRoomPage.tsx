import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Upload,
  Building,
  DollarSign,
  FileText,
  ArrowLeft,
} from "lucide-react";
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

interface RoomDetails {
  roomPhotoUrl: string;
  roomType: string;
  roomPrice: string;
  roomDescription: string;
}

const AddRoomPage: React.FC = () => {
  const navigate = useNavigate();
  const [roomDetails, setRoomDetails] = useState<RoomDetails>({
    roomPhotoUrl: "",
    roomType: "",
    roomPrice: "",
    roomDescription: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [roomTypes, setRoomTypes] = useState<string[]>([]);
  const [newRoomType, setNewRoomType] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const types = await ApiService.getRoomTypes();
        setRoomTypes(types.data || []);
      } catch (error) {
        console.error("Error fetching room types:", error);
      }
    };
    fetchRoomTypes();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRoomDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRoomTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "new") {
      setNewRoomType(true);
      setRoomDetails((prevState) => ({ ...prevState, roomType: "" }));
    } else {
      setNewRoomType(false);
      setRoomDetails((prevState) => ({
        ...prevState,
        roomType: e.target.value,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setFile(null);
      setPreview(null);
    }
  };

  const addRoom = async () => {
    if (
      !roomDetails.roomType ||
      !roomDetails.roomPrice ||
      !roomDetails.roomDescription
    ) {
      setError("All room details must be provided.");
      setTimeout(() => setError(""), 5000);
      return;
    }

    if (!window.confirm("Do you want to add this room?")) {
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("roomType", roomDetails.roomType);
      formData.append("roomPrice", roomDetails.roomPrice);
      formData.append("roomDescription", roomDetails.roomDescription);

      if (file) {
        formData.append("photo", file);
      }

      const result = await ApiService.addRoom(formData);
      if (result.statusCode === 200) {
        setSuccess("Room Added successfully.");

        setTimeout(() => {
          setSuccess("");
          navigate("/admin/manage-rooms");
        }, 3000);
      }
    } catch (error: any) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(""), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-20 pb-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/manage-rooms")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Rooms
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Add New Room</h1>
            <p className="text-slate-600">
              Create a new room listing for your hotel
            </p>
          </div>
        </div>

        {/* Error and Success Messages */}
        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-red-700">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="font-medium">{error}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {success && (
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-green-700">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium">{success}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Room Information
            </CardTitle>
            <CardDescription>
              Fill in the details for the new room
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Photo Upload */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Room Photo
              </Label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors">
                {preview ? (
                  <div className="space-y-4">
                    <img
                      src={preview}
                      alt="Room Preview"
                      className="w-full max-w-md mx-auto rounded-lg shadow-md"
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFile(null);
                        setPreview(null);
                      }}
                      className="flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Change Photo
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 text-slate-400 mx-auto" />
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        Upload a room photo
                      </p>
                      <p className="text-sm text-slate-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                )}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-4"
                />
              </div>
            </div>

            {/* Room Type */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Room Type
              </Label>
              <div className="space-y-3">
                <select
                  value={roomDetails.roomType}
                  onChange={handleRoomTypeChange}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-900"
                >
                  <option value="">Select a room type</option>
                  {(roomTypes || []).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                  <option value="new">Other (please specify)</option>
                </select>
                {newRoomType && (
                  <Input
                    type="text"
                    name="roomType"
                    placeholder="Enter new room type"
                    value={roomDetails.roomType}
                    onChange={handleChange}
                    className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                )}
              </div>
            </div>

            {/* Room Price */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Room Price (per night)
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  name="roomPrice"
                  placeholder="0.00"
                  value={roomDetails.roomPrice}
                  onChange={handleChange}
                  className="pl-10 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Room Description */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">
                Room Description
              </Label>
              <textarea
                name="roomDescription"
                placeholder="Describe the room features, amenities, and what makes it special..."
                value={roomDetails.roomDescription}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-900 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <Button
                onClick={addRoom}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Adding Room...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Add Room
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/admin/manage-rooms")}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddRoomPage;
