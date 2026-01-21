import React, { useEffect, useState } from 'react'
import '../styles/BookmarkForm.css'

function BookmarkForm({addBookmark,editBookmark,updateBookmark}) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  useEffect(()=>{
    if(editBookmark){
      setTitle(editBookmark.title)
      setUrl(editBookmark.url)
    }
  },[editBookmark]);

  const handleSubmit=(e)=>{
    e.preventDefault();
    
    if(!title||!url) return;
      if(editBookmark){
        updateBookmark(editBookmark.id,{title,url});
      }else{
        addBookmark({title,url});
      }

    setTitle("");
    setUrl("");
  }
  return (
    <div className="bookmark-form">
      <h3>Add New Bookmark</h3>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Bookmark Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="url"
        placeholder="Bookmark URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button> Save </button>
      </form>
    </div>
  )
}

export default BookmarkForm
