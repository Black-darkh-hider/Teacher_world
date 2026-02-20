"use client"

import { User, Mail, MapPin, Phone, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ProfileHeaderProps {
  name?: string
  email?: string
  photo?: string
  phone?: string
  city?: string
  state?: string
  country?: string
  bio?: string
  onEditClick: () => void
  onPhotoUpload: () => void
}

export function ProfileHeader({
  name,
  email,
  photo,
  phone,
  city,
  state,
  country,
  bio,
  onEditClick,
  onPhotoUpload,
}: ProfileHeaderProps) {
  const location = [city, state, country].filter(Boolean).join(", ")

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-400 pt-20 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
          {/* Profile Photo */}
          <div className="relative -mt-24">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg">
              {photo ? (
                <Image
                  src={photo || "/placeholder.svg"}
                  alt={name || "Profile"}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <User size={48} className="text-gray-400" />
                </div>
              )}
            </div>
            <button
              onClick={onPhotoUpload}
              className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition"
              title="Upload photo"
            >
              <Edit2 size={16} />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-2">{name || "Your Name"}</h1>
            {bio && <p className="text-blue-100 mb-4">{bio}</p>}

            <div className="flex flex-wrap gap-4 text-white text-sm">
              {email && (
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>{email}</span>
                </div>
              )}
              {phone && (
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>{phone}</span>
                </div>
              )}
              {location && (
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <Button onClick={onEditClick} className="bg-white text-blue-600 hover:bg-gray-100">
            <Edit2 size={16} className="mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  )
}
