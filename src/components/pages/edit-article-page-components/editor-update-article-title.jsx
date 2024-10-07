import { Input, Skeleton } from "antd";
import { isBrowser } from "react-device-detect";
import classNames from "classnames";
import { useEditArticlePage } from "./context/edit-article-page-context";

const EditorUpdateArticleTitle = ({ ...props }) => {
  const { state, dispatch } = useEditArticlePage();
  const handleChange = (e) => dispatch({ type: "SET_ARTICLE_TITLE", payload: e.target.value });

  if (state.fetch_status.isLoading) return <Skeleton.Input className="w-full min-h-[40px]  rounded-md" active />;

  return (
    <div {...props}>
      <Input
        onChange={handleChange}
        name="article-title"
        value={state?.article_title}
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

export default EditorUpdateArticleTitle;
