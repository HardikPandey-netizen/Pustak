import React, { useEffect, useState } from "react";
import api from "./../Services/api";
import BookCard from "../components/BookCard";
import CardSkeleton from "../components/CardSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearch } from "../contexts/SearchContext";
import Footer from "../Footer";

function Books() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const limit = 12;
  const { searchQuery } = useSearch();

  const fetchBooks = async (pageNumber = page) => {
    try {
      let url;
      if (searchQuery) {
        url = `/books?fields=cover_image,author,name,listPrice,retailPrice&page=${pageNumber}&limit=${limit}&search=${searchQuery}`;
      } else {
        url = `/books?fields=cover_image,author,name,listPrice,retailPrice&page=${pageNumber}&limit=${limit}`;
      }
      const response = await api.get(url);

      await new Promise((res) => setTimeout(res, 500));

      const newBooks = response.data.data.docs;

      setBooks((prevBooks) => {
        const existingBooks = new Set(prevBooks.map((book) => book._id));
        const filtered = newBooks.filter(
          (book) => !existingBooks.has(book._id)
        );
        return [...prevBooks, ...filtered];
      });
      setPage(pageNumber+1);

      if (newBooks.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setBooks([]);
    setPage(1);
    setHasMore(true);
    setLoading(true);
    fetchBooks(1);
  }, [searchQuery]);

  return (
    <div>
      <div className="ml-14 mt-5">
        {loading ? (
          <div className="flex flex-row flex-wrap gap-8">
            <CardSkeleton cards={8} />
          </div>
        ) : (
          <div id="scrollableDiv" className="h-[80vh] overflow-auto">
            <InfiniteScroll
              dataLength={books.length}
              next={()=>{fetchBooks()}}
              hasMore={hasMore}
              loader={
                <div className="flex justify-center items-center py-6 ">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  </div>
                </div>
              }
              scrollableTarget="scrollableDiv"
            >
              <div className="flex flex-row flex-wrap gap-8">
                {books.map((book) => (
                  <BookCard
                    key={book._id}
                    cover_image={book.cover_image}
                    author={book.author}
                    title={book.name}
                    retailPrice={book.retailPrice}
                    listPrice={book.listPrice}
                  />
                ))}
              </div>

              
            </InfiniteScroll>
            <Footer/>
          </div>
        )}
      </div>
    </div>
  );
}

export default Books;
