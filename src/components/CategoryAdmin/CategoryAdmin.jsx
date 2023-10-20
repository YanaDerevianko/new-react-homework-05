import React, { useReducer, useState } from "react";

export const CategoryAdmin = () => {

  const categoryReducer = (state, action) => {
    switch (action.type) {
      case "ADD_CATEGORY":
        return [...state, action.payload];
      case "EDIT_CATEGORY":
        const updatedCategories = [...state];
        updatedCategories[action.payload.index] = action.payload.category;
        return updatedCategories;
      case "DELETE_CATEGORY":
        return state.filter((_, index) => index !== action.payload);
      default:
        return state;
    }
  };

  const [categories, dispatch] = useReducer(categoryReducer, []);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

  const addCategory = () => {
    if (newCategory.trim() === "") {
      return;
    }

    dispatch({ type: "ADD_CATEGORY", payload: newCategory });
    setNewCategory("");
  };

  const editCategory = (index) => {
    setEditingCategory(index);
    setNewCategory(categories[index]);
  };

  const updateCategory = () => {
    if (newCategory.trim() === "") {
      return;
    }

    dispatch({
      type: "EDIT_CATEGORY",
      payload: { index: editingCategory, category: newCategory },
    });
    setEditingCategory(null);
    setNewCategory("");
  };

  const deleteCategory = (index) => {
    dispatch({ type: "DELETE_CATEGORY", payload: index });
  };

  return (
    <div>
      <h2>Categories</h2>
      <div>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={addCategory}>Add category</button>
      </div>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            {index === editingCategory ? (
              <div>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <button onClick={updateCategory}>Save</button>
              </div>
            ) : (
              <div>
                {category}
                <button onClick={() => editCategory(index)}>Edit</button>
              </div>
            )}
            <button onClick={() => deleteCategory(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
