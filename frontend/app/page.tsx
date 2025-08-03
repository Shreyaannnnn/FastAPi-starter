import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome
          </h1>
          <p className="text-gray-600">
            Sign in to your account or create a new one
          </p>
        </div>
        
        <div className="space-y-4">
          <Link href="/login" className="block">
            <Button className="w-full" size="lg">
              Login
            </Button>
          </Link>
          <Link href="/register" className="block">
            <Button variant="outline" className="w-full" size="lg">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 