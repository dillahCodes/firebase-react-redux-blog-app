import { Flex, Typography } from "antd";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { TbError404 } from "react-icons/tb";
import AvatarProfile from "../../ui/avatar-profile";
import withComingSoonMessage from "../../hoc/with-coming-soon-message";

const { Text } = Typography;
const PeopleResultMapper = ({ peopleList }) => {
  const isPeopleEmpty = useMemo(() => {
    return peopleList.length === 0 || !peopleList;
  }, [peopleList]);

  return (
    <Flex vertical gap="small" className="mt-3">
      <Text className="font-roboto-slab font-light">ORANG</Text>
      {isPeopleEmpty && (
        <Flex align="center" gap="small">
          <Text className="text-xl">
            <TbError404 />
          </Text>
          <Text className="font-roboto-slab capitalize">User Tidak Ditemukan</Text>
        </Flex>
      )}

      {/* people list */}
      <Flex vertical gap="small">
        {peopleList?.map((people) => (
          <UserListComponentWithComingSoon key={people.doc_id} people={people} />
        ))}
      </Flex>
    </Flex>
  );
};

PeopleResultMapper.propTypes = {
  peopleList: PropTypes.array,
};

export default PeopleResultMapper;

const UserListComponent = ({ people, ...props }) => {
  return (
    <Flex
      key={people.doc_id}
      align="center"
      gap="small"
      className="hover:bg-[#b8e986] p-1.5 rounded-sm cursor-pointer group "
      {...props}
    >
      <AvatarProfile key={people.doc_id} photoURL={people?.photoUrl} size={35} userName={people.name} />
      <Text className="group-hover:text-white transition-all duration-150 font-roboto-slab">{people.name}</Text>
    </Flex>
  );
};

UserListComponent.propTypes = {
  people: PropTypes.object,
};

const UserListComponentWithComingSoon = withComingSoonMessage(UserListComponent);
