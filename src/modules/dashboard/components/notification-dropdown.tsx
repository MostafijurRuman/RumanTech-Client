"use client";

import { Bell, CheckCheck, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNotificationActions, useNotifications } from "@/modules/dashboard/hooks/use-dashboard";
import { formatDate } from "@/modules/dashboard/utils/formatters";

export function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const notifications = useNotifications();
  const actions = useNotificationActions();
  const unread = notifications.data?.unread ?? 0;

  return (
    <div className="relative">
      <Button variant="outline" size="icon" onClick={() => setOpen((value) => !value)} aria-label="Notifications">
        <Bell className="size-4" />
        {unread > 0 && <span className="absolute right-1 top-1 size-2 rounded-full bg-destructive" />}
      </Button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-[min(360px,calc(100vw-2rem))] rounded-lg border bg-popover shadow-xl">
          <div className="flex items-center justify-between border-b p-3">
            <div>
              <p className="text-sm font-semibold">Notifications</p>
              <p className="text-xs text-muted-foreground">{unread} unread</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => actions.markAllAsRead.mutate()}>
              <CheckCheck className="mr-2 size-4" />
              Read all
            </Button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.data?.items.map((item) => (
              <div key={item.id} className="grid gap-2 border-b p-3 text-sm">
                <Link
                  href={item.href ?? "/dashboard/notifications"}
                  onClick={() => actions.markAsRead.mutate(item.id)}
                  className="font-medium hover:text-primary"
                >
                  {item.title}
                </Link>
                <p className="text-xs text-muted-foreground">{item.message}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatDate(item.createdAt)}</span>
                  {item.readAt ? (
                    <span>Read</span>
                  ) : (
                    <button className="text-primary" onClick={() => actions.markAsRead.mutate(item.id)}>
                      Mark read
                    </button>
                  )}
                  {item.href && (
                    <button onClick={() => actions.deleteNotification.mutate(item.id)} aria-label="Delete notification">
                      <Trash2 className="size-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {!notifications.data?.items.length && <p className="p-6 text-center text-sm text-muted-foreground">No notifications</p>}
          </div>
        </div>
      )}
    </div>
  );
}
