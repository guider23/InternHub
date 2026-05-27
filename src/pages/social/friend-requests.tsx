import Mainlayout from "@/layout/Mainlayout";
import { useAuth } from "@/lib/AuthContext";
import axiosInstance from "@/lib/axiosinstance";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Check, X } from "lucide-react";

const FriendRequests = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/auth");
      return;
    }
    fetchRequests();
  }, [user]);

  const fetchRequests = async () => {
    try {
      const res = await axiosInstance.get("/api/social/friends/requests");
      setRequests(res.data.requests || []);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch friend requests");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (requestId: string) => {
    try {
      await axiosInstance.post(`/api/social/friends/accept/${requestId}`);
      toast.success("Friend request accepted");
      fetchRequests();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to accept request");
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      await axiosInstance.post(`/api/social/friends/reject/${requestId}`);
      toast.success("Friend request rejected");
      fetchRequests();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reject request");
    }
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

  return (
    <Mainlayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <UserPlus className="w-6 h-6 mr-2" />
          Friend Requests ({requests.length})
        </h1>

        {requests.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-gray-500">
              <UserPlus className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>No pending friend requests</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <Card key={request._id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="w-12 h-12 mr-4">
                        <AvatarFallback className="text-lg">
                          {request.senderId?.name?.[0] || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{request.senderId?.name || "Unknown"}</h3>
                        <p className="text-sm text-gray-500">{request.senderId?.email}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Sent {new Date(request.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleAccept(request._id)}
                        className="bg-green-600 hover:bg-green-700"
                        size="sm"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Accept
                      </Button>
                      <Button
                        onClick={() => handleReject(request._id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:bg-red-50"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Reject
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

export default FriendRequests;
