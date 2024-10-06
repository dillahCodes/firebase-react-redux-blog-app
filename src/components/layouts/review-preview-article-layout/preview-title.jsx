import { Typography } from "antd";
import classNames from "classnames";
import PropTypes from "prop-types";

const { Title } = Typography;
const PreviewArticleTitle = ({ title }) => {
  return (
    <Title
      className={classNames("font-roboto-slab text-xl sm:text-2xl capitalize mt-6", {
        "opacity-[.5]": !title,
      })}
    >
      {title || "Kamu Belum Memasukan Judul Artikel..."}
    </Title>
  );
};

export default PreviewArticleTitle;

PreviewArticleTitle.propTypes = {
  title: PropTypes.string,
};
