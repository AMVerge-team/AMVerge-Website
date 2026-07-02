interface SkeletonProps {
    width?: string;
    height?: string;
    borderRadius?: string;
    className?: string;
}

export function Skeleton({ width = "100%", height = "20px", borderRadius = "6px", className = "" }: SkeletonProps) {
    return (
        <div
            className={`skeleton ${className}`}
            style={{ width, height, borderRadius }}
            aria-hidden="true"
        />
    );
}

export function SkeletonText({ lines = 1, gap = "10px" }: { lines?: number; gap?: string }) {
    return (
        <div className="skeleton-text-group" style={{ gap }}>
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    width={i === lines - 1 ? "65%" : "100%"}
                    height="18px"
                />
            ))}
        </div>
    );
}

export function SkeletonCard({ count = 3 }: { count?: number }) {
    return (
        <div className="skeleton-card-group">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="skeleton-card-item">
                    <Skeleton width="40px" height="40px" borderRadius="8px" />
                    <div className="skeleton-card-body">
                        <Skeleton width="55%" height="22px" />
                        <Skeleton width="85%" height="16px" />
                    </div>
                </div>
            ))}
        </div>
    );
}
