import { useState } from "react";

export default function AppForm() {
  const [blog, setBlog] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    category: "",
    tags: [],
    published: false,
  });

  function handleFormData(event) {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });

    if (event.target.type === "checkbox" && event.target.name !== "published") {
      setFormData({
        ...formData,
        [event.target.id]: event.target.checked,
        tags: [...formData.tags, event.target.id],
      });
    }

    if (event.target.type === "select-one") {
      setFormData({
        ...formData,
        [event.target.id]: event.target.value,
      });
    }
  }

  function handleOnSubmit(event) {
    event.preventDefault();

    const newBlog = [...blog, formData];
    setBlog(newBlog);

    console.log(newBlog);

    setFormData({
      title: "",
      image: "",
      description: "",
      category: "",
      tags: [],
      published: false,
    });
  }

  function deleteTitle(index) {
    const newBlog = [...blog];
    newBlog.splice(index, 1);
    setBlog(newBlog);
  }

  return (
    <div>
      <h2 className="text-4xl mb-4">Add a new post</h2>
      <form onSubmit={handleOnSubmit}>
        <div className="grid">
          <input
            className="border-2 border-gray-400 p-2 mb-2"
            type="text"
            name="title"
            onChange={handleFormData}
            value={formData.title}
            id="title"
            placeholder="Title"
          />
          <input
            className="border-2 border-gray-400 p-2 mb-2"
            type="text"
            name="image"
            onChange={handleFormData}
            value={formData.image}
            id="image"
            placeholder="URL image"
          />
          <textarea
            className="border-2 border-gray-400 p-2 mb-2"
            rows="4"
            cols="50"
            name="description"
            onChange={handleFormData}
            value={formData.description}
            id="description"
            placeholder="Description"
          ></textarea>
          <select
            type="select-one"
            className="border-2 border-gray-400 p-2 mb-2"
            name="category"
            onChange={handleFormData}
            value={formData.category}
            id="category"
          >
            <option value="">Select a category</option>
            <option value="sport">Sport</option>
            <option value="tech">Tech</option>
            <option value="news">News</option>
            <option value="lifestyle">Lifestyle</option>
          </select>
          <div>
            <h3>Tags</h3>
            <label htmlFor="html">Html</label>
            <input
              checked={formData.tags.includes("html")}
              className="border-2 border-gray-400 p-2 mb-2"
              type="checkbox"
              name="html"
              onChange={handleFormData}
              id="html"
            />
            <label htmlFor="css">Css</label>
            <input
              checked={formData.tags.includes("css")}
              className="border-2 border-gray-400 p-2 mb-2"
              type="checkbox"
              name="css"
              onChange={handleFormData}
              id="css"
            />
            <label htmlFor="js">Js</label>
            <input
              checked={formData.tags.includes("js")}
              className="border-2 border-gray-400 p-2 mb-2"
              type="checkbox"
              name="js"
              onChange={handleFormData}
              id="js"
            />
          </div>
          <label>Publish</label>
          <input
            checked={formData.published}
            className="border-2 border-gray-400 p-2 mb-2"
            type="checkbox"
            name="published"
            onChange={handleFormData}
            id="published"
          />
          <button className="border-2 border-gray-400 p-2 mb-2" type="submit">
            Submit
          </button>
        </div>
      </form>
      <h3 className="text-2xl">List of posts</h3>
      <div className="p-4 m-auto">
        {blog.map((post, index) => (
          <div className="grid justify-center gap-2" key={index}>
            <div className="text-lg font-bold">{post.title}</div>
            <img
              src={post.image ? post.imgage : "https://placehold.co/600x400"}
              className="text-lg font-bold"
            ></img>
            <div className="text-lg font-bold">{post.description}</div>
            <div className="text-lg font-bold">{post.category}</div>
            <div className="text-lg font-bold">
              {post.tags.map((tag, index) => (
                <span className="mr-4" key={index}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="text-lg font-bold">
              {post.published ? "Published" : "Not published"}
            </div>
            <button
              className="justify-self-end"
              onClick={() => deleteTitle(index)}
            >
              <img
                className="w-6 h-6"
                src="src/assets/trash.png"
                alt="Delete"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
