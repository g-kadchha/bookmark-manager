import React from "react";
import "../styles/BookmarkList.css";
import { FaBookmark } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";

function BookmarkList({ bookmarks, deleteBookmark, setEditBookmark }) {

  const handleDelete = (id) => {
    deleteBookmark(id);

    toast.info("Bookmark deleted", {
      position: "top-right",
      autoClose: 1500,
    });
  };

  const handleEdit = (bookmark) => {
    setEditBookmark(bookmark);

    toast.success(" Edit mode enabled", {
      position: "top-right",
      autoClose: 1500,
    });
  };

  return (
    <>
      <div className="bookmark-list">
        <h3>
          Saved Bookmarks <FaBookmark className="bookmark-icon" />
        </h3>
          <input
            type="search"
            placeholder=" Search"
            className="search-input" />
      </div>

      <div className="bookmark-content">
        {bookmarks.length === 0 ? (
          <p className="empty">No bookmarks added</p>
        ) : (
          bookmarks.map((b) => (
            <div key={b.id} className="bookmark-list-item">
              <a
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {b.title}
              </a>
          <div className="btn">
              <MdDelete
                className="dlt-icon"
                onClick={() => handleDelete(b.id)}
              />

              <MdEdit
                className="edt-icon"
                onClick={() => handleEdit(b)}
              />
            </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default BookmarkList;
