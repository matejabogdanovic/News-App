import { LoaderFunction } from "react-router-dom";
import { ArticleType } from "../components/Article";
// loaders
export const articleLoader: LoaderFunction = async ({ params }) => {
  const { category, id } = params;
  try {
    const res = await fetch(`/api/${category}/${id}`);
    if (!res.ok) throw new Error("Error while fetching article.");
    return await res.json();
  } catch (error) {
    console.error("Error:", error);
  }
};

// adding
export const addArticle = async (data: ArticleType, category: string) => {
  try {
    await fetch(`/api/${category}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log("Adding article error while POST.");
  } finally {
    return;
  }
};
// editing
export const editArticle = async (
  data: ArticleType,
  category: string,
  id: number
) => {
  try {
    await fetch(`/api/${category}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log("Editing article error while PUT.");
  } finally {
    return;
  }
};
// deleting
export const deleteArticle = async (category: string, id: number) => {
  try {
    await fetch(`/api/${category}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log("Deleting article error while DELETE.");
  } finally {
    return;
  }
};
