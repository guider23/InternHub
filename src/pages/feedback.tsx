import Mainlayout from "@/layout/Mainlayout";
import { useAuth } from "@/lib/AuthContext";
import axiosInstance from "@/lib/axiosinstance";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquare, Send } from "lucide-react";

const Feedback = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [feedback, setFeedback] = useState("");
  const [myFeedback, setMyFeedback] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/auth");
      return;
    }
    fetchMyFeedback();
  }, [user]);

  const fetchMyFeedback = async () => {
    try {
      const res = await axiosInstance.get("/api/feedback");
      setMyFeedback(res.data.feedbacks || []);
    } catch (error: any) {
      console.error(error);
      setMyFeedback([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!feedback.trim()) {
      toast.error("Please enter your feedback");
      return;
    }

    setSubmitting(true);
    try {
      await axiosInstance.post("/api/feedback", {
        type: "general",
        title: "User Feedback",
        description: feedback
      });
      toast.success("Feedback submitted successfully");
      setFeedback("");
      fetchMyFeedback();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to submit feedback");
    } finally {
      setSubmitting(false);
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
        <div className="text-center mb-8">
          <MessageSquare className="w-16 h-16 mx-auto mb-4 text-blue-600" />
          <h1 className="text-3xl font-bold mb-2">Send Feedback</h1>
          <p className="text-gray-600">
            Help us improve by sharing your thoughts and suggestions
          </p>
        </div>

        {/* Submit Feedback Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Share Your Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="feedback">Your Feedback</Label>
                <Textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us what you think... What features would you like to see? What can we improve?"
                  className="min-h-32"
                />
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {submitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Feedback
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* My Previous Feedback */}
        <div>
          <h2 className="text-xl font-bold mb-4">My Previous Feedback</h2>
          {myFeedback.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-gray-500">
                <p>You haven't submitted any feedback yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {myFeedback.map((item) => (
                <Card key={item._id}>
                  <CardContent className="pt-6">
                    <p className="text-gray-700 mb-3">{item.content}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Submitted {new Date(item.createdAt).toLocaleDateString()}</span>
                      {item.status && (
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                          Status: {item.status}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">What kind of feedback can I share?</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Feature requests and suggestions</li>
            <li>• Bug reports and issues</li>
            <li>• User experience improvements</li>
            <li>• General comments and thoughts</li>
          </ul>
        </div>
      </div>
    </Mainlayout>
  );
};

export default Feedback;
