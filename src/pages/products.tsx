import Mainlayout from "@/layout/Mainlayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Zap, Shield, Users, BarChart, Headphones } from "lucide-react";
import { useRouter } from "next/router";

const Products = () => {
  const router = useRouter();

  return (
    <Mainlayout>
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-xl text-gray-600">
            Powerful tools to help your team collaborate and grow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="border-2 border-blue-500">
            <CardHeader>
              <CardTitle className="text-2xl">InternHub Community</CardTitle>
              <p className="text-gray-600">Free for everyone</p>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="text-3xl font-bold mb-2">Free</div>
                <p className="text-gray-600">Forever free for individuals</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Ask unlimited questions</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Access to community knowledge base</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Earn reputation and badges</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Connect with developers worldwide</span>
                </li>
              </ul>
              <Button
                onClick={() => router.push("/auth")}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Get Started Free
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-500">
            <CardHeader>
              <CardTitle className="text-2xl">InternHub Teams</CardTitle>
              <p className="text-gray-600">For organizations</p>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="text-3xl font-bold mb-2">Custom Pricing</div>
                <p className="text-gray-600">Contact us for a quote</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Private team workspace</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Advanced analytics and insights</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Custom integrations</span>
                </li>
              </ul>
              <Button
                onClick={() => router.push("/teams")}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Learn More
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Zap className="w-8 h-8 text-blue-600 mb-2" />
              <CardTitle>Fast Answers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Get answers to your questions quickly from our active community
                of developers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="w-8 h-8 text-blue-600 mb-2" />
              <CardTitle>Secure & Private</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Your data is protected with enterprise-grade security and privacy
                controls.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BarChart className="w-8 h-8 text-blue-600 mb-2" />
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Track team performance and knowledge sharing with detailed
                analytics.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Mainlayout>
  );
};

export default Products;
