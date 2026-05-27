import Mainlayout from "@/layout/Mainlayout";
import { useAuth } from "@/lib/AuthContext";
import axiosInstance from "@/lib/axiosinstance";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import Link from "next/link";

const Friends = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [friends, setFriends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/auth");
      return;
    }
    fetchFriends();
  }, [user]);

  const fetchFriends = async () => {
    try {
      const res = await axiosInstance.get("/api/social/friends");
      setFriends(res.data.friends || []);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch friends");
      setFriends([]);
    } finally {
      setLoading(false);
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
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold flex items-center">
            <Users className="w-6 h-6 mr-2" />
            My Friends ({friends.length})
          </h1>
          <Link href="/social/friend-requests">
            <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50 hover:border-blue-600">
              Friend Requests
            </Button>
          </Link>
        </div>

        {friends.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>You don't have any friends yet.</p>
              <p className="text-sm mt-2">Start connecting with other users!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {friends.map((friend) => (
              <Card key={friend._id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="w-16 h-16 mb-3">
                      <AvatarFallback className="text-xl">
                        {friend.name?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg">{friend.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{friend.email}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div>
                        <span className="font-semibold">{friend.points || 0}</span> points
                      </div>
                      <div>
                        <span className="font-semibold">{friend.friendCount || 0}</span> friends
                      </div>
                    </div>
                    <Link href={`/users/${friend._id}`}>
                      <Button variant="outline" size="sm" className="w-full border-blue-500 text-blue-600 hover:bg-blue-50 hover:border-blue-600">
                        View Profile
                      </Button>
                    </Link>
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

export default Friends;
