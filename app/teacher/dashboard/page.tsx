"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/lib/auth-context"
import { profileApi, type TeacherProfile } from "@/app/lib/profile-api"
import { ProfileHeader } from "@/app/components/profile-header"
import { TeacherInfoSection } from "@/app/components/teacher-info-section"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, BookOpen, Award, GraduationCap } from "lucide-react"
import Link from "next/link"

export default function TeacherDashboard() {
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [profile, setProfile] = useState<TeacherProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user?.role !== "teacher") return

    const fetchProfile = async () => {
      try {
        const response = await profileApi.getTeacherProfile()
        if (response.error) {
          setError(response.error)
        } else {
          setProfile(response.data || null)
        }
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
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== "teacher") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 max-w-md">
          <p className="text-red-600 font-semibold mb-4">Access Denied</p>
          <p className="text-gray-600 mb-4">You must be logged in as a teacher to view this page.</p>
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
        const result = await profileApi.uploadTeacherPhoto(file)
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

  return (
    <main className="min-h-screen bg-gray-50">
      {error && (
        <div className="bg-red-50 border border-red-200 p-4 mb-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <ProfileHeader
        name={profile?.name || user.name}
        email={profile?.email || user.email}
        photo={profile?.photo}
        phone={profile?.phone}
        city={profile?.city}
        state={profile?.state}
        country={profile?.country}
        bio={profile?.bio}
        onEditClick={() => router.push("/teacher/profile/edit")}
        onPhotoUpload={handlePhotoUpload}
      />

      <div className="container mx-auto px-4 py-12">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">{profile?.experience || 0}</div>
            <p className="text-gray-600 text-sm">Years Experience</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">{profile?.subjects?.length || 0}</div>
            <p className="text-gray-600 text-sm">Subjects Taught</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">{profile?.degrees?.length || 0}</div>
            <p className="text-gray-600 text-sm">Degrees</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-2xl font-bold text-amber-600">{profile?.certificates?.length || 0}</div>
            <p className="text-gray-600 text-sm">Certificates</p>
          </Card>
        </div>

        {/* Main Sections */}
        <div className="space-y-6">
          <TeacherInfoSection
            label="Professional Summary"
            data={profile?.bio}
            onEdit={() => router.push("/teacher/profile/edit")}
          />

          <TeacherInfoSection
            label="Teaching Subjects"
            icon={<BookOpen size={20} />}
            data={profile?.subjects}
            onEdit={() => router.push("/teacher/profile/edit")}
          />

          <TeacherInfoSection
            label="Classes Level"
            data={profile?.classesLevel}
            onEdit={() => router.push("/teacher/profile/edit")}
          />

          <TeacherInfoSection
            label="Specializations"
            data={profile?.specializations}
            onEdit={() => router.push("/teacher/profile/edit")}
          />

          <TeacherInfoSection
            label="Skills"
            icon={<Briefcase size={20} />}
            data={profile?.skills}
            onEdit={() => router.push("/teacher/profile/edit")}
          />

          {/* Education */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <GraduationCap className="text-blue-600" size={20} />
                <h3 className="font-semibold text-gray-900">Education</h3>
              </div>
              <Button variant="outline" size="sm" onClick={() => router.push("/teacher/profile/edit")}>
                Add
              </Button>
            </div>
            {profile?.degrees && profile.degrees.length > 0 ? (
              <div className="space-y-4">
                {profile.degrees.map((degree, idx) => (
                  <div key={idx} className="border-l-4 border-blue-600 pl-4 py-2">
                    <p className="font-semibold text-gray-900">{degree.degree}</p>
                    <p className="text-gray-600 text-sm">{degree.specialization}</p>
                    <p className="text-gray-500 text-sm">
                      {degree.institution} - {degree.year}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No education records added yet</p>
            )}
          </Card>

          {/* Certificates */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Award className="text-blue-600" size={20} />
                <h3 className="font-semibold text-gray-900">Certificates</h3>
              </div>
              <Button variant="outline" size="sm" onClick={() => router.push("/teacher/profile/edit")}>
                Add
              </Button>
            </div>
            {profile?.certificates && profile.certificates.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {profile.certificates.map((cert, idx) => (
                  <div key={idx} className="bg-blue-50 border border-blue-200 rounded-full px-3 py-1">
                    <span className="text-sm text-blue-900">
                      {cert.name} ({cert.year})
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No certificates added yet</p>
            )}
          </Card>

          {/* Job Preferences */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Briefcase className="text-blue-600" size={20} />
                <h3 className="font-semibold text-gray-900">Job Preferences</h3>
              </div>
              <Button variant="outline" size="sm" onClick={() => router.push("/teacher/profile/edit")}>
                Edit
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {profile?.expectedSalary && (
                <div>
                  <p className="text-gray-600 text-sm">Expected Salary</p>
                  <p className="font-semibold text-gray-900">{profile.expectedSalary}</p>
                </div>
              )}
              {profile?.jobType && profile.jobType.length > 0 && (
                <div>
                  <p className="text-gray-600 text-sm">Job Type</p>
                  <p className="font-semibold text-gray-900">{profile.jobType.join(", ")}</p>
                </div>
              )}
              {profile?.availability && (
                <div>
                  <p className="text-gray-600 text-sm">Availability</p>
                  <p className="font-semibold text-gray-900">{profile.availability}</p>
                </div>
              )}
              {profile?.remoteAvailable !== undefined && (
                <div>
                  <p className="text-gray-600 text-sm">Remote Work</p>
                  <p className="font-semibold text-gray-900">{profile.remoteAvailable ? "Yes" : "No"}</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex gap-4 justify-center">
          <Link href="/teacher/profile/edit">
            <Button>Edit Full Profile</Button>
          </Link>
          <Link href="/jobs">
            <Button variant="outline">Browse Jobs</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
