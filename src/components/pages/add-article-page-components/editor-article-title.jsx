import { Input } from "antd";
import { isBrowser } from "react-device-detect";
import classNames from "classnames";
import useSetPostTitle from "../../../features/post/hooks/use-set-post-title";

const EditorArticleTitle = ({ ...props }) => {
  const { handleUpdateArticleTitle, article_title } = useSetPostTitle();

  return (
    <div {...props}>
      <Input
        onChange={handleUpdateArticleTitle}
        name="article-title"
        value={article_title}
        autoComplete="off"
        placeholder="Judul artikel"
        size={isBrowser ? "large" : "middle"}
        className={classNames(
          "bg-transparent placeholder:text-[#58942e] placeholder:opacity-[.5] font-roboto-slab text-base sm:text-xl placeholder:font-roboto-slab placeholder:text-xs placeholder:capitalize"
        )}
      />
    </div>
  );
};

export default EditorArticleTitle;
