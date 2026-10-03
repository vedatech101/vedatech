import { cn } from "@/lib/utils";
export function Skeleton({ className }: { className?: string }) { return <span aria-hidden="true" className={cn("block animate-pulse bg-primary/20", className)} />; }
export function PageLoading() { return <div className="shell-grid space-y-4 py-20" role="status" aria-label="Loading"><Skeleton className="h-4 w-32" /><Skeleton className="h-16 w-full max-w-2xl" /><Skeleton className="h-4 w-full max-w-xl" /></div>; }
