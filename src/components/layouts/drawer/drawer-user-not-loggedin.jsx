import { MdOutlineArrowForwardIos } from "react-icons/md";
import ButtonComponent from "../../ui/button-component";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const DrawerUserNotLoggedIn = () => {
  const navigate = useNavigate();
  return (
    <div className="p-3">
      <div className="w-full font-roboto-slab capitalize max-w-2xl mx-auto">
        <p className="text-sm">
          Gabung bersama <span className="font-bold">matcha.coders</span> dan mulai menulis! ✍️
        </p>

        <ButtonComponent className="w-full font-roboto-slab" type="primary" onClick={() => navigate("/register")}>
          Daftar Sekarang
        </ButtonComponent>

        <div className="w-full my-5">
          <p className="capitalize font-roboto-slab mb-0">
            sudah punya akun?{" "}
            <span className="underline font-bold" onClick={() => navigate("/login")}>
              masuk di sini
            </span>
          </p>
        </div>

        {/* menu list */}
        <div className="w-full font-roboto-slab">
          {DrawerMenuUserIsLoggedIn.map((item) => (
            <div
              className="w-full flex cursor-pointer items-center text-base py-3 border-t border-b justify-between "
              key={item.id}
            >
              <span className="mb-0 font-medium">{item.category}</span>
              <span>
                <MdOutlineArrowForwardIos />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrawerUserNotLoggedIn;

const DrawerMenuUserIsLoggedIn = [
  {
    id: uuidv4(),
    category: "teknologi",
  },
  {
    id: uuidv4(),
    category: "fashion",
  },
  {
    id: uuidv4(),
    category: "kecantikan",
  },
  {
    id: uuidv4(),
    category: "makanan",
  },
  {
    id: uuidv4(),
    category: "kesehatan",
  },
  {
    id: uuidv4(),
    category: "keuangan",
  },
  {
    id: uuidv4(),
    category: "otomotif",
  },
  {
    id: uuidv4(),
    category: "seni",
  },
  {
    id: uuidv4(),
    category: "pendidikan",
  },
  {
    id: uuidv4(),
    category: "travel",
  },
  {
    id: uuidv4(),
    category: "musik",
  },
  {
    id: uuidv4(),
    category: "film",
  },
  {
    id: uuidv4(),
    category: "kuliner",
  },
  {
    id: uuidv4(),
    category: "literatur",
  },
  {
    id: uuidv4(),
    category: "fotografi",
  },
];
