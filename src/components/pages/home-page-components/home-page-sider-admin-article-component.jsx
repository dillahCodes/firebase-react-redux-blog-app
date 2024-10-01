import { Skeleton, Typography } from "antd/es/index";

const { Title } = Typography;
const HomePageSiderAdminArticleComponent = () => {
  return (
    <div className="w-full border h-[100px] border-black flex gap-x-3 rounded-md">
      <div className="w-[140px] h-auto">
        <Skeleton.Image active className="w-full h-full" />
      </div>
      <div className="w-full p-1">
        <Title className="text-sm text-black  font-bold font-courier-prime hover:underline font-roboto-slab cursor-pointer pr-1 line-clamp-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.
        </Title>
        <p className="text-xs m-0 mt-3  text-black font-light font-roboto-slab">{new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default HomePageSiderAdminArticleComponent;
