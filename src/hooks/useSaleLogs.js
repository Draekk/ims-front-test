import { useEffect, useState } from "react";

function useSaleLogs() {
  const defaultDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return {
      initDate: today.getTime(),
      finalDate: today.getTime(),
    };
  };

  const [sales, setSales] = useState([]);
  const [allSales, setAllSales] = useState([]);
  const [searchModal, setSearchModal] = useState(false);
  const [dateRange, setDateRange] = useState(defaultDate);

  //--------------------------UI FUNCTIONS

  function toggleModal() {
    setSearchModal(!searchModal);
  }

  function dateFactory(e) {
    const { name, value } = e.target;
    setDateRange({
      ...dateRange,
      [name]: new Date(value).getTime(),
    });
  }

  //--------------------------LOGIC

  function filterSales() {
    const filteredSales = allSales.filter((s) => {
      const saleDate = new Date(s.createdAt).getTime();
      const DAY = 86400000;
      return (
        saleDate >= dateRange.initDate && saleDate <= dateRange.finalDate + DAY
      );
    });

    setSales(filteredSales);
    setDateRange(defaultDate);
  }

  function resetSales() {
    setSales([...allSales]);
  }

  //--------------------------NON EXPORTABLE FUNCTIONS

  async function getSales() {
    try {
      const res = await fetch("/api/sale/find/all/1");
      const data = await res.json();

      setAllSales(data.data);
      setSales(data.data);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getSales();
  }, []);

  return {
    sales,
    dateRange,
    searchModal,
    toggleModal,
    dateFactory,
    filterSales,
    resetSales,
  };
}

export default useSaleLogs;
