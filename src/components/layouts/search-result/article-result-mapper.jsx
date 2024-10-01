import { Flex, Typography } from "antd";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { RiArticleLine } from "react-icons/ri";
import { TbError404 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const { Text, Title } = Typography;
const ArticleResultMapper = ({ articleList }) => {
  const navigate = useNavigate();
  const isArticleEmpty = useMemo(() => {
    return articleList.length === 0 || !articleList;
  }, [articleList]);

  return (
    <Flex vertical gap="small">
      <Text className="font-roboto-slab font-light">ARTIKEL</Text>
      {isArticleEmpty && (
        <Flex align="center" gap="small">
          <Text className="text-xl">
            <TbError404 />
          </Text>
          <Text className="font-roboto-slab capitalize">Artikel Tidak Ditemukan</Text>
        </Flex>
      )}
      <Flex vertical gap="small">
        {articleList.map((article) => (
          <Flex
            gap="small"
            key={article.doc_id}
            className="hover:bg-[#b8e986] p-1.5 rounded-sm group cursor-pointer"
            onClick={() => navigate(`/detail-artikel/${article.doc_id}`)}
          >
            <span className="text-[#b8e986] group-hover:text-[#dcfab6] transition-all duration-300">
              <RiArticleLine />
            </span>
            <Title
              level={2}
              className={classNames(
                " text-sm  hover:underline cursor-pointer transition-all duration-300  font-special-elite group-hover:text-[#fafff0] "
              )}
            >
              {article.title}
            </Title>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

ArticleResultMapper.propTypes = {
  articleList: PropTypes.array.isRequired,
};

export default ArticleResultMapper;
