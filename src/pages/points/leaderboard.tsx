import Mainlayout from "@/layout/Mainlayout";
import axiosInstance from "@/lib/axiosinstance";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Medal, Award } from "lucide-react";

const Leaderboard = () => {
  const [topUsers, setTopUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await axiosInstance.get("/api/points/leaderboard");
      setTopUsers(res.data.users || []);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch leaderboard");
      setTopUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Award className="w-6 h-6 text-orange-600" />;
    return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
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
        <div className="text-center mb-8">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
          <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
          <p className="text-gray-600">Top contributors ranked by points</p>
        </div>

        {topUsers.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-gray-500">
              <p>No users on the leaderboard yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {topUsers.map((user, index) => (
              <Card
                key={user._id}
                className={`${
                  index === 0
                    ? "border-yellow-500 border-2 bg-yellow-50"
                    : index === 1
                    ? "border-gray-400 border-2 bg-gray-50"
                    : index === 2
                    ? "border-orange-600 border-2 bg-orange-50"
                    : ""
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 flex justify-center">
                        {getRankIcon(index + 1)}
                      </div>
                      <Avatar className="w-14 h-14">
                        <AvatarFallback className="text-xl">
                          {user.name?.[0] || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{user.name}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-600">
                        {user.points || 0}
                      </div>
                      <div className="text-sm text-gray-500">points</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">How to earn points:</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Answer questions and get upvotes</li>
            <li>• Reach 5 upvotes on an answer: +5 bonus points</li>
            <li>• Receive points from other users</li>
            <li>• Contribute quality content to the community</li>
          </ul>
        </div>
      </div>
    </Mainlayout>
  );
};

export default Leaderboard;
