import { Tour } from "antd";
import { useAddArticlePageTour } from "./context/tour-add-article-page-context";

const TourSteps = ({ handleCloseTour, handleOpenFloatingButton, handleCloseFloatingButton }) => {
  return [
    {
      title: <p className="capitalize text-base font-roboto-slab">Judul Artikel</p>,
      description: <p className="capitalize text-xs sm:text-sm">Masukkan judul artikel kamu di sini 📓</p>,
      target: () => document.getElementById("add-article-title-input"),
      onClose: handleCloseTour,
      prevButtonProps: {
        children: "Kembali",
      },
      nextButtonProps: {
        children: "Lanjut",
      },
    },
    {
      title: <p className="capitalize text-base font-roboto-slab">Topik Artikel</p>,
      description: (
        <p className="capitalize text-xs sm:text-sm">
          Masukkan topik artikelmu di sini 📝, maksimal 5 topik untuk setiap artikel
        </p>
      ),
      target: () => document.getElementById("add-article-tag-input"),
      onClose: handleCloseTour,
      prevButtonProps: {
        children: "Kembali",
      },
      nextButtonProps: {
        children: "Lanjut",
      },
    },
    {
      title: <p className="capitalize text-base font-roboto-slab">Gambar Utama</p>,
      description: (
        <p className="capitalize text-xs sm:text-sm">
          Pilih gambar utama artikelmu di sini, jika kamu sudah memilih gambar klik lagi untuk mengubah gambarmu saat ini📸
        </p>
      ),
      onClose: handleCloseTour,
      prevButtonProps: {
        children: "Kembali",
      },
      nextButtonProps: {
        children: "Lanjut",
      },
      target: () => document.getElementById("add-article-main-image"),
    },
    {
      title: <p className="capitalize text-base font-roboto-slab">Konten Artikel</p>,
      description: (
        <p className="capitalize text-xs sm:text-sm">
          Tambahkan konten artikelmu di sini. Kamu bisa menambahkan teks, gambar, video, dan lainnya ✍️📷🎥
        </p>
      ),
      onClose: handleCloseTour,
      prevButtonProps: {
        children: "Kembali",
      },
      nextButtonProps: {
        children: "Lanjut",
      },
      target: () => document.getElementById("add-article-text-editor-article"),
    },
    {
      title: <p className="capitalize text-base font-roboto-slab">Posting Artikel</p>,
      description: <p className="capitalize text-xs sm:text-sm">Klik tombol di bawah ini untuk mengirimkan artikelmu 🚀</p>,
      onClose: handleCloseTour,
      prevButtonProps: {
        children: "Kembali",
      },
      nextButtonProps: {
        children: "Lanjut",
        onClick: handleOpenFloatingButton,
      },
      target: () => document.getElementById("floating-button-group"),
    },
    {
      title: <p className="capitalize text-base font-roboto-slab">Kirim Artikel</p>,
      description: (
        <p className="capitalize text-xs sm:text-sm">
          Klik tombol di bawah ini untuk mengirimkan artikelmu. Artikelmu akan direview dulu sebelum diterbitkan 🔍
        </p>
      ),
      onClose: handleCloseTour,
      prevButtonProps: {
        children: "Kembali",
        onClick: handleCloseFloatingButton,
      },
      nextButtonProps: {
        children: "Lanjut",
      },
      target: () => document.getElementById("floating-button-send"),
    },
    {
      title: <p className="capitalize text-base font-roboto-slab">Simpan Draft</p>,
      description: (
        <p className="capitalize text-xs sm:text-sm">Klik tombol di bawah ini untuk menyimpan artikelmu sebagai draft 💾</p>
      ),
      onClose: handleCloseTour,
      prevButtonProps: {
        children: "Kembali",
      },
      nextButtonProps: {
        children: "Lanjut",
      },
      target: () => document.getElementById("floating-button-draft"),
    },
    {
      title: <p className="capitalize text-base font-roboto-slab">pertinjau Artikel</p>,
      description: (
        <p className="capitalize text-xs sm:text-sm">
          Klik tombol di bawah ini untuk memperlihatkan artikelmu sebelum diterbitkan 👀
        </p>
      ),
      onClose: handleCloseTour,
      prevButtonProps: {
        children: "Kembali",
      },
      nextButtonProps: {
        children: "Lanjut",
      },
      target: () => document.getElementById("floating-button-preview"),
    },
    {
      title: <p className="capitalize text-base font-roboto-slab">Paduan Penggunaan</p>,
      description: <p className="capitalize text-xs sm:text-sm">Klik tombol di bawah ini untuk memulai tour dari awal🔄️</p>,
      onClose: handleCloseTour,
      prevButtonProps: {
        children: "Kembali",
      },
      nextButtonProps: {
        children: "Selesai",
        onClick: handleCloseFloatingButton,
      },
      target: () => document.getElementById("floating-button-help"),
    },
  ];
};

const TourPage = () => {
  const { state, dispatch } = useAddArticlePageTour();
  const { isTourAddArticlePageActive } = state;

  const handleCloseTour = () => dispatch({ type: "SET_IS_TOUR_ADD_ARTICLE_PAGE_ACTIVE", payload: false });
  const handleOpenFloatingButton = () => dispatch({ type: "SET_IS_FLOATING_SEND_BUTTON_ACTIVE", payload: true });
  const handleCloseFloatingButton = () => dispatch({ type: "SET_IS_FLOATING_SEND_BUTTON_ACTIVE", payload: false });

  return (
    <Tour
      open={isTourAddArticlePageActive}
      onClose={handleCloseTour}
      steps={TourSteps({ handleCloseTour, handleOpenFloatingButton, handleCloseFloatingButton })}
    />
  );
};

export default TourPage;
