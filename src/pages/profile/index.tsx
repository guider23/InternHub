import Mainlayout from "@/layout/Mainlayout";
import { useAuth } from "@/lib/AuthContext";
import axiosInstance from "@/lib/axiosinstance";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Settings, User, Mail, Phone, Globe } from "lucide-react";

const Profile = () => {
  const { user, Logout } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    language: "en",
  });

  useEffect(() => {
    if (!user) {
      router.push("/auth");
      return;
    }
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get("/api/profile/me");
      setProfile(res.data.data);
      setFormData({
        name: res.data.data.name || "",
        email: res.data.data.email || "",
        phone: res.data.data.phone || "",
        language: res.data.data.language || "en",
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await axiosInstance.put("/api/profile/update", formData);
      toast.success("Profile updated successfully");
      fetchProfile();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = () => {
    Logout();
    router.push("/auth");
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
          <Settings className="w-6 h-6 mr-2" />
          Profile Settings
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Summary */}
          <Card className="md:col-span-1">
            <CardContent className="pt-6">
              <div className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarFallback className="text-3xl">
                    {profile?.name?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold mb-1">{profile?.name}</h2>
                <p className="text-sm text-gray-500 mb-4">{profile?.email}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Points:</span>
                    <span className="font-semibold">{profile?.points || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Friends:</span>
                    <span className="font-semibold">{profile?.friendCount || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Member since:</span>
                    <span className="font-semibold">
                      {new Date(profile?.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Edit Profile Form */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <Label htmlFor="phone" className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <Label htmlFor="language" className="flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    Language
                  </Label>
                  <select
                    id="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="hi">Hindi</option>
                    <option value="pt">Portuguese</option>
                    <option value="zh">Chinese</option>
                    <option value="fr">French</option>
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={updating}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {updating ? "Updating..." : "Update Profile"}
                  </Button>
                  <Button
                    type="button"
                    onClick={handleLogout}
                    variant="outline"
                    className="border-red-500 text-red-600 hover:bg-red-50 hover:border-red-600"
                  >
                    Logout
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Mainlayout>
  );
};

export default Profile;
