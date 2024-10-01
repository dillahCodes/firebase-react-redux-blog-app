import { Flex, Tag, Typography } from "antd";
import formatNumber from "../../../utils/format-number";
import { useEditArticlePage } from "./context/edit-article-page-context";
import useEditorUpdateArticleTags from "../../../features/edit-article/hooks/use-editor-update-article-tags";
import useEditorSuggestionArticleTags from "../../../features/edit-article/hooks/use-editor-suggestion-article-tags";

const { Text } = Typography;
const EditorUpdateArticleTag = ({ ...props }) => {
  const { state } = useEditArticlePage();
  const { handleInputTagChange, handleKeyDown } = useEditorUpdateArticleTags();

  return (
    <div {...props}>
      <div className="min-h-[30px] border border-gray-300 gap-0.5 p-3  rounded-md flex items-center flex-wrap relative">
        <EditorArticleTagSuggestion />
        <EditorEditArticleTagList />
        <input
          type="text"
          className="focus:outline-none max-w-full  font-roboto-slab  bg-transparent placeholder:text-xs placeholder:capitalize placeholder:font-roboto-slab placeholder:text-[#58942e] placeholder:opacity-[.5]"
          placeholder="masukan topik artikelmu..."
          value={state.article_current_tag_word}
          name="edit-article-current-tag-word"
          onChange={handleInputTagChange}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
      </div>
    </div>
  );
};
export default EditorUpdateArticleTag;

// tag list
const EditorEditArticleTagList = () => {
  const { state, dispatch } = useEditArticlePage();
  const articleTags = state.article_tags;

  const handleRemoveTagFromArticle = (tag_id) => {
    const result = articleTags.filter((tag) => tag.topic_id !== tag_id);
    dispatch({ type: "SET_ARTICLE_TAGS", payload: result });
  };

  return articleTags?.map((tag) => (
    <Tag
      key={tag.topic_id}
      onClose={() => handleRemoveTagFromArticle(tag.topic_id)}
      closeIcon
      color="#58942e"
      className="text-xs font-roboto-slab"
    >
      {tag.topic_name}
    </Tag>
  ));
};

// tag suggestion
const EditorArticleTagSuggestion = () => {
  const { dataTagsSuggestions, handleSelectTagSuggestion } = useEditorSuggestionArticleTags();

  return (
    <Flex
      vertical
      id="tag-word-list-container"
      className="w-full absolute  max-h-[150px]  overflow-y-auto scrollbar-custom min-h-full top-12 left-0 rounded-md p-2 z-[3] shadow-md  bg-white"
    >
      {dataTagsSuggestions.data.length > 0 &&
        dataTagsSuggestions.data.map((item) => (
          <div
            id="article-current-tag-word"
            onClick={() => handleSelectTagSuggestion(item)}
            key={item.topic_id}
            className="flex gap-x-1 items-center w-full h-full transition-all duration-300 p-1 px-2 rounded-sm group hover:bg-[#58942e]  cursor-pointer"
          >
            <Text className="font-roboto-slab group-hover:text-white">{item.topic_name}</Text>
            <Text className="text-xs group-hover:text-white">({formatNumber(item.topic_count)})</Text>
          </div>
        ))}
    </Flex>
  );
};
