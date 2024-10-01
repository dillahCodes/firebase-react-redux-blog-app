import useGetArticleSliderCategoryHomePage from "../../../features/get-article/hooks/use-get-article-slider-category-home-page";
import ArticleCard, { ArticleCardWithAuthBlur } from "../../layouts/article-card";
import { useHomePageContext } from "./context/home-page-context";
import { IoIosLogIn } from "react-icons/io";
import useUser from "../../../features/auth/hooks/use-user";
import { useNavigate } from "react-router-dom";

const HomePageArticleList = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { state } = useHomePageContext();
  const isFetchDataLoading = state.fetchStatus.isLoading;
  const { isLastArticle } = useGetArticleSliderCategoryHomePage({ category: state.sliderCategorySelected });

  return (
    <div className="w-full h-full">
      {state?.homePageArticleListByCategory?.map((article, index) => (
        <ArticleCard
          goToDetailArticle={() => navigate(`/detail-artikel/${article.doc_id}`)}
          dateEpoch={JSON.parse(JSON.stringify(article?.updatedAt?.seconds))}
          ownerProfile={article.articleOwnerPhotoURL}
          isLoading={isFetchDataLoading && state.sliderCategorySelected.length === 0}
          title={article.title}
          ownerName={article.author_name}
          readingTime={article.content}
          mainImage={article.mainImage}
          articleComment={article.article_comment}
          articleLike={article.article_like}
          isLastItem={index === state.homePageArticleListByCategory.length - 1 && isLastArticle}
          articleViewers={article.article_view}
          index={index}
          key={index}
        />
      ))}

      {/* loader and button for user not login */}
      {!isLastArticle &&
        Array.from({ length: user ? 2 : 1 }).map((_, index) => (
          <ArticleCardWithAuthBlur
            isLastItem={index === 1}
            key={index}
            isLoading
            iconButton={<IoIosLogIn />}
            textButton={"masuk untuk melihat lebih"}
          />
        ))}
    </div>
  );
};

export default HomePageArticleList;
