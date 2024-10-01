import { Flex, Layout, Skeleton } from "antd";
import classNames from "classnames";

const LoaderCardTopic = () => {
  return (
    <Layout
      className={classNames("w-full sm:flex-[1_30%] md:flex-[1_25%] lg:flex-[1_16%]   rounded-md overflow-hidden cursor-pointer")}
    >
      {/* image loader */}
      <div className="w-full h-[300px]">
        <Skeleton.Image className="w-full h-full" active />
      </div>

      {/* content */}
      <div className="p-2">
        {/* avatar and userName */}
        <Flex gap="small" align="center" className="my-3">
          <Skeleton.Avatar size={30} active />
          <Skeleton.Input size="small" className="w-10 h-5" active />
        </Flex>

        {/* title */}
        <Skeleton.Input size="small" className="w-2/3 ml-[19px] h-5" active />
      </div>
    </Layout>
  );
};

export default LoaderCardTopic;
