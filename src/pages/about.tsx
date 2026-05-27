import Mainlayout from "@/layout/Mainlayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Award, Heart } from "lucide-react";

const About = () => {
  return (
    <Mainlayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">About InternHub</h1>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              InternHub is a community-driven platform where developers can ask questions,
              share knowledge, and collaborate with peers from around the world. Built on
              the principles of open collaboration and knowledge sharing, we empower developers
              to learn, grow, and solve problems together.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our mission is to make programming knowledge accessible to everyone, fostering
              a supportive environment where both beginners and experts can thrive.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                Community First
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Built by developers, for developers. Every feature is designed to
                enhance collaboration and knowledge sharing.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-blue-600" />
                Quality Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Our voting system ensures the best answers rise to the top,
                helping you find solutions faster.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2 text-blue-600" />
                Recognition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Earn points and badges for your contributions. Build your
                reputation as you help others.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-blue-600" />
                Open & Free
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Free to use, always. We believe knowledge should be accessible
                to everyone, everywhere.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Our Story</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed mb-4">
              InternHub was created to address the need for a modern, user-friendly
              platform where developers can connect, learn, and grow together. We saw
              the challenges developers face when seeking help and wanted to create a
              space that makes finding answers easier and more enjoyable.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Today, we're proud to serve thousands of developers worldwide, helping
              them solve problems, learn new skills, and advance their careers.
            </p>
          </CardContent>
        </Card>
      </div>
    </Mainlayout>
  );
};

export default About;
