import Mainlayout from "@/layout/Mainlayout";
import { useAuth } from "@/lib/AuthContext";
import axiosInstance from "@/lib/axiosinstance";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Check, X } from "lucide-react";

const Subscription = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/auth");
      return;
    }
    fetchSubscription();
  }, [user]);

  const fetchSubscription = async () => {
    try {
      const res = await axiosInstance.get("/api/payments/subscription");
      setSubscription(res.data.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch subscription");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel your subscription?")) {
      return;
    }
    try {
      await axiosInstance.post("/api/payments/cancel");
      toast.success("Subscription cancelled");
      fetchSubscription();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to cancel subscription");
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

  const getPlanBadge = (plan: string) => {
    if (plan === "free") return <Badge variant="secondary">Free</Badge>;
    if (plan === "basic") return <Badge className="bg-blue-600">Basic</Badge>;
    if (plan === "premium") return <Badge className="bg-purple-600">Premium</Badge>;
    return <Badge variant="secondary">{plan}</Badge>;
  };

  return (
    <Mainlayout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Crown className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
          <h1 className="text-3xl font-bold mb-2">My Subscription</h1>
          <p className="text-gray-600">Manage your subscription plan</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Current Plan</span>
              {getPlanBadge(subscription?.plan)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Plan Features</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <Check className="w-4 h-4 mr-2 text-green-600" />
                    {subscription?.questionsPerDay === -1
                      ? "Unlimited questions per day"
                      : `${subscription?.questionsPerDay} question(s) per day`}
                  </li>
                  <li className="flex items-center text-sm">
                    <Check className="w-4 h-4 mr-2 text-green-600" />
                    {subscription?.postsPerDay === -1
                      ? "Unlimited posts per day"
                      : `${subscription?.postsPerDay} post(s) per day`}
                  </li>
                  <li className="flex items-center text-sm">
                    {subscription?.canTransferPoints ? (
                      <>
                        <Check className="w-4 h-4 mr-2 text-green-600" />
                        Point transfers enabled
                      </>
                    ) : (
                      <>
                        <X className="w-4 h-4 mr-2 text-red-600" />
                        Point transfers disabled
                      </>
                    )}
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Subscription Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-semibold">
                      {subscription?.active ? (
                        <Badge className="bg-green-600">Active</Badge>
                      ) : (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                    </span>
                  </div>
                  {subscription?.endDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expires:</span>
                      <span className="font-semibold">
                        {new Date(subscription.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {subscription?.amount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-semibold">₹{subscription.amount}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <Button
                onClick={() => router.push("/subscription/plans")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Upgrade Plan
              </Button>
              {subscription?.plan !== "free" && (
                <Button onClick={handleCancel} variant="outline" className="text-red-600">
                  Cancel Subscription
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <h3 className="font-semibold mb-2">Free</h3>
              <p className="text-3xl font-bold mb-2">₹0</p>
              <p className="text-sm text-gray-600 mb-4">per month</p>
              <ul className="text-sm space-y-2 text-left">
                <li>• 1 question/day</li>
                <li>• 1 post/day</li>
                <li>• No point transfers</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-blue-600 border-2">
            <CardContent className="pt-6 text-center">
              <Badge className="mb-2 bg-blue-600">Popular</Badge>
              <h3 className="font-semibold mb-2">Basic</h3>
              <p className="text-3xl font-bold mb-2">₹99</p>
              <p className="text-sm text-gray-600 mb-4">per month</p>
              <ul className="text-sm space-y-2 text-left">
                <li>• 5 questions/day</li>
                <li>• 5 posts/day</li>
                <li>• Point transfers enabled</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-purple-600 border-2">
            <CardContent className="pt-6 text-center">
              <Badge className="mb-2 bg-purple-600">Best Value</Badge>
              <h3 className="font-semibold mb-2">Premium</h3>
              <p className="text-3xl font-bold mb-2">₹199</p>
              <p className="text-sm text-gray-600 mb-4">per month</p>
              <ul className="text-sm space-y-2 text-left">
                <li>• Unlimited questions</li>
                <li>• Unlimited posts</li>
                <li>• Point transfers enabled</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Mainlayout>
  );
};

export default Subscription;
