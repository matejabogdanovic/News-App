import {
  createHashRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import { NavLinks } from "./components/Navbar";
import ArticlePage from "./pages/ArticlePage";
import ArticleListingsPage from "./pages/ArticleListingsPage";
import AddArticlePage from "./pages/AddArticlePage";
import EditArticlePage from "./pages/EditArticlePage";
import NoGoBackButtonLayout from "./layouts/NoGoBackButtonLayout";
import {
  addArticle,
  articleLoader,
  deleteArticle,
  editArticle,
} from "./services/api_calls";
const App = () => {
  console.log("app");
  const links: NavLinks[] = [
    { text: "news", to: "/" },
    { text: "sport", to: "/sport" },
    { text: "business", to: "/business" },
    { text: "technology", to: "/technology" },
  ];
  const availableTags = ["sport", "business", "technology"];

  const doesCategoryExist = (category: string): boolean =>
    links.some((link) => link.text === category);

  const routerChildren: RouteObject[] = links.slice(1).map((link, i) => {
    return {
      path: link.to,
      element: <ArticleListingsPage category={link.text} key={i} />,
      errorElement: <ErrorPage />,
    };
  });
  routerChildren.push({
    path: "/:category/:id",
    element: (
      <ArticlePage
        doesCategoryExist={doesCategoryExist}
        deleteArticle={deleteArticle}
      />
    ),
    errorElement: <ErrorPage />,
    loader: articleLoader,
  });

  const router = createHashRouter([
    {
      path: "/",
      element: <MainLayout links={links} />,
      errorElement: <ErrorPage />,
      children: routerChildren,
    },
    {
      element: <NoGoBackButtonLayout links={links} />,
      children: [
        {
          index: true,
          path: links[0].to,
          element: <HomePage category={links[0].text} links={links.slice(1)} />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/:category/add-article",
          element: (
            <AddArticlePage
              availableTags={availableTags}
              doesCategoryExist={doesCategoryExist}
              addArticle={addArticle}
            />
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: "/:category/edit-article/:id",
          element: (
            <EditArticlePage
              availableTags={availableTags}
              doesCategoryExist={doesCategoryExist}
              editArticle={editArticle}
            />
          ),
          loader: articleLoader,
          errorElement: <ErrorPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
