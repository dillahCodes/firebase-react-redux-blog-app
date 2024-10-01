import { useEffect } from "react";
import { history } from "../store/store";

/**
 * useBeforeUnload hook is a hook that will ask user for confirmation
 * before leaving the page. This hook is useful when you want to prevent
 * user from leaving the page when they are in the middle of doing something
 * such as writing a post or filling out a form.
 *
 * @param {string} message - The message that will be shown to the user in the
 *   confirmation dialog.
 * @param {boolean} when - A boolean that indicates whether to show the
 *   confirmation dialog or not.
 * @param {boolean} ignore - If true, the REPLACE action will be ignored and
 *   the confirmation dialog will not be shown.
 * @param {function} afterOk - A function that will be called when the user
 *   confirms the navigation.
 * @param {function} afterCancel - A function that will be called when the
 *   user cancels the navigation.
 */

const useBeforeUnload = ({ message, when, ignore = false, afterOk, afterCancel }) => {
  useEffect(() => {
    if (!when) return;

    // read doc: https://github.com/remix-run/history/blob/main/docs/api-reference.md#history.block
    const unblockNavigation = history.block((transition) => {
      if (ignore && transition.action === "REPLACE") return; // when ignore is true, ignore REPLACE action. REPLACE action is if user navigate in same url.

      const confirmNavigation = window.confirm(message);
      if (confirmNavigation) {
        unblockNavigation();
        afterOk && afterOk();
        transition.retry();
      } else {
        afterCancel && afterCancel();
        history.forward();
      }
    });

    return () => unblockNavigation();
  }, [message, when, ignore, afterOk, afterCancel]);
};

export default useBeforeUnload;
