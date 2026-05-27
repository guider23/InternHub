import Mainlayout from "@/layout/Mainlayout";
import { useAuth } from "@/lib/AuthContext";
import axiosInstance from "@/lib/axiosinstance";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, ArrowUpCircle, ArrowDownCircle, Gift, TrendingUp } from "lucide-react";

const Transactions = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/auth");
      return;
    }
    fetchTransactions();
  }, [user]);

  const fetchTransactions = async () => {
    try {
      const res = await axiosInstance.get("/api/points/transactions");
      setTransactions(res.data.transactions || []);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch transactions");
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "earned":
        return <ArrowUpCircle className="w-5 h-5 text-green-600" />;
      case "deducted":
        return <ArrowDownCircle className="w-5 h-5 text-red-600" />;
      case "transferred":
        return <ArrowDownCircle className="w-5 h-5 text-orange-600" />;
      case "received":
        return <Gift className="w-5 h-5 text-blue-600" />;
      default:
        return <TrendingUp className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "earned":
        return "text-green-600";
      case "deducted":
        return "text-red-600";
      case "transferred":
        return "text-orange-600";
      case "received":
        return "text-blue-600";
      default:
        return "text-gray-600";
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
            <BarChart3 className="w-6 h-6 mr-2" />
            Point Transactions
          </h1>
          <div className="text-right">
            <p className="text-sm text-gray-600">Current Balance</p>
            <p className="text-2xl font-bold text-blue-600">{user?.points || 0} points</p>
          </div>
        </div>

        {transactions.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-gray-500">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>No transactions yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <Card key={transaction._id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getTransactionIcon(transaction.type)}
                      <div>
                        <p className="font-semibold">{transaction.reason}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(transaction.createdAt).toLocaleString()}
                        </p>
                        {transaction.relatedUserId && (
                          <p className="text-xs text-gray-400 mt-1">
                            {transaction.type === "transferred" ? "To: " : "From: "}
                            {transaction.relatedUserId.name}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${getTransactionColor(transaction.type)}`}>
                        {transaction.amount > 0 ? "+" : ""}
                        {transaction.amount}
                      </p>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          transaction.type === "earned"
                            ? "bg-green-100 text-green-800"
                            : transaction.type === "deducted"
                            ? "bg-red-100 text-red-800"
                            : transaction.type === "transferred"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {transaction.type}
                      </Badge>
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

export default Transactions;
