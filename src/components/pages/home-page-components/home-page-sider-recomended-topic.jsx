import { myThemeConfigs } from "../../../theme/antd-theme";

import { ConfigProvider, Spin, Typography } from "antd";
import ButtonComponent, { ButtonComponentWithAuthModal, ButtonComponentWithComingSoon } from "../../ui/button-component";
import classNames from "classnames";
import useGetTopics from "../../../features/get-topics/hooks/use-get-topics";
import PropTypes from "prop-types";
import useUser from "../../../features/auth/hooks/use-user";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

const HomePageSiderRecomendedTopic = () => {
  const navigate = useNavigate();
  const { topics, isLoading } = useGetTopics({ fetchLimit: 10 });

  return (
    <HomePageSiderRecomendedTopicWrapper>
      {isLoading ? (
        <Spin className="mx-auto my-5" />
      ) : (
        topics.map((topic) => (
          <ButtonComponent
            type="primary"
            key={topic.doc_id}
            className="w-fit font-special-elite"
            onClick={() => navigate(`/topik-artikel/${topic.topic_name}`)}
          >
            {topic.topic_name}
          </ButtonComponent>
        ))
      )}
    </HomePageSiderRecomendedTopicWrapper>
  );
};

export default HomePageSiderRecomendedTopic;

const HomePageSiderRecomendedTopicWrapper = ({ children }) => {
  const { user } = useUser();
  return (
    <div
      style={myThemeConfigs.siderBorderStyle}
      className={classNames("w-full h-fit border-2 flex flex-col justify-between  border-black rounded-md overflow-hidden")}
    >
      <Title level={2} className="p-3 bg-[#b8e986] border-b-2 text-base border-black capitalize font-special-elite">
        rekomendasi topik
      </Title>
      <div className="w-full p-3 flex   overflow-y-auto scrollbar-custom flex-wrap gap-3">{children}</div>
      <ConfigProvider wave={{ disabled: true }}>
        {user ? (
          <ButtonComponentWithComingSoon
            type="primary"
            className="w-full capitalize cursor-pointer font-special-elite p-3 py-2  border-t-2 border-black rounded-none border-l-0 border-r-0 border-b-0"
          >
            lihat semua rekomendasi
          </ButtonComponentWithComingSoon>
        ) : (
          <ButtonComponentWithAuthModal
            type="primary"
            className="w-full capitalize cursor-pointer font-special-elite p-3 py-2  border-t-2 border-black rounded-none border-l-0 border-r-0 border-b-0"
          >
            lihat semua rekomendasi
          </ButtonComponentWithAuthModal>
        )}
      </ConfigProvider>
    </div>
  );
};
HomePageSiderRecomendedTopicWrapper.propTypes = {
  children: PropTypes.node,
};
