import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// const articleId = uuidv4();
const initialState = {
  article_id: "",
  article_title: "",

  article_tags: [],
  article_tags_suggestion: {
    isLoading: false,
    isError: false,
    data: [],
  },
  article_current_tag_word: "",

  main_image_content: null,
  main_image_content_url: "",

  article_content: "<p>tulis idemu ... 💫</p> ",

  is_preview_page_active: false,
};

const postDataSlice = createSlice({
  name: "postDataState",
  initialState,
  reducers: {
    updateArticleId: (state, action) => {
      state.article_id = action.payload;
    },
    updateArticleTitle: (state, action) => {
      state.article_title = action.payload;
    },

    addTagToArticle: (state, action) => {
      state.article_tags = [
        ...state.article_tags,
        {
          topic_id: uuidv4(),
          topic_name: action.payload,
          topic_count: 0,
        },
      ];
    },
    addTagSuggestionsToArticle: (state, action) => {
      state.article_tags = [
        ...state.article_tags,
        {
          topic_id: action.payload.topic_id,
          topic_name: action.payload.topic_name,
          topic_count: action.payload.topic_count,
        },
      ];
    },
    removeTagFromArticle: (state, action) => {
      state.article_tags = state.article_tags.filter((tag) => tag.topic_id !== action.payload);
    },

    updateTagSuggestions: (state, action) => {
      state.article_tags_suggestion.data = action.payload.data;
      state.article_tags_suggestion.isError = action.payload.isError;
      state.article_tags_suggestion.isLoading = action.payload.isLoading;
    },
    updateCurrentTagWord: (state, action) => {
      state.article_current_tag_word = action.payload;
    },

    updateMainImageContent: (state, action) => {
      state.main_image_content = action.payload;
    },

    updateMainImageContentUrl: (state, action) => {
      state.main_image_content_url = action.payload;
    },

    updateArticleContent: (state, action) => {
      state.article_content = action.payload;
    },

    updateIsPreviewPageActive: (state, action) => {
      state.is_preview_page_active = action.payload;
    },

    resetPostDataState: () => {
      return initialState;
    },
  },
});

export const {
  updateArticleId,
  updateArticleTitle,
  addTagToArticle,
  addTagSuggestionsToArticle,
  removeTagFromArticle,
  updateTagSuggestions,
  updateCurrentTagWord,
  updateMainImageContent,
  updateMainImageContentUrl,
  updateArticleContent,
  updateIsPreviewPageActive,
  resetPostDataState,
} = postDataSlice.actions;
export default postDataSlice.reducer;
