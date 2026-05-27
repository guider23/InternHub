import Mainlayout from "@/layout/Mainlayout";
import { useAuth } from "@/lib/AuthContext";
import axiosInstance from "@/lib/axiosinstance";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coins, Send, AlertCircle } from "lucide-react";

const TransferPoints = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [friends, setFriends] = useState<any[]>([]);
  const [selectedFriend, setSelectedFriend] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [transferring, setTransferring] = useState(false);

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

  const handleTransfer = async () => {
    if (!selectedFriend) {
      toast.error("Please select a friend");
      return;
    }
    if (!amount || parseInt(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setTransferring(true);
    try {
      await axiosInstance.post("/api/points/transfer", {
        recipientId: selectedFriend,
        amount: parseInt(amount),
      });
      toast.success("Points transferred successfully");
      setSelectedFriend("");
      setAmount("");
      router.push("/points/transactions");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to transfer points");
    } finally {
      setTransferring(false);
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
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Coins className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
          <h1 className="text-3xl font-bold mb-2">Transfer Points</h1>
          <p className="text-gray-600">Send points to your friends</p>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-start">
              <AlertCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">Requirements:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>You must have more than 10 points</li>
                  <li>Point transfer requires Basic or Premium subscription</li>
                  <li>You can only transfer to your friends</li>
                </ul>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Your Current Points</p>
                <p className="text-4xl font-bold text-blue-600">{user?.points || 0}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="friend">Select Friend</Label>
                <select
                  id="friend"
                  value={selectedFriend}
                  onChange={(e) => setSelectedFriend(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose a friend...</option>
                  {friends.map((friend) => (
                    <option key={friend._id} value={friend._id}>
                      {friend.name} ({friend.points || 0} points)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                />
              </div>

              <Button
                onClick={handleTransfer}
                disabled={transferring || !selectedFriend || !amount}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {transferring ? (
                  "Transferring..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Transfer Points
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {friends.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center text-gray-500">
              <p>You don't have any friends yet.</p>
              <p className="text-sm mt-2">Add friends to transfer points to them!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </Mainlayout>
  );
};

export default TransferPoints;
