import classNames from "classnames";
import { isMobile } from "react-device-detect";
import HeroCarousel from "../../layouts/carousel/hero-carousel";
import useGetMostHighestViewsArticles from "../../../features/get-article/hooks/use-get-most-highest-views-articles";
import { Flex, Skeleton, Typography } from "antd";
import AvatarProfile from "../../ui/avatar-profile";
import { myThemeConfigs } from "../../../theme/antd-theme";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const { Text, Title } = Typography;
const HomePageHeroCarousel = () => {
  const { articleData, isLoading } = useGetMostHighestViewsArticles({ limitFetch: 6 });

  return (
    <div
      className={classNames("w-full border border-black relative overflow-hidden   rounded-md", {
        "rounded-none": isMobile,
      })}
    >
      <div
        className="max-w-md bg-[#b8e986] absolute top-0 left-0 capitalize z-10 p-2 rounded-br-xl"
        style={myThemeConfigs.buttonBorderList}
      >
        <Title level={5} className="font-roboto-slab">
          artikel terpopuler
        </Title>
      </div>

      {isLoading ? (
        <Skeleton.Image active className="w-full h-[350px]" />
      ) : (
        <HeroCarousel childrenLength={articleData.length} dotsPosition="bottom-right">
          {articleData?.map((article) => (
            <HomePageHeroCarouselComponent key={article.doc_id} article={article} />
          ))}
        </HeroCarousel>
      )}
    </div>
  );
};

export default HomePageHeroCarousel;

const HomePageHeroCarouselComponent = ({ article }) => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-[350px] cursor-pointer" onClick={() => navigate(`/detail-artikel/${article.doc_id}`)}>
      {/* Image */}
      <img src={article.mainImage} alt={`image of ${article.title}`} className="w-full h-full object-cover" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#000000c6] to-transparent" />

      {/* Title and avatar */}
      <div className="absolute bottom-5 left-5 z-10 max-w-md ">
        <Flex align="center" gap="small">
          <AvatarProfile size={20} photoURL={article?.articleOwnerPhotoURL} userName={article?.author_name} />
          <Text className="text-slate-100 text-sm font-roboto-slab">{article?.author_name}</Text>
        </Flex>
        <h2 className="text-slate-100  line-clamp-1 font-roboto-slab font-bold text-2xl">{article.title}</h2>
      </div>
    </div>
  );
};

HomePageHeroCarouselComponent.propTypes = {
  article: PropTypes.object,
};
