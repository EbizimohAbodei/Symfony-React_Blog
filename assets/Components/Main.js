import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const Main = () => {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = () => {
    axios
      .get("/blog/articles")
      .then((response) => {
        setArticleList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const makeComment = () => {
    axios
      .get("/articleComment/{id}")
      .then((response) => {
        setArticleList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Sure you want to delete this article?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, please delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("/blog/delete/" + id)
          .then((response) => {
            Swal.fire({
              icon: "success",
              title: "Article was deleted successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            fetchArticles();
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Delete was unsuccessful",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };

  const showComments = () => {
    setShowCommentModal(!showCommentModal);
  };

  return (
    <main>
      {articleList.map((article) => {
        return (
          <div className="mainContainer" key={article.id}>
            <h1>
              {article.subject} by {article.author}
            </h1>
            <p>{article.post}</p>
            <div className="numberOfComments">
              <button onClick={showComments}>2 Comments</button>
            </div>
            {showCommentModal && (
              <div>
                <h1>Comments modal</h1>
              </div>
            )}
            {!showCommentModal && (
              <div>
                <div className="commentAuthorCont">
                  <label htmlFor="author">Comment by:</label>
                  <input type="text" name="author" id="author" required />
                </div>
                <div>
                  <textarea id="commentInput" name="commentInput" rows="4" />
                </div>
                <div>
                  <input
                    className="commentBtn"
                    type="submit"
                    value="Comment"
                  ></input>
                </div>
                <button
                  onClick={() => handleDelete(article.id)}
                  className="deleteBtn"
                >
                  Delete Article
                </button>
              </div>
            )}
          </div>
        );
      })}
    </main>
  );
};

export default Main;
