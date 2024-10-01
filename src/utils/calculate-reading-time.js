import DOMPurify from "dompurify";

const calculateReadingTime = (content, wordsPerMinute = 200) => {
  const clean = DOMPurify.sanitize(content);

  const wordCount = clean.split(/\s+/).filter((word) => word.length > 0).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return `${readingTime} menit membaca`;
};

export default calculateReadingTime;
