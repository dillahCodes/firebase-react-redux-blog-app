import { StyleProvider } from "@ant-design/cssinjs";
import AntdTheme from "./theme/antd-theme";
import useUser from "./features/auth/hooks/use-user";

import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page";
import LoadingScreen from "./components/ui/loading-screen";
import LogInPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import PrivateRouter from "./router/private-router";
import AddArticlePage from "./pages/add-article-page";
import AdminPrivateRouter from "./router/admin-private-router";
import AdminDashboardPage from "./pages/admin-dashboard-page";
import SectionUserEdit from "./components/pages/admin-dashboard-page-components/section-user-edit";
import SectionUserList from "./components/pages/admin-dashboard-page-components/section-user-list";
import SectionArticleWaitAcc from "./components/pages/admin-dashboard-page-components/section-article-wait-acc";
import SectionReportComment from "./components/pages/admin-dashboard-page-components/section-report-comment";
import SectionReportArticle from "./components/pages/admin-dashboard-page-components/section-report-article";
import SectionDeleteArticle from "./components/pages/admin-dashboard-page-components/section-delete-article";
import SectionReportUser from "./components/pages/admin-dashboard-page-components/section-report-user";
import SectionDeleteComment from "./components/pages/admin-dashboard-page-components/section-delete-comment";
import ProfilePageComponent from "./components/pages/profile-page-components";
import ForgotPasswordPage from "./pages/forgot-password-page";
import ComingSoonPage from "./pages/coming-soon-page";
import MyArticlesPageComponents from "./components/pages/my-articles-page-components";
import EditArticlePageComponents from "./components/pages/edit-article-page-components";
import DetailArticle from "./pages/detail-article";
import MobileSearchPage from "./pages/mobile-search-page";
import ArticleTopicPage from "./pages/article-topic-page";

function App() {
  const { status } = useUser();

  if (status === "loading") return <LoadingScreen />;
  return (
    <StyleProvider hashPriority="high">
      <AntdTheme>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/lupa-password" element={<ForgotPasswordPage />} />
          <Route path="/coming-soon" element={<ComingSoonPage />} />

          <Route path="detail-artikel/:id" element={<DetailArticle />} />
          <Route path="topik-artikel/:topik" element={<ArticleTopicPage />} />

          {/* private router */}
          <Route element={<PrivateRouter />}>
            <Route path="tambah-artikel" element={<AddArticlePage />} />
            <Route path="edit-artikel" element={<EditArticlePageComponents />} />
            <Route path="edit-profil" element={<ProfilePageComponent />} />
            <Route path="artikelku" element={<MyArticlesPageComponents />} />
            <Route path="search" element={<MobileSearchPage />} />
          </Route>

          {/* admin dashboard router with admin private router */}
          <Route path="/dashboard-admin" element={<AdminPrivateRouter />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="daftar-pengguna" element={<SectionUserList />} />
            <Route path="edit-pengguna" element={<SectionUserEdit />} />
            <Route path="persetujuan-artikel" element={<SectionArticleWaitAcc />} />
            <Route path="laporan-komentar" element={<SectionReportComment />} />
            <Route path="laporan-artikel" element={<SectionReportArticle />} />
            <Route path="laporan-pengguna" element={<SectionReportUser />} />
            <Route path="hapus-artikel" element={<SectionDeleteArticle />} />
            <Route path="hapus-komentar" element={<SectionDeleteComment />} />
          </Route>
        </Routes>
      </AntdTheme>
    </StyleProvider>
  );
}

export default App;
