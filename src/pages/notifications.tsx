import Mainlayout from "@/layout/Mainlayout";
import { useAuth } from "@/lib/AuthContext";
import axiosInstance from "@/lib/axiosinstance";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Check } from "lucide-react";

const Notifications = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/auth");
      return;
    }
    fetchNotifications();
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const res = await axiosInstance.get("/api/notifications");
      setNotifications(res.data.notifications || []);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch notifications");
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await axiosInstance.put(`/api/notifications/${id}/read`);
      fetchNotifications();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to mark as read");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await axiosInstance.put("/api/notifications/read-all");
      toast.success("All notifications marked as read");
      fetchNotifications();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to mark all as read");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/api/notifications/${id}`);
      toast.success("Notification deleted");
      fetchNotifications();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete notification");
    }
  };

  const getNotificationIcon = (type: string) => {
    const icons: any = {
      friend_request: "👥",
      friend_accept: "✅",
      post_like: "❤️",
      post_comment: "💬",
      upvote: "⬆️",
      points_received: "💰",
      subscription: "👑",
      system: "🔔",
    };
    return icons[type] || "🔔";
  };

  if (loading) {
    return (
      <Mainlayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Mainlayout>
    );
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Mainlayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold flex items-center">
            <Bell className="w-6 h-6 mr-2" />
            Notifications
            {unreadCount > 0 && (
              <Badge className="ml-2 bg-red-600">{unreadCount} new</Badge>
            )}
          </h1>
          {unreadCount > 0 && (
            <Button onClick={handleMarkAllAsRead} variant="outline" size="sm">
              <Check className="w-4 h-4 mr-1" />
              Mark all as read
            </Button>
          )}
        </div>

        {notifications.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>No notifications yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Card
                key={notification._id}
                className={`${!notification.read ? "border-blue-500 border-l-4 bg-blue-50" : ""}`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="text-2xl">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{notification.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {!notification.read && (
                        <Button
                          onClick={() => handleMarkAsRead(notification._id)}
                          variant="ghost"
                          size="sm"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        onClick={() => handleDelete(notification._id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Mainlayout>
  );
};

export default Notifications;
