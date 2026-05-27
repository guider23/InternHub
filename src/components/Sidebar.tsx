import { cn } from "@/lib/utils";
import {
  Bookmark,
  Bot,
  Building,
  FileText,
  Home,
  MessageSquare,
  MessageSquareIcon,
  Tag,
  Trophy,
  Users,
  Bell,
  CreditCard,
  UserPlus,
  Heart,
  Star,
  TrendingUp,
  MessageCircle,
  Gift,
  Settings,
  HelpCircle,
  BarChart3,
  Coins,
  Crown,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Badge } from "./ui/badge";

const Sidebar = ({ isopen }: any) => {
  return (
    <div>
      <aside
        className={cn(
          " top-[53px]  w-48 lg:w-64 min-h-screen bg-white shadow-sm border-r transition-transform duration-200 ease-in-out md:translate-x-0 overflow-y-auto",
          isopen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="p-2 lg:p-4">
          {/* Main Navigation */}
          <div className="mb-4">
            <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Main
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/"
                  className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm"
                >
                  <Home className="w-4 h-4 mr-2 lg:mr-3" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/questions"
                  className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm"
                >
                  <MessageSquareIcon className="w-4 h-4 mr-2 lg:mr-3" />
                  Questions
                </Link>
              </li>
              <li>
                <Link
                  href="/ask"
                  className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm"
                >
                  <MessageCircle className="w-4 h-4 mr-2 lg:mr-3" />
                  Ask Question
                </Link>
              </li>
              <li>
                <Link
                  href="/tags"
                  className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm"
                >
                  <Tag className="w-4 h-4 mr-2 lg:mr-3" />
                  Tags
                </Link>
              </li>
              <li>
                <Link
                  href="/users"
                  className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm"
                >
                  <Users className="w-4 h-4 mr-2 lg:mr-3" />
                  Users
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Features */}
          <div className="mb-4 border-t pt-4">
            <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Social
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/social/feed"
                  className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm"
                >
                  <MessageSquare className="w-4 h-4 mr-2 lg:mr-3" />
                  Social Feed
                </Link>
              </li>
              <li>
                <Link
                  href="/social/friends"
                  className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm"
                >
                  <UserPlus className="w-4 h-4 mr-2 lg:mr-3" />
                  Friends
                </Link>
              </li>
              <li>
                <Link
                  href="/social/friend-requests"
                  className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm"
                >
                  <Heart className="w-4 h-4 mr-2 lg:mr-3" />
                  Friend Requests
                </Link>
              </li>
            </ul>
          </div>

          {/* Points & Gamification */}
          <div className="mb-4 border-t pt-4">
            <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Points & Rewards
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/points/leaderboard"
                  className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm"
                >
                  <Trophy className="w-4 h-4 mr-2 lg:mr-3" />
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  href="/points/transfer"
                  className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm"
                >
                  <Coins className="w-4 h-4 mr-2 lg:mr-3" />
                  Transfer Points
                  <Badge variant="secondary" className="ml-auto text-xs bg-purple-100 text-purple-800">
                    Premium
                  </Badge>
                </Link>
              </li>
              <li>
                <Link
                  href="/points/transactions"
                  className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm"
                >
                  <BarChart3 className="w-4 h-4 mr-2 lg:mr-3" />
                  Transactions
                </Link>
              </li>
            </ul>
          </div>

          {/* Subscription & Payments */}
          <div className="mb-4 border-t pt-4">
            <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Subscription
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/subscription"
                  className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm"
                >
                  <Crown className="w-4 h-4 mr-2 lg:mr-3" />
                  My Subscription
                </Link>
              </li>
              <li>
                <Link
                  href="/subscription/plans"
                  className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm"
                >
                  <CreditCard className="w-4 h-4 mr-2 lg:mr-3" />
                  Upgrade Plan
                  <Badge variant="secondary" className="ml-auto text-xs bg-orange-100 text-orange-800">
                    NEW
                  </Badge>
                </Link>
              </li>
              <li>
                <Link
                  href="/subscription/history"
                  className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm"
                >
                  <FileText className="w-4 h-4 mr-2 lg:mr-3" />
                  Billing History
                </Link>
              </li>
            </ul>
          </div>

          {/* Notifications & Profile */}
          <div className="mb-4 border-t pt-4">
            <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Account
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/notifications"
                  className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm"
                >
                  <Bell className="w-4 h-4 mr-2 lg:mr-3" />
                  Notifications
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm"
                >
                  <Settings className="w-4 h-4 mr-2 lg:mr-3" />
                  Profile Settings
                </Link>
              </li>
              <li>
                <Link
                  href="/profile/login-history"
                  className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm"
                >
                  <TrendingUp className="w-4 h-4 mr-2 lg:mr-3" />
                  Login History
                </Link>
              </li>
            </ul>
          </div>

          {/* Additional Features */}
          <div className="mb-4 border-t pt-4">
            <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              More
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/feedback"
                  className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm"
                >
                  <MessageSquare className="w-4 h-4 mr-2 lg:mr-3" />
                  Feedback
                </Link>
              </li>
              <li>
                <Link
                  href="/saves"
                  className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm"
                >
                  <Bookmark className="w-4 h-4 mr-2 lg:mr-3" />
                  Saved Posts
                </Link>
              </li>
              <li>
                <Link
                  href="/ai-assist"
                  className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm"
                >
                  <Bot className="w-4 h-4 mr-2 lg:mr-3" />
                  AI Assist
                  <Badge variant="secondary" className="ml-auto text-xs">
                    Labs
                  </Badge>
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm"
                >
                  <HelpCircle className="w-4 h-4 mr-2 lg:mr-3" />
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
