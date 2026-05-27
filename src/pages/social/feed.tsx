import Mainlayout from "@/layout/Mainlayout";
import { useAuth } from "@/lib/AuthContext";
import axiosInstance from "@/lib/axiosinstance";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Send } from "lucide-react";

const SocialFeed = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState("");
  const [commentText, setCommentText] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!user) {
      router.push("/auth");
      return;
    }
    fetchFeed();
  }, [user]);

  const fetchFeed = async () => {
    try {
      const res = await axiosInstance.get("/api/social/feed");
      setPosts(res.data.posts || []);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch feed");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.trim()) {
      toast.error("Post content cannot be empty");
      return;
    }
    try {
      await axiosInstance.post("/api/social/posts", { content: newPost });
      toast.success("Post created successfully");
      setNewPost("");
      fetchFeed();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create post");
    }
  };

  const handleLike = async (postId: string) => {
    try {
      await axiosInstance.post(`/api/social/posts/${postId}/like`);
      fetchFeed();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to like post");
    }
  };

  const handleComment = async (postId: string) => {
    const text = commentText[postId];
    if (!text?.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    try {
      await axiosInstance.post(`/api/social/posts/${postId}/comment`, { text });
      setCommentText({ ...commentText, [postId]: "" });
      fetchFeed();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to comment");
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
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Social Feed</h1>

        {/* Create Post */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <Textarea
              placeholder="What's on your mind?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="mb-4"
            />
            <Button onClick={handleCreatePost} className="bg-blue-600 hover:bg-blue-700">
              <Send className="w-4 h-4 mr-2" />
              Post
            </Button>
          </CardContent>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-gray-500">
                No posts yet. Be the first to post!
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <Card key={post._id}>
                <CardContent className="pt-6">
                  <div className="flex items-start mb-4">
                    <Avatar className="w-10 h-10 mr-3">
                      <AvatarFallback>{post.userId?.name?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{post.userId?.name || "Unknown"}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p className="mb-4">{post.content}</p>
                  {post.image && (
                    <img src={post.image} alt="Post" className="rounded mb-4 max-h-96 object-cover" />
                  )}
                  <div className="flex items-center gap-4 mb-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post._id)}
                      className="text-gray-600"
                    >
                      <Heart className={`w-4 h-4 mr-1 ${post.likes?.includes(user?._id) ? "fill-red-500 text-red-500" : ""}`} />
                      {post.likes?.length || 0}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {post.comments?.length || 0}
                    </Button>
                  </div>

                  {/* Comments */}
                  {post.comments && post.comments.length > 0 && (
                    <div className="border-t pt-4 space-y-3">
                      {post.comments.map((comment: any, idx: number) => (
                        <div key={idx} className="flex items-start">
                          <Avatar className="w-8 h-8 mr-2">
                            <AvatarFallback>{comment.userId?.name?.[0] || "U"}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 bg-gray-100 rounded p-2">
                            <p className="font-semibold text-sm">{comment.userId?.name || "Unknown"}</p>
                            <p className="text-sm">{comment.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Comment */}
                  <div className="flex items-center gap-2 mt-4">
                    <Textarea
                      placeholder="Write a comment..."
                      value={commentText[post._id] || ""}
                      onChange={(e) => setCommentText({ ...commentText, [post._id]: e.target.value })}
                      className="flex-1"
                      rows={1}
                    />
                    <Button
                      size="sm"
                      onClick={() => handleComment(post._id)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Send
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </Mainlayout>
  );
};

export default SocialFeed;
