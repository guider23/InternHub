import Mainlayout from "@/layout/Mainlayout";
import { useAuth } from "@/lib/AuthContext";
import axiosInstance from "@/lib/axiosinstance";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Check, Zap } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Plans = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [currentPlan, setCurrentPlan] = useState<string>("free");
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/auth");
      return;
    }
    fetchCurrentPlan();
    loadRazorpayScript();
  }, [user]);

  const loadRazorpayScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  };

  const fetchCurrentPlan = async () => {
    try {
      const res = await axiosInstance.get("/api/payments/subscription");
      setCurrentPlan(res.data.subscription?.plan || "free");
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (plan: string, amount: number) => {
    if (plan === "free") {
      toast.info("You are already on the free plan");
      return;
    }

    if (plan === currentPlan) {
      toast.info("You are already on this plan");
      return;
    }

    setSubscribing(true);
    try {
      // Step 1: Create Razorpay order
      const orderRes = await axiosInstance.post("/api/payments/create-order", {
        plan,
      });

      const { orderId, amount: orderAmount, currency, keyId } = orderRes.data;

      // Step 2: Open Razorpay checkout
      const options = {
        key: keyId,
        amount: orderAmount,
        currency: currency,
        name: "StackOverflow Clone",
        description: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan Subscription`,
        order_id: orderId,
        handler: async function (response: any) {
          try {
            // Step 3: Verify payment
            await axiosInstance.post("/api/payments/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              plan: plan,
            });

            toast.success("Payment successful! Subscription activated.");
            router.push("/subscription");
          } catch (error: any) {
            toast.error(error.response?.data?.message || "Payment verification failed");
          } finally {
            setSubscribing(false);
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },
        theme: {
          color: "#2563eb",
        },
        modal: {
          ondismiss: function () {
            setSubscribing(false);
            toast.info("Payment cancelled");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to initiate payment";
      toast.error(errorMessage);
      console.error("Subscription error:", error.response?.data);
      setSubscribing(false);
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

  const plans = [
    {
      name: "free",
      title: "Free",
      price: 0,
      features: [
        "1 question per day",
        "1 post per day",
        "Basic community access",
        "View leaderboard",
      ],
      notIncluded: ["Point transfers", "Priority support"],
      color: "gray",
    },
    {
      name: "bronze",
      title: "Bronze",
      price: 100,
      popular: true,
      features: [
        "5 questions per day",
        "5 posts per day",
        "Point transfers enabled",
        "Full community access",
        "Email support",
      ],
      notIncluded: ["Priority support"],
      color: "blue",
    },
    {
      name: "silver",
      title: "Silver",
      price: 300,
      features: [
        "10 questions per day",
        "10 posts per day",
        "Point transfers enabled",
        "Full community access",
        "Priority email support",
        "Early access to features",
      ],
      notIncluded: [],
      color: "purple",
    },
    {
      name: "gold",
      title: "Gold",
      price: 1000,
      bestValue: true,
      features: [
        "Unlimited questions",
        "Unlimited posts",
        "Point transfers enabled",
        "Full community access",
        "24/7 Priority support",
        "Early access to features",
        "Custom profile badge",
      ],
      notIncluded: [],
      color: "yellow",
    },
  ];

  return (
    <Mainlayout>
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <div className="text-center mb-8">
          <Crown className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-gray-600 text-lg mb-4">
            Upgrade to unlock more features and grow your presence in the community
          </p>
          <div className="inline-block p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              ⏰ Payments are only available between <strong>10:00 AM - 11:00 AM IST</strong>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${
                plan.popular
                  ? "border-blue-600 border-2 shadow-lg"
                  : plan.bestValue
                  ? "border-yellow-500 border-2 shadow-lg"
                  : ""
              } ${currentPlan === plan.name ? "ring-2 ring-green-500" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 px-4 py-1">Most Popular</Badge>
                </div>
              )}
              {plan.bestValue && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-yellow-500 px-4 py-1">Best Value</Badge>
                </div>
              )}
              {currentPlan === plan.name && (
                <div className="absolute -top-4 right-4">
                  <Badge className="bg-green-600 px-3 py-1">Current</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-center">
                  <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                  <div className="text-4xl font-bold mb-2">
                    ₹{plan.price}
                    <span className="text-lg font-normal text-gray-600">/month</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-gray-400">
                      <span className="w-5 h-5 mr-2 flex-shrink-0">×</span>
                      <span className="text-sm line-through">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleSubscribe(plan.name, plan.price)}
                  disabled={subscribing || currentPlan === plan.name || plan.name === "free"}
                  className={`w-full ${
                    plan.name === "bronze"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : plan.name === "silver"
                      ? "bg-purple-600 hover:bg-purple-700"
                      : plan.name === "gold"
                      ? "bg-yellow-600 hover:bg-yellow-700"
                      : "bg-gray-600 hover:bg-gray-700"
                  }`}
                >
                  {currentPlan === plan.name ? (
                    "Current Plan"
                  ) : plan.name === "free" ? (
                    "Free Plan"
                  ) : subscribing ? (
                    "Processing..."
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Upgrade Now
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-1">Can I change my plan anytime?</h4>
              <p className="text-sm text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">What happens when I cancel?</h4>
              <p className="text-sm text-gray-600">
                You'll be automatically moved to the Free plan and retain access to all your content.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Are there any hidden fees?</h4>
              <p className="text-sm text-gray-600">
                No, the price you see is the price you pay. No hidden fees or charges.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">When can I make payments?</h4>
              <p className="text-sm text-gray-600">
                Payments are only available between 10:00 AM - 11:00 AM IST for security reasons.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Mainlayout>
  );
};

export default Plans;
