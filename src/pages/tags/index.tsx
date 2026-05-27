import Mainlayout from "@/layout/Mainlayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosinstance";
import { toast } from "react-toastify";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tag, TrendingUp } from "lucide-react";
import Link from "next/link";

const Tags = () => {
  const router = useRouter();
  const [tags, setTags] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const res = await axiosInstance.get("/question/getallquestion");
      const questions = res.data.data || [];

      // Extract all tags and count occurrences
      const tagMap = new Map();
      questions.forEach((q: any) => {
        q.questiontags?.forEach((tag: string) => {
          if (tag) {
            const count = tagMap.get(tag) || 0;
            tagMap.set(tag, count + 1);
          }
        });
      });

      // Convert to array and sort by count
      const tagArray = Array.from(tagMap.entries()).map(([name, count]) => ({
        name,
        count,
      }));
      tagArray.sort((a, b) => b.count - a.count);

      setTags(tagArray);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch tags");
    } finally {
      setLoading(false);
    }
  };

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <main className="min-w-0 p-4 lg:p-6">
        <div className="mb-6">
          <h1 className="text-xl lg:text-2xl font-semibold mb-2">Tags</h1>
          <p className="text-gray-600 text-sm">
            A tag is a keyword or label that categorizes your question with other, similar questions.
          </p>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {filteredTags.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-gray-500">
              <Tag className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>No tags found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTags.map((tag) => (
              <Card key={tag.name} className="hover:shadow-lg transition cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-sm px-3 py-1">
                      {tag.name}
                    </Badge>
                    <div className="flex items-center text-xs text-gray-500">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {tag.count}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {tag.count} question{tag.count !== 1 ? "s" : ""} tagged
                  </p>
                  <Link href={`/?tag=${tag.name}`}>
                    <button className="text-sm text-blue-600 hover:underline">
                      View questions →
                    </button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">About Tags</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Tags help categorize and organize questions</li>
            <li>• Use relevant tags to make your question easier to find</li>
            <li>• You can add up to 5 tags per question</li>
            <li>• Popular tags appear at the top</li>
          </ul>
        </div>
      </main>
    </Mainlayout>
  );
};

export default Tags;
