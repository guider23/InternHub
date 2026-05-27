import Mainlayout from "@/layout/Mainlayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, Users, Lock, Zap, BarChart, Headphones, Building } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const Teams = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    teamSize: "",
    message: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    toast.success("Thank you! We'll contact you soon.");
    setFormData({ companyName: "", email: "", teamSize: "", message: "" });
  };

  return (
    <Mainlayout>
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">InternHub for Teams</h1>
          <p className="text-xl text-gray-600">
            Empower your team with private knowledge sharing and collaboration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Why Teams Choose Us</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <Users className="w-6 h-6 mr-3 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Private Team Workspace</h3>
                  <p className="text-gray-600">
                    Create a secure, private space for your team to share knowledge
                    and collaborate without external visibility.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Lock className="w-6 h-6 mr-3 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Enterprise Security</h3>
                  <p className="text-gray-600">
                    SOC 2 compliant with SSO, advanced permissions, and audit logs
                    to keep your data secure.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Zap className="w-6 h-6 mr-3 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Faster Onboarding</h3>
                  <p className="text-gray-600">
                    New team members get up to speed quickly with searchable
                    institutional knowledge.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <BarChart className="w-6 h-6 mr-3 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Analytics & Insights</h3>
                  <p className="text-gray-600">
                    Track engagement, identify knowledge gaps, and measure the
                    impact of knowledge sharing.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Headphones className="w-6 h-6 mr-3 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Priority Support</h3>
                  <p className="text-gray-600">
                    Dedicated support team to help you get the most out of the
                    platform.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Building className="w-6 h-6 mr-3 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Custom Integrations</h3>
                  <p className="text-gray-600">
                    Connect with your existing tools like Slack, Jira, and GitHub
                    for seamless workflows.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Request a Demo</CardTitle>
              <p className="text-gray-600">
                Let's discuss how InternHub can help your team
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    placeholder="Your company"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Work Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="you@company.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="teamSize">Team Size</Label>
                  <select
                    id="teamSize"
                    value={formData.teamSize}
                    onChange={(e) =>
                      setFormData({ ...formData, teamSize: e.target.value })
                    }
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select team size</option>
                    <option value="1-10">1-10 people</option>
                    <option value="11-50">11-50 people</option>
                    <option value="51-200">51-200 people</option>
                    <option value="201-500">201-500 people</option>
                    <option value="500+">500+ people</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell us about your needs..."
                    className="min-h-24"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Request Demo
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <h3 className="text-xl font-bold mb-4 text-center">
              Trusted by Teams Worldwide
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
                <div className="text-gray-600">Active Teams</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">50M+</div>
                <div className="text-gray-600">Questions Answered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                <div className="text-gray-600">Customer Satisfaction</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Mainlayout>
  );
};

export default Teams;
