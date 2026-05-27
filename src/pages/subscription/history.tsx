import Mainlayout from "@/layout/Mainlayout";
import { useAuth } from "@/lib/AuthContext";
import axiosInstance from "@/lib/axiosinstance";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download } from "lucide-react";

const BillingHistory = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/auth");
      return;
    }
    fetchHistory();
  }, [user]);

  const fetchHistory = async () => {
    try {
      const res = await axiosInstance.get("/api/payments/history");
      setHistory(res.data.history || []);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch billing history");
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  const getPlanBadge = (plan: string) => {
    if (plan === "free") return <Badge variant="secondary">Free</Badge>;
    if (plan === "basic") return <Badge className="bg-blue-600">Basic</Badge>;
    if (plan === "premium") return <Badge className="bg-purple-600">Premium</Badge>;
    return <Badge variant="secondary">{plan}</Badge>;
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
          <FileText className="w-6 h-6 mr-2" />
          Billing History
        </h1>

        {history.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>No billing history yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <Card key={item._id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">
                          {item.plan.charAt(0).toUpperCase() + item.plan.slice(1)} Plan
                        </h3>
                        {getPlanBadge(item.plan)}
                        {item.active ? (
                          <Badge className="bg-green-600">Active</Badge>
                        ) : (
                          <Badge variant="secondary">Expired</Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>
                          <span className="font-semibold">Start Date:</span>{" "}
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                        {item.endDate && (
                          <p>
                            <span className="font-semibold">End Date:</span>{" "}
                            {new Date(item.endDate).toLocaleDateString()}
                          </p>
                        )}
                        {item.paymentId && (
                          <p>
                            <span className="font-semibold">Payment ID:</span>{" "}
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {item.paymentId}
                            </code>
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-blue-600">
                        ₹{item.amount || 0}
                      </p>
                      <button className="text-sm text-blue-600 hover:underline flex items-center mt-2">
                        <Download className="w-4 h-4 mr-1" />
                        Download Invoice
                      </button>
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

export default BillingHistory;
