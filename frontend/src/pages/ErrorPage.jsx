import { useNavigate } from 'react-router-dom';
import { AlertOctagon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="mx-auto max-w-md border-0 bg-white/90 shadow-lg backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <AlertOctagon className="mx-auto mb-6 h-16 w-16 text-red-500/80" />
          <h1 className="mb-3 text-3xl font-semibold text-slate-900">Oops!</h1>
          <p className="mb-2 text-xl font-medium text-slate-700">Page Not Found</p>
          <p className="mb-8 text-slate-500">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button 
            onClick={() => navigate('/')}
            className="rounded-full bg-slate-900 px-8 py-6 text-lg font-medium hover:bg-slate-800"
          >
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

