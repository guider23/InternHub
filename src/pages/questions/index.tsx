import Mainlayout from "@/layout/Mainlayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosinstance";
import { toast } from "react-toastify";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const Questions = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("newest");

  useEffect(() => {
    fetchQuestions();
  }, [filter]);

  const fetchQuestions = async () => {
    try {
      const res = await axiosInstance.get("/question/getallquestion");
      let data = res.data.data || [];

      // Apply filters
      if (filter === "newest") {
        data = data.sort((a: any, b: any) => new Date(b.askedon).getTime() - new Date(a.askedon).getTime());
      } else if (filter === "active") {
        data = data.sort((a: any, b: any) => b.noofanswer - a.noofanswer);
      } else if (filter === "unanswered") {
        data = data.filter((q: any) => q.noofanswer === 0);
      } else if (filter === "votes") {
        data = data.sort((a: any, b: any) => b.upvote.length - a.upvote.length);
      }

      setQuestions(data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch questions");
    } finally {
      setLoading(false);
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
      <main className="min-w-0 p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-xl lg:text-2xl font-semibold">All Questions</h1>
          <button
            onClick={() => router.push("/ask")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium whitespace-nowrap"
          >
            Ask Question
          </button>
        </div>

        <div className="w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 text-sm gap-2 sm:gap-4">
            <span className="text-gray-600">{questions.length} questions</span>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              <button
                onClick={() => setFilter("newest")}
                className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${
                  filter === "newest" ? "bg-gray-200 text-gray-700" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Newest
              </button>
              <button
                onClick={() => setFilter("active")}
                className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${
                  filter === "active" ? "bg-gray-200 text-gray-700" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter("unanswered")}
                className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${
                  filter === "unanswered" ? "bg-gray-200 text-gray-700" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Unanswered
              </button>
              <button
                onClick={() => setFilter("votes")}
                className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${
                  filter === "votes" ? "bg-gray-200 text-gray-700" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Most Votes
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {questions.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                No questions found with this filter.
              </div>
            ) : (
              questions.map((question: any) => {
                const postedBy = question.userposted || "Anonymous";
                const avatarInitial = postedBy[0] || "U";
                const questionTags = Array.isArray(question.questiontags)
                  ? question.questiontags
                  : [];

                return (
                  <div key={question._id} className="border-b border-gray-200 pb-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex sm:flex-col items-center sm:items-center text-sm text-gray-600 sm:w-16 lg:w-20 gap-4 sm:gap-2">
                        <div className="text-center">
                          <div className="font-medium">{question.upvote.length}</div>
                          <div className="text-xs">votes</div>
                        </div>
                        <div className="text-center">
                          <div
                            className={`font-medium ${
                              question.noofanswer > 0
                                ? "text-green-600 bg-green-100 px-2 py-1 rounded"
                                : ""
                            }`}
                          >
                            {question.noofanswer}
                          </div>
                          <div className="text-xs">
                            {question.noofanswer === 1 ? "answer" : "answers"}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/questions/${question._id}`}
                          className="text-blue-600 hover:text-blue-800 text-base lg:text-lg font-medium mb-2 block"
                        >
                          {question.questiontitle}
                        </Link>
                        <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                          {question.questionbody}
                        </p>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                          <div className="flex flex-wrap gap-1">
                            {questionTags.map((tag: any, idx: number) => (
                              <div key={idx}>
                                <Badge
                                  variant="secondary"
                                  className="text-xs bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer"
                                >
                                  {tag}
                                </Badge>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center text-xs text-gray-600 flex-shrink-0">
                            <Link
                              href={`/users/${question.userid}`}
                              className="flex items-center"
                            >
                              <Avatar className="w-4 h-4 mr-1">
                                <AvatarFallback className="text-xs">
                                  {avatarInitial}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-blue-600 hover:text-blue-800 mr-1">
                                {postedBy}
                              </span>
                            </Link>
                            <span>asked {new Date(question.askedon).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
    </Mainlayout>
  );
};

export default Questions;
