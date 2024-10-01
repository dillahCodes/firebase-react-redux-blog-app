import { Flex, Typography } from "antd";
import useGetMyArticle from "../../../features/myarticle/hooks/use-get-myarticle";
import { useMyArticlesPage } from "./context/my-articles-page-context";
import MyArticleCard from "./my-article-card";
import emptyIlustration from "../../../assets/Empty-pana.svg";

const { Text } = Typography;
const ListMyArticle = () => {
  useGetMyArticle();
  const { state } = useMyArticlesPage();
  const { articleData } = state;

  if (articleData.length === 0)
    return (
      <Flex gap="small" justify="center" align="center" vertical>
        <img src={emptyIlustration} alt="empty illustration" className="max-w-52 sm:max-w-xs" />
        <Text className="text-sm font-roboto-slab">Tidak ada artikel yang ditampilkan</Text>
        <Text className="text-xs font-roboto-slab text-center">
          &copy; svg by{" "}
          <a className="font-bold underline" href="https://storyset.com/illustration/empty/pana#58942EFF&hide=&hide=complete">
            storyset
          </a>
        </Text>
      </Flex>
    );

  return (
    <Flex gap="middle" wrap justify={articleData.length > 2 && "space-around"}>
      {articleData?.map((article) => (
        <MyArticleCard key={article.doc_id} articleId={article.doc_id} />
      ))}
    </Flex>
  );
};

export default ListMyArticle;
