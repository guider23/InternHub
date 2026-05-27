import Mainlayout from "@/layout/Mainlayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "react-toastify";

const AIAssist = () => {
  const [email, setEmail] = useState("");
  const [joining, setJoining] = useState(false);

  const handleJoinWaitlist = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    setJoining(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Successfully joined the waitlist! We'll notify you when AI Assist launches.");
      setEmail("");
    } catch (error) {
      toast.error("Failed to join waitlist. Please try again.");
    } finally {
      setJoining(false);
    }
  };

  return (
    <Mainlayout>
      <div className="max-w-4xl mx-auto p-4 lg:p-6">
        <div className="text-center mb-8">
          <Bot className="w-16 h-16 mx-auto mb-4 text-purple-600" />
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center">
            AI Assist
            <Badge variant="secondary" className="ml-2">Labs</Badge>
          </h1>
          <p className="text-gray-600">
            Get AI-powered help with your coding questions
          </p>
        </div>

        <Card className="mb-6 border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
              Coming Soon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              AI Assist is currently in development. This feature will help you:
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">🤖</span>
                <span>Get instant answers to coding questions</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">💡</span>
                <span>Receive code suggestions and improvements</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🔍</span>
                <span>Debug errors with AI-powered analysis</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📚</span>
                <span>Learn best practices and patterns</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">⚡</span>
                <span>Generate code snippets quickly</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Code Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Get intelligent code suggestions as you type, powered by advanced AI models.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Error Explanation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Understand complex error messages with plain English explanations and solutions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Code Review</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Get automated code reviews with suggestions for improvements and best practices.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Generate documentation for your code automatically with AI assistance.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg text-center">
          <h3 className="font-semibold text-lg mb-2">Want early access?</h3>
          <p className="text-sm text-gray-700 mb-4">
            Join our waitlist to be among the first to try AI Assist when it launches.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleJoinWaitlist()}
            />
            <Button
              onClick={handleJoinWaitlist}
              disabled={joining}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {joining ? "Joining..." : "Join Waitlist"}
            </Button>
          </div>
        </div>
      </div>
    </Mainlayout>
  );
};

export default AIAssist;
