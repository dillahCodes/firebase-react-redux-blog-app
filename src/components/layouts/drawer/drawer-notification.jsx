import { Layout } from "antd";
import classNames from "classnames";
import PropTypes from "prop-types";

import noNotificationImage from "../../../assets/no-notification.webp";

const DrawerNotification = ({ notificationsData }) => {
  return (
    <Layout
      className={classNames("bg-transparent h-full p-3", {
        "flex items-center justify-center": !notificationsData,
      })}
    >
      {!notificationsData && (
        <div className=" flex items-center flex-col">
          <img src={noNotificationImage} alt="no notifications image" className="w-32" />
          <p className="font-roboto-slab capitalize text-sm drop-shadow-lg">tidak ada notifikasi</p>
        </div>
      )}
    </Layout>
  );
};

export default DrawerNotification;

DrawerNotification.propTypes = {
  notificationsData: PropTypes.array,
};
