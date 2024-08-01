
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/style";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast } from "react-hot-toast";

type Props = {};

interface Category {
  _id: string;
  title: string;
}

const EditCategories = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess: layoutSuccess, error }] =
    useEditLayoutMutation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [hasShownSuccessToast, setHasShownSuccessToast] = useState(false);

  useEffect(() => {
    console.log("Fetched data:", data);
    if (data) {
      setCategories(data.layout?.categories || []);
    }
    console.log("Categories state:", categories);
    console.log("Layout success:", layoutSuccess);
    console.log("Error:", error);

    // if (layoutSuccess && !hasShownSuccessToast) {
    //   refetch();
    //   toast.success("Categories updated successfully");
    //   setHasShownSuccessToast(true);
    // }
    if (error) {
      const errorData = error as any;
      toast.error(errorData?.data?.message || 'An unexpected error occurred');
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, layoutSuccess, error, refetch, hasShownSuccessToast]);

  const handleCategoriesAdd = (id: string, value: string) => {
    setCategories((prevCategory) =>
      prevCategory.map((i) => (i._id === id ? { ...i, title: value } : i))
    );
  };

  const newCategoriesHandler = () => {
    if (
      categories.length === 0 ||
      categories[categories.length - 1].title !== ""
    ) {
      setCategories((prevCategory) => [...prevCategory, { _id: Date.now().toString(), title: "" }]);
    } else {
      toast.error("Category title cannot be empty");
    }
  };

  const areCategoriesUnchanged = (
    originalCategories: Category[],
    newCategories: Category[]
  ) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };

  const isAnyCategoryTitleEmpty = (categories: Category[]) => {
    return categories.some((q) => q.title === "");
  };

  const editCategoriesHandler = async () => {
    if (
      !areCategoriesUnchanged(data.layout?.categories, categories) &&
      !isAnyCategoryTitleEmpty(categories)
    ) {
      await editLayout({
        type: "Categories",
        categories,
      });
      setHasShownSuccessToast(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[120px] text-center">
          <h1 className={`${styles.title}`}>Add Exams</h1>
          {categories &&
            categories.map((item: Category, index: number) => {
              return (
                <div className="p-3" key={index}>
                  <div className="flex items-center w-full justify-center">
                    <input
                      className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                      value={item.title}
                      onChange={(e) =>
                        handleCategoriesAdd(item._id, e.target.value)
                      }
                      placeholder="Enter Exams Here..."
                    />
                    <AiOutlineDelete
                      className="dark:text-white text-black text-[18px] cursor-pointer"
                      onClick={() => {
                        setCategories((prevCategory) =>
                          prevCategory.filter((i) => i._id !== item._id)
                        );
                      }}
                    />
                  </div>
                </div>
              );
            })}
          <br />
          <br />
          <div className="w-full flex justify-center">
            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={newCategoriesHandler}
            />
          </div>
          <div
            className={`${styles.button
              } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
            ${areCategoriesUnchanged(data.layout?.categories, categories) ||
                isAnyCategoryTitleEmpty(categories)
                ? "!cursor-not-allowed"
                : "!cursor-pointer !bg-[#42d383]"
              }
            !rounded absolute bottom-12 right-12`}
            onClick={
              areCategoriesUnchanged(data.layout?.categories, categories) ||
                isAnyCategoryTitleEmpty(categories)
                ? () => null
                : editCategoriesHandler
            }
          >
            Save
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategories;
