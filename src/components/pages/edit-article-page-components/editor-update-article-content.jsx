import { Flex, Skeleton } from "antd";
import useHeader from "../../../hooks/use-header";
import TextEditorComponent from "../../layouts/text-editor/text-edior-component";
import { useEditArticlePage } from "./context/edit-article-page-context";

const EditorUpdateArticleContent = ({ ...props }) => {
  const { isHeaderShown } = useHeader();
  const { state, dispatch } = useEditArticlePage();

  const handleUpdateArticleContent = (value) => dispatch({ type: "SET_ARTICLE_CONTENT", payload: value });
  const handleUpdateArticleContentJson = (value) => dispatch({ type: "SET_ARTICLE_CONTENT_JSON", payload: value });

  if (state.fetch_status.isLoading)
    return (
      <Flex className="w-full" vertical gap="small">
        <Skeleton.Input className="w-full h-16" active />
        <Skeleton.Input className="w-full h-[300px]" active />
      </Flex>
    );

  return (
    <div {...props}>
      <TextEditorComponent
        initialContent={state?.article_content_json}
        handleHtmlValueOnchange={handleUpdateArticleContent}
        handleJsonValueOnchange={handleUpdateArticleContentJson}
        articleId={state?.article_id}
        isHeaderShow={isHeaderShown}
      />
    </div>
  );
};

export default EditorUpdateArticleContent;
