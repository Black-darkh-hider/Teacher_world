"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-20">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">Welcome to Your App</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            This is your starting point. Explore the available backend and frontend services, manage jobs, applications,
            and more.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">🎓 Teacher Portal</h3>
            <p className="text-slate-600 mb-4">
              Register as a teacher, verify your identity, and access job opportunities.
            </p>
            <Button variant="outline" className="w-full bg-transparent">
              Learn More
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">🏢 Institution Portal</h3>
            <p className="text-slate-600 mb-4">Post job openings, manage applications, and find qualified educators.</p>
            <Button variant="outline" className="w-full bg-transparent">
              Learn More
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">📚 Study Materials</h3>
            <p className="text-slate-600 mb-4">
              Access and share quality study resources for professional development.
            </p>
            <Button variant="outline" className="w-full bg-transparent">
              Learn More
            </Button>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Get Started?</h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Choose your role and join our platform to access amazing opportunities.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Register as Teacher
            </Button>
            <Button size="lg" variant="outline">
              Register as Institution
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
