import { Flex, message, Tag, Typography } from "antd";
import { useEffect } from "react";
import formatNumber from "../../../utils/format-number";
import useSetPostTags from "../../../features/post/hooks/use-set-post-tags";

const { Text } = Typography;
// component for editor article tag
const EditorArticleTag = ({ ...props }) => {
  const { handleUpdateCurrentTagWord, article_current_tag_word, handleAddTagToArticle, messageStatus, setMessageStatus } =
    useSetPostTags();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (messageStatus.isMessageOpen) {
      messageApi.open({
        type: "error",
        content: <Text className="font-roboto-slab capitalize text-xs">{messageStatus.messageText}</Text>,
      });

      setMessageStatus({ isMessageOpen: false, messageText: "" });
    }
  }, [messageStatus, messageApi, setMessageStatus]);

  return (
    <div {...props}>
      {contextHolder}
      <div className="min-h-[30px] border border-gray-300 gap-0.5 p-3  rounded-md flex items-center flex-wrap relative">
        <EditorArticleTagSuggestion />
        <EditorArticleTagList />
        <input
          type="text"
          className="focus:outline-none max-w-full  font-roboto-slab  bg-transparent placeholder:text-xs placeholder:capitalize placeholder:font-roboto-slab placeholder:text-[#58942e] placeholder:opacity-[.5]"
          placeholder="masukan topik artikelmu..."
          value={article_current_tag_word}
          name="article-current-tag-word"
          onChange={handleUpdateCurrentTagWord}
          onKeyDown={handleAddTagToArticle}
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default EditorArticleTag;

// tag list
const EditorArticleTagList = () => {
  const { article_tags, handleRemoveTagFromArticle } = useSetPostTags();
  return article_tags.map((tag) => (
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
  const { article_tags_suggestion, handleAddTagSuggestionsToArticle, messageStatus, setMessageStatus } = useSetPostTags();
  const { data } = article_tags_suggestion;

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (messageStatus.isMessageOpen) {
      messageApi.open({
        type: "error",
        content: <Text className="font-roboto-slab capitalize text-xs">{messageStatus.messageText}</Text>,
      });

      setMessageStatus({ isMessageOpen: false, messageText: "" });
    }
  }, [messageStatus, messageApi, setMessageStatus]);

  return (
    <Flex
      vertical
      id="tag-word-list-container"
      className="w-full absolute  max-h-[150px]  overflow-y-auto scrollbar-custom min-h-full top-12 left-0 rounded-md p-2 z-[3] shadow-md  bg-white"
    >
      {contextHolder}
      {data.length > 0 &&
        data.map((item) => (
          <div
            id="article-current-tag-word"
            onClick={() => handleAddTagSuggestionsToArticle(item)}
            key={item.topic_id}
            className="flex gap-x-1 items-center transition-all duration-300 p-1 px-2 rounded-sm group hover:bg-[#58942e]  cursor-pointer"
          >
            <Text className="font-roboto-slab group-hover:text-white">{item.topic_name}</Text>
            <Text className="text-xs group-hover:text-white">({formatNumber(item.topic_count)})</Text>
          </div>
        ))}
    </Flex>
  );
};
