import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import BookmarkForm from './components/BookmarkForm'
import BookmarkList from './components/BookmarkList'
import Header from './components/header'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const API_URL="https://6969088a69178471522c59c0.mockapi.io/book-mark/List"
function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [editBookmark,setEditBookmark]=useState(null);

  const fetchBookmarks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setBookmarks(data);
    } catch (error) {
      console.error('ERROR', error);
    }

  };
  useEffect(() => { fetchBookmarks(); }, []);
  //UPDATED bookmark
  const updateBookmark = async (id,updatedData)=>{
    try{
      const res=await fetch(`${API_URL}/${id}`,{
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const updatedBookmark = await res.json();
      const updatedList = bookmarks.map((b)=>
      b.id===id? updatedBookmark :b);

      setBookmarks(updatedList);
      setEditBookmark(null);
      toast.success("Bookmark Updated Sucesfully")
    }
    catch(error){
      toast.error("Error updating boookmark")
    }
  }


  //ADD bookmark
  const addBookmark = async (bookmark) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookmark),
      });
      const newBookmark = await res.json();
      setBookmarks([...bookmarks, newBookmark]);

      toast.success("Bookmark added succesfully")
    }
    catch (error) {
      console.error("Error adding bookmark");
      console.error(error)
    }

  };
  // delete
  const deleteBookmark = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });


      setBookmarks(bookmarks.filter((b) => b.id !== id));
      toast.info("Bookmark deleted")
    }
    catch (error) {
      toast.error("Error deleting");
      console.error(error)
    }
  };
  return (
    <>
      <Navbar />
      <Header />
      <BookmarkForm addBookmark={addBookmark} updateBookmark={updateBookmark} editBookmark={editBookmark}/>
      <BookmarkList bookmarks={bookmarks} deleteBookmark={deleteBookmark} setEditBookmark={setEditBookmark}/>

      <ToastContainer position='top-right' autoClose={2000}/>
    </>
  )
}

export default App;

