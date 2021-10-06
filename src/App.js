import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [iphones, setIphones] = useState();
  const initialState = {
    minPrice: "",
    maxPrice: "",
    brand: "Apple,Samsung,Google,Huawei,LG,Motorola,OnePlus",
    category: "Smartphones",
    storageSize: "",
    grade: "",
    name: "",
  };
  const [data, setData] = useState(initialState);
  const [search, setSearch] = useState({ multiline: "", commaSeperated: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://ezeapi-prod-copy.herokuapp.com/api/v1/sell-request/in-stock?sort=new&limit=20&page=1&minPrice=${minPrice}&maxPrice=${maxPrice}&storageSizeString=${storageSize}&conditionString=${grade}&category=${category}&brand=${brand}`
      );

      console.log(res?.data?.data?.data, commaSeperated);
      const iphoneArray = res?.data?.data?.data;
      setIphones(iphoneArray);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: [e.target.value] });
  };

  const handleCommaSeperatedChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const a = commaSeperated.split(",").map((v) => {
      return v;
    });
    setData({ ...data, name: a[0], grade: a[1], storageSize: a[2] });
  }, [search]);

  const { minPrice, maxPrice, brand, category, storageSize, grade, name } =
    data;
  const { commaSeperated, multiline } = search;
  return (
    <div className="w-full">
      <form onSubmit={onSubmit} className="flex w-full items-center justify-center flex-wrap p-5 px-16 ">
        <input
          placeholder="min price"
          value={minPrice}
          name="minPrice"
          onChange={onChange}
          className="border border-gray-300 p-1 rounded-md outline-none mr-2 mb-2 "
        />
        <input
          placeholder="Eg: “iphoNe Xs, a1, 128gB"
          value={commaSeperated}
          name="commaSeperated"
          onChange={handleCommaSeperatedChange}
          className="border border-gray-300 p-1 rounded-md outline-none mr-2 mb-2 "
        />
        <input
          placeholder="max price"
          value={maxPrice}
          name="maxPrice"
          onChange={onChange}
          className="border border-gray-300 p-1 rounded-md outline-none mr-2 mb-2 "
        />
        <button
          type="submit"
          className="border bg-black border-black text-white text-center mr-2 py-1 px-8 rounded-md mb-2 "
        >
          Load Iphones
        </button>
      </form>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:mx-8">
          <div className="py-2 align-middle inline-block min-w-full md:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Brand
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {iphones
                    ?.filter((a) => a?.name.includes(name))
                    .map((iphone) => (
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-20 w-20">
                              <img
                                className="h-20 w-20 rounded-full"
                                src={iphone?.imgUrl}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {iphone?.name}
                              </div>
                              <div className="text-sm text-gray-500  border border-dashed px-2 my-1 ">
                                {iphone?._id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {iphone?.category}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {iphone?.brand}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
