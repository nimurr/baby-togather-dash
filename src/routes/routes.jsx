/* eslint-disable no-unused-vars */
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import DashboardHome from "../page/DashboardHome/DashboardHome";
import ForgetPassword from "../page/Auth/ForgetPassword/ForgetPassword";
import SignIn from "../page/Auth/SignIn/SignIn";
import Otp from "../page/Auth/Otp/Otp";
import NewPassword from "../page/Auth/NewPassword/NewPassword";
import PersonalInformationPage from "../page/PersonalInformation/PersonalInformationPage";
import SettingsPage from "../page/Settings/SettingsPage";
import PrivacyPolicyPage from "../page/PrivacyPolicy/PrivacyPolicyPage";
import TermsconditionPage from "../page/TermsCondition/TermsconditionPage";
import AboutUsPage from "../page/AboutUs/AboutUsPage";
import UsersPage from "../page/Users/UsersPage";
// import AddItemPage from "../page/AddItem/AddItemPage";
import Notification from "../component/Main/Notification/Notification";
import EditPersonalInformationPage from "../page/EditPersonalInformationPage/EditPersonalInformationPage";
import AdminRoutes from "./AdminRoutes";
import EditPrivacyPolicy from "../page/EditPrivacyPolicy/EditPrivacyPolicy";
import EditTermsConditions from "../page/EditTermsConditions/EditTermsConditions";
import EditAboutUs from "../page/EditAboutUs/EditAboutUs";
import CategoriesPage from "../page/Categories/CategoriesPage";
import EditCategoriesBoxPage from "../page/EditCategoriesBox/EditCategoriesBoxPage";
import EventViewItemPage from "../page/EventViewItem/EventViewItemPage";
import EventItemsPage from "../page/Event/EventPage";
import WelcomePage from "../page/WelcomePage/welcomePage";
import SuggestionPage from "../page/Suggestion/suggestion";
import DonationPage from "../page/DonationPage/DonationPage";
import EditWelcomePage from "../page/EditWelcomePage/EditWelcomePage";
import AddCategoryPage from "../page/AddCategoryPage/AddCategoryPage";
import UsersRequest from "../page/Users/UserRequest";
import UserDetails from "../page/Users/UserDetails";
import UserRequestDetails from "../page/Users/UserRequestDetails";
import UserRequestList from "../page/Users/UserRequestList";
import UserRequestListDetails from "../page/Users/UserRequestListDetails";
import EventItemsPageTonamentDetials from "../page/Event/EventItemsPageTonamentDetials";
import EventItems from "../component/Main/Event/EventItems";
import EventItemsPageTonamentEdit from "../page/Event/EventItemsPageTonamentEdit";
import Earnings from "../page/Earnings/Earnings";
import Collaborator from "../page/Collaborator/Collaborator";
import CollaboratorDetails from "../page/Collaborator/CollaboratorDetails";
import Subscription from "../page/Subscription/Subscription";
import Personalinfo from "../page/ProfileInfo/Personalinfo";
import PersonalinfoEdit from "../page/ProfileInfo/PersonalinfoEdit";
import AllFaq from "../page/Faq/AllFaq";
import AllDocument from "../component/Main/AllDocument/AllDocument";
import Lawyera from "../page/Lawyer/Lawyera";
import PrivetRoute from "../PrivetRoute/PrivetRoute";
import ApartmentCreatorCreate from "../page/Lawyer/ApartmentCreatorCreate";
import ApartmentOwner from "../page/BabyCuse/BabyCuse";
import Apartmentdetails from "../page/BabyCuse/BabyCusedetails";
import SubscriptionUserList from "../page/Subscription/SubscriptionUserList";
import ApartmentCreate from "../page/ApartmentCreate/ApartmentCreate";
import ApartmentCreateAddNew from "../page/ApartmentCreate/ApartmentCreateAddNew";
import ApartmentCreateDetials from "../page/ApartmentCreate/ApartmentCreateDetials";
import BabyCuse from "../page/BabyCuse/BabyCuse";
import BabyCusedetails from "../page/BabyCuse/BabyCusedetails";
import Milestone from "../page/Milestone/Milestone";
import MilestoneDetails from "../page/Milestone/MilestoneDetails";
import BabyCuseSounddetails from "../page/BabyCuse/BabyCuseSounddetails";
import BabyCuseSouthingdetails from "../page/BabyCuse/BabyCuseSouthingdetails";



const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AdminRoutes>
        <MainLayout />
      </AdminRoutes>
    ),
    errorElement: <h1>Error</h1>,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "users/:id",
        element: <UserDetails />,
      },

      {
        path: "baby-cuse",
        element: <BabyCuse />,
      },
      {
        path: "baby-cuse/baby-case-details",
        element: <BabyCusedetails />,
      },
      {
        path: "baby-cuse/sound-details",
        element: <BabyCuseSounddetails />,
      },
      {
        path: "baby-cuse/southing-details",
        element: <BabyCuseSouthingdetails />,
      },



      {
        path: "milestone",
        element: <Milestone />,
      },
      {
        path: "milestone/:id",
        element: <MilestoneDetails />,
      },



      {
        path: "subscription",
        element: <Subscription />,
      },
      {
        path: "subscription/user-list",
        element: <SubscriptionUserList />,
      },


      {
        path: "/notification",
        element: <Notification />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },

      {
        path: "settings/personal-info",
        element: <Personalinfo />,
      },
      {
        path: "settings/personal-info/edit",
        element: <PersonalinfoEdit />,
      },

      {
        path: "settings/privacy-policy",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "/settings/edit-privacy-policy",
        element: <EditPrivacyPolicy />,
      },
      {
        path: "settings/terms-conditions",
        element: <TermsconditionPage />,
      },
      {
        path: "/settings/edit-terms-conditions/:id",
        element: <EditTermsConditions />,
      },
      {
        path: "settings/about-us",
        element: <AboutUsPage />,
      },
      {
        path: "/settings/edit-about-us/:id",
        element: <EditAboutUs />
      },


    ],
  },
  {
    path: "/auth",
    errorElement: <h1>Auth Error</h1>,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
      {
        path: "login",  // Remove the leading slash here
        element: <SignIn />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "otp/:email",
        element: <Otp />,
      },
      {
        path: "new-password/:email",
        element: <NewPassword />,
      },
    ],
  }

]);

export default router;
