import Mainlayout from "@/layout/Mainlayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Book, MessageCircle, Mail, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Help = () => {
  const handleContactSupport = () => {
    const phoneNumber = "917010516233";
    const message = encodeURIComponent("Hi, I need help with StackOverflow Clone");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <Mainlayout>
      <div className="max-w-4xl mx-auto p-4 lg:p-6">
        <div className="text-center mb-8">
          <HelpCircle className="w-16 h-16 mx-auto mb-4 text-blue-600" />
          <h1 className="text-3xl font-bold mb-2">Help Center</h1>
          <p className="text-gray-600">
            Find answers to common questions and get support
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="hover:shadow-lg transition cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Book className="w-5 h-5 mr-2 text-blue-600" />
                Getting Started
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• How to create an account</li>
                <li>• Asking your first question</li>
                <li>• Understanding the point system</li>
                <li>• Subscription plans explained</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-green-600" />
                Community Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• How to ask good questions</li>
                <li>• Writing quality answers</li>
                <li>• Code of conduct</li>
                <li>• Reporting issues</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-purple-600" />
                Account & Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Managing your profile</li>
                <li>• Privacy settings</li>
                <li>• Notification preferences</li>
                <li>• Deleting your account</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ExternalLink className="w-5 h-5 mr-2 text-orange-600" />
                Features & Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Using tags effectively</li>
                <li>• Social features guide</li>
                <li>• Point transfers</li>
                <li>• Leaderboard rankings</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">How do I earn points?</h3>
                <p className="text-sm text-gray-700">
                  You earn points by answering questions and receiving upvotes. When your answer
                  reaches 5 upvotes, you get a bonus of 5 points. You can also receive points
                  from other users through point transfers.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">What are the subscription plans?</h3>
                <p className="text-sm text-gray-700">
                  We offer three plans: Free (1 question/day), Basic (5 questions/day, ₹99/month),
                  and Premium (unlimited questions, ₹199/month). Premium plans also enable point
                  transfers.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">How do I add friends?</h3>
                <p className="text-sm text-gray-700">
                  Visit a user's profile and send them a friend request. Once they accept, you'll
                  be able to see their posts in your social feed and transfer points to them.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Can I edit or delete my questions?</h3>
                <p className="text-sm text-gray-700">
                  Yes, you can edit or delete your own questions at any time. However, if your
                  question has received answers, consider editing instead of deleting to preserve
                  the community's contributions.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">What browsers are supported?</h3>
                <p className="text-sm text-gray-700">
                  Our platform works best on modern browsers like Chrome, Firefox, Safari, and Edge.
                  Note: Chrome users will need to verify OTP during login for security.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">Still need help?</h3>
              <p className="text-sm text-gray-700 mb-4">
                Can't find what you're looking for? Contact our support team via WhatsApp.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/feedback">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Send Feedback
                  </Button>
                </Link>
                <Button
                  onClick={handleContactSupport}
                  variant="outline"
                  className="border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Support (WhatsApp)
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Support: +91 7010516233
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Mainlayout>
  );
};

export default Help;
