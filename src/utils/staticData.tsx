import { IoCheckmarkOutline } from "react-icons/io5";
import { imageProvider } from "./imageProvider";
import { Link } from "react-router";
import type { TPromtsCategory } from "../types/global.types";
import { Archive, Trash2 } from "lucide-react";


export const content = (
  <div className="p-2 rounded-xl font-avant space-y-4">
    <div className="flex items-start gap-2">
      <img className="translate-y-2 " src={imageProvider.Star} alt="" />
      <div className="flex items-center gap-8 justify-between">
        <div>
          <h3 className="text-lg font-medium text-textPrimary">Copybot Pro</h3>
          <p className="text-sm text-black/60 font-medium">
            Our Smartest model & more
          </p>
        </div>
        <Link to={"/upgrade-plan"}>
          <button className="font-semibold text-textPrimary ring-black/60 ring rounded-full px-4 hover:bg-black/5 transition-all duration-150 py-2 cursor-pointer">
            Upgrade
          </button>
        </Link>
      </div>
    </div>
    <div className="flex items-start  gap-2">
      <img className="translate-y-2" src={imageProvider.Charm} alt="" />
      <div className="flex flex-1 items-center gap-8 justify-between">
        <div>
          <h3 className="text-lg font-medium text-textPrimary">Copybot</h3>
          <p className="text-sm text-black/60 font-medium">
            Great for everyday task   
          </p>
        </div>
        <div className="flex items-end ">
          <IoCheckmarkOutline className="size-8" />
        </div>
      </div>
    </div>
  </div>
);





export const content3 = (
  <div className=" rounded-xl w-fit  space-y-0">
    <Link to={"/upgrade-plan"}>
      <h4 className=" text-textPrimary mt-2 flex items-center gap-2  font-medium  cursor-pointer px-4 hover:bg-black/5 rounded-lg py-2">
        <span><Archive className="size-5 " /></span> <span className="font-semibold ">Archive</span>
      </h4>
    </Link>
    <Link to={"settings"}>
      <h4 className="text-textPrimary font-medium gap-2 flex items-center   cursor-pointer px-4 hover:bg-black/5 rounded-lg py-2">
        <span><Trash2 className="size-5 text-red-400" /></span> <span className="font-semibold text-red-400">Delete</span>
      </h4>
    </Link>
  </div>
);

export const promtsCategory: TPromtsCategory[] = [
  {
    category: "Strategy",
    subcategories: [
      {
        name: "Strategy Consultation",
        prompt:
          "Generate a tailored marketing strategy based on a client's unique goals and industry.",
      },
      {
        name: "Integrated Campaigns",
        prompt:
          "Create a multichannel campaign plan incorporating various marketing tactics.",
      },
    ],
  },
  {
    category: "Content/SEO",
    subcategories: [
      {
        name: "Blog Writing",
        prompt:
          "Write an SEO-optimized blog post on a topic relevant to our target audience.",
      },
      {
        name: "Keyword Research",
        prompt:
          "Generate a list of high-traffic keywords for the financial technology industry.",
      },
      {
        name: "On-Page SEO",
        prompt:
          "Optimize a webpage’s title, meta description, and content for better search visibility.",
      },
    ],
  },
  {
    category: "Email Marketing",
    subcategories: [
      {
        name: "Newsletter",
        prompt:
          "Write a monthly newsletter with company updates, blogs, and upcoming events.",
      },
      {
        name: "Promotional Email",
        prompt:
          "Craft an engaging email to promote a limited-time offer or new product.",
      },
      {
        name: "Drip Campaign",
        prompt:
          "Generate a 5-part drip email campaign for nurturing new leads.",
      },
    ],
  },
  {
    category: "Paid Ads",
    subcategories: [
      {
        name: "Google Ads",
        prompt:
          "Create ad copy for a Google Search campaign targeting e-commerce buyers.",
      },
      {
        name: "Facebook Ads",
        prompt:
          "Write engaging Facebook ad copy to promote a new service launch.",
      },
      {
        name: "LinkedIn Ads",
        prompt: "Generate B2B-focused Linkedin ad copy for a SaaS company.",
      },
    ],
  },
  {
    category: "PR/Communications",
    subcategories: [
      {
        name: "Press Release",
        prompt:
          "Draft a professional press release announcing a new partnership.",
      },
      {
        name: "Media Pitch",
        prompt:
          "Write a concise media pitch to secure a feature in a tech magazine.",
      },
      {
        name: "Crisis Communication",
        prompt:
          "Create a company statement addressing a customer service issue.",
      }
    ],
  },
  {
    category: "Outreach",
    subcategories: [
      {
        name: "Job Posting",
        prompt:
          "Write an attractive job description for a full-stack developer.",
      },
      {
        name: "Candidate Outreach",
        prompt: "Craft a LinkedIn message to connect with a potential hire.",
      },
      {
        name: "Employer Branding",
        prompt:
          "Develop content for the careers page that highlights company culture.",
      },
    ],
  },
  {
    category: "Sales",
    subcategories: [
      {
        name: "Cold Email",
        prompt:
          "Write a cold email to introduce our software to small business owners.",
      },
      {
        name: "Sales Pitch",
        prompt:
          "Generate a compelling pitch script for a 5-minute product demo.",
      },
      {
        name: "Follow-Up Email",
        prompt:
          "Draft a follow-up email after a sales call to recap key points and next steps.",
      },
    ],
  },
  {
    category: "Social Media",
    subcategories: [
      {
        name: "Instagram Post",
        prompt:
          "Write a caption for an Instagram post showcasing our newest feature.",
      },
      {
        name: "Twitter Thread",
        prompt:
          "Create a 5-part Twitter thread sharing tips on digital marketing.",
      },
      {
        name: "LinkedIn Update",
        prompt:
          "Write a LinkedIn post announcing a company achievement or milestone.",
      },
    ],
  }

];
