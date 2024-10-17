import React from 'react';

const SubCategoriesTable = ({ categoriesWithSubcategories }: any) => {
  const flattenedSubCategories = Object.keys(categoriesWithSubcategories).flatMap((categoryKey) => {
    const category = categoriesWithSubcategories[categoryKey];
    return category.subcategories.map((subcategory: any) => ({
      subCategory: subcategory.name,
      category: category.name,
      status: 'Active', 
      id: subcategory.id,
    }));
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Sub Category</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {flattenedSubCategories.map((item: any) => (
            <tr key={item.id} className="text-center">
              <td className="py-2 px-4 border-b">{item.subCategory}</td>
              <td className="py-2 px-4 border-b">{item.category}</td>
              <td
                className={`py-2 px-4 border-b ${
                  item.status === 'Active' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {item.status}
              </td>
              <td className="py-2 px-4 border-b flex justify-center">
                <button className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                {/* <button className="bg-red-500 text-white px-3 py-1 rounded ml-2">Delete</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubCategoriesTable;
