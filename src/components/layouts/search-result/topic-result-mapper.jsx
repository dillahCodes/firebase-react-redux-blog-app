import { Flex, Typography } from "antd";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { RiArticleLine } from "react-icons/ri";
import { TbError404 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const TopicResultMapper = ({ topicList }) => {
  const navigate = useNavigate();
  const isPeopleEmpty = useMemo(() => {
    return topicList.length === 0 || !topicList;
  }, [topicList]);

  return (
    <Flex vertical gap="small" className="mt-3">
      <Text className="font-roboto-slab font-light">TOPIK</Text>
      {isPeopleEmpty && (
        <Flex align="center" gap="small">
          <Text className="text-xl">
            <TbError404 />
          </Text>
          <Text className="font-roboto-slab capitalize">Topik Tidak Ditemukan</Text>
        </Flex>
      )}

      {/* topic list */}
      <Flex vertical gap="small">
        {topicList?.map((topic) => (
          <Flex
            gap="small"
            key={topic.doc_id}
            className="hover:bg-[#b8e986] p-1.5 rounded-sm group cursor-pointer"
            onClick={() => navigate(`/topik-artikel/${topic.topic_name}`)}
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
              {topic.topic_name}
            </Title>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

TopicResultMapper.propTypes = {
  topicList: PropTypes.array,
};

export default TopicResultMapper;
