import { Button } from "@/components/ui/button";

export function Pagination({
  page,
  totalPage,
  onPageChange,
}: {
  page: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Page {page} of {totalPage || 1}
      </p>
      <div className="flex gap-2">
        <Button variant="outline" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          Previous
        </Button>
        <Button variant="outline" disabled={page >= totalPage} onClick={() => onPageChange(page + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}
