import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import VerifyEmail from "../pages/auth/VerifyEmail";
import AboutYourself from "../pages/auth/AboutYouself";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyOtp from "../pages/auth/VerifyOtp";
import NewPassword from "../pages/auth/NewPassword";
import ChatbotLayout from "../layout/ChatbotLayout";
import UpgradePlan from "../pages/UpgradePlan";
import ChatbotHome from "../pages/ChatbotHome";
import SettingsPage from "../pages/SettingsPage";
import ProfilePage from "../pages/settingsPages/ProfilePage";
import AccountPage from "../pages/settingsPages/AccountPage";
import SubscriptionPage from "../pages/settingsPages/SubscriptionPage";
import BillingPage from "../pages/settingsPages/BillingPage";
import PrivacyPage from "../pages/settingsPages/PrivacyPage";
import PrivateProtector from "../protectors/PrivateProtector";
import SuccessPage from "../pages/SuccessPage";
import CancelPage from "../pages/CancelPage";
import TermsPolicyPage from "../pages/TermsPolicyPage";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "/about-yourself",
    element: <AboutYourself />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/verify-otp",
    element: <VerifyOtp />,
  },
  {
    path: "/new-password",
    element: <NewPassword />,
  },
  {
    path: "/chatbot-home",
    element: (
      <PrivateProtector>
        <ChatbotLayout />
      </PrivateProtector>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateProtector>
            <ChatbotHome />
          </PrivateProtector>
        ),
      },
      {
        path: "settings",
        element: (
          <PrivateProtector>
            <SettingsPage />
          </PrivateProtector>
        ),
        children: [
          {
            index: true,
            element: (
              <PrivateProtector>
                <ProfilePage />
              </PrivateProtector>
            ),
          },
          {
            path: "account",
            element: (
              <PrivateProtector>
                <AccountPage />
              </PrivateProtector>
            ),
          },
          {
            path: "subscription",
            element: (
              <PrivateProtector>
                <SubscriptionPage />
              </PrivateProtector>
            ),
          },
          {
            path: "billing",
            element: (
              <PrivateProtector>
                <BillingPage />
              </PrivateProtector>
            ),
          },
          {
            path: "privacy",
            element: (
              <PrivateProtector>
                <PrivacyPage />
              </PrivateProtector>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "upgrade-plan",
    element: <UpgradePlan />,
  },
  {
    path: "user/subscription/success",
    element: <SuccessPage/>,
  },
  {
    path: "user/subscription/cancel",
    element: <CancelPage/>,
  },
  {
    path: "terms-service",
    element: <TermsPolicyPage/>,
  },
  {
    path: "privacy-policy",
    element: <PrivacyPolicyPage/>,
  },
]);
