const TableBodySkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((e) => (
        <tr key={e} className="animate-pulse">
          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0 text-justify">
            <div>
              <div className="flex flex-row space-x-1">
                <div className="h-4 w-4 bg-gray-300" />
                <div className="h-4 w-40 bg-gray-300" />
              </div>
              <div className="h-2 w-56 bg-gray-300 mt-2" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TableBodySkeleton;
