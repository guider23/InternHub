import Mainlayout from "@/layout/Mainlayout";
import { useAuth } from "@/lib/AuthContext";
import axiosInstance from "@/lib/axiosinstance";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Monitor, Smartphone, Tablet } from "lucide-react";

const LoginHistory = () => {
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
      const res = await axiosInstance.get("/api/profile/login-history");
      setHistory(res.data.history || []);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch login history");
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  const getDeviceIcon = (deviceType: string) => {
    if (deviceType === "mobile") return <Smartphone className="w-5 h-5 text-blue-600" />;
    if (deviceType === "tablet") return <Tablet className="w-5 h-5 text-green-600" />;
    return <Monitor className="w-5 h-5 text-gray-600" />;
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
          <TrendingUp className="w-6 h-6 mr-2" />
          Login History
        </h1>

        {history.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-gray-500">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>No login history available</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {history.map((login) => (
              <Card key={login._id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      {getDeviceIcon(login.deviceType)}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{login.browser}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {login.deviceType}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>
                            <span className="font-semibold">OS:</span> {login.os}
                          </p>
                          <p>
                            <span className="font-semibold">IP Address:</span>{" "}
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {login.ipAddress}
                            </code>
                          </p>
                          <p>
                            <span className="font-semibold">Time:</span>{" "}
                            {new Date(login.loginTime).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <h3 className="font-semibold mb-2 flex items-center">
            <span className="mr-2">⚠️</span>
            Security Notice
          </h3>
          <p className="text-sm text-gray-700">
            If you notice any suspicious login activity, please change your password immediately
            and contact support.
          </p>
        </div>
      </div>
    </Mainlayout>
  );
};

export default LoginHistory;
