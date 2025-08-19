import React from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { Room } from "../../types";

interface RoomResultProps {
  roomSearchResults: Room[];
}

const RoomResult: React.FC<RoomResultProps> = ({ roomSearchResults }) => {
  const navigate = useNavigate();
  const isAdmin = ApiService.isAdmin();

  return (
    <section className="room-results">
      {roomSearchResults && roomSearchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roomSearchResults.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative">
                <img
                  className="w-full h-48 object-cover"
                  src={
                    room.roomPhotoUrl || "/assets/images/room-placeholder.jpg"
                  }
                  alt={room.roomType}
                  onError={(e) => {
                    e.currentTarget.src = "/assets/images/room-placeholder.jpg";
                  }}
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  ${room.roomPrice}/night
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {room.roomType}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {room.roomDescription}
                </p>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <span className="font-semibold text-blue-600">
                      ${room.roomPrice}
                    </span>{" "}
                    per night
                  </div>

                  <button
                    className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 ${
                      isAdmin
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    }`}
                    onClick={() =>
                      navigate(
                        isAdmin
                          ? `/admin/edit-room/${room.id}`
                          : `/room-details-book/${room.id}`
                      )
                    }
                  >
                    {isAdmin ? "Edit Room" : "View & Book"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Rooms Found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or check back later for new
              availability.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default RoomResult;
