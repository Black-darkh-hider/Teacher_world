"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/lib/auth-context"
import { profileApi, type InstitutionProfile } from "@/app/lib/profile-api"
import { ProfileHeader } from "@/app/components/profile-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Globe, MapPin, Phone, Award } from "lucide-react"
import Link from "next/link"

export default function InstitutionDashboard() {
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [profile, setProfile] = useState<InstitutionProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<Partial<InstitutionProfile>>({})

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user?.role !== "institution") return

    const fetchProfile = async () => {
      try {
        const response = await profileApi.getInstitutionProfile()
        if (response.error) {
          setError(response.error)
          return
        }

        // response.data may be undefined; treat absent data as null for profile
        const data: InstitutionProfile | null = (response.data as InstitutionProfile) ?? null
        setProfile(data)
        setEditData(data ?? {})
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load profile")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [user])

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your institution profile...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== "institution") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 max-w-md">
          <p className="text-red-600 font-semibold mb-4">Access Denied</p>
          <p className="text-gray-600 mb-4">You must be logged in as an institution to view this page.</p>
          <Link href="/login">
            <Button className="w-full">Go to Login</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const handlePhotoUpload = async () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0]
      if (!file) return

      try {
        setIsLoading(true)
        const result = await profileApi.uploadInstitutionPhoto(file)
        if (result.error) {
          setError(result.error)
        } else {
          setProfile((prev) => (prev ? { ...prev, photo: result.data?.photoUrl } : null))
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to upload photo")
      } finally {
        setIsLoading(false)
      }
    }
    input.click()
  }

  const handleSaveProfile = async () => {
    try {
      setIsLoading(true)
      const response = await profileApi.updateInstitutionProfile(editData)
      if (response.error) {
        setError(response.error)
      } else {
        setProfile(response.data || null)
        setIsEditing(false)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile")
    } finally {
      setIsLoading(false)
    }
  }

  const location = [profile?.city, profile?.state, profile?.country].filter(Boolean).join(", ")

  return (
    <main className="min-h-screen bg-gray-50">
      {error && (
        <div className="bg-red-50 border border-red-200 p-4 mb-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <ProfileHeader
        name={profile?.institutionName || user.name}
        email={user.email}
        photo={profile?.photo}
        phone={profile?.phoneNumber}
        city={profile?.city}
        state={profile?.state}
        country={profile?.country}
        bio={profile?.description}
        onEditClick={() => setIsEditing(!isEditing)}
        onPhotoUpload={handlePhotoUpload}
      />

      <div className="container mx-auto px-4 py-12">
        {isEditing ? (
          // Edit Mode
          <Card className="p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Edit Institution Profile</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Institution Name</label>
                <Input
                  value={editData.institutionName || ""}
                  onChange={(e) => setEditData({ ...editData, institutionName: e.target.value })}
                  placeholder="Enter institution name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <Textarea
                  value={editData.description || ""}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  placeholder="Describe your institution"
                  rows={4}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                  <Input
                    value={editData.phoneNumber || ""}
                    onChange={(e) => setEditData({ ...editData, phoneNumber: e.target.value })}
                    placeholder="Phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Website</label>
                  <Input
                    value={editData.website || ""}
                    onChange={(e) => setEditData({ ...editData, website: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                  <select
                    value={editData.type || "school"}
                    onChange={(e) => setEditData({ ...editData, type: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="school">School</option>
                    <option value="college">College</option>
                    <option value="university">University</option>
                    <option value="coaching">Coaching Center</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Registration Number</label>
                  <Input
                    value={editData.registrationNumber || ""}
                    onChange={(e) => setEditData({ ...editData, registrationNumber: e.target.value })}
                    placeholder="Registration number"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                  <Input
                    value={editData.city || ""}
                    onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                  <Input
                    value={editData.state || ""}
                    onChange={(e) => setEditData({ ...editData, state: e.target.value })}
                    placeholder="State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                  <Input
                    value={editData.country || ""}
                    onChange={(e) => setEditData({ ...editData, country: e.target.value })}
                    placeholder="Country"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button onClick={handleSaveProfile} className="flex-1">
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          // View Mode
          <>
            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <Card className="p-6 text-center">
                <div className="text-2xl font-bold text-blue-600">{profile?.type || "N/A"}</div>
                <p className="text-gray-600 text-sm">Institution Type</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600">{profile?.established || "N/A"}</div>
                <p className="text-gray-600 text-sm">Established Year</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-2xl font-bold text-purple-600">{profile?.verified ? "Yes" : "No"}</div>
                <p className="text-gray-600 text-sm">Verified</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-2xl font-bold text-amber-600">{location || "N/A"}</div>
                <p className="text-gray-600 text-sm">Location</p>
              </Card>
            </div>

            {/* Information Sections */}
            <div className="space-y-6 max-w-3xl mx-auto">
              {/* About */}
              {profile?.description && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                  <p className="text-gray-700">{profile.description}</p>
                </Card>
              )}

              {/* Contact Information */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  {profile?.phoneNumber && (
                    <div className="flex items-center gap-3">
                      <Phone className="text-blue-600" size={20} />
                      <span className="text-gray-700">{profile.phoneNumber}</span>
                    </div>
                  )}
                  {profile?.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="text-blue-600" size={20} />
                      <a
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {profile.website}
                      </a>
                    </div>
                  )}
                  {user.email && (
                    <div className="flex items-center gap-3">
                      <Award className="text-blue-600" size={20} />
                      <span className="text-gray-700">{user.email}</span>
                    </div>
                  )}
                </div>
              </Card>

              {/* Address */}
              {(profile?.address || location) && (
                <Card className="p-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-blue-600 mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold text-gray-900">Address</h3>
                      <p className="text-gray-700 mt-1">{profile?.address}</p>
                      {location && <p className="text-gray-600">{location}</p>}
                    </div>
                  </div>
                </Card>
              )}

              {/* Institution Details */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Institution Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {profile?.type && (
                    <div>
                      <p className="text-gray-600 text-sm">Type</p>
                      <p className="font-semibold text-gray-900 capitalize">{profile.type}</p>
                    </div>
                  )}
                  {profile?.established && (
                    <div>
                      <p className="text-gray-600 text-sm">Established</p>
                      <p className="font-semibold text-gray-900">{profile.established}</p>
                    </div>
                  )}
                  {profile?.registrationNumber && (
                    <div>
                      <p className="text-gray-600 text-sm">Registration Number</p>
                      <p className="font-semibold text-gray-900">{profile.registrationNumber}</p>
                    </div>
                  )}
                  {profile?.verified !== undefined && (
                    <div>
                      <p className="text-gray-600 text-sm">Verification Status</p>
                      <p className="font-semibold text-gray-900">{profile.verified ? "Verified" : "Not Verified"}</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex gap-4 justify-center">
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              <Link href="/institution/jobs">
                <Button variant="outline">Manage Jobs</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
