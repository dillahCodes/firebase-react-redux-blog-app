import { Select, Table } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";
import { MdChat } from "react-icons/md";
import useGetMostPopularUser from "../../../features/admin/hooks/use-get-most-pupuler-user";
import { myThemeConfigs } from "../../../theme/antd-theme";
import ButtonComponent from "../../ui/button-component";

// Options untuk Select Dropdown
const selectDataViewOptions = [
  { value: 10, label: "10 Data" },
  { value: 20, label: "20 Data" },
  { value: 50, label: "50 Data" },
  { value: 100, label: "100 Data" },
];

const selectFilterByOptions = [
  { value: "followers", label: "Pengikut" },
  { value: "articles", label: "Artikel" },
];

// Kolom untuk Tabel
const columns = [
  {
    title: <p className="m-0 capitalize font-roboto-slab">Nama</p>,
    dataIndex: "nama",
    key: "nama",
    fixed: "left",
    render: (text) => <p className="font-roboto-slab m-0 h-full">{text}</p>,
  },
  {
    title: <p className="m-0 capitalize font-roboto-slab">Email</p>,
    dataIndex: "email",
    key: "email",
    render: (text) => <p className="font-roboto-slab m-0 h-full">{text}</p>,
  },
  {
    title: <p className="m-0 capitalize font-roboto-slab">Role</p>,
    dataIndex: "role",
    key: "role",
    render: (text) => <p className="font-roboto-slab m-0 h-full">{text}</p>,
  },
  {
    title: <p className="m-0 capitalize font-roboto-slab">Total Pengikut</p>,
    dataIndex: "pengikut",
    key: "pengikut",
    render: (text) => <p className="font-roboto-slab m-0 h-full">{text}</p>,
  },
  {
    title: <p className="m-0 capitalize font-roboto-slab">Total Artikel</p>,
    dataIndex: "artikel",
    key: "artikel",
  },
  {
    title: <p className="m-0 capitalize font-roboto-slab">Aksi</p>,
    dataIndex: "aksi",
    key: "aksi",
    render: (_, record) => <ActionButton doc_id={record.doc_id} />,
  },
];

const ActionButton = () => {
  return (
    <ButtonComponent type="primary" className="capitalize flex items-center font-roboto-slab">
      <MdChat />
      <span>Hubungi</span>
    </ButtonComponent>
  );
};

ActionButton.propTypes = {
  doc_id: PropTypes.string.isRequired,
};

// format data for matching with table column
const formatCountToLocal = (count) => new Intl.NumberFormat("id-ID").format(count);
const mappingTableData = (dataList) =>
  dataList?.map((data) => ({
    key: data.id,
    nama: data.name,
    email: data.email,
    role: data.role,
    pengikut: formatCountToLocal(data.followers),
    artikel: formatCountToLocal(data.articles),
    doc_id: data.doc_id,
  }));

const MostPopularUsersTable = () => {
  const [selectedFilterBy, setSelectedFilterBy] = useState(selectFilterByOptions[0].value);
  const [selectedDataViewOption, setSelectedDataViewOption] = useState(selectDataViewOptions[0].value);
  const { userData, loading } = useGetMostPopularUser(selectedDataViewOption, selectedFilterBy);

  const handleFilterByChange = (value) => setSelectedFilterBy(value);
  const handleDataViewOptionChange = (value) => setSelectedDataViewOption(value);

  return (
    <div className="w-full px-3 rounded-md bg-[#b8e986]" style={myThemeConfigs.buttonBorderList}>
      <div className="w-full flex items-center justify-between flex-wrap mb-3">
        <h2 className="capitalize font-roboto-slab m-0 py-3">Pengguna Terpopuler</h2>
        <div className="flex items-center gap-x-2">
          <p className="m-0 font-roboto-slab capitalize">Filter Berdasarkan</p>
          <Select
            value={selectedFilterBy}
            className="font-roboto-slab capitalize"
            onChange={handleFilterByChange}
            options={selectFilterByOptions}
            dropdownStyle={{ backgroundColor: "#fafff0" }}
          />
        </div>
      </div>
      <Table
        loading={loading}
        columns={columns}
        scroll={{ x: "max-content" }}
        pagination={false}
        dataSource={mappingTableData(userData)}
      />
      <div className="max-w-[300px] flex items-center flex-wrap md:flex-nowrap capitalize font-roboto-slab gap-x-3 mt-5 pb-3">
        <p className="m-0 font-roboto-slab capitalize">Tampilkan</p>
        <Select
          value={selectedDataViewOption}
          className="font-roboto-slab capitalize"
          onChange={handleDataViewOptionChange}
          options={selectDataViewOptions}
          dropdownStyle={{ backgroundColor: "#fafff0" }}
        />
      </div>
    </div>
  );
};

export default MostPopularUsersTable;
