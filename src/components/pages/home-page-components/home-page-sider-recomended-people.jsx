import { myThemeConfigs } from "../../../theme/antd-theme";

import { ConfigProvider, Skeleton, Typography } from "antd";
import { ButtonComponentWithComingSoon } from "../../ui/button-component";
import classNames from "classnames";
import { SlUserFollow } from "react-icons/sl";
import useGetUserList from "../../../features/get-user/hooks/use-get-user";
import PropTypes from "prop-types";
import AvatarProfile from "../../ui/avatar-profile";
const { Title, Text } = Typography;

const HomePageSiderRecomendedPeople = () => {
  const { isLoading, userList } = useGetUserList({ limitFetchUserList: 3 });

  return (
    <div
      style={myThemeConfigs.siderBorderStyle}
      className="w-full  z-10 h-fit border-2 flex flex-col justify-between  border-black rounded-md overflow-hidden"
    >
      <Title level={2} className="p-3 bg-[#b8e986] border-b-2 text-base border-black capitalize font-special-elite">
        Rekomendasi untuk diikuti
      </Title>

      {/* RECOMENDED PEOPLE */}
      <div className="w-full p-3 flex flex-col gap-y-5  overflow-y-auto scrollbar-custom">
        {userList.map((user) => (
          <RecomendedPeopleComponent isLoading={isLoading} key={user.doc_id} photoURL={user?.photoUrl} userName={user.name} />
        ))}
      </div>

      {/* BUTTON */}
      <ConfigProvider wave={{ disabled: true }}>
        <ButtonComponentWithComingSoon
          type="primary"
          className="w-full capitalize cursor-pointer font-special-elite p-3 py-2  border-t-2 border-black rounded-none border-l-0 border-r-0 border-b-0"
        >
          lihat semua rekomendasi
        </ButtonComponentWithComingSoon>
      </ConfigProvider>
    </div>
  );
};

export default HomePageSiderRecomendedPeople;

const RecomendedPeopleComponent = ({ isLoading, photoURL, userName }) => {
  if (isLoading) return <LoadingSkeletonComponent />;

  return (
    <div className="w-full flex gap-x-3">
      <AvatarProfile photoURL={photoURL} size={40} userName={userName} />
      <div className="w-full">
        <Title level={3} className={classNames("font-roboto-slab text-base text-black")}>
          {userName}
        </Title>
        <div className="w-full flex items-center justify-between">
          <Text
            className={classNames(
              "text-xs line-clamp-2 leading-5 font-light  text-black font-roboto-slab break-words whitespace-normal max-w-[65%]"
            )}
          >
            no bio yet
          </Text>
          <ButtonComponentWithComingSoon
            type="primary"
            icon={
              <span>
                <SlUserFollow />
              </span>
            }
            className="w-fit capitalize text-xs font-roboto-slab flex items-center"
          >
            ikuti
          </ButtonComponentWithComingSoon>
        </div>
      </div>
    </div>
  );
};

RecomendedPeopleComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  photoURL: PropTypes.string,
  userName: PropTypes.string.isRequired,
};

const LoadingSkeletonComponent = () => {
  return (
    <div className="w-full flex gap-x-3">
      <div>
        <Skeleton.Avatar size={40} active />
      </div>
      <div className="w-full">
        <Skeleton.Input size="small" className="w-10 h-5" active />
        <div className="w-full flex items-center justify-between mt-2">
          <Skeleton.Button size="small" className="w-5/6 h-5" active />
          <Skeleton.Input size="small" className="w-4/12  h-5" active />
        </div>
      </div>
    </div>
  );
};
