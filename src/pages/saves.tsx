import Mainlayout from "@/layout/Mainlayout";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark } from "lucide-react";

const Saves = () => {
  return (
    <Mainlayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <Bookmark className="w-6 h-6 mr-2" />
          Saved Posts
        </h1>

        <Card>
          <CardContent className="pt-6 text-center text-gray-500">
            <Bookmark className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="mb-2">No saved posts yet</p>
            <p className="text-sm">
              Save questions and posts to easily find them later
            </p>
          </CardContent>
        </Card>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">How to save posts:</h3>
          <p className="text-sm text-gray-700">
            Click the bookmark icon on any question or post to save it for later reference.
            Your saved items will appear here.
          </p>
        </div>
      </div>
    </Mainlayout>
  );
};

export default Saves;
