"use client"

import { useState } from "react"
import { AuthProvider, useAuth } from "@/lib/auth-context"
import { LoginForm } from "@/components/login-form"
import { SignupForm } from "@/components/signup-form"
import { Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

function AuthContent() {
  const [isSignup, setIsSignup] = useState(false)
  const { user, loading, logout } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
        <div className="w-full max-w-md">
          <Card className="border-blue-200 shadow-blue-100/50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-green-600">Welcome!</CardTitle>
              <CardDescription>You are successfully signed in as {user.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={logout} className="w-full bg-transparent" variant="outline">
                Sign Out
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      {isSignup ? (
        <SignupForm onToggleMode={() => setIsSignup(false)} />
      ) : (
        <LoginForm onToggleMode={() => setIsSignup(true)} />
      )}
    </div>
  )
}

export default function Home() {
  return (
    <AuthProvider>
      <AuthContent />
    </AuthProvider>
  )
}
