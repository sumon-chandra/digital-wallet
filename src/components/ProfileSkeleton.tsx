import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@radix-ui/react-dropdown-menu";

export const ProfileSkeleton = () => (
  <div className="flex flex-col items-center min-h-screen p-6 bg-gradient-to-br from-background to-muted/30">
    <Card className="w-full max-w-2xl bg-card/80 backdrop-blur-sm rounded-2xl shadow-xl border border-border/50 animate-pulse">
      <CardHeader className="flex flex-col items-center gap-4 p-8 border-b border-border/50">
        <Skeleton className="h-28 w-28 rounded-full" />
        <div className="flex flex-col items-center space-y-3 w-full">
          <Skeleton className="h-7 w-3/4 rounded-md" />
          <Skeleton className="h-5 w-1/2 rounded-md" />
          <Skeleton className="h-7 w-1/4 mt-3 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="space-y-3">
              <Skeleton className="h-4 w-16 rounded-md" />
              <Skeleton className="h-6 w-full rounded-md" />
            </div>
          ))}
        </div>
        <Separator className="bg-border/50" />
        <div className="flex justify-end pt-3">
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </CardContent>
    </Card>
  </div>
);